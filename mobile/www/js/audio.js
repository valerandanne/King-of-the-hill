/*global Media:false */
define([],function () {
    'use strict';
    
    function playAudio(src) {
        
        var media = new Media(src, onSuccess, onError, null);
        
        media.play();
        
    }
    
    function onSuccess() {
        window.console.log("playAudio():Audio Success");
    }

        
    function onError(error, media) {
        window.console.log('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
    }
    
    return {
        playAudio:playAudio
    };
});