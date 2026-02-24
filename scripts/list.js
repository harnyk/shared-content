#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const destFolder = path.resolve(__dirname, '..', config.destFolder);

// Get GitHub Pages URL from git remote
function getGitHubPagesUrl() {
  try {
    const remote = execSync('git remote get-url origin', { encoding: 'utf-8' }).trim();
    // Parse: https://github.com/user/repo.git or git@github.com:user/repo.git
    const match = remote.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (match) {
      const [, user, repo] = match;
      return `https://${user}.github.io/${repo}`;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

const baseUrl = getGitHubPagesUrl();

if (!baseUrl) {
  console.error('Could not determine GitHub Pages URL from git remote');
  process.exit(1);
}

if (!fs.existsSync(destFolder)) {
  console.error(`Destination folder does not exist: ${destFolder}`);
  process.exit(1);
}

const items = fs.readdirSync(destFolder);

console.log('Published files:\n');
for (const item of items) {
  const urlName = item.replace(/\.md$/, '.html');
  console.log(`${baseUrl}/${urlName}`);
}
