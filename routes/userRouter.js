const express = require("express");
const router = express.Router();
const { signUp, login, signOut, authUser } = require("../controllers/userController");


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


module.exports = router;
