const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    email: { type: "string", pattern: `.+\@.+\..+` },
    password: { type: "string", minLength: 8 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
module.exports = validate;
// 
//
