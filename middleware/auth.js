const sessions = require("./sessions");

module.exports = (req, res, next) => {
  let loggedin =
    "node-ctr-sesion_id" in req.cookies &&
    sessions.isValidSession(req.cookies["node-ctr-sesion_id"]);

  console.log(loggedin);
  if (loggedin) next();
  else res.redirect("/login.html");
};
