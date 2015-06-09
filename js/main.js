var root = '../../submodules/';

require.config({

    baseUrl: 'js/libs',

    paths: {

        GEOBRICKS_UI_HOME:                  root + 'geobricks_ui_home/js/geobricks_ui_home',
        geobricks_ui_home:                  root + 'geobricks_ui_home',

        GEOBRICKS_UI_BROWSE:                root + 'geobricks_ui_browse/js/geobricks_ui_browse',
        geobricks_ui_browse:                root + 'geobricks_ui_browse',

        GEOBRICKS_UI_EXPORT:                root + 'geobricks_ui_export/js/geobricks_ui_export',
        geobricks_ui_export:                root + 'geobricks_ui_export',

        GEOBRICKS_UI_DOWNLOAD:              root + 'geobricks_ui_download/js/geobricks_ui_download',
        geobricks_ui_download:              root + 'geobricks_ui_download',

        GEOBRICKS_UI_SCHEDULER:             root + 'geobricks_ui_scheduler/js/geobricks_ui_scheduler',
        geobricks_ui_scheduler:             root + 'geobricks_ui_scheduler',

        GEOBRICKS_UI_PROCESSING:            root + 'geobricks_ui_processing/js/geobricks_ui_processing',
        geobricks_ui_processing:            root + 'geobricks_ui_processing',

        GEOBRICKS_UI_DOWNLOAD_MODIS:        root + 'geobricks_ui_download/submodules/geobricks_ui_download_modis/js/geobricks_ui_download_modis',
        geobricks_ui_download_modis:        root + 'geobricks_ui_download/submodules/geobricks_ui_download_modis',

        GEOBRICKS_UI_DOWNLOAD_TRMM:         root + 'geobricks_ui_download/submodules/geobricks_ui_download_trmm/js/geobricks_ui_download_trmm',
        geobricks_ui_download_trmm:         root + 'geobricks_ui_download/submodules/geobricks_ui_download_trmm',

        GEOBRICKS_UI_DOWNLOAD_PROGRESS:     root + 'geobricks_ui_download/submodules/geobricks_ui_download_progress/js/geobricks_ui_download_progress',
        geobricks_ui_download_progress:     root + 'geobricks_ui_download/submodules/geobricks_ui_download_progress',

        GEOBRICKS_UI_NAVIGATION_MANAGER:    root + 'geobricks_ui_navigation_manager/js/geobricks_ui_navigation_manager',
        geobricks_ui_navigation_manager:    root + 'geobricks_ui_navigation_manager',

        APPLICATION:                        root + '../js/application',
        ROUTER:                             root + '../js/router'

    },

    shim: {
        bootstrap: ['jquery'],
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        highcharts: ['jquery'],
        underscore: {
            exports: '_'
        }
    }

});

require(['APPLICATION'], function(APP) {

    /* Initiate components. */
    var app = new APP();

    /* Initiate the application. */
    app.init();

});