const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        minLength: [6, "Email is too short"],
        maxLength: [36, "Email is too long"],
        validate: {
            validator: async function (reqEmail) {
                const checkEmail = await this.constructor.findOne({
                    email: reqEmail,
                });
                return !checkEmail;
            },
            message: "Email address already in use",
        },
    },
    passwordHash: {
        type: String,
        required: [true, "Please provide Password"],
        minLength: [6, "Password is too short"],
    },
    todoList: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Todo",
        },
    ],
});

const User = mongoose.model("User", UserSchema);

const TodoSchema = mongoose.Schema({
    todo: {
        type: String,
        required: [true, "Please provide todo"],
        minLength: [4, "Todo is too short"],
        maxLength: [120, "Todo is too long"],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Please provide user id"],
    },
    mark: {
        type: Boolean,
    }
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
    User,
    Todo,
};
