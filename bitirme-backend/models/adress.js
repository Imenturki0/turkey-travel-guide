module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('adress', {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        adress: {
            type: DataTypes.STRING
        },
        place_id:{
            type:DataTypes.INTEGER

        }
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}