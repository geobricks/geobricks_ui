define(['jquery',
        'mustache',
        'text!../geobricks_ui_configuration/html/templates.html',
        'i18n!../geobricks_ui_configuration/nls/translate',
        'bootstrap'], function ($, Mustache, templates, translate) {

    'use strict';

    function CONFIGURATION() {

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
    CONFIGURATION.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'en';

        /* Render the main structure. */
        var template = $(templates).filter('#main_structure').html();
        var view = {
            title: translate.title,
            subtitle: translate.subtitle
        };
        var render = Mustache.render(template, view);
        $('#' + this.CONFIG.placeholder_id).html(render);

    };

    return new CONFIGURATION();

});