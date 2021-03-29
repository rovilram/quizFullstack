const mongoose = require("../database/mongoose");


const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    userType: {
        type:String,
        required:true,
        enum: ["admin", "student"]
    }
});

const User = mongoose.model('User', userSchema);


module.exports = User;
