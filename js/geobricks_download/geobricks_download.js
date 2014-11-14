define(['jquery',
        'mustache',
        'text!../geobricks_download/html/templates.html',
        'i18n!../geobricks_download/nls/translate',
        'chosen',
        'bootstrap'], function ($, Mustache, templates, translate, chosen) {

    'use strict';

    function DOWNLOAD() {

        this.CONFIG = {
            lang            :   'en',
            placeholder_id  :   'placeholder',
            url_datasources :   'http://localhost:5555/discovery/datasource/'
        };

    }

    /**
     * This is the entry method to configure the module.
     *
     * @param config Custom configuration in JSON format to extend the default settings.
     */
    DOWNLOAD.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'en';

        /* Render the main structure. */
        var template = $(templates).filter('#main_structure').html();
        var view = {
            title: translate.title,
            subtitle: translate.subtitle,
            filters: translate.filters,
            progress: translate.progress,
            datasources: translate.datasources
        };
        var render = Mustache.render(template, view);
        $('#' + this.CONFIG.placeholder_id).html(render);

        /* Fill data source list and initialize Chosen. */
        $.ajax({

            type: 'GET',
            url: this.CONFIG.url_datasources,

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Fill the drop-down. */
                var s = '';
                for (var i = 0 ; i < json.length ; i++) {
                    s += '<option value="' + json[i].name + '">';
                    s += json[i].name + ' - ' + json[i].description;
                    s += '</option>';
                }

                /* Trigger Chosen. */
                $('#datasource_selector').html(s);
                $('#datasource_selector').chosen();

            }

        });

    };

    return new DOWNLOAD();

});