const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const https = require("https");
const fs = require("fs");

const app = express();
app.use(fileUpload());

app.use(cors());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const loginRouter = require("./routes/login.routes");
const registerRouter = require("./routes/register.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
const confirmRouter = require("./routes/confirm.routes");
const deleteRouter = require("./routes/delete.routes");
const updateRouter = require("./routes/update.routes");
const leadboardRouter = require("./routes/get-leadboard.routes");
const replyRouter = require("./routes/reply.routes");
const gradeRouter = require("./routes/grade.routes");
const filterRouter = require("./routes/filter.routes");
const infoRouter = require("./routes/info.routes");

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/confirm", confirmRouter);
app.use("/delete", deleteRouter);
app.use("/update", updateRouter);
app.use("/get-leadboard", leadboardRouter);
app.use("/reply", replyRouter);
app.use("/grade", gradeRouter);
app.use("/filter", filterRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/confirm", confirmRouter);
app.use("/reply", replyRouter);
app.use("/info", infoRouter);

/*const options = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem')
  };
  
https.createServer(options, app).listen(8080);*/

app.listen(8000);
