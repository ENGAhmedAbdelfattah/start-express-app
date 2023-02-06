const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    dept: { type: "string" },
  },
  required: ["name", "dept"],
  additionalProperties: false,
};

validate = ajv.compile(schema);
module.exports = validate;
