const express = require("express");
const { User, Todo } = require("../mongoose");
const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { todo } = req.body;
        if(todo.length <= 6) return res.status(400).json("Note is too short")
        const newNote = await Todo.create({
            todo,
            userId: req.userAuthData.userId,
        });
        if (!newNote) return res.status(400).json("Todo could not be added");

        const user = await User.findOneAndUpdate(
            { _id: req.userAuthData.userId },
            {
                $push: { todoList: newNote._id },
            }
        );
        if (!user)
            return res.status(400).json("Something wrong. try again later..");
        res.status(201).json("todo successfully added");
    } catch (err) {
        res.status(err.message);
    }
});

module.exports = route;
