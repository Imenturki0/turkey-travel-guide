module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('Hotel_Propreties', {
        propreties_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proprety: {
            type: DataTypes.STRING
        },
        icon: {
            type: DataTypes.TEXT
        },
         proprety_type: {
            type: DataTypes.STRING
        },
       /* place_id:{
            type:DataTypes.INTEGER

        }*/
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}