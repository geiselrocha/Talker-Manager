const express = require('express');
const generateToken = require('../utilities/tokenFile');

const expressRouter = express.Router();

expressRouter.post('/', async (req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
  });

module.exports = expressRouter;