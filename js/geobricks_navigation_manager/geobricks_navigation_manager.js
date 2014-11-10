define(['jquery',
        'mustache',
        'text!../geobricks_navigation_manager/html/templates.html',
        'i18n!../geobricks_navigation_manager/nls/translate',
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

        /* Render the main structure. */
        var template = $(templates).filter('#main_structure').html();
        var view = {
            toggle_navigation: translate.toggle_navigation,
            home: translate.home,
            scheduler: translate.scheduler,
            scheduler_link: '#/scheduler/' + this.CONFIG.lang,
            browse: translate.browse,
            browse_link: '#/browse/' + this.CONFIG.lang,
            download: translate.download,
            download_link: '#/download/' + this.CONFIG.lang,
            configuration: translate.configuration,
            configuration_link: '#/configuration/' + this.CONFIG.lang,
            signin: translate.signin
        };
        var render = Mustache.render(template, view);
        $('#' + this.CONFIG.placeholder_id).html(render);

    };

    return new NAV_MGR();

});