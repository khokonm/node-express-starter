const db = require("../../services/db.service");

exports.Login = async (req, res) => {
    try{    
        let errors = [];
        const { redirect } = req.query;
        let loginText = "Login";
        if(redirect){
            loginText = "Login to continue";
            req.session.redirect = redirect;
        }
        if(req.session.errors){
            errors = req.session.errors;
            req.session.errors = null;
            return res.render("auth/login.html", { errors, loginText });
        }
        return res.render("auth/login.html", { loginText });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

exports.Register = async (req, res) => {
    try{    
        let errors = [];
        const { redirect } = req.query;
        let loginText = "Register";
        if(redirect){
            loginText = "Signup to continue";
            req.session.redirect = redirect;
        }
        if(req.session.errors){
            errors = req.session.errors;
            req.session.errors = null;
            return res.render("auth/register.html", { errors, loginText });
        }
        return res.render("auth/register.html", { loginText });
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Internal Server Error",
        })
    }
}

exports.Logout = async (req, res) => {
    try{
        const authToken = req.cookies.auth_token;
        if(authToken){
            await db.auth.update({
                is_deleted: true,
                is_active: false
            },{
                where: {
                    auth_token: authToken
                }
            });
        }
        req.session.destroy();
        res.cookie('auth_token', '', { maxAge: 1 });
        return res.redirect("/");
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}