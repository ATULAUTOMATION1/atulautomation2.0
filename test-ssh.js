const { Client } = require('ssh2');
const fs = require('fs');
const path = require('path');

const REMOTE_DIR = '/home/u268486488/domains/atulautomation.com/nodejs';
const LOCAL_NEXT = path.join(__dirname, '.next');

const conn = new Client();

async function getFiles(dir, prefix = '') {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'cache') continue; // skip cache
    const res = path.resolve(dir, entry.name);
    const rel = prefix + '/' + entry.name;
    if (entry.isDirectory()) {
      files.push({ type: 'dir', rel, local: res });
      files = files.concat(await getFiles(res, rel));
    } else {
      files.push({ type: 'file', rel, local: res });
    }
  }
  return files;
}

conn.on('ready', async () => {
  console.log('✅ SSH Connected — preparing files list...');
  const allEntries = await getFiles(LOCAL_NEXT, '');
  const dirs = allEntries.filter(e => e.type === 'dir').map(e => e.rel).sort();
  const files = allEntries.filter(e => e.type === 'file');

  conn.sftp(async (err, sftp) => {
    if (err) { console.error('SFTP error:', err); conn.end(); return; }
    
    console.log(`Making ${dirs.length} remote directories...`);
    // ensure base dir
    await new Promise(r => sftp.mkdir(REMOTE_DIR + '/.next', r));
    for (const d of dirs) {
      await new Promise(r => sftp.mkdir(REMOTE_DIR + '/.next' + d, r));
    }

    console.log(`Uploading ${files.length} files...`);
    let completed = 0;
    
    // Batch upload in parallel 10 at a time
    const batchSize = 15;
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      await Promise.all(batch.map(file => {
        return new Promise((resolve) => {
          sftp.fastPut(file.local, REMOTE_DIR + '/.next' + file.rel, (err) => {
            if (err) console.error('Error on', file.rel, err);
            resolve();
          });
        });
      }));
      completed += batch.length;
      process.stdout.write(`\\rUploaded ${completed}/${files.length} (${Math.round((completed/files.length)*100)}%)`);
    }
    
    console.log('\\n✅ .next uploaded successfully');
    
    // Restart logic
    conn.exec(`/bin/bash -s`, (err2, stream) => {
      if (err2) { conn.end(); return; }
      stream.stdin.write(`
printf 'GEMINI_API_KEY=AIzaSyAHiF2oy-vArReCTRXJ1Cso44L9IXOfQcw\\n' > ${REMOTE_DIR}/.env.local
pkill -f "${REMOTE_DIR}/server.js" || true
sleep 1
cd ${REMOTE_DIR}
nohup /opt/alt/alt-nodejs22/root/usr/bin/node server.js > console.log 2>&1 &
echo "✅ Server restarted PID=$!"
`);
      stream.stdin.end();
      stream.on('close', () => conn.end())
            .on('data', d => process.stdout.write(String(d)))
            .stderr.on('data', d => process.stdout.write('ERR: ' + d));
    });
  });
}).on('error', err => console.error('Connection Error:', err.message))
.connect({ host: '145.79.213.165', port: 65002, username: 'u268486488', password: 'Ssh@1007' });
