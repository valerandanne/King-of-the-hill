
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id : String, // ID Facebook
	name: String,
	email:String,
    photo: String,
    token: String
});

var User = mongoose.model('User', UserSchema);
