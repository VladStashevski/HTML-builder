const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input: stdin, output: stdout });
const file = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(file);

rl.on('SIGINT', () => {
  console.log('Файл c текстом создан');
  rl.close();
});

console.log('Please enter the text ;)');
rl.on('line', (line) => {
  if (line === 'exit' || line === 'Exit') {
    console.log('Файл c текстом создан');
    rl.close();
  } else {
    writeStream.write(`${line}\n`);
  }
});
