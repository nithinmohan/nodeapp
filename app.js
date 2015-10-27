// Load the http module to create an http server.
var http = require('http');
var express =require('express');
var app=express();
var bodyParser= require('body-parser');
var mongoose=require('mongoose');


//ip and ports
var ip = process.env.IP || 'localhost',
    port = process.env.PORT || 8080;

//Models
var Question     = require('./models/question');

//Routes
var QuestionsRouter=require('./routes/Question');
var HomeRouter=require('./routes/Home');

mongoose.connect(ip+':27017/test');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routing

app.use('/',HomeRouter);
app.use('/api/questions',QuestionsRouter);

app.listen(port);