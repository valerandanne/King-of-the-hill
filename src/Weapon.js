define([], function() {

    function Weapon(posX,posY) {
        // **@private */
        this._posX = posX;
        // **@private */
        this._posY = posY;
        // **@private */
        this._pixelX = posX * 20;
        // **@private */
        this._pixelY = posY * 20;
        // **@private */
        this._life = 1;
        // **@private */
        this._isActive = false;
        // **@private */
        this._bullets = [];
    }

    Object.defineProperty(Weapon.prototype, 'posX' , {
        get: function () {
            return this._posX;
        }
    });

    Object.defineProperty(Weapon.prototype, 'posY' , {
        get: function () {
            return this._posY;
        }
    });

    return Weapon;
});
