const fs = require('fs').promises;
const { join } = require('path');

const path = join('../talker.json');
const readFile = async () => {
  try {
    const completePath = join(__dirname, path);
    const contentFile = await fs.readFile(completePath, 'utf-8');
    // console.log('string', contentFile);
    return JSON.parse(contentFile);
  } catch (e) {
      // console.error('Erro ao abrir o arquivo', e.message);
    return [];
  }
};

module.exports = { readFile };
