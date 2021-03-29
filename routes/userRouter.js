const express = require("express");
const router = express.Router();
const {signUp, login, signOut} = require("../controllers/userController");



router.route("/signup")
    .post(signUp)


router.route("/login")
    .post(login)

router.route("/signout")
    .get(signOut)


module.exports = router;
