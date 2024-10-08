//환경변수 유효성 검사
import * as Joi from 'joi';

export const validation: Joi.Schema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    SERVER_PORT: Joi.number().required(),
}).options({
    abortEarly: true,
});