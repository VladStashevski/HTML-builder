const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
const createFolder = path.join(__dirname, 'project-dist');

fs.mkdir(createFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(createFolder, 'bundle.css'), '', (err) => {
  if (err) throw err;
});

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    throw err;
  }
  files.forEach((file) => {
    const fileExt = file.name.slice(file.name.lastIndexOf('.') + 1);
    if (file.isFile() && fileExt === 'css') {
      fs.readFile(path.join(folderPath, file.name), 'utf-8', (err, data) => {
        if (err) throw err;
        fs.appendFile(path.join(createFolder, 'bundle.css'), data, (err) => {
          if (err) throw err;
        });
      });
    }
  });
});
