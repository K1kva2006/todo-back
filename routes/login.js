const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../mongoose");
const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await User.findOne({ email });
        if (!checkUser)
            return res
                .status(400)
                .json("The user could not be found with this email");
        const checkPassword = await bcrypt.compare(
            password,
            checkUser.passwordHash
        );
        if (!checkPassword)
            return res.status(400).json("User email or password is incorrect");

        const generateJWT = jwt.sign(
            { userId: checkUser._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        )
        res.status(200).json({message: "You have successfully authenticated", authToken: generateJWT});
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
