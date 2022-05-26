const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            pw:{
              type: Sequelize.STRING(16),
                allowNull: false,
            },
            data:{
                type:Sequelize.STRING(30),
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
        db.User.hasOne(db.write, {foreignKey:"user_id", sourceKey: "id"});        
    };
}