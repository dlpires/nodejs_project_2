const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require("./users/User");

//View engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: "qualquercoisa",
    cookie: {
        maxAge: 30000
    }
}));

//Static
app.use(express.static('public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Database
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log("Erro de conexão: "+ error);
    });

//USANDO ROTAS EXTERNAS
app.use("/",categoriesController);
app.use("/",articlesController);
app.use("/",usersController);

//SESSION TEST - CREATE
app.get("/session", (req, res) => {
    req.session.treinamento = "Formação NodeJS";
    req.session.ano = 2023;
    req.session.user = {
        username: "dl.pires",
        email: "dlpires@email.com",
        id: 20
    }
    res.send("Sessão gerada");
});

//SESSION TEST - READ
app.get("/leitura", (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        user: req.session.user
    });
});

app.get("/", (req,res) => {
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    });
});

//USE TO VERIFY THE SLUG AND SHOW IN THE HOMEPAGE
app.get("/:slug", (req, res) => {
    var slug = req.params.slug;

    Article.findOne({
       where:{
            slug: slug 
       }
    }).then(article => {
        if (article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }
        else{
            res.redirect("/");
        }
    }).catch(article => {
        res.redirect("/");
    })
});

app.get("/category/:slug", (req,res) => {
    var slug = req.params.slug;

    Category.findOne({
        where:{
            slug: slug
        },
        include:[{
            model: Article
        }]
    }).then(category => {
        if (category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        }
        else{
            res.redirect("/");
        }

    }).catch(article => {
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});