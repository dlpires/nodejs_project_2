const express = require("express");
const router = express.Router();

//USA ROTA DO EXPRESS DIRETO (SEM PRECISAR COLOCAR NO IDEX)
router.get("/categories", (req,res) =>{
    res.send("ROTAS DE CATEGORIAS");
});

router.get("/admin/categories/new", (req,res) => {
    res.send("ROTA PARA CRIAR UMA NOVA CATEGORIA!!");
});

module.exports = router;