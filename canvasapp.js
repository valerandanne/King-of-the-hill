var main = document.getElementById('main') ;
window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
    mainMenu();
}


function show(element) {
    element.style.display = 'block' ;
}
function hide(element) {
    element.style.display = 'none' ;
}
function mainMenu() {
    show(main);
    
}
document.querySelectorAll('.play')[0].addEventListener('click', function() {
  hide(main);
  canvasApp();
    
});

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
        
        
        context.fillStyle = '#339933' ;
        context.fillRect(0, 0, 500, 300) ;
        context.fillStyle = '#CC9933' ;
        context.font = "30px Sans-Serif"  ;
        context.textBaseline = "top" ;
        context.fillText("King of the Hill", 160, 50 ) ;
        
    }
     drawScreen();
}