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
        }

    });

    require(['geobricks_navigation_manager'], function(NAV_MGR) {
        NAV_MGR.init({
            lang: 'lang',
            placeholder_id: 'placeholder'
        });
    });

    /* Initiate router. */
    var app_router = new AppRouter;

    /* Define routes endpoints: home. */
    app_router.on('route:home', function (lang) {
        this.init_language(lang);
        require(['geobricks_home'], function (HOME) {
            HOME.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Define routes endpoints: download. */
    app_router.on('route:download', function (lang) {
        this.init_language(lang);
        require(['geobricks_download'], function (DOWNLOAD) {
            DOWNLOAD.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Define routes endpoints: browse. */
    app_router.on('route:browse', function (lang) {
        this.init_language(lang);
        require(['geobricks_browse'], function (BROWSE) {
            BROWSE.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Define routes endpoints: export. */
    app_router.on('route:export', function (lang) {
        this.init_language(lang);
        require(['geobricks_export'], function (EXPORT) {
            EXPORT.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Define routes endpoints: scheduler. */
    app_router.on('route:scheduler', function (lang) {
        this.init_language(lang);
        require(['geobricks_scheduler'], function (SCHEDULER) {
            SCHEDULER.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Define routes endpoints: configuration. */
    app_router.on('route:configuration', function (lang) {
        this.init_language(lang);
        require(['geobricks_configuration'], function (CONFIGURATION) {
            CONFIGURATION.init({
                lang: lang,
                placeholder_id: 'main_content'
            });
        });
    });

    /* Initiate Backbone history. */
    Backbone.history.start();

});