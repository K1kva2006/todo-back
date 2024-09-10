const express = require("express")
const bcrypt = require("bcrypt")
const {User} = require("../mongoose")
const route = express.Router()

route.post("/", async (req,res) => {
    try{
        const { email, password } = req.body
        const newUser = await User.create({
            email,
            passwordHash: await bcrypt.hash(password, 10)
        })
        if(!newUser) return res.status(400).json("Could not create new user")
        res.status(201).json("User successfully added")
    }catch(err) {
        res.status(400).json(err.message)
    }
})

module.exports = route