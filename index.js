const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./routers/userRoutes");
const employeeRouter = require("./routers/employeeRoutes");
const postRouter = require("./routers/postRouters");
const requestRouter = require("./routers/requestRoutes");
const db = require("./config/db");
db.connectDB();

app.use("/uploads/imageUsers", express.static("uploads/imageUsers"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.use("/api/users", userRouter);
app.use("/api/employees", employeeRouter);
app.use("/api/posts", postRouter);
app.use("/api/requests", requestRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
