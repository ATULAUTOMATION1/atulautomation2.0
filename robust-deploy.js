const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const REMOTE_DIR = '/home/u268486488/domains/atulautomation.com/nodejs';
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
        const remotePath = `${REMOTE_DIR}/${chunkName}`;
        console.log(`Uploading chunk ${i + 1}/${numChunks} (${(fs.statSync(chunkPaths[i]).size / 1024 / 1024).toFixed(2)}MB)...`);
        
        await new Promise((resolve, reject) => {
          sftp.fastPut(chunkPaths[i], remotePath, { concurrency: 4 }, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }
      
      console.log('✅ All chunks uploaded successfully. Recombining on server...');
      
      const deployCmd = [
        `cd ${REMOTE_DIR}`,
        'rm -f deploy.zip',
        `cat ${chunkPaths.map((_, i) => `deploy.zip.part${i}`).join(' ')} > deploy.zip`,
        'rm -f deploy.zip.part*',
        // Ensure write permissions on existing folders
        '[ -d public ] && chmod -R 755 public || true',
        '[ -d .next ] && chmod -R 755 .next || true',
        // Clean deploy_temp
        '[ -d deploy_temp ] && chmod -R 755 deploy_temp || true',
        'rm -rf deploy_temp',
        'mkdir -p deploy_temp',
        // Unzip into deploy_temp
        'unzip -o deploy.zip -d deploy_temp > /dev/null',
        // Ensure everything in deploy_temp is writable (755)
        'chmod -R 755 deploy_temp',
        // Merge files into active directories
        'mkdir -p public .next',
        'cp -rf deploy_temp/public/. public/',
        'cp -rf deploy_temp/.next/. .next/',
        'cp -f deploy_temp/package.json package.json',
        // Clean up
        'rm -rf deploy_temp deploy.zip',
        // Restart Passenger
        'mkdir -p tmp',
        'touch tmp/restart.txt',
        // Kill Node process
        `pkill -f "${REMOTE_DIR}/server.js" || true`,
        `sleep 1`,
        `nohup /opt/alt/alt-nodejs22/root/usr/bin/node server.js > console.log 2>&1 &`,
        `sleep 1`,
        'echo "✅ DEPLOYMENT COMPLETE"'
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
        .on('data', data => console.log(data.toString()))
        .stderr.on('data', data => console.error(data.toString()));
      });
      
    } catch (uploadErr) {
      console.error('Upload failed:', uploadErr);
      // Clean up local temp chunks
      for (const cp of chunkPaths) {
        try { fs.unlinkSync(cp); } catch (e) {}
      }
      conn.end();
    }
  });
}).on('error', err => {
  console.error('Connection Error:', err);
  // Clean up local temp chunks
  for (const cp of chunkPaths) {
    try { fs.unlinkSync(cp); } catch (e) {}
  }
})
.connect({ host: '145.79.213.165', port: 65002, username: 'u268486488', password: 'Ssh@1007' });
