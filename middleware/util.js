const jwt = require("jsonwebtoken");

exports.getToken = (user) =>{
    jwt.sign({
        id: user._id,
        firtname: user.firtname,
        lastname: user.lastname,
        phone: user.phone,
        email: user.email
    }, process.env.SECRET_KEY, {expiresIn: '7d'})
} 