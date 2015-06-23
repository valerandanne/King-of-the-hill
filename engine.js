
    

var engine = {} ;
    
    engine.canvas = document.getElementById('canvas');
    engine.handle = engine.canvas.getContext('2d');
    
   
    
    engine.screen = {};
    engine.screen.width = engine.canvas.width;
    engine.screen.height = engine.canvas.height;
    
    engine.screen.tilesX = engine.canvas.width / 10;
    engine.screen.tilesY = engine.canvas.height / 10;
    
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
                
                tile= mapData[mapY][mapX]; //we get the image that should be displayed in the tile
                
                engine.tile.draw(i,j,tile);
            }
        }
    }
    
    engine.tile = {};
    
    engine.tile.draw = function (x,y,tile){
        
    var img = engine.tile.retrieve(tile);
    engine.handle.drawImage(img,x * 10, y * 10);
    
    }
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
    
    engine.draw = function(mapData)
    {
        if(engine.tile.allLoaded()== false)
        {
            setTimeout(function(md)
                       {
                return function()
                {
                    
                    engine.draw(md);
                }
            }(mapData),100); //I wait 100 ms until its loaded
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
        engine.tile.store('3', 'imagenes/tree.gif');
        engine.tile.store('t', 'imagenes/tanque1.gif');
        engine.tile.store('v', 'imagenes/live.png');
        engine.tile.store('p', 'imagenes/pause.png');
        engine.tile.store('q', 'imagenes/boton.png');
        
        engine.draw(mapData);
        
    
    };
    engine.tile.allLoaded = function()
    {
        var i , len = engine.tile.images.length;
        
        for ( i=0 ; i< len ; i++)
        {
            if(engine.tile.images[i][2] == false)
            {
                return false;
            }
            
            return true;
        }
    };
    