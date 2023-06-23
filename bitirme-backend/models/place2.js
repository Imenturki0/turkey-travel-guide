
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('places', {
        place_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        place_name: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING,
        },destination_id:{
            type:DataTypes.INTEGER
        },img_name:{
            type: DataTypes.STRING,
        },img:{
            type: DataTypes.STRING,
        },favourite:{
            type: DataTypes.BOOLEAN
        }

    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
