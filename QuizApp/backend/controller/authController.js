const UserModel = require("../model/userSchema.js");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    // console.log(req.body);
    // user level validation of data
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // email validating 
    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Invalid Email : please provide valid email"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "password mismatched"
        });
    }

    try {
        const originalPassword = password;
        const userInfo = UserModel({...req.body,originalPassword});
        const result = await userInfo.save();

        return res.json({
            success: true,
            data: result
        });
    } 
    catch (error) {
        if (error.code == 11000) { // duplicate key error
            return res.status(400).send({
                success: false,
                message: "email already registered"
            })
        }
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}
const signin = async (req, res, next) => {
    const { email, password } = req.body;
    // console.log(req.body);
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }

    try {
        const user = await UserModel
            .findOne({
                email: email
            }).select('+password')
        // console.log(user);
        if (!user || (!await bcrypt.compare(password,user.password))) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        };

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const getUser = async (req, res, next) => {
    const userId = req.user.id;
    // console.log(userId);
    try {
        const user = await UserModel.findById(userId);
        // console.log(user,'userformdb');
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: error.message
        });
    }
}

const logout = (req,res,next)=>{
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly : true
        }
        console.log(res.cookie);
        res.cookie("token",null,cookieOption);
        res.status(200).json({
            success:true,
            message: " logged out successfully !!"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:`${error.message} user not loggedin`
        })
    }
}

module.exports = { signup, signin, getUser , logout };