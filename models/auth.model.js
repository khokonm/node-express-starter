module.exports = (sequelize, types) => {
    const Auth = sequelize.define("auth", {
        auth_id: {
            type: types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        refresh_token: {
            type: types.STRING(100),
            allowNull: false,
        },

        user_id: {
            type: types.INTEGER,
            allowNull: false,
        },

        device_info: {
            type: types.JSON,
            defaultValue: {},
        },
        
        is_active: {
            type: types.BOOLEAN,
            defaultValue: true
        }
        
    });
  
    return Auth;
};
  