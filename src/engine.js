/*global define */

define(['./Tank', './Map', './maps/defaultMap.js', './Castle'], function (Tank, Map, DefaultMap, Castle) {
    'use strict';
    var INTERVALTANKS = 4000,
        tanks = [],
        clicks = 0,
        castle = new Castle(),
        canvas = document.getElementById('canvas'),
        engine = {};

    engine.addTank = function () {
        var tank = Tank.create(engine);
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
        //        Castle.create(); TODO delete
        window.setInterval(engine.gameLoop, 10);
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
    engine.determineTarget = function (tank) {
        var aux,
            nearestWeapon,
            weapon,
            distance,
            i;
        for (i = 0; i < Castle._weapons.length; i++) {
            weapon = Castle._weapons[i];
            distance = Math.sqrt(Math.pow((weapon._posX - tank._xi), 2) + Math.pow((weapon.posY - tank._yi), 2));
            if (distance < aux || aux === undefined) {
                aux = distance;
                nearestWeapon = i;
            }
        }
        return Castle.weapons[i];
    };
    canvas.addEventListener('click', function (e) {
        var limits = canvas.getBoundingClientRect(),
            x = Math.floor((e.clientX - limits.left) / 20),
            y = Math.floor((e.clientY - limits.top) / 20);
        var mapa = DefaultMap;
        if ( clicks === 0 ) {
        if ( mapa[y][x] === '4') {
            castle.activateWeapon(x, y);
            clicks = 1;
        }
        }
        else {
            
            castle.shoot(x,y); // x,y will be the coordinates of the target tile
        }

    });



    return engine;
});
