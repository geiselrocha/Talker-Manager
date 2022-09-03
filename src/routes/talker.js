const express = require('express');
const { readFile, writeFile, editFile } = require('../utilities/read-write-File');
const { tokenValidation } = require('../middlewares/validation/token');
const { nameValidation } = require('../middlewares/validation/name');
const { ageValidation } = require('../middlewares/validation/age');
const { talkerValidation } = require('../middlewares/validation/talker');
const { watchedAtValidation } = require('../middlewares/validation/watchedAt');
const { rateValidation } = require('../middlewares/validation/rate');

const expressRouter = express.Router();

expressRouter.get('/', async (_req, res) => {
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

expressRouter.use(tokenValidation, nameValidation, ageValidation, talkerValidation,
    watchedAtValidation, rateValidation);

expressRouter.post('/', async (req, res) => {
    const { body } = req;
    const talker = await writeFile(body);
    res.status(201).json(talker);
});

expressRouter.put('/:id', async (req, res) => {
    const data = await readFile();
    const { id } = req.params; const { name, age, talk } = req.body;
    const talkerId = data.filter((talker) => Number(talker.id) === Number(id))[0];
    talkerId.name = name; talkerId.age = age;
    talkerId.talk.watchedAt = talk.watchedAt;
    talkerId.talk.rate = talk.rate;
    await editFile(talkerId);
    res.status(200).json(talkerId);
});

module.exports = expressRouter;
