const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const db = require("./config/db");

db.connectDB();

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
