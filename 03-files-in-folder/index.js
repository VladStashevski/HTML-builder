const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const name = file.name.slice(0, file.name.lastIndexOf('.'));
      const ext = file.name.slice(file.name.lastIndexOf('.') + 1);

      fs.stat(filePath, (err, stat) => {
        console.log(`${name} - ${ext} - ${stat.size / 1000}kb`);
      });
    }
  });
});
