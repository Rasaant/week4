const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            pw:{
              type: Sequelize.TEXT,
                allowNull: false,
            },
            data:{
                type:Sequelize.TEXT,
                allowNull:true,
            },
            userId:{
                type: Sequelize.STRING(30),
                allowNull:false
            }
        },{
            sequelize,
            timestamps:false,
            paranoid: false,
            modelName: 'user',
            tableName: 'users',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })

    }
    static associate(db){
        db.User.hasOne(db.Write, {foreignKey:"user_id", sourceKey: "id"});        
    };
}