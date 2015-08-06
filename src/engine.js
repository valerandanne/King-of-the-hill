/*global define */

define(['./Tank', './Map', './maps/defaultMap.js', './Castle'], function (Tank, Map, DefaultMap, Castle) {
    'use strict';
    var INTERVALTANKS = 4000,
        tanks = [],
        engine = {};
    engine.addTank = function () {
        var tank = Tank.create();
        tanks.push(tank);
    };
    engine.createTanks = function () {
        var intervalTanks = window.setInterval(function () {
            if (tanks.length < 15) {
                engine.addTank();
            } else {
                window.clearInterval(intervalTanks);
            }
        }, INTERVALTANKS);
    };
    engine.gameLoop = function () {
        var count = tanks.length,
            tank,
            i;
        engine.draw(DefaultMap);
        for (i = 0; i < count; i++) {
            tank = tanks[i];
            tank.move();
            Map.drawMovement(tank);
        }
    };
    engine.draw = function (mapData) {
        if (engine.tilesLoaded() === false) {
            setTimeout(function (map) {
                return function () {
                    engine.draw(map);
                };
            }(mapData), 60); //I wait 100 ms until images are loaded
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
        Castle.create();
        window.setInterval(engine.gameLoop, 100);
    };
    engine.tilesLoaded = function () {
        var i, totalImg = Map.tile.images.length;
        for (i = 0; i < totalImg; i++) {
            if (Map.tile.images[i][2] === false) {
                return false;
            }
            return true;
        }
    };

    return engine;
});
