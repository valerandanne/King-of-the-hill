define([],function() {
    'use strict';
    
    /** global variables */
    
    var DbHighscores = window.localStorage.getItem("DbHighscores");
    DbHighscores =JSON.parse(DbHighscores); 
    
    if(DbHighscores === null){
        DbHighscores = [];
    }

    function save(player,score) {
        
        var scores = JSON.stringify({
            Player:player,
            Score:score
        });
        DbHighscores.push(scores);
        
        window.localStorage.setItem("DbHighscores", JSON.stringify(DbHighscores));
        
    }
    
    function read() {
        
        _emptyScoresList(); 
        
        for (var i in DbHighscores){
            var score = JSON.parse(DbHighscores[i]);
            window.console.log(score.Player);
            $("#Hscores").append('<li>'+ score.Player + ' ' + score.Score +'<li>');
        }
        
    }
    
    function _emptyScoresList () {
        
        $("#Hscores").empty();
        
    }
    return {
        save:save,
        read:read
    };
});