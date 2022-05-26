const Sequelize  = require("sequelize");

module.exports = class write extends Sequelize.Model{
   static init(sequelize){
       return super.init({
        
           content:{
               type: Sequelize.STRING,
               allowNull: false,
           },
           writer:{
               type: Sequelize.STRING(10),
               allowNull: true,
           }
           
       },{
           sequelize,
           timestamps:false,
           paranoid: false,
           modelName: 'write',
           tableName: 'writes',
           charset: 'utf8mb4',
           collate: 'utf8mb4_general_ci',

       });
   }
   
   static associate(db){
    db.write.belongsTo(db.User, {foreignKey:"user_id", sourceKey: "id"});
   };
};