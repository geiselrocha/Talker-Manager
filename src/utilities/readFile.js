const fs = require('fs').promises;
const { join } = require('path');

const path = join('../talker.json');
const readFile = async () => {
  try {
    const completePath = join(__dirname, path);
    const contentFile = await fs.readFile(completePath, 'utf-8');
    return JSON.parse(contentFile);
  } catch (e) {
    return [];
  }
};

module.exports = { readFile };
