var mongoose = require('mongoose');
var User = mongoose.model('User');


var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('./config');


module.exports = function(passport) {


	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});
// Configuration facebook strategy
	passport.use(new FacebookStrategy({
		clientID			: config.facebook.clientID,
		clientSecret	: config.facebook.clientSecret,
		callbackURL	 : config.facebook.callbackUrl,
		profileFields : ['id','displayName','photos','emails']
	}, function(token, refreshToken, profile, done) {
        process.nextTick(function() {
		User.findOne({id: profile.id}, function(err, user) {
			if(err)throw (err);
			if(user) {
                return done(null, user);
            } else {
                var newUser = new User();
                newUser.id = profile.id;
                newUser.name = profile.displayName;
                newUser.email = profile.emails[0].value;
                newUser.photo = profile.photos[0].value;
                newUser.token = token;
                newUser.save(function (err) {
                    if (err) throw err;
                    console.log(user);
                    done(null, newUser);
                });
            }
		});
    });
	}));

};
