// packages
let express         = require("express"),
    app             = express(),
    port            = process.env.PORT || 3000,
    bodyParser      = require('body-parser'),
    request         = require("request"),
    requestPromise  = require("request-promise");

// dont need to use .ejs extension
app.set("view engine", "ejs");
// to retrive data from the body
app.use(bodyParser.urlencoded({extended: true}));
// tell express to serve the content of the public directory
app.use(express.static("public"));

// =========== Routes =============
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/search", (req, res) => {
    // retive data from the form search
    let searchData = req.query.name;
    let movieUrl = "http://www.omdbapi.com/?apikey=6b68e2ba&s="+searchData;
    // API calls
    request(movieUrl, (error, response, body) => {
        //eval(require('locus'))
        if(!error && response.statusCode == 200){
            let parsed_data = JSON.parse(body);
            res.render("result", {data: parsed_data});
        }
        else{
            res.redirect("/");
        }
    });
});

// where no routes are present or wrong routes
app.get("*", (req, res) => {
    res.send("Oopps !!! 404 not found");
});

app.listen(port, ()=> {
    console.log('Server Starting');
});
