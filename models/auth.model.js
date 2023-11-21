module.exports = (sequelize, types) => {
    const Auth = sequelize.define("auth", {
        auth_id: {
            type: types.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },

        auth_token: {
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
        },

        is_deleted: {
            type: types.BOOLEAN,
            defaultValue: false
        },

        last_activity: {
            type: types.DATE,
            defaultValue: types.NOW
        },
        
        
    });
  
    return Auth;
};