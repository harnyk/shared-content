#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const semver = require('semver');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const sourceFolder = path.resolve(config.sourceFolder);
const destFolder = path.resolve(__dirname, '..', config.destFolder);

function sanitizeFilename(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  // Replace spaces and special characters with hyphens, then collapse multiple hyphens
  const sanitized = base
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return sanitized + ext;
}

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
    const sanitizedName = sanitizeFilename(item);
    const destPath = path.join(dest, sanitizedName);

    if (fs.lstatSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
      if (item !== sanitizedName) {
        console.log(`  ${item} -> ${sanitizedName}`);
      }
    }
  }

  console.log(`Copied files from ${src} to ${dest}`);

  // Create latest symlinks for versioned files
  const versionPattern = /^(.+)-v(\d+\.\d+\.\d+)(\.md)$/;
  const destFiles = fs.readdirSync(dest);
  const versionGroups = {};

  for (const file of destFiles) {
    const match = file.match(versionPattern);
    if (match) {
      const title = match[1];
      const version = match[2];
      const ext = match[3];
      if (!versionGroups[title]) versionGroups[title] = [];
      versionGroups[title].push({ file, version, ext });
    }
  }

  for (const [title, versions] of Object.entries(versionGroups)) {
    versions.sort((a, b) => semver.rcompare(a.version, b.version));
    const latest = versions[0];
    const latestDest = path.join(dest, `${title}-latest${latest.ext}`);
    fs.copyFileSync(path.join(dest, latest.file), latestDest);
    console.log(`  ${latest.file} -> ${title}-latest${latest.ext}`);
  }
}

console.log('Building...');
console.log(`Source: ${sourceFolder}`);
console.log(`Destination: ${destFolder}`);

copyDir(sourceFolder, destFolder);

console.log('Build complete!');
