const express = require('express');
const generateToken = require('../utilities/tokenFile');

const expressRouter = express.Router();

const emailValidation = require('../middlewares/validation/email');
const passwordValidation = require('../middlewares/validation/password');

expressRouter.use(emailValidation, passwordValidation);

expressRouter.post('/', async (req, res) => {
    const token = generateToken();
    return res.status(200).json({ token });
  });

module.exports = expressRouter;