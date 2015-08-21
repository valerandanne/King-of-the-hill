/*global define */

define(['./Tank', './Map', './maps/defaultMap.js', './Castle','./Bullet'], function (Tank, Map, DefaultMap, Castle, Bullet) {
    'use strict';
    var INTERVALTANKS = 4000,
        //lives = 4,
        tanks = [],
        bullets = [],
        castle = new Castle(),
        canvas = document.getElementById('canvas'),
        engine = {};

    engine.addTank = function () {
        var tank = Tank.create(engine);
        tanks.push(tank);
    };
    engine.createTanks = function () {
        var intervalTanks = window.setInterval(function () {
            if (tanks.length < 10) {
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
        if (bullets.length > 0){
            var b,
                countb = bullets.length,
                bullet;
            for(b = 0; b < countb; b++){
                bullet = bullets[b];
                bullet.move();
                Map.drawBullet(bullet);
            }
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
        window.setInterval(engine.gameLoop, 30);
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
        for (i = 0; i < castle._weapons.length; i++) {
            weapon = castle._weapons[i];
            distance = Math.sqrt(Math.pow((weapon._posX - tank._xi), 2) + Math.pow((weapon.posY -               tank._yi), 2));
            if ((distance < aux || aux === undefined) && (weapon._life === 1)) {
                aux = distance;
                nearestWeapon = i;
            }
        }
        return castle.weapons[nearestWeapon];
    };
    engine.detectCollision = function(tileX,tileY){
        var i,
            tank,
            delta = 1.5,
            UpperBoundX,
            UpperBoundY,
            lowerBoundX,
            lowerBoundY,
            count = tanks.length;
        for(i = 0; i < count ; i++ ){
            tank = tanks[i];
            UpperBoundX = tank._xi + delta;
            UpperBoundY = tank._yi + delta;
            lowerBoundX = tank._xi - delta;
            lowerBoundY = tank._yi - delta;
            if((tileX < UpperBoundX && tileX > lowerBoundX) && (tileY < UpperBoundY && tileY > lowerBoundY)){
                tanks.splice(i,1);
                Map.drawExplosion(tileX,tileY);
            }
        }

    };
    engine.deleteBullet = function (x,y) {
        var i,
            bullet;
        for(i = 0; i < bullets.length ; i++){
            bullet = bullets[i];
            if(bullet._targetX === x && bullet._targetY === y){
                bullets.splice(i,1);
            }
        }
    };
    //TODO
    /*engine.killWeapon = function (weap) {
        var i,
            id,
            weapon;
            for (i = 0; i < castle._weapons.length; i++) {
            weapon = castle._weapons[i];
                if((weap === weapon) && (weapon._life === 1)){
                    weapon._life = 0;
                    id = i;
                    lives --;
                    window.console.log('killed' + id);
                    if(lives === 0){
                        window.alert('YOU LOST');
                    }
                }
            }
    };*/

    canvas.addEventListener('click', function (e) {
        var limits = canvas.getBoundingClientRect(),
            weaponUsed,
            x = Math.round((e.clientX - limits.left) / 20),
            y = Math.round((e.clientY - limits.top) / 20);

            weaponUsed = castle.determineWeapon();
            bullets.push(new Bullet(engine,weaponUsed._posX,weaponUsed._posY, x, y));

    });

    return engine;
});
