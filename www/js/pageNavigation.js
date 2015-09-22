define([
    './engine',
    './maps/defaultMap.js'
], function (Engine, defaultMap) {
    'use strict';

    function init() {
        $(document).on("click", "#btn-game", function () {
            $.afui.loadContent("#game");
            
            var engine = new Engine();
            engine.start(defaultMap, 0, 0);
        });
        
        $("#canvas").bind("swipeLeft", function () {
            $.afui.loadContent("#home");   
        });
        
        $(document).on("click", "#btn-scores", function () {
            $.afui.loadContent("#scores");
        });
    }

    return {
        init: init
    };
});
    