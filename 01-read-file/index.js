const fs = require('fs');
const path = require('path');
const file = path.join(path.dirname(__filename), '/text.txt');
const readStream = fs.createReadStream(file, 'utf8');

let data = '';

readStream.on('data', (chunk) => (data += chunk));
readStream.on('end', () => console.log(data));
readStream.on('error', (error) => console.log('Error', error.message));
