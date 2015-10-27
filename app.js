// Load the http module to create an http server.
var http = require('http');
var express =require('express');
var app=express();
var bodyParser= require('body-parser');

var mongoose=require('mongoose');

var ip = process.env.IP || 'localhost',
    port = process.env.PORT || 8080;

var Question     = require('./models/question');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//ip and ports

mongoose.connect(ip+':27017/test');
//Router

var router=express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.route('/questions')

    .post(function(req, res) {
        
        var question = new Question();
        question.type = req.body.type;
        question.questionSchema = req.body.questionSchema;
        question.options_list = req.body.options_list;
        question.correct_option_index = req.body.correct_option_index;
        question.categories = req.body.categories;

        question.save(function(err) {
            if (err){
                res.send(err);
                return;
              }

            res.json({ message: 'Bear created!' });
        });       
    }).

    get(function(req, res) {
        Question.find(function(err, questions) {
            if (err){
                res.send(err);
                return;
              }

            res.json(questions);
        });
    });


router.route('/questions/:question_id')

    .get(function(req, res) {
        Question.findById(req.params.question_id, function(err, question) {
            if (err){
                res.send(err);
                return;
              }
            res.json(question);
        });
    })

    .put(function(req, res) {

        Question.findById(req.params.question_id, function(err, question) {

            if (err){
                res.send(err);
                return;
              }

            question.type = req.body.type||question.type;
            question.questionSchema = req.body.questionSchema||question.questionSchema;
            question.options_list = req.body.options_list||question.options_list;
            question.correct_option = req.body.correct_option||question.correct_option;
            question.categories = req.body.categories||question.categories;

            question.save(function(err) {
                if (err){
                    res.send(err);
                    return;
                  }

                res.json({ message: 'question updated!' });
            });

        });
    })

    .delete(function(req, res) {
        Question.remove({
            _id: req.params.question_id
        }, function(err, question) {
            if (err){
                res.send(err);
                return;
              }

            res.json({ message: 'Successfully deleted' });
        });
    });



router.get('/',function(req,res){
  res.json({msg:'Reached home page'});
})

app.use('/',router);


app.listen(port);