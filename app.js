"use strict"
// require('colors')
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyparser = require('body-parser')

const Auth = require('./routes/auth');
const Blog = require('./routes/blog');

//Load env vars
dotenv.config({ path: ".env" })

// App Initialization
const app = express();

// Origins Allow
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }))

// Api routes
app.use("/api/auth", Auth);
app.use("/api/blog", Blog);




const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`app listening: ${PORT}.magenta`)
        })
    }).catch((err) => {
        console.log("[App.mongoose]".red, err)
    })