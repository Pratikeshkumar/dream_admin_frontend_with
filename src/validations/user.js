const joi = require('joi');

const signup = {
    body: joi.object({
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        profileUrl: joi.string().optional(),
        email: joi.string().email().required(),
        password: joi.string().required(),
        role: joi.string().optional(),
    }),
};

module.exports = {
    signup
}