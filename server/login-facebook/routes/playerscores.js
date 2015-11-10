/**
 * Created by varandan on 09/11/2015.
 */
var mongoose = require('mongoose');
var Scores = mongoose.model('Scores');
var user = mongoose.model('User');

exports.playerscores = function(req, res) {
    user.findById(req.params.id, function (err, user) {
        if (!err) {
            var score = new Scores({
                name: user.name,
                score: req.body.score
            });
            score.save(function (err) {
                if (!err) {
                    console.log('Puntaje guardado con éxito');
                } else {
                    console.log('Error al guardar el puntaje' + err);
                }
            });
            res.send(score);
        }
        else {
            console.log('No se encuentra usuario con este id' + err);
        }
    });
};
