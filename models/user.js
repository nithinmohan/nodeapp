var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var UserSchema= new Schema({
	name  :String,
	password: String,
	role:  {	type	:	String,	
				enum:["normal","admin"],
				default:"normal"
			} 
	
})
module.exports=mongoose.model('User',UserSchema);