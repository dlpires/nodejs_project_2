const Sequelize = require("sequelize");

//ACESSO DB
const DATABASE = "nodeprojeto2";
const DB_USER = "nodeproject1";
const DB_PASSWORD = "N0d3J52320@";
const DB_HOST = "localhost"

const connection = new Sequelize(DATABASE,DB_USER,DB_PASSWORD,{
    host: DB_HOST,
    dialect: 'mysql',
    timezone: '-03:00'
    /*dialectOptions: {
        socketPath: '/var/run/mysqld/mysqld.sock'
    }*/ // NECESSÁRIO PARA DEPLOY EM LINUX (DIGITAL OCEAN)
});

module.exports = connection;