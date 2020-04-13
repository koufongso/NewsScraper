const router = require("express").Router();

router.get("/",(req,res)=>{
    res.render("index");
})

router.get("/saved",(req,res)=>{
    
    res.render("savedNews");
})


module.exports = router;

