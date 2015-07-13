/*global define */

define([], function () {
    'use strict';

    /**
     * @constructor
     */
    function Tank(id) {
        /** @private */
        this._id = id;
    }

    Object.defineProperty(Tank.prototype, 'id', {
        get: function () {
            return this._id;
        }
    });

    return Tank;
});
