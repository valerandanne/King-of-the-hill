define(['./Weapon.js'], function(Weapon) {
    'use strict';

    function Castle () {
        // **@private */
        this._weapons =[];
        this._weapons[0] = new Weapon(2,15);
        this._weapons[1] = new Weapon(6,15);
        this._weapons[2] = new Weapon(2,19);
        this._weapons[3] = new Weapon(6,19);
    }

    Object.defineProperty(Castle.prototype, 'weapons', {
        get: function () {
            return this._weapons;
        }
    });

    Castle.prototype.activateWeapon = function (x,y) {
        var i,
            weaponId;
            for( i = 0; i < this._weapons.length ; i++) {
                if ((this._weapons[i]._posX === x) && (this._weapons[i]._posY === y)){
                    this._weapons[i]._isActive = true;
                    //this._weapons[i].charge();
                    weaponId = i;
                }
            }
        window.alert('weapon' + weaponId + ' activated');
      };
    Castle.prototype.shoot = function () {
        var i;

        for( i = 0; i < this._weapons.length ; i++) {
            if((this._weapons[i]._isActive === true) && (this._weapons[i]._bullets.length > 0)) {
                this.weapons[i]._bullets[0].shoot();
                
        }
        }

    };
    return Castle;
});
