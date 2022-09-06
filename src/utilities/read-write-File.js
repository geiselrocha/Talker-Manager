const fs = require('fs').promises;
const { join } = require('path');

const path = join('../talker.json');
const completePath = join(__dirname, path);
const readFile = async () => {
console.log(completePath);
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

const editFile = async (neWcontent) => {
  try {
    const data = await readFile();
    data.filter((content, index) => {
      if (content.id === neWcontent.id) { data[index] = neWcontent; }
      return data;
    });
    const contentFile = await fs.writeFile(completePath, JSON.stringify(data));
    return contentFile;
  } catch (e) {
    return [];
  }
};

const deleteFile = async (id) => {
  const data = await readFile();
  const talkerFilter = data.filter((talker) => talker.id !== Number(id));
  await fs.writeFile(completePath, JSON.stringify(talkerFilter));
};

module.exports = { readFile, writeFile, editFile, deleteFile };
