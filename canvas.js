function eventWindowLoaded() {
    var main = document.getElementById('main') ;

    function show(element) {
        element.style.display = 'block' ;
    }
    
    function hide(element) {
        element.style.display = 'none' ;
    }
    
    function mainMenu() {
        show(main);

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


            //Fondo de color verde//
            context.fillStyle = '#456E33' ;
            context.fillRect(0, 0, theCanvas.width, theCanvas.height) ;

            // Título del juego //
            context.fillStyle = '#FBE02D' ;
            context.font = "20px sans-serif weight: bold "  ;
            context.strokeStyle = '#000000';
            context.fillText("King of the Hill", 250, 15 ) ;

            // Informacion de la partida actual //
      
            context.fillStyle = '#000000' ;
            context.font = "12px sans-serif weight: bold"  ;
            context.fillText("Lives", 10, 20);
           
            var image = new Image();
            image.src = "imagenes/live.png";
            context.drawImage(image, 22, 25,10,10);
            context.drawImage(image, 10, 25,10,10);
            context.drawImage(image, 34, 25,10,10);
            context.drawImage(image, 46, 25,10,10);
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
    
            
            //Tanques
            var image = new Image();
            image.src = "imagenes/tanque.png";
            context.drawImage(image, 500, 100, 50, 50);
            context.drawImage(image, 450, 150, 50, 50);
            context.drawImage(image, 400, 132, 50 ,50);
            
            //Arboles
            
            // boton end
             var image = new Image();
            image.src = "imagenes/boton.png";
            context.drawImage(image, 10, 250);
            
            //boton pausa
            // var image = new Image();
            //image.src = "imagenes/pause.png";
            //context.drawImage(image, 10, 220);
            context.beginPath();
            context.fillStyle = '#000000' ;
            context.moveTo(10,220);
            context.arc(20, 230, 15, 0, (Math.PI/180)*360);
            context.fill();
            context.closePath();
            
            context.strokeStyle = '#FFFFFF' ;
            context.moveTo(25,230);
            context.lineTo(25,240);
            context.strokeRect();
        }
         drawScreen();
    }
    
    
    mainMenu();
    document.getElementsByClassName('play')[0].addEventListener('click', function() {
      hide(main);
      canvasApp();

    });
}

window.addEventListener('load', eventWindowLoaded, false);
document.getElementById('canvas').addEventListener('click', function(e) {
    
   
        var x = e.clientX ;
        var y = e.clientY ;
        
        alert('X='+ x + 'y=' + y);
    });
    
    
    

    