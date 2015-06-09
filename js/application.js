define(['jquery',
        'ROUTER',
        'text!../../config/geobricks.json',
        'domReady!'], function($, ROUTER, geobricks_config) {

    'use strict';

    function GEOBRICKS() {

        this.CONFIG = {
            geobricks_config: null
        }

    }

    GEOBRICKS.prototype.init = function() {

        /* Cast configuration file. */
        this.geobricks_config = $.parseJSON(geobricks_config);

        /* Initiate the routing. */
        var router = new ROUTER();
        router.init(this.geobricks_config);

    };

    return GEOBRICKS;

});