module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
    
            primaryKey: true,
            autoIncrement: true
    
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }, role: {
            type: DataTypes.STRING
        }, email_address: {
            type: DataTypes.STRING
        }
        , phone_number: {
            type: DataTypes.STRING
        }
    },
        {
            freezeTableName: true,
            timestamps: false,
            
                initialAutoIncrement: 1,
              
        })
}
