module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('favorite', {
        favorite_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        place_id: {
            type: DataTypes.INTEGER,
        }
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}