const express = require("express");
const router = express.Router();

//USA ROTA DO EXPRESS DIRETO (SEM PRECISAR COLOCAR NO IDEX)
router.get("/articles", (req,res) =>{
    res.send("ROTAS DE ARTIGOS");
});

router.get("/admin/article/new", (req,res) => {
    res.send("ROTA PARA CRIAR UM NOVO ARTIGO!!");
});

module.exports = router;