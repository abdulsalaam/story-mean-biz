/* @abdul : 08-07-2019 */
import * as Joi from "joi";

export const createStoryModel = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  published: Joi.boolean().required()
});

export const updateStoryModel = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  published: Joi.boolean(),
  status: Joi.boolean()
});
