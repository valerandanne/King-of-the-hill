/**
 * Created by varandan on 09/11/2015.
 */

    var mongoose = require('mongoose');
    var Scores = mongoose.model('Scores');

    exports.postscores = function(req, res) {
        Scores.findById(req.params.id, function (err, scores) {
            if (!err) {
                res.send(scores);
            } else {
                console.log('Error al obtener los puntajes del jugador' + err);
          }
        });
    };
