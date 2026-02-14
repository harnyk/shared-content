#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ghpages = require('gh-pages');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const destFolder = path.resolve(__dirname, '..', config.destFolder);

const options = {
  branch: config.ghPages?.branch || 'gh-pages',
  message: config.ghPages?.message || 'Auto-deploy',
};

console.log(`Deploying ${destFolder} to GitHub Pages...`);
console.log(`Branch: ${options.branch}`);

ghpages.publish(destFolder, options, (err) => {
  if (err) {
    console.error('Deploy failed:', err);
    process.exit(1);
  }
  console.log('Deploy complete!');
});
