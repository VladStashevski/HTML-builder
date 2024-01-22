const fs = require('node:fs');
const path = require('node:path');
const templateHtml = path.join(__dirname, 'template.html');
const componentsFolder = path.join(__dirname, 'components');
const createFolder = path.join(__dirname, 'project-dist');
const folderAssets = path.join(__dirname, 'styles');
const imgFolder = path.join(path.join(__dirname, 'assets', 'img'));
const buildimgFolder = path.join(__dirname, 'project-dist', 'assets', 'img');
const fonts = path.join(path.join(__dirname, 'assets', 'fonts'));
const buildFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const svgFolder = path.join(path.join(__dirname, 'assets', 'svg'));
const createSvgFolder = path.join(__dirname, 'project-dist', 'assets', 'svg');

const createAssetsSubFolder = (createFolder, subfolderName) => {
  fs.mkdir(
    path.join(createFolder, 'assets', subfolderName),
    { recursive: true },
    (err) => {
      if (err) throw err;
    },
  );
};

const copyFolder = (srcFolder, outFolder) => {
  fs.readdir(srcFolder, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      const filePath = path.join(srcFolder, file.name);
      const copyFilePath = path.join(outFolder, file.name);
      fs.copyFile(filePath, copyFilePath, () => {});
    }
  });
};

const mergeStyles = () => {
  fs.readdir(folderAssets, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
    }
    files.forEach((file) => {
      const fileExt = file.name.slice(file.name.lastIndexOf('.') + 1);
      if (file.isFile() && fileExt === 'css') {
        fs.readFile(
          path.join(folderAssets, file.name),
          'utf-8',
          (err, data) => {
            if (err) throw err;
            fs.appendFile(path.join(createFolder, 'style.css'), data, (err) => {
              if (err) throw err;
            });
          },
        );
      }
    });
  });
};

const createBuild = () => {
  fs.mkdir(createFolder, { recursive: true }, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(createFolder, 'assets'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    createAssetsSubFolder(createFolder, 'img');
    createAssetsSubFolder(createFolder, 'fonts');
    createAssetsSubFolder(createFolder, 'svg');
  });
  copyFolder(imgFolder, buildimgFolder);
  copyFolder(fonts, buildFonts);
  copyFolder(svgFolder, createSvgFolder);
  mergeStyles();

  fs.readFile(templateHtml, 'utf-8', (err, data) => {
    let template = data;
    fs.readdir(componentsFolder, (err, files) => {
      files.forEach((val) => {
        fs.readFile(path.join(componentsFolder, val), 'utf-8', (err, data) => {
          template = template.replace(
            `{{${val.slice(0, val.lastIndexOf('.'))}}}`,
            data,
          );
          fs.writeFile(
            path.join(createFolder, 'index.html'),
            template,
            () => {},
          );
        });
      });
    });
  });
};

createBuild();
