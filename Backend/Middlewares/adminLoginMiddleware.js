const { Login } = require("../Db/dbInit");
const { zodLogin } = require("../Db/schemaValidations");

async function adminLoginMiddleware(req, res, next) {
  const { email, password } = req.body;
  const parsedEmail = zodLogin.safeParse(email);
  const parsedPassword = zodLogin.safeParse(password);
  if (!parsedEmail.success || !parsedPassword.success) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const user = await Login.findOne({
    email: parsedEmail.data,
    password: parsedPassword.data,
  });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  } else {
    next();
  }
}

module.exports = { adminLoginMiddleware };
