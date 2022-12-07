const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session')


const https = require('https');
const fs = require('fs');


const app = express()


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const loginRouter = require('./routes/login.routes')
const registerRouter = require('./routes/register.routes')

app.use("/login", loginRouter)
app.use("/register", registerRouter)



/*const options = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem')
  };
  
https.createServer(options, app).listen(8080);*/

app.listen(3001)

