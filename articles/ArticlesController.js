const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

//USA ROTA DO EXPRESS DIRETO (SEM PRECISAR COLOCAR NO IDEX)
router.get("/admin/articles", (req,res) =>{
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    })
});

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories:categories});
    });
});

//ROUTE TO SAVE A ARTICLE
router.post("/articles/save", (req,res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        body: body,
        slug: slugify(title),
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    })
});

//ROUTE TO DELETE A ARTICLE
router.post("/articles/delete", (req,res) => {
    var id = req.body.id;
    
    if (id != undefined){
        if (!isNaN(id)){
            Article.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });
        }
        else{
            res.redirect("/admin/articles");
        }
    }
    else{
        res.redirect("/admin/articles");
    }
});

//ROUTE TO EDIT A ARTICLE
router.get("/admin/articles/edit/:id", (req,res) => {
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", {article:article,categories:categories});
            });
        }
        else {
            res.redirect("/admin/articles");
        }

    }).catch(e => {
        res.redirect("/admin/articles");
    });
});

//ROUTE TO SAVE ARTICLE EDITION
router.post("/articles/update", (req,res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.update({title: title,body: body,slug: slugify(title),categoryId: category},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    });
});


module.exports = router;