import * as joi from 'joi';

export default joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: joi.number().default(3000),

  DATABASE_URL: joi.string().uri().required(),

  JWT_SECRET: joi.string().min(16).required(),
  JWT_EXPIRES_IN: joi.string().default('12h'),
  REVALIDATE_TOKEN: joi.string().min(16).required(),

  CONTENT_USER: joi.string().min(4).required(),
  CONTENT_PASSWORD: joi.string().min(6).required(),
  BCRYPT_SALT_ROUNDS: joi.number().required(),
});
