const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');
const { where } = require("sequelize");

//ROUTE TO LIST USERS ADDED IN DATABASE
router.get("/admin/users", adminAuth, (req,res) => {
    User.findAll().then(users => {
        res.render("admin/users/index", {users: users});
    });
});

router.get("/admin/users/create", adminAuth, (req,res) => {
    res.render("admin/users/create");
});

router.post("/users/create", adminAuth, (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email: email
        }
    }).then(user => {
        if(user == undefined){
            var pwd_crypt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, pwd_crypt);

            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users/");
            }).catch((err) => {
                res.redirect("/admin/users/");
            });
        }else{
            res.redirect("/admin/users/create");
        }
    });
});

router.get("/admin/users/reset/:id", adminAuth, (req,res) => {
    var id = req.params.id;
    res.render("admin/users/reset",{id: id});
});

//LOGIN ROUTE
router.get("/login", (req, res) => {
    res.render("admin/users/login");
});

//RESET PASSWORD ROUTE
router.post("/users/reset", adminAuth, (req,res) => {
    var password = req.body.password;
    var password2 = req.body.password2;
    var id = req.body.id;
    console.log(id);

    if (password == password2) {

        var pwd_crypt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, pwd_crypt);

        User.update({password: hash},{
            where: {
                id: id
            }
        }).then(() => {
            res.redirect("/admin/users");
        });
    } else {
        res.send("Erro: Senhas não coincidem!! <br><br><a href=\"javascript:history.back()\"> << Voltar</a>");
    }
});

//AUTHENTICATE ROUTE
router.post("/authenticate", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where:{
            email: email
        }
    }).then(user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/articles");
            }
            else{
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    })
});

//LOGOUT
router.get("/logout", adminAuth, (req,res) => {
    req.session.user = undefined;
    res.redirect("/");
});

module.exports = router;