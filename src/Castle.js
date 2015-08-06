define(['./Weapon.js'], function(Weapon) {

    function Castle () {
        // **@private */
        this._weapons =[];
    }

    Object.defineProperty(Castle.prototype, 'weapons', {
        get: function () {
            return this._weapons;
        }
    });
    function _createWeapons () {
        var weap = [];
        weap[0] = new Weapon(3,16);
        weap[1] = new Weapon(7,16);
        weap[2] = new Weapon(3,20);
        weap[3] = new Weapon(7,20);
       }
    Castle.create = function () {
        var castle = new Castle();
        castle._weapons = _createWeapons();
    }
    return Castle;
});
