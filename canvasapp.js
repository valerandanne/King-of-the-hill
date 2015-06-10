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
        
        
        //Fondo de color verde//
        context.fillStyle = '#456E33' ;
        context.fillRect(0, 0, theCanvas.width, theCanvas.height) ;
        
        // Título del juego //
        context.fillStyle = '#FBE02D' ;
        context.font = "20px sans-serif weight: bold "  ;
        context.strokeStyle = '#000000';
        context.fillText("King of the Hill", 200, 15 ) ;
        
        
        context.fillStyle = '#000000' ;
        context.font = "12px sans-serif weight:bold"  ;
        // Informacion de la partida acutal //
        context.fillText("Lives", 10, 20);
        context.fillText("4", 20, 35);
        context.fillText("Score", 10, 50);
        context.fillText("100", 10, 65);
        context.fillText("Time", 10, 80);
        context.fillText("25", 15, 95);
        context.fillText("Level", 10, 110);
        context.fillText("1", 20, 125);
        //Castillo
        context.beginPath();
        context.fillStyle = '#ADAFAD' ;
        context.strokeStyle = '#ADAFAD' ;
        context.lineWidth = 2 ;
        context.arc(60, 125 , 20, 0, (Math.PI/180)*360);
       
        context.moveTo(60, 145);
        context.lineTo(60, 170);
        context.moveTo(60,190);
        context.arc(60,190,20, (Math.PI/180)*0, (Math.PI/180)*360, false);
        context.moveTo(80, 190);
        context.lineTo(125,190);
        context.moveTo(145,190);
        context.arc(145,190,20, 0, (Math.PI/180)*360, false);
        context.moveTo(145,170);
        context.lineTo(145,145);
        context.arc(145, 125 , 20, (Math.PI/180)*-270, (Math.PI/180)*360);
        context.moveTo(125,125);
        context.lineTo(80,125);
        context.stroke();
        context.fill();
        context.closePath();
        
        //cañoñes
        context.beginPath();
        context.fillStyle = '#3C3F3A' ;
        context.strokeStyle = '#3C3F3A' ;
        context.arc(60, 125 , 10, 0, (Math.PI/180)*360);
        context.lineTo(80,120);
        context.fill();
        context.stroke();
        context.save();
        context.closePath();
        
        context.beginPath();
        context.restore();
        context.moveTo(145,125);
        context.arc(145, 125 , 10, 0, (Math.PI/180)*360);
        context.lineTo(165,120);
        context.fill();
        context.stroke();
        
        context.beginPath();
        context.restore();
        context.moveTo(60,190);
        context.arc(60, 190 , 10, 0, (Math.PI/180)*360);
        context.lineTo(80,195);
        context.fill();
        context.stroke();
        
           
        context.beginPath();
        context.restore();
        context.moveTo(145,190);
        context.arc(145, 190 , 10, 0, (Math.PI/180)*360);
        context.lineTo(165,195);
        context.fill();
        context.stroke();
        
        //Rayo
        
        context.beginPath();
        context.fillStyle = '#9F46BC' ;
        context.strokeStyle = '#000000' ;
        context.moveTo(95,145);
        context.lineTo(115,140);
        context.stroke();
        
        
    }
     drawScreen();
}