module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('places_has_place_type', {
       id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        place_id: {
            type:DataTypes.INTEGER
        },type_id:{
            type:DataTypes.INTEGER
        }
     
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}