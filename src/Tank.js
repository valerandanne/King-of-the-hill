/*global define */

define(['./Bullet'], function (Bullet) {
    'use strict';

    /**
     * @param {number} xi
     * @param {number} yi
     * @param {number} targetX
     * @param {number} targetY
     * @constructor
     */
    function Tank(engine,xi, yi, xf, yf) {

        this._engine = engine;
        /**
         * @type {number}
         * @private
         */
        this._xi = xi;
        /** @private */
        this._yi = yi;
        /** @private */
        this._xf = xf;
        /** @private */
        this._yf = yf;
        /** @private */
        this._pixelX = this._xi * 20;
        /** @private */
        this._pixelY = this._yi * 20;
        /** @private */
        this._stepsX = 0;
        /** @private */
        this._stepsY = 0;
        /** @private */
        this._speed = 1 ;
        /** @private */
        this._bullets = [];
        //** @private */
        this._direction = 'left'; //others: up, down
        //** @private */


    }

    Object.defineProperty(Tank.prototype, 'xi', {
        get: function () {
            return this._xi;
        }
    });

    Object.defineProperty(Tank.prototype, 'yi', {
        get: function () {
            return this._yi;
        }
    });
    Object.defineProperty(Tank.prototype, 'pixelX', {
        get: function () {
            return this._pixelX;
        }
    });
    Object.defineProperty(Tank.prototype, 'pixelY', {
        get: function () {
            return this._pixelY;
        }
    });
    Object.defineProperty(Tank.prototype, 'ready', {
        get: function () {
            return this._readyToShoot;
        }
    });


    Tank.prototype.move = function () {
        var x0 = this._pixelX,
            y0 = this._pixelY,
            x1 = this._xf * 20,
            y1 = this._yf * 20,
            stepX,
            stepY,
            dx = Math.abs(x1 - x0),
            dy = Math.abs(y1 - y0),
            error = (dx > dy ? dx : -dy)/2;
        if (dx>0 && dy>0){

        if (x0 < x1) {
            stepX = 1 ;
        } else {
            stepX = -1 ;
            this._direction = 'left';
        }
        if(y0 < y1) {
            stepY = 1 ;
            this._direction = 'up';
        } else {
            stepY = -1 ;
            this._direction = 'down';
        }
        var e2 = error;
        if(e2 > -dx) {
            error -= dy;
            x0 += stepX ;
            this._stepsX ++;
        }
        if(e2 < dy ) {
            error += dx;
            y0 += stepY ;
            this._stepsY ++;
        }
        }else {
            //TODO Llamar this._engine.determinetarget
        }
        this._pixelX = x0 ;
        this._pixelY = y0 ;
        if(this._stepsX === 20){
            this._xi +=  stepX;
            this._stepsX = 0;
        }
        if(this._stepsY === 20){
            this._yi += stepY ;
            this._stepsY = 0 ;
        }

    };
    /**
     * @private
     */
    Tank.prototype._calculateSpeed = function () {
        var rnd = Math.random();

        if (rnd < 0.5) {

        } else {
            this._speed = 2;
        }
    };

    /**
     * @private
     */
    function _initialPosition () {
        var rnd = Math.round((Math.random()* 100)),
            xi = 46,
            yi,
            xf = 8,
            yf;

        switch (true) {
            case rnd <= 20:
                yi = 0;
                yf = 15;
                break;
            case rnd <= 40:
                yi = 5;
                yf = 16 ;
                break;
            case rnd <= 50:
                yi = 10;
                yf = 17 ;
                break;
            case rnd <= 60:
                yi = 15;
                yf = 18 ;
                break;
            case rnd <= 80:
                yi = 20;
                yf = 19 ;
                break;
            case rnd <= 100:
                yi = 25;
                yf = 20 ;
                break;
        }

        return {
            xi: xi,
            yi: yi,
            xf: xf,
            yf: yf
        };
    }
//TODO
//    Tank.prototype.shoot = function(targetX, targetY) {
//        if(this.bullets > 0 ) {
//            this.bullets.length --;
//        }
//    };

    Tank.prototype._charge =function() {
        var bullet = [],
            i = 0;
        bullet.length = 9 ;
        while(i < bullet.length)
        {
            bullet.push(new Bullet(this._xi,this._yi));
            i++;
        }
        return bullet;
    };

    Tank.create = function (engine) {
        var config = _initialPosition(),
            tank = new Tank(engine,config.xi, config.yi, config.xf, config.yf);

        tank._calculateSpeed();

        return tank;
    };

    return Tank;
});

