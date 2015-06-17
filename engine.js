
    

var engine = {} ;
    
    engine.outhnd = document.getElementById('output');
    engine.canvas = document.getElementById('canvas');
    engine.handle = engine.canvas.getContext('2d');
    
   
    
    engine.screen = {};
    engine.screen.width = engine.canvas.width;
    engine.screen.height = engine.canvas.height;
    
    engine.screen.tilesX = engine.canvas.width;
    engine.screen.tilesY = engine.canvas.height;
    
    engine.viewport = {}
    
    engine.viewport.x = 0;
    engine.viewport.y = 0;
    
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
                mapX= i + engine.viewport.x;
                mapY= j + engine.viewport.y;
                
                tile= mapData[mapY][mapX]; //aca obtiene la imagen que le pertenece al tile
                
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
        var tile = [id , new Image(), false] // formato: numeroId, imagen, cargada?
        
        tile[1].src = imgSrc;
        tile[1].onload = function()
        {
        tile[2]=true;
        }
        engine.tile.images[newid] = tile; //guardo la imagen
    };
        
    
    engine.tile.retrieve = function(id){
        
        var i , len = engine.tile.images.length;
        
        for(i=0; i< len ; i++)
        {
            if (engine.tile.images[i][0]== id)
            {
                return engine.tile.images[i][1]; //devuelve la imagen que pertenece a ese id
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
            }(mapData),100); //espero 100 ms
        }
        else{
            
        engine.map.draw(mapData);
        }
    };
    engine.start = function(mapData , x ,y ){
     
        
        engine.viewport.x= x ;
        engine.viewport.y= y ;
        
        engine.tile.store('t','imagenes/tanque1.png');
        engine.tile.store('v', 'imagenes/live.png');
        engine.tile.store('p','imagenes/pause.png');
        engine.tile.store('q', 'imagenes/boton.png');
        engine.tile.store('g', 'imagenes/green.png');
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
    