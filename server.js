const express = require('express');
const _ = require('lodash');
const mongodb = require('mongodb');
const hbs = require('hbs');
const bodyParser = require('body-parser');

var {mongoose} = require('./server/db/mongoose.js');
var {User} = require('./server/models/user.js');

const port = process.env.PORT || 5000;

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','hbs');


app.get('/',(req,res)=>{

  User.find().count(function(err, count){
    res.render('home.hbs',{
      Number_of_entries : count
    });
  });

    // res.render('home.hbs',{
    //   Number_of_entries : count
    // });

});

app.post('/',(req,res)=>{

    var newImpactUser = new User({
      name : req.body.name,
      email : req.body.email,
      message : req.body.message
    });

    newImpactUser.save().then((docs)=>{
      User.find().count(function(err, count){
        res.render('home.hbs',{
          Number_of_entries : count
        });
      });
      console.log(docs);
    },(err)=>{
      res.status(400).render('error.hbs');
    });

});


app.listen(port,()=>{
  console.log(`server is up on port ${port}`);
});
