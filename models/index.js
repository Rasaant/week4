const Sequelize= require("sequelize");
const User = require("./User");
const write = require("./write"); 

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {}; //여기와 실제 데이터베이스가 연결된다. 

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.write = write;
db.User = User;


write.init(sequelize);
User.init(sequelize);
write.associate(db);
User.associate(db);

module.exports = db;