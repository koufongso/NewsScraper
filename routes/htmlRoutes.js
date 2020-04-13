const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
    res.render("index");
})

router.get("/saved", (req, res) => {
    db.News.find({})
        .then((dbNews) => {
            // console.log(dbNews);
            let copy = JSON.parse(JSON.stringify(dbNews));
            res.render("savedNews", { data: copy });
        })
        .catch(function (err) {
            console.log(err);
            res.redirect("/error");
        });
})

router.get("/error", (req, res) => {
    res.send("Error");
})


module.exports = router;

