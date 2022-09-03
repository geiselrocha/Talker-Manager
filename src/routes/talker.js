const express = require('express');
const { readFile, writeFile } = require('../utilities/read-write-File');
const { talkerValidation } = require('../middlewares/validation/talker');
const { tokenValidation } = require('../middlewares/validation/token');
const { nameAgeValidation } = require('../middlewares/validation/name-age');
const { bindingValidation } = require('../middlewares/validation/binding');
const { watchedRateValidation } = require('../middlewares/validation/watched-rate');

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

expressRouter.post('/',
    talkerValidation, tokenValidation, nameAgeValidation, bindingValidation, watchedRateValidation,
    async (req, res) => {
        const { body } = req;
        const talker = await writeFile(body);
        res.status(201).json(talker);
    });

module.exports = expressRouter;
