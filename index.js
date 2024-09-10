require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const auth = require("./middlewares/auth")

mongoose
    .connect(process.env.MONGOOSE_CONNECTION_URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log(err));

// routes
const register = require("./routes/register")
const login = require("./routes/login")
const profile = require("./routes/profile")
const addTodo = require("./routes/addTodo")
const changeTodoMark = require("./routes/changeTodoMark")
const deleteTodo = require("./routes/deleteTodo")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/register", register)
app.use("/login", login)
app.use("/profile", [auth, profile])
app.use("/add/todo", [auth, addTodo])
app.use("/change/todo/mark", [auth, changeTodoMark])
app.use("/delete/todo", [auth, deleteTodo])

app.listen(process.env.PORT, () => console.log("The server started successfully"));
