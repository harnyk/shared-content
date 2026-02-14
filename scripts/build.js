#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const sourceFolder = path.resolve(config.sourceFolder);
const destFolder = path.resolve(__dirname, '..', config.destFolder);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`Source folder does not exist: ${src}`);
    process.exit(1);
  }

  // Clear destination folder contents (but keep the folder)
  if (fs.existsSync(dest)) {
    const files = fs.readdirSync(dest);
    for (const file of files) {
      const filePath = path.join(dest, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  } else {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Copy all files from source to destination
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  console.log(`Copied files from ${src} to ${dest}`);
}

console.log('Building...');
console.log(`Source: ${sourceFolder}`);
console.log(`Destination: ${destFolder}`);

copyDir(sourceFolder, destFolder);

console.log('Build complete!');
