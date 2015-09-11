define(['./Weapon'], function(Weapon) {
    'use strict';

    function Castle () {
        // **@private */
        this._weapons =[];
        this._weapons.push(new Weapon(2,15));
        this._weapons.push(new Weapon(6,15));
        this._weapons.push(new Weapon(2,19));
        this._weapons.push(new Weapon(6,19));

        
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
                if(this._weapons[0]._life === 1){
                    weap = this._weapons[0];
                }
                break;
            case rnd <= 50:
                if(this._weapons[2]._life === 1){
                    weap = this._weapons[2];
                }
                break;
            case rnd <= 75:
                if(this._weapons[1]._life === 1){
                    weap = this._weapons[1];
                }
                break;
            case rnd <= 100:
                if(this._weapons[3]._life === 1){
                    weap = this._weapons[3];
                }
            
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
