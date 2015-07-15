/*global define */

define(['./Tank','./Map'], function (Tank,Map) {
    'use strict';
    var INTERVALTANKS = 5000,
    tanks = [],
    engine = {};
    engine.addTank = function () {
        var tank = Tank.newTank();
        tanks.push(tank);
        };
    engine.createTanks = function () {
        var intervalTanks = window.setInterval(function () {
            if (tanks.length < 50) {
                engine.addTank();
            } else {
                window.clearInterval(intervalTanks);
            }
        }, INTERVALTANKS);
    };
    engine.gameLoop = function () {
        for (var i = 0; i < tanks.length; i++)
        {
        Tank.move(tanks[i]);
        Map.drawTank(tanks[i]);
        }
    };
    engine.draw = function (mapData) {
        if (engine.tilesLoaded() === false) // images arent loaded yet
        {
            setTimeout(function (map) {
                return function () {
                    engine.draw(map);
                };
            }(mapData), 100); //I wait 100 ms until images are loaded
        } else {
            Map.draw(mapData);
        }
    };
    engine.start = function (mapData, x, y) {
        Map.view.x = x;
        Map.view.y = y;
        Map.tile.store('0', './imagenes/green.png');
        Map.tile.store('1', './imagenes/sand.png');
        Map.tile.store('2', './imagenes/rock.png');
        Map.tile.store('3', './imagenes/tree.png');
        Map.tile.store('4', './imagenes/cañon.png');
        engine.draw(mapData);
        engine.createTanks();
        window.setInterval(engine.gameLoop, 100);
    };
    engine.tilesLoaded = function () {
        var i, totalImg = Map.tile.images.length;
        for (i = 0; i < totalImg; i++) {
            if (Map.tile.images[i][2] === false) //loading atribute is false
            {
                return false;
            }
            return true;
        }
    };
  return engine;
});
