const express = require('express');
const { readFile } = require('../utilities/readFile');

const expressRouter = express.Router();

expressRouter.get('/', async (req, res) => {
    const data = await readFile();
    res.status(200).json(data);
});

expressRouter.get('/:id', async (req, res) => {
    const data = await readFile();
    const { id } = req.params;
    const talkerId = data.filter((talker) => Number(talker.id) === Number(id))[0];
    if (!talkerId) { res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); }
    res.status(200).json(talkerId);
});

module.exports = expressRouter;
