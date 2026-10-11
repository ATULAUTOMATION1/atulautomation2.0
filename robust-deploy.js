const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const BASE_DIR = '/home/u268486488/domains/atulautomation.com';
const LOCAL_ARCHIVE = path.join(__dirname, 'deploy.zip');

if (!fs.existsSync(LOCAL_ARCHIVE)) {
  console.error('deploy.zip not found! Please compile and zip first.');
  process.exit(1);
}

const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB chunks
const fileBuffer = fs.readFileSync(LOCAL_ARCHIVE);
const totalBytes = fileBuffer.length;
const numChunks = Math.ceil(totalBytes / CHUNK_SIZE);
console.log(`File size: ${(totalBytes / 1024 / 1024).toFixed(2)}MB. Splitting into ${numChunks} chunks locally...`);

const chunkPaths = [];
for (let i = 0; i < numChunks; i++) {
  const start = i * CHUNK_SIZE;
  const end = Math.min(start + CHUNK_SIZE, totalBytes);
  const chunkBuffer = fileBuffer.slice(start, end);
  const chunkPath = path.join(__dirname, `deploy.zip.part${i}`);
  fs.writeFileSync(chunkPath, chunkBuffer);
  chunkPaths.push(chunkPath);
}

const conn = new Client();

conn.on('ready', () => {
  console.log('✅ SSH Connected. Uploading chunks via fastPut...');
  
  conn.sftp(async (err, sftp) => {
    if (err) { console.error('SFTP Error:', err); conn.end(); return; }
    
    try {
      // Upload chunks sequentially using fastPut
      for (let i = 0; i < numChunks; i++) {
        const chunkName = `deploy.zip.part${i}`;
        const remotePath = `${BASE_DIR}/${chunkName}`;
        console.log(`Uploading chunk ${i + 1}/${numChunks} (${(fs.statSync(chunkPaths[i]).size / 1024 / 1024).toFixed(2)}MB)...`);
        
        await new Promise((resolve, reject) => {
          sftp.fastPut(chunkPaths[i], remotePath, { concurrency: 4 }, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
      
      console.log('✅ All chunks uploaded successfully. Extracting & merging on server...');
      
      const deployCmd = [
        `cd ${BASE_DIR}`,
        'rm -f deploy.zip',
        `cat ${chunkPaths.map((_, i) => `deploy.zip.part${i}`).join(' ')} > deploy.zip`,
        'rm -f deploy.zip.part*',
        'rm -rf deploy_temp',
        'mkdir -p deploy_temp',
        'unzip -o deploy.zip -d deploy_temp > /dev/null',
        'chmod -R 755 deploy_temp',
        // Deploy into hbuilds/current/nodejs
        'if [ -d hbuilds/current/nodejs ]; then',
        '  echo "--> Deploying into hbuilds/current/nodejs..."',
        '  mkdir -p hbuilds/current/nodejs/public hbuilds/current/nodejs/data',
        '  cp -rf deploy_temp/public/. hbuilds/current/nodejs/public/',
        '  rm -rf hbuilds/current/nodejs/.next',
        '  cp -rf deploy_temp/.next hbuilds/current/nodejs/',
        '  [ -f deploy_temp/data/users.json ] && [ ! -f hbuilds/current/nodejs/data/users.json ] && cp deploy_temp/data/users.json hbuilds/current/nodejs/data/users.json || true',
        '  cp -f deploy_temp/package.json hbuilds/current/nodejs/package.json',
        '  mkdir -p hbuilds/current/nodejs/tmp',
        '  touch hbuilds/current/nodejs/tmp/restart.txt',
        'fi',
        // Deploy into nodejs folder
        'if [ -d nodejs ]; then',
        '  echo "--> Deploying into nodejs folder..."',
        '  mkdir -p nodejs/public nodejs/data',
        '  cp -rf deploy_temp/public/. nodejs/public/',
        '  rm -rf nodejs/.next',
        '  cp -rf deploy_temp/.next nodejs/',
        '  [ -f deploy_temp/data/users.json ] && [ ! -f nodejs/data/users.json ] && cp deploy_temp/data/users.json nodejs/data/users.json || true',
        '  cp -f deploy_temp/package.json nodejs/package.json',
        '  mkdir -p nodejs/tmp',
        '  touch nodejs/tmp/restart.txt',
        'fi',
        'rm -rf deploy_temp deploy.zip',
        // Kill existing Node processes so Passenger respawns with fresh workers
        'pkill -9 -f "server.js" || true',
        'pkill -9 -f "node" || true',
        'sleep 2',
        'if [ -d hbuilds/current/nodejs ]; then',
        '  cd hbuilds/current/nodejs',
        '  touch tmp/restart.txt',
        '  nohup /opt/alt/alt-nodejs22/root/usr/bin/node server.js > console.log 2>&1 &',
        'fi',
        'sleep 2',
        'echo "✅ DEPLOYMENT FINISHED ON SERVER"'
      ].join('\n');

      conn.exec(deployCmd, (err, stream) => {
        if (err) { console.error('Exec Error:', err); conn.end(); return; }
        
        stream.on('close', () => {
          // Clean up local temp chunks
          for (const cp of chunkPaths) {
            try { fs.unlinkSync(cp); } catch (e) {}
          }
          conn.end();
        })
        .on('data', data => process.stdout.write(data.toString()))
        .stderr.on('data', data => process.stderr.write(data.toString()));
      });
      
    } catch (uploadErr) {
      console.error('Upload failed:', uploadErr);
      for (const cp of chunkPaths) {
        try { fs.unlinkSync(cp); } catch (e) {}
      }
      conn.end();
    }
  });
}).on('error', err => {
  console.error('Connection Error:', err.message);
  for (const cp of chunkPaths) {
    try { fs.unlinkSync(cp); } catch (e) {}
  }
})
.connect({ host: '145.79.213.165', port: 65002, username: 'u268486488', password: 'Ssh@1007' });
