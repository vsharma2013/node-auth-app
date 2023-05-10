const express = require("express");
const axios = require("axios");
const auth = require("./middleware/auth");
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const sessions = require("./middleware/sessions");
const cookieParser = require("cookie-parser");

var upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieParser());

async function run(response) {
  let res = await axios.get("https://api.github.com");
  response.json(res.data);
}

app.post("/login", (req, res) => {
  let ftxt = fs.readFileSync("./middleware/users.json");
  let users = JSON.parse(ftxt);
  let name = req.body.uname;
  let pwd = req.body.pwd;
  if (name in users) {
    let hash = users[name];
    if (bcrypt.compareSync(pwd, hash)) {
      console.log("success");
      let sid = sessions.createSession(name);
      res.cookie("node-ctr-sesion_id", sid);
      res.redirect("/index.html");
    } else {
      res.redirect("/login.html");
    }
  } else {
    res.redirect("/login.html");
  }
});

app.get("/", auth);

app.get("/api", auth, (req, res) => {
  run(res);
});

app.use(express.static("public"));

app.listen(3000);
