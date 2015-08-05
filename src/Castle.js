define(['./Weapon.js'], function(Weapon) {

    function Castle () {
        // **@private */
        this._weapons =[];
    }

    Object.defineProperty(Castle.prototype, 'weapons', function () {
        get: function () {
            return this._weapons;
        }
    });
    function _createWeapons () {
        var weap = [];
        weap.length = 4;
        for( i = 0 ; i < weap.length; i++) {
            weap.push(new weapon());
        }



        };

    Castle.create = function () {
        castle = new Castle();

    }

});
