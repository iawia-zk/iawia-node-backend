import Joi from 'joi';

export const isValidJsonKey = (key: string, helpers: Joi.CustomHelpers<string>) => {
  if (!/^[^\s\x00-\x1F\x7F]+$/.test(key)) {
    return helpers.error('key.invalid');
  }
  return key;
};
