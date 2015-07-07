var INTERVALTANKS = 5000;
var intervalTanks;
var tanks = new Array() ; 
var engine = {} ;
    
    engine.canvas = document.getElementById('canvas');
    engine.handle = engine.canvas.getContext('2d');
    
   
    
    engine.screen = {};
    engine.screen.width = engine.canvas.width;
    engine.screen.height = engine.canvas.height;
    
    engine.screen.tilesX = engine.canvas.width / 20;
    engine.screen.tilesY = engine.canvas.height / 20;
    
    engine.view = {}
    
    engine.view.x = 0;
    engine.view.y = 0;
    
    engine.map = {};
    
    engine.map.draw = function (mapData){
        
        var i, j ;
        
        var mapX = 0 ;
        var mapY = 0 ; 
        var tile ;
        
        
        
        for (j=0; j< engine.screen.tilesY; j++)
        {
            for (i=0; i<engine.screen.tilesX; i++)
            {
                //ubicacion del mapa
                mapX= i + engine.view.x;
                mapY= j + engine.view.y;
                
                tile= mapData[mapY][mapX]; //we get the image number that should be displayed in the tile
                
                engine.tile.draw(i,j,tile);
             
                
            }
        }
        
    }
    
    engine.tile = {};
    
    engine.tile.draw = function (x,y,tile){
        
    var img = engine.tile.retrieve(tile);
    engine.handle.drawImage(img,x * 20, y * 20);
    
    }
   
    // I create the images array
    engine.tile.images = [];
    
    engine.tile.store = function(id, imgSrc)
    {
        var newid = engine.tile.images.length;
        var tile = [id , new Image(), false] // format: numId, image, loaded?
        
        tile[1].src = imgSrc;
        tile[1].onload = function()
        {
        tile[2]=true;
        }
        engine.tile.images[newid] = tile; //save the image
    };
        
    
    engine.tile.retrieve = function(id){
        
        var i , len = engine.tile.images.length;
        
        for(i=0; i< len ; i++)
        {
            if (engine.tile.images[i][0]== id)
            {
                return engine.tile.images[i][1]; //we retrieve the image that responses to that ID
            }
        }
    };
 engine.newTank= function(){
    
    var posRand= Math.random();
    var speedRand = Math.random();
    if(speedRand < 0.5)
    {
        speed= 5;
    }
    else{
        speed = 10;
    }
   if(posRand < 0.2)
   {
       xi= 45*20;
       yi= 0 ;
       targetx= 147;
       targety=300;
   }else{
       if(posRand < 0.4)
       {
           xi=45*20 ;
           yi=30*9;
           targetx= 147;
            targety=300;
           
       }
       else{
            if(posRand <0.5)
       {
           xi=45*20 ;
           yi=30*12;
           targetx= 147;
           targety=300;
       }else{
           if(posRand < 0.6)
           {
               xi = 45*20;
               yi=30*15;
               targetx= 147;
                targety=300;
           }
           else{
               if(posRand < 0.7)
               {
                   xi = 45*20;
                    yi=30*17; 
                   targetx= 147;
                    targety=440;
               }else{
                   if(posRand < 0.8)
                    {
                        xi = 45*20;
                        yi=30*19;
                        targetx= 147;
                        targety=400;
                    }else{
                   if(posRand < 0.9)
                   {
                   xi=45*20;
                   yi=30*2;
                    targetx= 147;
                    targety=400;
                   }
                    else{
                        xi=45*20;
                        xi=45*20;
                        yi=30*7;
                        targetx= 147;
                        targety=400;
                    }
                    }
               
                    } 
             }    
            }
        }
   }
    var tank = {
        "xi": xi,
        "yi": yi,
        "speed": speed,
        "targetx":targetx,
        "targety":targety,

        };
        
        return tank;
    }
    engine.addTank = function(){
    
        var img = new Image();
        img.src = 'imagenes/tanquee.png' ;
        var tank = engine.newTank();
        tanks.push(tank); 
        engine.handle.drawImage(img,tank.xi+10,tank.yi+10); 
        
    }
    engine.drawMovement = function() {
        var x;
        var y;
        var dx = -1 ;
        var dy ;
        var img = new Image();
        img.src = 'imagenes/tanquee.png' ;
        var grass= new Image();
        grass.src= 'imagenes/green.png';
        engine.addTank();
        engine.handle.save();
        for(var i=0 ; i< tanks.length; i++)
        {
        if(tanks[i].xi > tanks[i].targetx)
        {
           
            x= tanks[i].xi + dx ;
            y=tanks[i].yi;
        }else{
                if(tanks[i].yi > tanks[i].targety)
                {
                    dy= -1;
                    y =tanks[i].yi + dy ;
                }else {
                    if(tanks[i].yi < tanks[i].targety)
                    {
                        dy= 1;
                        y = tanks[i].yi + dy ;
                    }else{
                        y=tanks[i].yi;
                    }
                    
                    }
            x=tanks[i].xi;
          
        }
        engine.handle.drawImage(img,x,y);
        engine.handle.restore();
        tanks[i].xi= x;
        tanks[i].yi= y;
        }
        }
    engine.createTanks = function(){
         intervalTanks= window.setInterval(function(){
           if(tanks.length < 50)
           {
               engine.addTank();
           }else{
               window.clearInterval(intervalTanks);
           }
       }, INTERVALTANKS);
    }
    engine.gameLoop = function(){        
      
         engine.drawMovement();
        
    }
    
 

engine.draw = function(mapData)
    {
        if(engine.tile.allLoaded()== false)// images arent loaded yet
        {
            setTimeout(function(map)
                       {
                return function()
                {
                    
                    engine.draw(map);
                }
            }(mapData),100); //I wait 100 ms until images are loaded
        }
        else{
            
        engine.map.draw(mapData);
        
        }
    };
    engine.start = function(mapData , x ,y ){
     
        
        engine.view.x= x ;
        engine.view.y= y ;
    
        engine.tile.store('0', 'imagenes/green.png');
        engine.tile.store('1', 'imagenes/sand.png');
        engine.tile.store('2', 'imagenes/rock.png');
        engine.tile.store('3', 'imagenes/tree.png');
        engine.tile.store('4', 'imagenes/cañon.png');
        engine.tile.store('5', 'imagenes/tanquee.png');  
        
        engine.draw(mapData);
        // loop para crear tanques.
        engine.createTanks();        
        window.setInterval(engine.gameLoop,100);
    };
    engine.tile.allLoaded = function()
    {
        var i , totalImg = engine.tile.images.length;
        
        for ( i=0 ; i< totalImg ; i++)
        {
            if(engine.tile.images[i][2] == false)//loading atribute is false
            {
                return false;
            }
            
            return true;
        }
    };
window.addEventListener('load',function() { 
    engine.drawMovement();
} , false);
window.addEventListener('click',function(p) {
    var x= p.clientX;
    var y = p.clientY;
   alert("x:"+ x + "y:"+y);
});
    
