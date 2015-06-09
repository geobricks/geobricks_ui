define(['jquery', 'ROUTER', 'domReady!'], function($, ROUTER) {

    'use strict';

    function GEOBRICKS() {

    }

    GEOBRICKS.prototype.init = function() {

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init({});

    };

    return GEOBRICKS;

});