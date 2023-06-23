module.exports = function(sequelize, DataTypes) {
    return  sequelize.define('question', {
        question_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question_text: {
            type: DataTypes.STRING
        },
        confirmation: {
            type: DataTypes.STRING
        },
      
      
    },
        {
            freezeTableName: true,
            timestamps: false
        })
}