const {
    Login,
    Register,
    Logout,
} = require("./get.controllers");
const {
    Register: RegisterPost,
    LoginWithPassword
} = require("./post.controllers");
module.exports = {
    Login,
    Logout,
    Register,
    RegisterPost,
    LoginWithPassword,
}