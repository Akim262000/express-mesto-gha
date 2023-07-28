const { celebrate, Joi } = require("celebrate");

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
  }),
});

/* -------Users------- */

const userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const renovateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const renovateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

/* -------Cards------- */

const createCardsValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string(),
  }),
});

const cardsValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signUp,
  signIn,
  userValidation,
  renovateUserValidation,
  renovateUserAvatarValidation,
  createCardsValidation,
  cardsValidation,
};
