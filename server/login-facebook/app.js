
var express = require('express');
// Import of the user model and scores model

require('./models/user');
require('./models/scores');
var routes = require('./routes');
//var scoresRoutes = require('./routes/scores');
var path = require('path');

var mongoose = require('mongoose');
var passport = require('passport');

require('./passport')(passport);

// Connection to local database
mongoose.connect('mongodb://localhost:27017/passport-example', function(err, res) {
    if(err) throw err;
    console.log('Conectado con éxito a la BD');
});

// initialize the express app
var app = express();

// Configuration
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));

// Middlewares
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

// Static files routes
app.use(express.static(path.join(__dirname, 'public')));
// Sessions will store the user
app.use(express.session({ secret: 'lollllo' }));
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());


app.use(app.router);


// Handle errors locally
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

/* Application routes*/
// In http://localhost:port/ index.routes (method) will be executed
app.get('/', routes.index);
//app.get('/scores:id', routes.playerscores);
//app.post('/scores', routes.postscores);
//app.get('/scores',routes.scores);

/* Passport routes */
// Route for logging out

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Route for authenticating with facebook TODO
app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }), function (req, res){

});

// Callback route, where it will redirect after authenticating
app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/', failureRedirect: '/' },function(req,res){
        res.json(req.user);
    }
));

// initialize server
app.listen(app.get('port'), function(){
    console.log('Aplicación Express escuchando en el puerto ' + app.get('port'));
});

