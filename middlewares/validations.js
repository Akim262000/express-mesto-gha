const { celebrate, Joi } = require('celebrate');

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().required().min(2).max(30)
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
}),
});

module.exports = {signIn, signUp};