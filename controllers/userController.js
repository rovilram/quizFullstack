const User = require("../models/userModel");
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const md5 = require("md5");


const isValidUser = (user) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)
}


const isValidPassword = (password) => {
    //Minimo 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial(@#$%&)
    const validLong = (password.length > 7) ? true : false;
    const validMin = /[a-z]+/.test(password);
    const validMay = /[A-Z]+/.test(password);
    const validNum = /[0-9]+/.test(password);
    const validSpecial = /[@#$%&]+/.test(password);
    if (!validLong) return { OK: false, message: "password must be at least 8 characters" };
    else if (!validMin) return { OK: false, message: "password must be at least 1 lowecase character" };
    else if (!validMay) return { OK: false, message: "password must be at least 1 uppercase character" };
    else if (!validNum) return { OK: false, message: "password must be at least 1 number" };
    else if (!validSpecial) return { OK: false, message: "password must be at least 1 special character (@#$%&)" };
    else return { OK: true };

}


const isValidUserPass = (user, password, res) => {
    if (!isValidUser(user)) {
        res.status(422).send({
            OK: 0,
            error: 422,
            message: `'user' is not a valid email`
        });
        return false;
    }
    const boolPass = isValidPassword(password);
    if (!boolPass.OK) {
        res.status(422).send({
            OK: 0,
            error: 422,
            message: boolPass.message
        });
        return false;
    }

    return true; //user & pass valid

}

exports.signUp = async (req, res) => {

    const user = req.body.user;
    const password = req.body.password;
    const userType = req.body.userType;

    //Validamos los campos user y password
    if (isValidUserPass(user, password, res)) {

        //generamos una clave secreta para el JWT del usuario
        const secret = nanoid();

        try {
            const newUser = new User({
                user,
                password:md5(password),
                secret,
                userType
            })
            const response = await newUser.save();
            res.send({
                OK: 1,
                message: "New user created",
                newUser: response.user
            });
        }
        catch (error) {
            if (error.code === 11000) {
                res.status(409).send({
                    OK: 0,
                    error: 409,
                    message: error.message,
                })
            }
            res.status(500).send({
                OK: 0,
                error: 500,
                message: error.message,
            })
        }
    };
}


exports.login = async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log("LOGIN")

    if (isValidUserPass(user, password, res)) {

        const response = await User.findOne({ user, password: md5(password) });

        if (response) {
            const payload = { user, userType: response.userType };
            const options = { expiresIn: "10m" }
            const token = jwt.sign(payload, response.secret, options);
            console.log("AUTORIZADO")
            res.send({
                OK: 1,
                message: "Authorized user",
                token
            })
        }
        else {
            console.log("NO ATORIZADO");

            res.status(401).send({
                OK: 0,
                error: 401,
                message: `'usuario / contraseña' no válidos`
            })
        }

    }

}


exports.signOut = async (req, res) => {

    const authorization = req.headers.authorization;

    const token = authorization.split(" ")[1];

    const user = jwt.decode(token).user;

    const response = await User.findOne({ user })

    if (response) {
        const secret = response.secret;

        try {
            jwt.verify(token, secret);
            try {
                const newSecret = nanoid();
                const updateResponse = await User.updateOne({ user }, { secret: newSecret });
                res.send({
                    OK: 1,
                    message: "User Disconnected"
                })
            }
            catch (error) {
                res.status(500).send({
                    OK: 0,
                    error: 500,
                    message: error.message
                })
            }
        }
        catch (error) {
            res.status(401).send({
                OK: 0,
                error: 401,
                message: error.message
            })
        }
    }
}



exports.authUser = async (req, res, next) => {

    const authorization = req.headers.authorization;
    console.log("authorization", authorization)
    if (authorization) {
        const token = authorization.split(" ")[1];

        const payload = jwt.decode(token);

        if (!payload) {
            res.status(401).send({
                OK: 0,
                status: 401,
                message: "invalid Token"
            })
        }

        else {
            const user = payload.user;

            const response = await User.findOne({ user })

            if (response) {
                const secret = response.secret;

                try {
                    jwt.verify(token, secret);
                    //TODO: si algun dia necesito autenticacion de estudiante o admin
                    //habrá que hacerlo desde aquí
                    next();
                }
                catch (error) {

                    res.status(401).send({
                        OK: 0,
                        error: 401,
                        message: error.message
                    })
                }
            }
            else {
                res.status(401).send({
                    OK: 0,
                    error: 401,
                    message: "User unknown / invalid Token"
                })
            }
        }
    }
    else {
        res.status(401).send({
            OK: 0,
            error: 401,
            message: "Token required"
        })
    }
}