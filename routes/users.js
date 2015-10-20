var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/userlist', function(req, res, next) {
	var db=req.db;
	var collections=db.get('userlist');
	collections.find({},{},function(e,docs){
		res.json(docs);
	})
});

/* POST to adduser. */

router.post('/adduser', function(req, res, next) {
	var db=req.db;
	var collections=db.get('userlist');
	collections.insert(req.body,function(err,result){
		res.send(
			(err==null)?{msg:''}:{msg:err}
			);		
	})
});

module.exports = router;
