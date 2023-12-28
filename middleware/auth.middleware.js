const db = require("../services/db.service");


const isAuthorized = async (req, res, next) => {
    try{
        const authToken = req.cookies.auth_token;
        if(!authToken){
            req.session.error = ["Please login to continue!"];
            return res.redirect(`/auth?redirect=${req.originalUrl}`);
        }
        const Auth = await db.auth.findOne({
            where: {
                auth_token: authToken,
                is_active: true,
                is_deleted: false
            }
        });
        if(!Auth){
            // clear cookie
            res.clearCookie('auth_token');
            req.session.error = ["Please login to continue!"];
            return res.redirect(`/auth?redirect=${req.originalUrl}`);
        }
        const user_id = Auth.user_id;
        const auth_id = Auth.auth_id;
        // update auth last activity
        await db.auth.update({
            last_activity: new Date()
        },{
            where: {
                auth_id
            }
        });
        const User = await db.user.findOne({
            where: {
                user_id,
                is_deleted: false
            }
        });
        req.user = User;
        res.locals ={
            User
        };
        next();
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = isAuthorized;