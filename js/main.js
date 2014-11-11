require.config({

    baseUrl: 'js/libs',

    paths: {
        geobricks_navigation_manager: '../geobricks_navigation_manager/geobricks_navigation_manager',
        geobricks_home: '../geobricks_home/geobricks_home',
        geobricks_download: '../geobricks_download/geobricks_download',
        geobricks_browse: '../geobricks_browse/geobricks_browse',
        geobricks_export: '../geobricks_export/geobricks_export',
        geobricks_scheduler: '../geobricks_scheduler/geobricks_scheduler',
        geobricks_configuration: '../geobricks_configuration/geobricks_configuration'
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
            ''                          :   'home',
            '(/)home(/)'                :   'home',
            '(/)home(/):lang'           :   'home',
            '(/)download(/)'            :   'download',
            '(/)download(/):lang'       :   'download',
            '(/)browse(/)'              :   'browse',
            '(/)browse(/):lang'         :   'browse',
            '(/)export(/)'              :   'export',
            '(/)export(/):lang'         :   'export',
            '(/)scheduler(/)'           :   'scheduler',
            '(/)scheduler(/):lang'      :   'scheduler',
            '(/)configuration(/)'       :   'configuration',
            '(/)configuration(/):lang'  :   'configuration'
        },

        /* Overwrite language settings. */
        init_language: function (lang) {
            lang = (lang != null) ? lang : 'en';
            require.config({'locale': lang});
            require(['geobricks_navigation_manager'], function(NAV_MGR) {
                NAV_MGR.init({
                    lang: lang,
                    placeholder_id: 'placeholder'
                });
            });
        },

        route_module: function(module_name) {
            app_router.on('route:' + module_name, function (lang) {
                this.init_language(lang);
                require(['geobricks_' + module_name], function (MODULE) {
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