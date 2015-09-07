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
    Castle.prototype.determineWeapon = function () {
        var rnd = Math.round(Math.random() * 100),
            weap ;
        switch(true){
            case rnd <= 25:
                weap = this._weapons[0];
                break;
            case rnd <= 50:
                weap = this._weapons[2];
                break;
            case rnd <= 75:
                weap = this._weapons[1];
                break;
            case rnd <= 100:
                weap = this._weapons[3];
                break;
         }
        weap._isActive = true;
        return weap;
    };
    Castle.prototype.shoot = function (x,y) {
        var i,
            weaponId;
        for( i = 0; i < this._weapons.length ; i++) {
            if(this._weapons[i]._isActive === true) {
                this._weapons[i].charge(x,y);
                weaponId = i;
            }
        }
        return  this._weapons[weaponId]._bullets[0];
    };
    return Castle;
});
