const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const serverError = require("../../utils/serverError.util");
const db = require("../../services/db.service");
const tokenGenerator = require("../../utils/tokenGenerator.util");
dotenv.config({ path: '.env' });

const JWT_SECRET = process.env.JWT_SECRET;

exports.Register = async (req, res) => {
    try {
        const { username, email, password } = req.fields;

        if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });
        
        const user = await db.user.findOne({ where: { email } });

        if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.user.create({ username, email, password: hashedPassword });

        res.status(201).json({
            status: "success",
            message: "User created successfully"
        });
    } catch (error) {
        serverError(res, 500, error.message);
    }
}

exports.Login = async (req, res) => {
    try{
        const { email, password } = req.fields;
        if(!email || !password){
            return res.status(400).json({ status: "error", message: "All fields are required" });
        }
        const findUser = await db.user.findOne({where:{email}});
        
        if(!findUser){
            return res.status(400).json({ status: "error", message: "Invalid Email" });
        }

        const doMatch = await bcrypt.compare(password, findUser.password);

        if(!doMatch){
            return res.status(400).json({ status: "error", message: "Invalid Password" });
        }
        // generate a refresh token so the user doesn't need to login every time.
        let refreshToken = tokenGenerator(30);
        let countAuths = await db.auth.count({where:{ refresh_token: refreshToken}});
        // console.log(countAuths);
        while (countAuths > 0) {
            // console.log(`inside loop, auth count is ${countAuths}`);
            refreshToken = tokenGenerator(30);
            countAuths = await db.auth.count({where:{ refresh_token: refreshToken}});
        }

        const payload = {
            username: findUser.username,
            email: findUser.email,
            user_id: findUser.user_id
        }

        const bearer = `${jwt.sign(payload, JWT_SECRET, { expiresIn: `1h` })}`;

        // to save the refresh token directly in the cookie from server
        // const expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 1 month
        // res.cookie('refreshtoken', refreshToken, { maxAge: expiryDate, httpOnly: true });

        await db.auth.create({
            refresh_token: refreshToken,
            user_id: findUser.user_id,
            is_active: true
        });

        return res.status(200).json({
            status: "success",
            message: "Login Successful",
            data: {
                bearer,
                refreshToken
            },
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

exports.RenewJWT = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        const Token = authHeader?.split(" ")[1];
        if(!req.cookies.refreshtoken && Token == "")
        return res.status(401).json({ status: "error", message: "Unauthorized Access!" });

        let refreshToken;
        if(req.cookies.refreshtoken)
        refreshToken = req.cookies.refreshtoken;
        else
        refreshToken = Token

        const findUser = await db.auth.findOne({
            include: [{
                model: db.user,
                required: true
            }],
            where:{
                refresh_token:refreshToken, 
                is_active: true
            },
            raw : true ,
            nest : true
        });
        if(!findUser){
            // clear cookie if it was set while login user in
            // res.clearCookie('refreshtoken');
            // or the message could be invalid refresh token
            return res.status(401).json({ status: "error", message: "Unauthorized Access!" });
        }

        const payload = {
            user_id: findUser.user.user_id,
            username: findUser.user.username,
            email: findUser.user.email,
        }

        const bearer = `${jwt.sign(payload, JWT_SECRET, { expiresIn: `1h` })}`;

        return res.status(200).json({
            status: "success",
            message: "Login Successful",
            data: {
                bearer
            },
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
}

exports.Logout = async (req, res) => {
    try{
        const authHeader = req.headers.authorization;
        const Token = authHeader?.split(" ")[1];
        if(!req.cookies.refreshtoken && Token == "")
        return res.status(401).json({ status: "error", message: "Unauthorized Access!" });

        let refreshToken;
        if(req.cookies.refreshtoken)
        refreshToken = req.cookies.refreshtoken;
        else
        refreshToken = Token
        
        await db.auth.update(
            { is_active: false },
            { where: { refresh_token: refreshToken  } }
        );

        // if cookie was set from the server, clear it
        // res.clearCookie('refreshtoken');
        return res.status(200).json({
            status: "success",
            message: "Logout Successful",
        });
    }catch(err){
        console.log(err);
        return serverResponse({res, err});
    }
}

exports.DestroySession = async(req, res) => {
    // todo
    // create a function where people will be able to destroy their logins from other devices
    res.send('detroying sessions!');
}