const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");


router.get("/scrapeNews/:num",(req,res)=>{
    axios.get("https://nytimes.com").then((response)=>{
        let $ = cheerio.load(response.data);
        let result = [];
        let count = 0;
        $("article").each((i,element)=>{
            let headline = $(element).find("h2").text().trim();
            let url = $(element).find($("a")).attr("href");
            let summary = $(element).find($("p")).text().trim();
            if(!summary) summary = $(element).find($("ul")).text().trim();

            if(headline){
                if(!url){
                    url = "https://nytimes.com";
                }else{
                    url ="https://nytimes.com"+url;
                }

                if(!summary) {
                    summary = "No summary, please check the original news source"
                }
                let temp = {
                    headline:headline,
                    url:url,
                    summary:summary
                }
                result.push(temp);                
                count++;
                return count<req.params.num;
            }
        });
        res.send(result);
    });
});


module.exports = router;