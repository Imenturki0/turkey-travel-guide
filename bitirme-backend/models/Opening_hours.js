module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('Opening_hours', {
        opening_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
       season: {
            type: DataTypes.STRING
        },
       days:{
            type:DataTypes.STRING

        },
        opening_hour:{
             type:DataTypes.STRING
 
         },
         close_hour:{
              type:DataTypes.STRING
  
          },place_id:{
            type: DataTypes.INTEGER
          }
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
