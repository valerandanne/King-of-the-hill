/*global define */

define(['./Tank', './Map', './maps/tabletMap.js', './Castle','./Bullet'], function (Tank, Map, DefaultMap, Castle, Bullet) {
    'use strict';
    var INTERVALTANKS = 4000,
        //lives = 4,
        tanks = [],
        bullets = [],
        castle = new Castle(),
        LIVES = 4,
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
        var intervalGameloop = window.setInterval(function () {
            if(LIVES > 0){
                var count = tanks.length,
                    tank,
                    i;
                engine.draw(DefaultMap);
                for (i = 0; i < count; i++) {
                    tank = tanks[i];
                    if(tank){
                        tank.move();
                        Map.drawMovement(tank);
                    }
                }
                if (bullets.length > 0){
                    var b,
                    countb = bullets.length,
                    bullet;
                    for(b = 0; b < countb; b++){
                        bullet = bullets[b];
                        if(bullet){
                            bullet.move();
                            Map.drawBullet(bullet);
                        }
                    }
                }
            } else {
                window.clearInterval(intervalGameloop);
                window.alert('GAME OVER');
            }
        }, 30);
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
        engine.gameLoop();
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
    engine.determineTarget = function () {
        var nearestWeapon,
            weapon,
            i;
        for (i = 0; i < castle._weapons.length; i++) {
            weapon = castle._weapons[i];
            if (weapon._life === 1){
                nearestWeapon = i;
                break;
            }
        }
        if(nearestWeapon !== undefined){
            return castle.weapons[nearestWeapon];
        }
        
    };
    engine.detectCollision = function(tileX,tileY){
        var i,
            tank,
            delta = 1.2,
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
            this.deleteBullet();
        }

    };
    engine.deleteBullet = function () {
        var i,
            bullet;
        for(i = 0; i < bullets.length ; i++){
            bullet = bullets[i];
            if(bullet._isActive === false){
                bullets.splice(i,1);
            }
        }
    };
    engine.deleteTank = function () {
        var i,
            tank;
        for (i = 0 ; i < tanks.length ; i++){
            tank = tanks[i];
            if(tank._life === 0){
                tanks.splice(i,1);
            }
        }
    };
    
    engine.killWeapon = function (weap) {
        var i,
            id,
            weapon;
        for (i = 0; i < castle._weapons.length; i++) {
            weapon = castle._weapons[i];
            if((weap === weapon) ){
                id = i;
                weapon._life = 0;
                LIVES --;
                navigator.notification.beep(1);
                window.console.log('killed' + id);
                this.deleteTank();
                break;
            }
            
        }
        
    };

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
