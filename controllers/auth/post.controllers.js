const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const dotenv = require('dotenv');
const db = require("../../services/db.service");
const authorize = require("../../utils/authorize.util");
dotenv.config({ path: '.env' });

exports.LoginWithPassword = async (req, res) => {
    try{
        const { username, password } = req.fields;
        const errors = [];
        const User = await db.user.findOne({
            where: {
                username
            }
        });
        if(!User){
            errors.push("Username does not exist!")
            return res.render("auth/login.html", { username, errors, loginText: "Login" });
        }
        const isMatch = await bcrypt.compare(password, User.password);
        if(!isMatch){
            errors.push("Invalid password!")
            return res.render("auth/login.html", { username, errors, loginText: "Login" });
        }
        return authorize(req, res, username);
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

exports.Register = async (req, res) => {
    try{    
        const { username, name, email, password } = req.fields;
        let errors = [];
        if(!email){
            errors.push("Incomplete request!");
        }
        if(!name){
            errors.push("Name is required!");
        }
        if(!username){
            errors.push("Username is required!");
        }
        const User = await db.user.findOne({
            where: {
                username
            }
        });
        
        if(User){
            // errors.push("Email already exists!");
            // return res.render("auth/register.html", { email, errors }); 
            req.session.errors = ["Username already exists, please login!"];
            return res.redirect("/auth");
        }
        if(errors.length > 0){
            return res.render("auth/register.html", { email, errors });
        }
        

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.user.create({
            username,
            name,
            email,
            password: hashedPassword,
        });
        
        return authorize(req, res, username);
        


        // const newUser = await db.user.create({
        //     email,
        //     name,
        //     password,
        //     default_auth_method: 'password'
        // });
        // if(!newUser){
        //     errors.push("Something went wrong!");
        //     return res.render("auth/register.html", { email, errors });
        // }
        // return res.render("auth/password.html", { email });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}