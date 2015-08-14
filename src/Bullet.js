define([], function () {
    'use strict';
      /**
     * @param {number} xi
     * @param {number} yi
     * @param {number} targetX
     * @param {number} targetY
     * @constructor
     */
    function Bullet (posX, posY) {
        /** @private */
        this._posX = posX;
        //** @private */
        this._posY = posY;
        //** @private */
        this._pixelX = this._posX * 20;
        //** @private */
        this._pixelY = this._posY * 20;
        //** @private */
        this._targetX = 2 ;
        //** @private */
        this._targetY = 15 ;

    }

    Object.defineProperty(Bullet.prototype, 'posX', {
        get: function () {
            return this._posX;
    }
    });

    Object.defineProperty(Bullet.prototype, 'posY', {
        get: function () {
            return this._posY;
    }
    });
    Object.defineProperty(Bullet.prototype, 'pixelX', {
        get: function () {
            return this._pixelX;
    }
    });

    Object.defineProperty(Bullet.prototype, 'pixelY', {
        get: function () {
            return this._pixelY;
    }
    });
    Bullet.prototype.shoot = function() {


    };
    return Bullet;
});
