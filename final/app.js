//imports
const MongoClient = require('mongodb').MongoClient; //npm install mongodb@2.2.32
const url = "mongodb://localhost:27017/eco_data";
const express = require('express')
const session = require('express-session'); //npm install express-session
const res = require('express/lib/response')
const bodyParser = require('body-parser')
const newsRoute = require('./Webpages/routes/newsAPI')
const app = express()

//For using sesssions. These are variables that only belong to one user of the site at a time.
app.use(session({ secret: 'example' }));

//static file  (public is the name of the folder)
app.use(express.static('External'))

app.use('/css', express.static(__dirname+'External/css'))
app.use('/js', express.static(__dirname+'External/js'))
app.use('/img', express.static(__dirname+'External/Pics'))

app.use('/News', newsRoute)
app.use(express.urlencoded({extended: true}));

app.set('views','./Webpages')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('EcoHome')
})

app.get('/News', (req, res) => {
    res.render('News')

})
app.get('/AboutUs', (req, res) => {
    res.render('AboutUs')

})
app.get('/Map', (req, res) => {
    res.render('Map')

})
app.get('/Login', (req, res) => {
    res.render('Login')

})
app.get('/Register', (req, res) => {
    res.render('Register')

})
app.get('/GreenVehicle', (req, res) => {
    res.render('GreenVehicle')

})


//variable to hold our Database
var db;

//Connection to the mongo db
// sets the variable db as our database
//Error handling message to Console
MongoClient.connect(url, function(err, database) {
  if (!err) {
    db = database;
  }
  else {
      console.log("Cannot connect to database - error"+err);
  }
  //Listen on prt 8080
  app.listen(8080);
  console.log('listening on 8080');
});


//the Validatelogin valodates the data from the login screen.
// username and password - validated with mongodb database
app.post('/Validatelogin', function(req, res) {
    console.log(JSON.stringify(req.body))
    var email = req.body.email;
    var password = req.body.pwd;
  
  
  
    db.collection('users').findOne({"login.email":email}, function(err, result) {
      if (err) throw err;
  
  
      if(!result){res.redirect('/Login');return}
  
  
  
      if(result.login.password == password){ req.session.loggedin = true; res.redirect('/') }
  
  
  
      else{res.redirect('/Login')}
    });
  });


  //Register new users and add to mongo database
  app.post('/adduser', function(req, res) {
    //check we are logged in
    if(!req.session.loggedin){res.redirect('/Login');return;}
  
    //we create the data string from the form components that have been passed in
  
  var datatostore = {
  "fname":req.body.fname,
  "lname":req.body.lname,
  "email":req.body.email,
  "password":req.body.password}
  
  
  //once created we just run the data string against the database and all our new data will be saved/
    db.collection('users').save(datatostore, function(err, result) {
      if (err) throw err;
      console.log('New user added to database')
      //when complete redirect to the index
      res.redirect('/')
    })
  });