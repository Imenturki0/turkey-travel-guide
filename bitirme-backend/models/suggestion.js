module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('suggestion', {
        suggestion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        img_name:{
            type:DataTypes.STRING

        },
        category:{
            type:DataTypes.STRING
        },
        suggestion_type:{
            type:DataTypes.STRING
        }
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
