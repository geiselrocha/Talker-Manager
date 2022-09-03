const fs = require('fs').promises;
const { join } = require('path');

const path = join('../talker.json');
const completePath = join(__dirname, path);
const readFile = async () => {
  try {
    const contentFile = await fs.readFile(completePath, 'utf-8');
    return JSON.parse(contentFile);
  } catch (e) {
    return [];
  }
};

const writeFile = async (newTalker) => {
  try {
    const data = await readFile();
    const contentFile = { id: data.length + 1, ...newTalker };
    data.push(contentFile);
    await fs.writeFile(completePath, JSON.stringify(data));
    return contentFile;
  } catch (e) {
    return [];
  }
};

module.exports = { readFile, writeFile };
