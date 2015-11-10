/**
 * Created by varandan on 06/11/2015.
 */

    var mongoose = require('mongoose');
    var Scores = mongoose.model('Scores');


    exports.scores =function(req, res) {
        Scores.find(function (err, scores) {
            if (!err) {
                res.send(scores);
            } else {
                console.log('Error' + err);
            }
        });
    };
