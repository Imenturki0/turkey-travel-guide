module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('places_hotel_propreties', {
        places_hotel_propreties_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        place_id: {
            type: DataTypes.INTEGER,
           
        },
        propreties_id: {
            type: DataTypes.INTEGER
        },
      
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}