define(['jquery', 'backbone', 'domReady!'], function($, Backbone) {

    'use strict';

    function ROUTER() {

    }

    ROUTER.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang !== null ? this.CONFIG.lang : 'en';

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

    };

    return ROUTER;

});