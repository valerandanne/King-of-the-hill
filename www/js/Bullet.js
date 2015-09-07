define([], function () {
    'use strict';
      /**
     * @param {number} xi
     * @param {number} yi
     * @param {number} targetX
     * @param {number} targetY
     * @constructor
     */
    function Bullet (engine,posX, posY,targetX, targetY) {
        /** @private */
        this._posX = posX;
        /** @private */
        this._posY = posY;
        /** @private */
        this._stepsX = 0;
        /** @private */
        this._stepsY = 0;
        /** @private */
        this._pixelX = this._posX * 20;
        /** @private */
        this._pixelY = this._posY * 20;
        /** @private */
        this._targetX = targetX ;
        /** @private */
        this._targetY = targetY ;
        /** @private */
        this._isActive = true;
        /** @private */
        this._engine = engine;
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
    Object.defineProperty(Bullet.prototype, 'isActive', {
        get: function () {
            return this._isActive;
        }
    });
    Object.defineProperty(Bullet.prototype, 'targetX' , {
        get: function () {
            return this._targetX;
        },
        set: function(value) {
            this._targetX = value;
        }
    });
    Object.defineProperty(Bullet.prototype, 'targetY' , {
        get: function () {
            return this._targetY;
        },
        set: function(value) {
            this._targetY = value;
        }
    });
    Bullet.prototype.move = function() {
        var x0 = this._posX,
            x1 = this._targetX,
            y0 = this._posY,
            y1 = this._targetY,
            distance,
            speed = 10,
            dx = (x1 - x0),
            dy = (y1 - y0);
        if(dx!==0){
            distance = Math.round(Math.sqrt(dx * dx + dy * dy));
            this._pixelX += Math.round((dx / distance) * speed);
            this._pixelY += Math.round((dy / distance) * speed);
            this._posX = Math.floor(this._pixelX / 20);
            this._posY = Math.floor(this._pixelY / 20);
        } else {
            this._engine.detectCollision(this._targetX,this._targetY);
            this._isActive = false;
        }

    };

    return Bullet;
});
