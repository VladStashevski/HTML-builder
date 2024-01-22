const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'files');
const copieFolder = path.join(__dirname, 'files-copy');

fs.mkdir(copieFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(copieFolder, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    fs.unlink(path.join(copieFolder, file), (err) => {
      if (err) throw err;
    });
  });

  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.copyFile(
        path.join(folderPath, file),
        path.join(copieFolder, file),
        (err) => {
          if (err) throw err;
        },
      );
    });
  });
});
