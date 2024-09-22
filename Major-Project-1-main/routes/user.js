const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const controllerUser = require("../controllers/user.js");
const { renderSignUp, signUp, renderLogin, login, logout } = require("../controllers/user.js");

router.route("/signup")
.get(renderSignUp)
.post(wrapAsync(signUp));

router.route("/login")
.get(renderLogin)
.post(saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),login);


router.get("/logout",logout);

module.exports = router;