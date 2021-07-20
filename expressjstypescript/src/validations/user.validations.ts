//TODO install httpStatus => npm install --save joi
// https://www.npmjs.com/package/joi
// https://www.npmjs.com/package/joi-phone-number
// https://www.npmjs.com/package/express-validation
// https://www.npmjs.com/package/joi-openapi
// https://www.npmjs.com/package/celebrate
// https://www.npmjs.com/package/express-joi-swagger-ts
import Joi from "joi";

// User validation rules
module.exports = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required()
    }
  }
}
