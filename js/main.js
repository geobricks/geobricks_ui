require.config({

    baseUrl: 'js/libs',

    paths: {
        geobricks_ui_navigation_manager: '../geobricks_ui_navigation_manager/geobricks_ui_navigation_manager',
        geobricks_ui_home: '../geobricks_ui_home/geobricks_ui_home',
        geobricks_ui_download: '../geobricks_ui_download/geobricks_ui_download',
        geobricks_ui_download_modis: '../geobricks_ui_download_modis/geobricks_ui_download_modis',
        geobricks_ui_browse: '../geobricks_ui_browse/geobricks_ui_browse',
        geobricks_ui_export: '../geobricks_ui_export/geobricks_ui_export',
        geobricks_ui_scheduler: '../geobricks_ui_scheduler/geobricks_ui_scheduler',
        geobricks_ui_configuration: '../geobricks_ui_configuration/geobricks_ui_configuration'
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

        modules: [
            'home',
            'download',
            'browse',
            'export',
            'scheduler',
            'configuration'
        ],

        /* Define the routes. */
        routes: {
            ''                              :   'home',
            '(/):lang(/)home(/)'            :   'home',
            '(/):lang(/)download(/)'        :   'download',
            '(/):lang(/)browse(/)'          :   'browse',
            '(/):lang(/)export(/)'          :   'export',
            '(/):lang(/)scheduler(/)'       :   'scheduler',
            '(/):lang(/)configuration(/)'   :   'configuration'
        },

        /* Overwrite language settings. */
        init_language: function (lang) {

            /* Initiate language. */
            lang = (lang != null) ? lang : 'en';
            require.config({'locale': lang});

            /* Build navigation bar. */
            require(['geobricks_ui_navigation_manager'], function(NAV_MGR) {
                NAV_MGR.init({
                    lang: lang,
                    placeholder_id: 'placeholder'
                });
            });

        },

        route_module: function(module_name) {
            app_router.on('route:' + module_name, function (lang) {
                this.init_language(lang);
                require(['geobricks_ui_' + module_name], function (MODULE) {
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

    /* Initiate Backbone history. */
    Backbone.history.start();

});