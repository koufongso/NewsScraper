const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

router.get("/scrapeNews/:num", (req, res) => {
    axios.get("https://nytimes.com").then((response) => {
        let $ = cheerio.load(response.data);
        let result = [];
        let count = 0;
        $("article").each((i, element) => {
            let headline = $(element).find("h2").text().trim();
            let url = $(element).find($("a")).attr("href");
            let summary = $(element).find($("p")).text().trim();
            if (!summary) summary = $(element).find($("ul")).text().trim();

            if (headline) {
                if (!url) {
                    url = "https://nytimes.com";
                } else {
                    url = "https://nytimes.com" + url;
                }

                if (!summary) {
                    summary = "No summary, please check the original news source"
                }
                let temp = {
                    headline: headline,
                    url: url,
                    summary: summary
                }
                result.push(temp);
                count++;
                return count < req.params.num;
            }
        });
        res.send(result);
    });
});


router.post("/save", (req, res) => {
    // console.log(req.body);
    db.News.create(req.body)
        .then((dbNews) => {
            console.log(dbNews);
            res.send(dbNews)
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
            res.send(null);
        });
});


router.get("/getSaved", (req, res) => {
    db.News.find({})
        .then((dbNews) => {
            res.json(dbNews);
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
            res.send(null);
        });
});


router.delete("/unsave/:id", (req, res) => {
    db.News.deleteOne({ _id: req.params.id })
        .then((dbNews) => {
            // console.log(dbNews)
            res.json(dbNews);
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
            res.send(null);
        });
})

module.exports = router;