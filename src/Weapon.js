define(['./Castle.js'], function(Castle) {

    function Weapon(posX,posY) {
        // **@private */
        this._posX;
        // **@private */
        this._posY;
        // **@private */
        this._life = 1;
        // **@private */
        this._bullets = [];
    }

    Object.defineProperty(Weapon.prototype, 'posX' , function () {
        get: function () {
            return this._posX;
        }
    });

    Object.defineProperty(Weapon.prototype, 'posY', function () {
        get: function () {
            return this._posY;
        }
    });
    function _position () {
        
    }
});
