/*global define */

define([], function () {
    'use strict';
    var Tank={};

    Tank.newTank = function () {

        var speed,
            xi,
            yi,
            targetx,
            targety,
            posRand = Math.random(),
            speedRand = Math.random();
        if (speedRand < 0.5) {
            speed = 5;
        } else {
            speed = 10;
        }
        if (posRand < 0.2) {
            xi = 45 * 20;
            yi = 0;
            targetx = 147;
            targety = 300;
        } else {
            if (posRand < 0.4) {
                xi = 45 * 20;
                yi = 30 * 9;
                targetx = 147;
                targety = 300;

            } else {
                if (posRand < 0.5) {
                    xi = 45 * 20;
                    yi = 30 * 12;
                    targetx = 147;
                    targety = 300;
                } else {
                    if (posRand < 0.6) {
                        xi = 45 * 20;
                        yi = 30 * 15;
                        targetx = 147;
                        targety = 300;
                    } else {
                        if (posRand < 0.7) {
                            xi = 45 * 20;
                            yi = 30 * 17;
                            targetx = 147;
                            targety = 440;
                        } else {
                            if (posRand < 0.8) {
                                xi = 45 * 20;
                                yi = 30 * 19;
                                targetx = 147;
                                targety = 400;
                            } else {
                                if (posRand < 0.9) {
                                    xi = 45 * 20;
                                    yi = 30 * 2;
                                    targetx = 147;
                                    targety = 400;
                                } else {
                                    xi = 45 * 20;
                                    xi = 45 * 20;
                                    yi = 30 * 7;
                                    targetx = 147;
                                    targety = 400;
                                }
                            }

                        }
                    }
                }
            }
        }
        var tank = {
            "xi": xi,
            "yi": yi,
            "speed": speed,
            "targetx": targetx,
            "targety": targety,

        };
        return tank;
    };
    Tank.move = function (tank) {
        var x,
            y,
            dx = -1,
            dy;
            if (tank.xi > tank.targetx) {
                x = tank.xi + dx;
                y = tank.yi;
            } else {
                if (tank.yi > tank.targety) {
                    dy = -1;
                    y = tank.yi + dy;
                } else {
                    if (tank.yi < tank.targety) {
                        dy = 1;
                        y = tank.yi + dy;
                    } else {
                        y = tank.yi;
                    }
                }
                x = tank.xi;
            }
        tank.xi= x;
        tank.yi= y;

    };
    Tank.updatePosition= function(x,y){
        tank.xi= x;
        tank.yi= y;
    };


    return Tank;

});
//    function Tank(id) {
//        /** @private */
//        this._id = id;
//    }
//
//    Object.defineProperty(Tank.prototype, 'id', {
//        get: function () {
//            return this._id;
//        }
//    });
