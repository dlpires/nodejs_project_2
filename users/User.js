//GET MODULES
const Sequelize = require("sequelize");
const connection = require("../database/database");

//SET CATEGORIES TABLE
const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({force:false});

//EXPORT MODULE
module.exports = User;