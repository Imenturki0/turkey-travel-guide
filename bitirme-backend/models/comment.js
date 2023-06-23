module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('comment', {
        comment_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.TEXT
        },
        star_rating:{
            type:DataTypes.INTEGER

        },
        user_id :{
            type:DataTypes.INTEGER
        }
        ,
        place_id :{
            type:DataTypes.INTEGER
        },
        date :{
            type:DataTypes.STRING
        }

      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
