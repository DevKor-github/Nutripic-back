"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const Joi = require("joi");
exports.validation = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    SERVER_PORT: Joi.number().required(),
}).options({
    abortEarly: true,
});
//# sourceMappingURL=validation.js.map