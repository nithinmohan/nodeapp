var express = require('express');
var router=express.Router();
var User= require('.././models/user.js');
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/setup',function(req,res){
  res.json({msg:'Reached home page'});
	var inituser=new User();
	inituser.name='nithin';
	inituser.password='nithin';
	inituser.role='normal';
	inituser.save(function(err){
		if(err){
			res.send(err);
			return;
		}
		else
		res.json({message:'sample user created'});
	})
});
router.get('/',function(req,res){
  res.json({msg:'Reached home page'});
});


module.exports=router;