require.config({
    paths: {

    }
});
require([
    './engine',
    './maps/defaultMap.js'
], function (Engine, defaultMap) {
    'use strict';

    Engine.start(defaultMap, 0, 0);
});

