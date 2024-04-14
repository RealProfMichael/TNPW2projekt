const Joi = require('joi');

module.exports.createCommentSchema = Joi.object({
  comment: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
  }).required(),
});

module.exports.updateCommentSchema = Joi.object({
  comment: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
  }).required(),
});
