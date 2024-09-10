const express = require("express");
const route = express.Router();
const { Todo } = require("../mongoose");

route.post("/", async (req, res) => {
    try {
        const { todoId, mark } = req.body;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId },
            { mark: mark },
            { new: true } // This returns the updated document
        );
        if (!updatedTodo) return res.status(400).json("Error");
        res.status(200).json("Todo marked");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
