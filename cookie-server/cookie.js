const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(cookieParser());

app.all("*", (req, res, next) => {
  console.log(req.url);
  next();
});

app.get("/", function (req, res, next) {
  if (req.cookies.isCookie === "wawaawewe") {
    return res.redirect("/loggedIn");
  } else {
    return res.status(200).send("<h3>please <a href = '/logIn'>login</a></h3>");
  }
});

// send the cookie
app.get("/logIn", function (req, res, next) {
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // the expire time hs to be in milliseconds
    secure: false, // send only on secure https connections if true
    httpOnly: true, //prevent the browser from updating the cookie in any way, i.e the client side code
  };

  res.cookie("isCookie", "wawaawewe", cookieOptions);
  res
    .status(200)
    .send("<h3>Welcome you are logged in <a href='/logout'>logout </a> </h3>");
});

// if already logged in
app.get("/logout", function (req, res, next) {
  res.clearCookie("isCookie");
  res.redirect("/");
});

// if already logged in~
app.get("/loggedIn", function (req, res, next) {
  res
    .status(200)
    .send("<h3>Welcome you are logged in <a href='/logout'>logout </a> </h3>");
});

// api for sending json

app.get("/api", function (req, res, next) {
  const cookieOptions = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // the expire time hs to be in milliseconds
    secure: false, // send only on secure https connections if true
    httpOnly: true, //prevent the browser from updating the cookie in any way, i.e the client side code
  };

  console.log(req.cookies.isCookie);
  res.cookie("isCookie", "react cookie", cookieOptions);
  res.status(200).json({
    status: "success",
    message: "cookie set",
  });
});

app.listen(7000, () => {
  console.log("listening on port 7000");
});
