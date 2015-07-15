define([], function () {
    'use strict';
    var map = {};

    map.canvas = document.getElementById('canvas');
    map.handle = map.canvas.getContext('2d');
    map.screen = {};
    map.screen.width = map.canvas.width;
    map.screen.height = map.canvas.height;
    map.screen.tilesX = map.canvas.width / 20;
    map.screen.tilesY = map.canvas.height / 20;
    map.view = {};
    map.view.x = 0;
    map.view.y = 0;

    map.tile = {};
    map.tile.images = [];


    map.tile.store = function (id, imgSrc) {
        var newid = map.tile.images.length,
            tile = [id, new Image(), false]; // format: numId, image, loaded?
        tile[1].src = imgSrc;
        tile[1].onload = function () {
        tile[2] = true;
        };
        map.tile.images[newid] = tile; //save the image
        };
     map.tile.retrieve = function (id) {
        var i, len = map.tile.images.length;
        for (i = 0; i < len; i++) {
            if (map.tile.images[i][0] == id) {
                return map.tile.images[i][1]; //we retrieve the image that responses to that ID
            }
        }
    };
    map.tile.draw = function (x, y, tile) {
        var img = map.tile.retrieve(tile);
        map.handle.drawImage(img, x * 20, y * 20);
    };

    map.draw = function (mapData) {
        var i,
            j,
            mapX = 0,
            mapY = 0,
            tile;

        for (j = 0; j < map.screen.tilesY; j++) {
            for (i = 0; i < map.screen.tilesX; i++) {
                mapX = i + map.view.x;
                mapY = j + map.view.y;
                tile = mapData[mapY][mapX]; //we get the image number that should be displayed in the tile
                map.tile.draw(i, j, tile);
            }
        }

    };
    map.drawTank = function(tank){
        var img = new Image();
        img.src = './imagenes/tanquee.png';
        map.handle.drawImage(img,tank.xi,tank.yi);
    }

return map;
});
