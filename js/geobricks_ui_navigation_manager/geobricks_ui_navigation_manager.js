define(['jquery',
        'mustache',
        'text!../geobricks_ui_navigation_manager/html/templates.html',
        'i18n!../geobricks_ui_navigation_manager/nls/translate',
        'bootstrap'], function ($, Mustache, templates, translate) {

    'use strict';

    function NAV_MGR() {

        this.CONFIG = {
            lang: 'en',
            'placeholder_id': 'placeholder'
        };

    }

    /**
     * This is the entry method to configure the module.
     *
     * @param config Custom configuration in JSON format to extend the default settings.
     */
    NAV_MGR.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'en';

        /* Render the main structure. */
        var template = $(templates).filter('#main_structure').html();
        var view = {
            toggle_navigation: translate.toggle_navigation,
            home: translate.home,
            scheduler: translate.scheduler,
            scheduler_link: '#/' + this.CONFIG.lang + '/scheduler/',
            browse: translate.browse,
            browse_link: '#/' + this.CONFIG.lang + '/browse/',
            download: translate.download,
            download_link: '#/' + this.CONFIG.lang + '/download/',
            export: translate.export,
            export_link: '#/' + this.CONFIG.lang + '/export/',
            configuration: translate.configuration,
            configuration_link: '#/' + this.CONFIG.lang + '/configuration/',
            signin: translate.signin
        };
        var render = Mustache.render(template, view);
        $('#' + this.CONFIG.placeholder_id).html(render);

    };

    return new NAV_MGR();

});