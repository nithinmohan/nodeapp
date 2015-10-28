var express =require('express');
var router=express.Router();
var Question=require('.././models/question');
var jwt    = require('jsonwebtoken');

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });
  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});
router.route('/')

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


router.route('/:question_id')

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
module.exports=router;