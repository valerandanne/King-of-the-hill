define(['./Bullet'], function(Bullet) {

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
        this._bullets.length = 100;
    }

    Object.defineProperty(Weapon.prototype, 'posX' , {
        get: function () {
            return this._posX;
        }

    });

    Object.defineProperty(Weapon.prototype, 'posY' , {
        get: function () {
            return this._posY;
        },

    });
    Weapon.prototype.charge = function () {
        var i = 0;
        while(i < this._bullets.length)
        {
            this._bullets.push(new Bullet(this._posX,this._posY));
            i++;
        }

    };

    return Weapon;
});
