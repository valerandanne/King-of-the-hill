window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport() {
        return Modernizr.canvas;
    }
function canvasApp() {
   
    if(!canvasSupport){
        return;
    }
    var theCanvas = document.getElementById('canvas');
    var context = theCanvas.getContext('2d');
   
    function drawScreen() {
        
        context.fillStyle = '#00FF99' ;
        context.fillRect(0, 0, 500, 300) ;
    }
     drawScreen();
}