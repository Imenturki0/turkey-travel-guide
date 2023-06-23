module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('image', {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        source: {
            type: DataTypes.STRING
        },place_id:{
            type:DataTypes.INTEGER
        }
     
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
