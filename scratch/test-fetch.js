const https = require('https');
const fs = require('fs');
const path = require('path');

const targetPath = 'C:\\Users\\Fayaz\\.gemini\\antigravity-cli\\brain\\2f702963-7bcc-47d5-9cf9-4db320a60d31\\avibase_checklist.html';

const options = {
  hostname: 'avibase.bsc-eoc.org',
  path: '/checklist.jsp?region=INwhjl',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status code:', res.statusCode);
    console.log('Response length:', data.length);
    fs.writeFileSync(targetPath, data, 'utf8');
    console.log('Successfully saved to:', targetPath);
  });
}).on('error', (err) => {
  console.error('Error:', err);
});
