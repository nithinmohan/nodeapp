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
router.post('/authenticate', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // create a token
        var token = jwt.sign(user, 'superSecret', {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   
    }
  });
});
router.get('/',function(req,res){
  res.json({msg:'Reached home page'});
});


module.exports=router;