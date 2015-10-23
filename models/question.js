var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var QuestionSchema= new Schema({
	type  :{	type	:	String,	
				enum:["multiple"]
			}	, 
	questionSchema  :  String,
	options_list:[String],
	correct_option_index:{	type:	Number,
							validate: { validator: function(v) {
       												return v>0&&v<=this.options_list.length;
     												 },
     						 			message: '{v} is not a valid option'
    						}
						},
	categories:[String]
})

module.exports=mongoose.model('Question',QuestionSchema);