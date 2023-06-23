module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('answer', {
        answer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        answer_text: {
            type: DataTypes.STRING
        },
        question_id:{
            type:DataTypes.INTEGER

        }
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}
