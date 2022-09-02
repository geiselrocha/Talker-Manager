const express = require('express');
const { readFile } = require('../utilities/readFile');

const expressRouter = express.Router();

expressRouter.get('/', async (req, res) => {
    const data = await readFile();
    // console.log(data);
    res.status(200).json(data);
});

module.exports = expressRouter;
