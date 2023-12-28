const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const Sesssion = session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
});
module.exports = Sesssion;