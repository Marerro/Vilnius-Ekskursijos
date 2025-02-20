const argon2 = require('argon2');
const { Register } = require('../models/authModel');
const jwt = require('jsonwebtoken');

class authController {

    signToken = (id) => {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    }

    sendCookie = (token, res) => {
        const cookieOptions = {
            expires: new Date(
                Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
        };
        res.cookie("jwt", token , cookieOptions);
    }

    signup = async (req, res, next) => {
        try {
            const userInput = req.body;
    
            const hashPassword = await argon2.hash(userInput.password);
    
            userInput.password = hashPassword;
    
            const result = await Register(userInput);

            const userPost = {
                ...result,
                id: result.id,
                roles: result.roles || "user"
            }
    
            const token = this.signToken(userPost.id)
    
            this.sendCookie(token, res);
    
            userInput.password = undefined;
    
            res.status(200).json({
                status: "success",
                data: userPost
            })
        } catch (error) {
            next(error);
        }
    }

    

}

module.exports = new authController();