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
        this._targetX = targetX;
        //** @private */
        this._targetY = targetY;

    };

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
});
