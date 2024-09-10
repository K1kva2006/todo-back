const express = require("express");
const route = express.Router();
const { Todo } = require("../mongoose");

route.delete("/", async (req, res) => {
    try {
        const { noteId } = req.body;
        const deletedTodo = await Todo.findOneAndDelete({
            _id: noteId,
            userId: req.userAuthData.userId,
        });
        if (!deletedTodo) return res.status(400).json("User or Todo not found");
        res.status(200).json("Note deleted successfully");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
