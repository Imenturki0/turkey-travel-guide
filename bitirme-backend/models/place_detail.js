module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('place_detail', {
        detail_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT
        },place_id:{
            type:DataTypes.INTEGER
        }
     
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
