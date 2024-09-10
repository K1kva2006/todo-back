const express = require("express");
const { User, Todo } = require("../mongoose");
const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const { userId } = req.userAuthData;
        const userWithTodos = await User.findById(userId)
            .populate("todoList")
            .exec();
        if (!userWithTodos) return res.status(400).json("No data found");
        res.status(200).json(userWithTodos);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = route