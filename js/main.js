var root = '../modules/';

require.config({

    baseUrl: 'js/libs',

    paths: {

        GEOBRICKS_UI_HOME:                  root + 'geobricks_ui_home/geobricks_ui_home',
        geobricks_ui_home:                  root + 'geobricks_ui_home',

        GEOBRICKS_UI_BROWSE:                root + 'geobricks_ui_browse/geobricks_ui_browse',
        geobricks_ui_browse:                root + 'geobricks_ui_browse',

        GEOBRICKS_UI_EXPORT:                root + 'geobricks_ui_export/geobricks_ui_export',
        geobricks_ui_export:                root + 'geobricks_ui_export',

        GEOBRICKS_UI_DOWNLOAD:              root + 'geobricks_ui_download/geobricks_ui_download',
        geobricks_ui_download:              root + 'geobricks_ui_download',

        GEOBRICKS_UI_SCHEDULER:             root + 'geobricks_ui_scheduler/geobricks_ui_scheduler',
        geobricks_ui_scheduler:             root + 'geobricks_ui_scheduler',

        GEOBRICKS_UI_PROCESSING:            root + 'geobricks_ui_processing/geobricks_ui_processing',
        geobricks_ui_processing:            root + 'geobricks_ui_processing',

        GEOBRICKS_UI_CONFIGURATION:         root + 'geobricks_ui_configuration/geobricks_ui_configuration',
        geobricks_ui_configuration:         root + 'geobricks_ui_configuration',

        GEOBRICKS_UI_DOWNLOAD_MODIS:        root + 'geobricks_ui_download_modis/geobricks_ui_download_modis',
        geobricks_ui_download_modis:        root + 'geobricks_ui_download_modis',

        GEOBRICKS_UI_DOWNLOAD_TRMM:        root + 'geobricks_ui_download_trmm/geobricks_ui_download_trmm',
        geobricks_ui_download_trmm:        root + 'geobricks_ui_download_trmm',

        GEOBRICKS_UI_DOWNLOAD_PROGRESS:     root + 'geobricks_ui_download_progress/geobricks_ui_download_progress',
        geobricks_ui_download_progress:     root + 'geobricks_ui_download_progress',

        GEOBRICKS_UI_NAVIGATION_MANAGER:    root + 'geobricks_ui_navigation_manager/geobricks_ui_navigation_manager',
        geobricks_ui_navigation_manager:    root + 'geobricks_ui_navigation_manager'

    },

    shim: {
        bootstrap: ['jquery'],
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        chosen: ['jquery'],
        highcharts: ['jquery'],
        underscore: {
            exports: '_'
        }
    }

});

require(['jquery',
         'mustache',
         'backbone',
         'bootstrap',
         'domReady!'], function($, Mustache, Backbone) {

    /* Define the router. */
    var AppRouter = Backbone.Router.extend({

        /* Define the routes. */
        routes: {
            ''                                  :   'home',
            '(/):lang(/)home(/)'                :   'home',
            '(/):lang(/)download(/)'            :   'download',
            '(/):lang(/)download(/)modis(/)'    :   'download_modis',
            '(/):lang(/)browse(/)'              :   'browse',
            '(/):lang(/)export(/)'              :   'export',
            '(/):lang(/)scheduler(/)'           :   'scheduler',
            '(/):lang(/)configuration(/)'       :   'configuration'
        },

        /* Overwrite language settings. */
        init_language: function (lang) {

            /* Initiate language. */
            lang = (lang != null) ? lang : 'en';
            require.config({'locale': lang});

            /* Build navigation bar. */
            require(['GEOBRICKS_UI_NAVIGATION_MANAGER'], function(NAV_MGR) {
                NAV_MGR.init({
                    lang: lang,
                    placeholder_id: 'placeholder'
                });
            });

        },

        route_module: function(module_name) {
            app_router.on('route:' + module_name, function (lang) {
                this.init_language(lang);
                require(['GEOBRICKS_UI_' + module_name.toUpperCase()], function (MODULE) {
                    MODULE.init({
                        lang: lang,
                        placeholder_id: 'main_content'
                    });
                });
            });
        }

    });

    /* Initiate router. */
    var app_router = new AppRouter;

    /* Define modules. */
    var modules = [
        'home',
        'download',
        'browse',
        'export',
        'scheduler',
        'configuration'
    ];

    /* Route modules. */
    for (var module in modules)
        app_router.route_module(modules[module]);

    /* Initiate Download focused on MODIS. */
    app_router.on('route:download_modis', function (lang) {
        this.init_language(lang);
        require(['GEOBRICKS_UI_DOWNLOAD'], function (MODULE) {
            MODULE.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
            require(['GEOBRICKS_UI_DOWNLOAD_MODIS'], function (MODULE) {
                MODULE.init({
                    lang: lang,
                    placeholder_id: 'dynamic_filters'
                });
                $('#datasource_selector').val('MODIS').trigger('chosen:updated');
                $('#download_button').click(function() {
                    MODULE.download();
                });
            });
        });
    });

    /* Initiate Backbone history. */
    Backbone.history.start();

});