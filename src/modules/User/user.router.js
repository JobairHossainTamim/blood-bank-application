const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../../middlewares/authMiddleware');


// register new user 

router.post('/register', async (req, res) => {
    try {
        // check if user is already registered
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) {
            return res.send({
                success: false,
                message: "User already exist",
            })
        }
        else {

            // hash password 
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashPassword

            // save USer 

            const user = new User(req.body)
            await user.save();

            // 
            return res.send({
                success: true,
                message: "User Success fully saved",
            })

        }


    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})


// login 
router.post('/login', async (req, res) => {
    try {

        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: "User not found",
            });
        }
        else {

            // check if userType matches
            if (user.userType !== req.body.userType) {
                return res.send({
                    success: false,
                    message: `User is not registered as a ${req.body.userType}`,
                });
            }

            // compare password
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!validPassword) {
                return res.send({
                    success: false,
                    message: "Invalid password",
                });
            }

            // generate token
            const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
                expiresIn: "5d",
            });

            return res.send({
                success: true,
                message: "User logged in successfully",
                data: token,
            });

        }


    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})



// get current user
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {

        const user = await User.findOne({ _id: req.body.userId });
        return res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        })
    }
})


module.exports = router;