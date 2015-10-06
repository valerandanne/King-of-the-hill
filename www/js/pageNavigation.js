define(['./engine', './maps/defaultMap.js', './scoresDb'], 
    function (Engine, defaultMap, ScoresDb) {
    'use strict';
    var engine = null;
    
    function init() {
        $(document).on("click", "#btn-game", function () {
            
            $.afui.loadContent("#game");
            if(engine === null) {
                engine = new Engine();
            }
            else {
                engine.clear();
            }
            engine.start(defaultMap, 0, 0);  
           
        });
        $(document).on("swipe", "#scores", function() {
               
            $.afui.loadContent("#home");
        });
        $(document).on("click", "#btn-scores", onLoadScores);
     
        document.addEventListener("backbutton", onBackKeyDown,false);
        
    }
    function onLoadScores() {
        ScoresDb.read();
        $.afui.loadContent("#scores");
    
    }
    function onBackKeyDown() {
        
        $.afui.popup( {
            title : "Confirmation",
            message:"¿Are you sure you want to quit the game?",
            cancelText: "Cancel",
            cancelCallback: function(){window.console.log("cancelled");},
            doneText: "Yes",
            doneCallback: function() { 
                engine.externalStopGame();
                $.afui.loadContent("#home");
            },
            cancelOnly: false
            
            
        });
    }
    return {
        init: init
       
    };
});
    