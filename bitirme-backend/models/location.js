module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('location', {
        location_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            /*autoIncrement: true*/
        },
       lat: {
            type: DataTypes.DOUBLE
        },
       long:{
            type:DataTypes.DOUBLE

        }
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
