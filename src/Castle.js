define(['./Weapon.js'], function(Weapon) {
    'use strict';

    function Castle (engine) {
        // **@private */
        this._weapons =[];
        this._weapons.push(new Weapon(2,15));
        this._weapons.push(new Weapon(6,15));
        this._weapons.push(new Weapon(2,19));
        this._weapons.push(new Weapon(6,19));

        this._engine = engine;
    }

    Object.defineProperty(Castle.prototype, 'weapons', {
        get: function () {
            return this._weapons;
        }
    });

    Castle.prototype.activateWeapon = function (x,y) {
        var i;
            for( i = 0; i < this._weapons.length ; i++) {
                if ((this._weapons[i]._posX === x) && (this._weapons[i]._posY === y)){
                    this._weapons[i]._isActive = true;
                }
            }

      };
    Castle.prototype.shoot = function (x,y) {
        var i,
            pos,
            weaponId;
        for( i = 0; i < this._weapons.length ; i++) {
            if(this._weapons[i]._isActive === true) {
                this._weapons[i].charge(x,y);
                weaponId = i;
                pos = this._weapons[i]._bullets[0]._posX;

            }
        }
        return  this._weapons[weaponId]._bullets[0];
    };
    return Castle;
});
