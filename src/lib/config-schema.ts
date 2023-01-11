import * as Joi from 'joi';

export class ConfigSchema {
  NODE_ENV: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;

  JWT_PRIVATE_KEY_PATH: string;
  JWT_PUBLIC_KEY_PATH: string;
}

export const configSchema = Joi.object<ConfigSchema>().keys({
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),

  DB_HOST: Joi.string().required().default('localhost'),
  DB_PORT: Joi.number().required().default(5432),
  DB_USER: Joi.string().required().default('postgres'),
  DB_PASS: Joi.string().required().default('postgres'),
  DB_NAME: Joi.string().required().default('auth'),

  JWT_PRIVATE_KEY_PATH: Joi.string().required(),
  JWT_PUBLIC_KEY_PATH: Joi.string().required(),
});
