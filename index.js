const express = require('express')
const path = require('path');
const db = require('./config/Database');
const router = require('./routers/blog.router');
const passport = require('passport');
const session = require('express-session');
const { localAuth } = require('./middleware/blog.auth');

const app = express();

localAuth(passport)

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use("/uploads/img", express.static(path.join(__dirname, "/uploads/img")))

app.use(session({ secret: "private" }))

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(8000, (err) => {
    db();
    err ? console.log("Some thing went wrong") : console.log("sever started on http://localhost:8000")
})