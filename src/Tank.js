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
        var x0 = this._xi,
            y0 = this._yi,
            x1 = this._targetx,
            y1 = this._targety,
            stepX,
            stepY,
            gridSize = 1,
            dx = Math.abs(x1 - x0),
            dy = Math.abs(y1 - y0),
            error = (dx > dy ? dx : -dy)/2;
        if (dx>0 && dy>0){
            this._readyToShoot = 'false';
        if (x0 < x1) {
            stepX = 1 * gridSize;
        } else {
            stepX = -1 * gridSize;
            this._direction = 'left';
        }
        if(y0 < y1) {
            stepY = 1 * gridSize;
            this._direction = 'up';
        } else {
            stepY = -1 * gridSize;
            this._direction = 'down';
        }
        var e2 = error;
        if(e2 > -dx) {
            error -= dy;
            x0 += stepX;
        }
        if(e2 < dy ) {
            error += dx;
            y0 += stepY;
        }
        }else {
            this._readyToShoot = 'true';
        }
        this._xi = x0 ;
        this._yi = y0 ;
    };
    /**
     * @private
     */
    Tank.prototype._calculateSpeed = function () {
        var rnd = Math.random();

        if (rnd < 0.5) {
            this._speed = 5;
        } else {
            this._speed = 10;
        }
    };

    /**
     * @private
     */
    function _initialPosition () {
        var rnd = Math.random(),
            xi,
            yi,
            targetx,
            targety;

        if (rnd < 0.2) {
            xi = 45 * 20;
            yi = 0;
            targetx = 147;
            targety = 280;
        } else if (rnd < 0.4) {
            xi = 45 * 20;
            yi = 30 * 9;
            targetx = 147;
            targety = 320;
        } else {
            if (rnd < 0.5) {
                xi = 45 * 20;
                yi = 30 * 12;
                targetx = 147;
                targety = 340;
            } else {
                if (rnd < 0.6) {
                    xi = 45 * 20;
                    yi = 30 * 15;
                    targetx = 147;
                    targety = 360;
                } else {
                    if (rnd < 0.7) {
                        xi = 45 * 20;
                        yi = 30 * 17;
                        targetx = 147;
                        targety = 380;
                    } else {
                        if (rnd < 0.8) {
                            xi = 45 * 20;
                            yi = 30 * 19;
                            targetx = 147;
                            targety = 400;
                        } else {
                            if (rnd < 0.9) {
                                xi = 45 * 20;
                                yi = 30 * 2;
                                targetx = 147;
                                targety = 300;
                            } else {
                                xi = 45 * 20;
                                yi = 30 * 7;
                                targetx = 147;
                                targety = 420;
                            }
                        }

                    }
                }
            }
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

