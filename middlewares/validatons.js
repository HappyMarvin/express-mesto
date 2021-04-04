const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validateSignInBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignUpBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*\s*$/, 'URL'),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.required().custom(((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    })),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

module.exports = {
  validateSignUpBody,
  validateSignInBody,
  validateUserId,
};
