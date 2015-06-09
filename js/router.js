define(['jquery', 'backbone', 'domReady!'], function($, Backbone) {

    'use strict';

    function ROUTER() {

        this.CONFIG = {
            lang: 'en'
        }

    }

    ROUTER.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang !== null ? this.CONFIG.lang : 'en';

        /* This... */
        var _this = this;

        /* Define the router. */
        var AppRouter = Backbone.Router.extend({

            /* Define the routes. */
            routes: {
                ''                                      :   'home',
                '(/):lang(/)home(/)'                    :   'home',
                '(/):lang(/)download(/)'                :   'download',
                '(/):lang(/)download(/):datasource(/)'  :   'download_datasource',
                '(/):lang(/)browse(/)'                  :   'browse',
                '(/):lang(/)export(/)'                  :   'export',
                '(/):lang(/)scheduler(/)'               :   'scheduler',
                '(/):lang(/)configuration(/)'           :   'configuration'
            },

            /* Overwrite language settings. */
            init_language: function (lang) {

                /* Initiate language. */
                lang = (lang !== null) ? lang : 'en';
                require.config({'locale': lang});
                var locale = localStorage.getItem('locale');
                localStorage.setItem('locale', lang);
                if (locale !== lang) {
                    localStorage.setItem('locale', lang);
                    location.reload();
                }

                /* Build navigation bar. */
                require(['GEOBRICKS_UI_NAVIGATION_MANAGER'], function(NAV_MGR) {
                    NAV_MGR.init({
                        lang: lang,
                        placeholder_id: 'placeholder'
                    });
                });

            },

            /* Generic routing function. */
            route_module: function(module_name) {

                app_router.on('route:' + module_name, function (lang) {

                    /* Setup language. */
                    this.init_language(lang);

                    /* Require module. */
                    require(['GEOBRICKS_UI_' + module_name.toUpperCase()], function (MODULE) {

                        /* Module's configurations. */
                        var config = {
                            lang: lang,
                            placeholder_id: 'main_content'
                        };

                        /* Propagate central configuration. */
                        config = $.extend(true, {}, config, _this.CONFIG[module_name]);

                        /* Initiate the module. */
                        var mod = new MODULE();
                        mod.init(config);

                    });

                });

            }

        });

        /* Initiate router. */
        var app_router = new AppRouter;

        /* Define modules. */
        var modules = [
            'home',
            'browse',
            'export',
            'scheduler',
            'configuration'
        ];

        /* Route modules. */
        for (var module in modules)
            app_router.route_module(modules[module]);

        /* Initiate Download. */
        app_router.on('route:download', function (lang) {

            /* Setup language. */
            this.init_language(lang);

            /* Require module. */
            require(['GEOBRICKS_UI_DOWNLOAD'], function (DWLD) {

                /* Download configurations. */
                var config = {
                    lang: lang,
                    placeholder_id: 'main_content'
                };

                /* Propagate central configuration. */
                config = $.extend(true, {}, config, _this.CONFIG['download']);

                /* Initiate the Download. */
                var dwld = new DWLD();
                dwld.init(config);

                /* Build datasource filters. */
                dwld.render_main_structure();

            });

        });

        /* Initiate Download focused on selected datasource. */
        app_router.on('route:download_datasource', function (lang, datasource) {

            /* Setup language. */
            this.init_language(lang);

            /* Require module. */
            require(['GEOBRICKS_UI_DOWNLOAD'], function (DWLD) {

                /* Download configurations. */
                var config = {
                    lang: lang,
                    placeholder_id: 'main_content'
                };

                /* Propagate central configuration. */
                config = $.extend(true, {}, config, _this.CONFIG['download']);

                /* Initiate the Download. */
                var dwld = new DWLD();
                dwld.init(config);

                /* Build datasource filters. */
                dwld.render_main_structure(datasource);

            });

        });

        /* Initiate Backbone history. */
        Backbone.history.start();

    };

    return ROUTER;

});