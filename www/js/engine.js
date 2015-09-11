/*global define */

define(['./Tank', './Map', './maps/tabletMap.js', './Castle','./Bullet'], function (Tank, Map, DefaultMap, Castle, Bullet) {
    'use strict';
    
    function Engine(){
        this._tanks = [],
        this._bullets = [],
        this._castle = new Castle();
       
    }
    Object.defineProperty(Engine.prototype, 'castle', {
            set: function (value) {
                this._castle = value;
            },
            get: function () {
                return this._castle;
            }
           
        });
    
    Engine.LIVES = 4;
    Engine.INTERVALTANKS = 4000;//frequency at which tanks are created
    Engine.canvas = document.getElementById('canvas');
 
    Engine.prototype.createTanks = function () {
        
        var intervalTanks = window.setInterval(function () {
            if ( this._tanks.length < 10) {
                var tank = Tank.create(this);
                this._tanks.push(tank);
            } else {
                window.clearInterval(intervalTanks);
            }
        }.bind(this), this.INTERVALTANKS);
    };
    Engine.prototype.gameLoop = function () {
        var intervalGameloop = window.setInterval(function () {
            if(this.LIVES > 0){
                var count = this._tanks.length,
                    tank,
                    i;
                window.console.log(count);
                this.draw(DefaultMap);
                for (i = 0; i < count; i++) {
                    tank = this._tanks[i];
                    if(tank){
                        tank.move();
                        Map.drawMovement(tank);
                    }
                }
                if (this._bullets.length > 0){
                    var b,
                    countb = this._bullets.length,
                    bullet;
                    for(b = 0; b < countb; b++){
                        bullet = this._bullets[b];
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
        }.bind(this), 30);
    };
    Engine.prototype.draw = function (mapData) {
        if (_tilesLoaded() === false) {
           
            setTimeout(function () {
                this.draw(mapData);
            }.bind(this), 60); //I wait 100 ms until images are loaded
        } else {
            Map.draw(mapData);
        }
    };
    Engine.prototype.start = function (mapData, x, y) {
        Map.view.x = x;
        Map.view.y = y;
        Map.tile.store('0', './imagenes/green.png');
        Map.tile.store('1', './imagenes/sand.png');
        Map.tile.store('2', './imagenes/rock.png');
        Map.tile.store('3', './imagenes/tree.png');
        Map.tile.store('4', './imagenes/cañon.png');
        this.draw(mapData);
        this.createTanks();
        this.gameLoop();
        
    };
    
    function _tilesLoaded() {
        var i, totalImg = Map.tile.images.length;
        for (i = 0; i < totalImg; i++) {
            if (Map.tile.images[i][2] === false) {
                return false;
            }
            return true;
        }
    }
    Engine.prototype.determineTarget = function() {
        var nearestWeapon,
            weapon,
            i;
        for (i = 0; i < this._castle._weapons.length; i++) {
            weapon = this._castle._weapons[i];
            if (weapon._life === 1){
                nearestWeapon = i;
                break;
            }
        }
        if(nearestWeapon !== undefined){
            return this._castle.weapons[nearestWeapon];
        }
        
    };
    Engine.prototype.detectCollision = function(tileX,tileY) {
        var i,
            tank,
            delta = 1.2,
            UpperBoundX,
            UpperBoundY,
            lowerBoundX,
            lowerBoundY,
            count = this._tanks.length;
        for(i = 0; i < count ; i++ ){
            tank = this._tanks[i];
            UpperBoundX = tank._xi + delta;
            UpperBoundY = tank._yi + delta;
            lowerBoundX = tank._xi - delta;
            lowerBoundY = tank._yi - delta;
            if((tileX < UpperBoundX && tileX > lowerBoundX) && (tileY < UpperBoundY && tileY > lowerBoundY)){
                this._tanks.splice(i,1);
                Map.drawExplosion(tileX,tileY);
               
            }
            this.deleteBullet();
        }

    };
    Engine.prototype.deleteBullet = function() {
        var i,
            bullet;
        for(i = 0; i < this._bullets.length ; i++){
            bullet = this._bullets[i];
            if(bullet._isActive === false){
                this._bullets.splice(i,1);
            }
        }
    };
    Engine.prototype.deleteTank = function() {
        var i,
            tank;
        for (i = 0 ; i < this._tanks.length ; i++){
            tank = this._tanks[i];
            if(tank._life === 0){
                this._tanks.splice(i,1);
            }
        }
    };
    
    Engine.prototype.killWeapon = function (weap) {
        var i,
            id,
            weapon;
        for (i = 0; i < this._castle._weapons.length; i++) {
            weapon = this._castle._weapons[i];
            if((weap === weapon) ){
                id = i;
                weapon._life = 0;
                this.LIVES --;
                navigator.notification.beep(1);
                window.console.log('killed' + id);
                this.deleteTank();
                break;
            }
            
        }
        
    };
    window.console.log(this);
    document.getElementById('canvas').addEventListener('click', function (e) {
       
        var limits = document.getElementById('canvas').getBoundingClientRect(),
            weaponUsed,
            x = Math.round((e.clientX - limits.left) / 20),
            y = Math.round((e.clientY - limits.top) / 20);

        weaponUsed = this._castle.determineWeapon();
        this._bullets.push(new Bullet(this,weaponUsed._posX,weaponUsed._posY, x, y));

    });

    return Engine;
});

