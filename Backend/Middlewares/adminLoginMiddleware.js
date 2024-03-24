const { Login } = require("../Db/AdminloginSchemaInit");
const { zodLogin } = require("../Db/schemaValidations");

async function adminLoginMiddleware(req, res, next) {
  const loginCredentials = req.body;
  const parsedCredentials = zodLogin.safeParse(loginCredentials);

  if (!parsedCredentials) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = await Login.findOne({
    email: parsedCredentials.data.email,
    password: parsedCredentials.data.password,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid user credentials" });
  } else {
    next();
  }
}

module.exports = { adminLoginMiddleware };
