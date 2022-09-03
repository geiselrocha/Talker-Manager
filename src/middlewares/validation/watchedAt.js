const watchedAtValidation = (req, res, next) => {
    const { talk } = req.body;
    const regex = /^[0-3][0-9].[0-3][0-9].(?:[0-9]{2})?[0-9]{2}$/;
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!regex.test(talk.watchedAt)) {
        return res.status(400)
            .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
};

module.exports = { watchedAtValidation };
