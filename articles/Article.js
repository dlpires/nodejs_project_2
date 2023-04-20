//GET MODULES
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

//SET ARTICLES TABLE
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

//UMA CATEGORIA TEM MUITOS ARTIGOS (RELACIONAMENTO 1-N)
Category.hasMany(Article);
//UM ARTIGO PERTENCE A UMA CATEGORIA (RELACIONAMENTO 1-1)
Article.belongsTo(Category);

//SINCRONIZANDO A TABELA NO BANCO DE DADOS
//Article.sync({force: true});

//EXPORT MODULE
module.exports = Article;