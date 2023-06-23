module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('place_type', {
        type_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },type:{
            type:DataTypes.STRING
        }
     
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}