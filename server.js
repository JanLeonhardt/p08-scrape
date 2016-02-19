var express = require('express');
var fs = require ('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){
    // All the web scraping will happen in here
    url = 'http://www.imdb.com/title/tt1229340/';
    request(url, function(error, response, html){
        // check to make sure no errors occured
        if(!error){
            var $ = cheerio.load(html);
            // what we want to capture
            var title;
            var json = {
                title : ""
            };
            $('.title_wrapper h1').filter(function(){
                // store data into variable
                var data = $(this);
                // get title
                title = data.children().first().text();
                // store in json
                json.title = title;
            });
            fs.writeFile('output.json', JSON.stringify(json,null,4),function(err){
                console.log('File successfully written! - check your project directory for the output')
            });
        }
    })
})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;