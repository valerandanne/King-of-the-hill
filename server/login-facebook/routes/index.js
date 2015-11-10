// routes


exports.index = function(req, res){

  res.render('index', {
    title: 'Login',
    user: req.user
  });

};

