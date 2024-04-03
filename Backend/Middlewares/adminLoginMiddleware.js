const { Login } = require("../Db/AdminloginSchemaInit");
const { zodLogin } = require("../Db/schemaValidations");

async function adminLoginMiddleware(req, res, next) {
  const loginCredentials = req.body;
  // console.log("In Login Middleware req.body:",loginCredentials);
  const parsedCredentials = zodLogin.safeParse(loginCredentials);

  if (!parsedCredentials) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // console.log("In Login Middleware parsedCredentials:",parsedCredentials.data);

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
