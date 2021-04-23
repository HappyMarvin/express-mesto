const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

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
    avatar: Joi.string().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.message('Передана невалидная ссылка');
      }
      return value;
    }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateId = celebrate({
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

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.message('Передана невалидная ссылка');
      }
      return value;
    }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        return helper.message('Передана невалидная ссылка');
      }
      return value;
    }),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

module.exports = {
  validateSignUpBody,
  validateSignInBody,
  validateId,
  validateUserProfile,
  validateUserAvatar,
  validateCardBody,
};
