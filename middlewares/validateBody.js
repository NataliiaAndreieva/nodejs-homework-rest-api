const HttpError = require('../helpers/HttpError');

const validateBody = schema => {
    const func = (req, res, next) => {
        const keys = Object.keys(req.body);
        if (keys.length === 0) {
            return res.status(400).json({ message: 'Missing fields' });
        }
        const { error } = schema.validate(req.body);
        if (error) {
            const missingField = error.details[0].context.key;
         next(HttpError(400, `missing required ${missingField} field`));
            // next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;