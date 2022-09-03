const watchedRateValidation = (req, res, next) => {
    const { talk } = req.body;
    const regex = /^[0-3][0-9].[0-3][0-9].(?:[0-9]{2})?[0-9]{2}$/;
    if (!regex.test(talk.watchedAt)) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return next();
};

module.exports = { watchedRateValidation };
