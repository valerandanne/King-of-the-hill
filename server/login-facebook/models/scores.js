/**
 * Created by varandan on 06/11/2015.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var scoresSchema = new Schema ( {
    name : String ,
    score: Number
});

var Scores;
Scores = mongoose.model('Scores', scoresSchema);