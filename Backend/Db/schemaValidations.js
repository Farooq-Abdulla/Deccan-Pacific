const zod = require("zod");

const zodLogin = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

module.exports = { zodLogin: zodLogin };
