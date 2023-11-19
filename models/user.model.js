module.exports = (sequelize, types) => {
  
    const User = sequelize.define("user", {

            user_id: {
                type: types.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },

            username: {
                type: types.INTEGER,
                allowNull: false,
            },

            email: {
                type: types.INTEGER,
                allowNull: false,
            },
            
            password: {
                type: types.TEXT,
                allowNull: false
            },

            

            account_status: {
                type: types.ENUM("pending", "active", "inactive", "banned"),
                defaultValue: "active",
            },

            is_deleted: {
                type: types.BOOLEAN,
                defaultValue: false
            }

        },
        {
            indexes: [{ type: "unique", name: "user_email", fields: ["email"] }],
        },
    );

    return User;
};
  