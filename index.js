const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/user' , userRouter)
app.use('/todo' , todoRouter)
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to server");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is listen on ${PORT}`);
});
