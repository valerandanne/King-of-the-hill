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
    function clearCanvas() {
        
        var theCanvas = document.getElementById('canvas');
        var context = theCanvas.getContext('2d');
        context.fillStyle = '#FFFFFF'
        context.fillRect(0,0,theCanvas.width, theCanvas.height);
        
    }
    function drawhighscores() {
        var theCanvas = document.getElementById('canvas');
        var context = theCanvas.getContext('2d');
        context.fillStyle = '#BDBDBD'
        context.strokeStyle = '#000000' ;
        context.strokeRect(0,0, theCanvas.width, theCanvas.height);
        context.fillRect(0,0, theCanvas.width, theCanvas.height);
        context.fillStyle = '#FFFFFF' ;
        context.fillRect(40,40, (theCanvas.width - 70), (theCanvas.height - 70));
        context.strokeRect(40,40, (theCanvas.width - 70), (theCanvas.height - 70));
        var jugador = new Image();
        jugador.src = "imagenes/player.png" ;
        context.drawImage(jugador,130,50);
        context.fillStyle = '#B4045F' ;
        context.font = "bold 20px sans-serif" ;
        context.fillText("High Scores", 230, 18);
        context.font = "bold 18px sans-serif" ;
        context.fillText("Player", 60, 70);
        context.fillText("Score", 480, 70);
        context.fillStyle = '#000000' ;
        context.fillText("Mano", 65, 100);
        context.fillText("400" , 485, 100);
        context.fillText("Albertina", 65, 130);
        context.fillText("315", 485, 130);
        var boton = new Image();
        boton.src = "imagenes/back.png" ;
        context.drawImage(boton, 60, 270);
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
            context.font = "bold 20px sans-serif"  ;
            context.strokeStyle = '#000000';
            context.fillText("King of the Hill", 220, 18 ) ;

            // Informacion de la partida actual //
      
            
            context.font = "bold 15px sans-serif"  ;
            context.fillStyle = '#ADAFAD' ;
            context.fillText("Lives", 10, 20);
            context.fillText("Score", 10, 50);
            context.fillText("Time", 10, 80);
            context.fillText("Level", 10, 110);
            var image = new Image();
            image.src = "imagenes/live.png";
            context.drawImage(image, 22, 25,10,10);
            context.drawImage(image, 10, 25,10,10);
            context.drawImage(image, 34, 25,10,10);
            context.drawImage(image, 46, 25,10,10);
            
            context.fillStyle = '#000000' ;
            context.fillText("100", 10, 65); //score
            context.fillText("25", 15, 95); //time
            context.fillText("1", 20, 125);//level
            //Castillo

            context.beginPath();
            context.fillStyle = '#ADAFAD' ;
            context.strokeStyle = '#ADAFAD' ;
            context.lineWidth = 2 ;
            context.arc(65, 125 , 20, 0, (Math.PI/180)*360);

            context.moveTo(65, 145);
            context.lineTo(65, 170);
            context.moveTo(65,190);
            context.arc(65,190,20, (Math.PI/180)*0, (Math.PI/180)*360, false);
            context.moveTo(80, 190);
            context.lineTo(130,190);
            context.moveTo(150,190);
            context.arc(150,190,20, 0, (Math.PI/180)*360, false);
            context.moveTo(150,170);
            context.lineTo(150,145);
            context.arc(150, 125 , 20, (Math.PI/180)*-270, (Math.PI/180)*360);
            context.moveTo(130,125);
             context.lineTo(85,125);
            context.stroke();
            context.fill();
            context.closePath();


            //cañoñes
            context.beginPath();
            context.fillStyle = '#3C3F3A' ;
            context.strokeStyle = '#3C3F3A' ;
            context.arc(65, 125 , 10, 0, (Math.PI/180)*360);
            context.lineTo(85,120);
            context.fill();
            context.stroke();
            context.save();
            context.closePath();

            context.beginPath();
            context.restore();
            context.moveTo(150,125);
            context.arc(150, 125 , 10, 0, (Math.PI/180)*360);
            context.lineTo(170,120);
            context.fill();
            context.stroke();

            context.beginPath();
            context.restore();
            context.moveTo(65,190);
            context.arc(65, 190 , 10, 0, (Math.PI/180)*360);
            context.lineTo(85,195);
            context.fill();
            context.stroke();


            context.beginPath();
            context.restore();
            context.moveTo(150,190);
            context.arc(150, 190 , 10, 0, (Math.PI/180)*360);
            context.lineTo(170,195);
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
      
            context.beginPath();
            context.fillStyle = '#000000' ;
            context.moveTo(10,220);
            context.arc(20, 230, 15, 0, (Math.PI/180)*360);
            context.fill();
            context.closePath();
            
            context.beginPath();
            context.strokeStyle = '#FFFFFF' ;
            context.moveTo(22,225);
            context.lineTo(22,235);
             context.moveTo(18,225);
            context.lineTo(18,235);
            context.stroke();
            context.closePath();
        }
         drawScreen();
    }
    
    
    mainMenu();
    document.getElementsByClassName('play')[0].addEventListener('click', function() {
      hide(main);
      canvasApp();

        
    });
    
    document.getElementsByClassName('highscores')[0].addEventListener('click', function() {
        hide(main);
        clearCanvas();
        drawhighscores();
        show(document.getElementById('canvas'));
        });
    document.getElementById('canvas').addEventListener('mouseover', function(e) {
        
        var x = e.clientX ;
        var y = e.clientY ;
      
        if(x > 389 && x < 467)
        {
            if(y > 300 && y < 330)
            {
            var image = new Image();
            image.src = "imagenes/boton2.png";
            context.drawImage(image, 10, 250);
            }
        }
    });
    document.getElementById('canvas').addEventListener('mouseout', function(e){
        
        var x = e.clientX ;
        var y = e.clientY ;
        
        if(x > 389 && x < 467)
        {
            if(y > 300 && y < 330)
            {
            var image1 = new Image();
            image1.src = "imagenes/boton.png";
            context.drawImage(image1, 10, 250);
            }
        }
    });
    document.getElementById('canvas').addEventListener('click', function(e) {
    
   
        var x = e.clientX ;
        var y = e.clientY ;
          
        if(x > 389 && x < 467)
        {
            if(y > 300 && y < 330)
            {
                var theCanvas= document.getElementById('canvas');
                var main = document.getElementById('main');
                alert("Are you sure you want to quit?");
                hide(theCanvas);
                show(main);
            }
            if(x > 382 && x < 412)
            {
                if( y > 265 && y < 292 )
                {
                    alert("Game paused, click ok to continue");
//                var theCanvas= document.getElementById('canvas');
//                var context = theCanvas.getContext();
//                    var boton = new Image();
//                    boton.src="imagenes/pausa.png";
//                    context.drawImage(boton,200,100);
                }
            }
        }
       
            
        
    });
}

window.addEventListener('load', eventWindowLoaded, false);


 
    

    