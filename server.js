const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/settings.json');
const url = require('url');
const jsonValidation = require('./lib/jsonValidation');
var port = process.env.port || 8080;
const app = express();

app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.set('view engine', 'pug');


app.get('/', function(req,res) {
    res.render('index', {
        title: "Gopiandcode's Reddit Slideshow"
    });
});

app.get('/r/:subreddit/:specifier', function(req,res) {
    
    var vals = jsonValidation.parseParams(req.params);
    if(vals)
        res.redirect(url.format({
            pathname: '/slideshow',
            query: {
                "url": vals 
            }
        }));
    else
        res.redirect('/');
});

app.get('/r/:subreddit/', function(req, res){
    var vals = jsonValidation.parseParams(req.params);

    if(vals) {
        res.redirect(url.format({
            pathname: '/slideshow',
            query: {
                "url": vals 
            }
        }));
    }
    else
        res.redirect('/');

});


app.get('/multi', function(req,res) {
    res.render('multi', {
        title:  "Multi-Subreddit - Gopiandcode's Reddit Slideshow"
    });
});

app.post('/slideshow', function(req,res){
    console.log(req.body);
    console.log(JSON.stringify(req.body));
    var urls = jsonValidation.sanitize(req.body.urls);
    console.log(urls);

    if(!urls)
        urls = [];
    
    console.log(req.query);
    if(req.query.url)
        urls.push(req.query.url);

    if(urls.length === 0)
        res.redirect('/');
    else
        res.render('slideshow', {
            title: "Slideshow - Gopiandcode's Reddit Slideshow",
            urls: urls
        });
})

app.get('/slideshow', function(req, res) {

    var urls = [];
    
    if(req.query.url)
        urls.push(req.query.url);
    
    urls = jsonValidation.sanitize(urls);

    if(urls.length === 0)
        res.redirect('/');
    else
        res.render('slideshow', {
            title: "Slideshow - Gopiandcode's Reddit Slideshow",
            urls: urls
        });
});



if(config["build-mode"] === "DEBUG") {
    app.listen(3000);
    console.log("Running DEBUG Reddit Slideshow app at localhost on port 3000...");
} else {
    app.listen(port);
}