const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string", pattern: `^[A-Z][a-z]*$` },
    email: { type: "string", pattern: `.+\@.+\..+` },
    password: { type: "string", minLength: 8 },
  },
  required: ["name", "email", "password"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);
module.exports = validate;
// 
//
