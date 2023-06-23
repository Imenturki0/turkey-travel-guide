module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('destination', {
        destination_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img_name: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING,
        },city_name:{
            type: DataTypes.STRING

        },
       /* location_location_id:{
            type: DataTypes.INTEGER,
            defaultvalue:1
        },*/
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
