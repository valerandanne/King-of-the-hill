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
    function Tank(xi, yi, targetX, targetY) {
        /**
         * @type {number}
         * @private
         */
        this._xi = xi;
        /** @private */
        this._yi = yi;
        /** @private */
        this._targetx = targetX;
        /** @private */
        this._targety = targetY;
        /** @private */
        this._pixelX = this._xi * 20;
        /** @private */
        this._pixelY = this._yi * 20;
        /** @private */
        this._stepsX = 0;
        /** @private */
        this._stepsY = 0;
        /** @private */
        this._speed ;
        /** @private */
        this._bullets = [];
        //** @private */
        this._direction = 'left'; //others: up, down
        //** @private */
        this._readyToShoot = 'false';

    };

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

    Tank.prototype.move = function () {
        var x0 = this._pixelX,
            y0 = this._pixelY,
            x1 = this._targetx * 20,
            y1 = this._targety * 20,
            stepX,
            stepY,
            dx = Math.abs(x1 - x0),
            dy = Math.abs(y1 - y0),
            error = (dx > dy ? dx : -dy)/2;
        if (dx>0 && dy>0){
            this._readyToShoot = 'false';
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
            x0 += (stepX * this._speed);
            this._stepsX ++;
        }
        if(e2 < dy ) {
            error += dx;
            y0 += (stepY * this._speed);
            this._stepsY ++;
        }
        }else {
            this._readyToShoot = 'true';
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
            this._speed = 2;
        } else {
            this._speed = 4;
        }
    };

    /**
     * @private
     */
    function _initialPosition () {
        var rnd = Math.round((Math.random()* 100)),
            xi = 46,
            yi,
            targetx = 8,
            targety;

        switch (true) {
            case rnd <= 20:
                yi = 0;
                targety = 15;
                break;
            case rnd <= 40:
                yi = 5;
                targety = 16 ;
                break;
            case rnd <= 50:
                yi = 10;
                targety = 17 ;
                break;
            case rnd <= 60:
                yi = 15;
                targety = 18 ;
                break;
            case rnd <= 80:
                yi = 20;
                targety = 19 ;
                break;
            case rnd <= 100:
                yi = 25;
                targety = 20 ;
                break;
        }

        return {
            xi: xi,
            yi: yi,
            targetx: targetx,
            targety: targety
        };
    }

    Tank.prototype.shoot = function(targetX, targetY) {
        if(this.bullets > 0 )
            this.bullets.length --;

    };

    function _charge () {
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

    Tank.create = function () {
        var config = _initialPosition(),
            tank = new Tank(config.xi, config.yi, config.targetx, config.targety);
        tank._bullets = _charge;
        tank._calculateSpeed();

        return tank;
    };

    return Tank;
});

