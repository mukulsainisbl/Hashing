const express = require("express");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const todoRouter = require("./routes/todo.routes");
const app = express();
app.use(express.json());
const PORT = 8080;



app.use('/user' , userRouter)
app.use('/todo', todoRouter)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is listen on  ${PORT}`);
});
