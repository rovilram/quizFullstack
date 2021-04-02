const express = require("express");
const router = express.Router();
const { signUp, login, signOut, authUser ,googleAuthUser, postGoogleCode} = require("../controllers/userController");


router.route("/signup")
    .post(signUp)


router.route("/login")
    .post(login)

router.route("/signout")
    .get(signOut)

router.route("/authuser")
    .get(authUser)
    .get((req, res) => {
        res.send({
            OK: 1,
            message: "authorized user"
        })
    })



router.route("/postgooglecode")
    .post(postGoogleCode)


module.exports = router;
