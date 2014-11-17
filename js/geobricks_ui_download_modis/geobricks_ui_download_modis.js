define(['jquery',
        'mustache',
        'text!../geobricks_ui_download_modis/html/templates.html',
        'i18n!../geobricks_ui_download_modis/nls/translate',
        'bootstrap'], function ($, Mustache, templates, translate) {

    'use strict';

    function UI_MODIS() {

        this.CONFIG = {
            lang: 'en',
            placeholder_id: 'placeholder',
            url_countries: 'http://localhost:5555/browse/modis/countries/'
        };

    }

    /**
     * This is the entry method to configure the module.
     *
     * @param config Custom configuration in JSON format to extend the default settings.
     */
    UI_MODIS.prototype.init = function(config) {

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

        /* Fix the language, if needed. */
        this.CONFIG.lang = this.CONFIG.lang != null ? this.CONFIG.lang : 'en';

        /* Render the main structure. */
        var template = $(templates).filter('#main_structure').html();
        var view = {
            countries: translate.countries,
            products: translate.products,
            year: translate.year,
            from_date: translate.from_date,
            to_date: translate.to_date,
            please_select: translate.please_select
        };
        var render = Mustache.render(template, view);
        $('#' + this.CONFIG.placeholder_id).html(render);

        /* Initiate Chosen drop-downs. */
        $('#countries_selector').chosen({disable_search_threshold: 10});
        $('#products_selector').chosen({disable_search_threshold: 10});
        $('#year_selector').chosen({disable_search_threshold: 10});
        $('#from_date_selector').chosen({disable_search_threshold: 10});
        $('#to_date_selector').chosen({disable_search_threshold: 10});

        /* Populate countries. */
        this.populate_countries();

    };

    UI_MODIS.prototype.populate_countries = function() {

        /* Fill data source list and initialize Chosen. */
        $.ajax({

            type: 'GET',
            url: this.CONFIG.url_countries,

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Sort countries by label. */
                var countries = json.sort(function(a, b) {
                    return a.gaul_label > b.gaul_label;
                });

                /* Fill the drop-down. */
                var s = '';
                s += '<option value=""></option>';
                for (var i = 0 ; i < countries.length ; i++) {
                    s += '<option ';
                    s += 'data-gaul="' + countries[i].gaul_code + '" ';
                    s += 'data-iso2="' + countries[i].iso2_code + '" ';
                    s += 'data-iso3="' + countries[i].iso3_code + '" ';
                    s += '>';
                    s += countries[i].gaul_label;
                    s += '</option>';
                }

                /* Trigger Chosen. */
                $('#countries_selector').html(s);
                $('#countries_selector').trigger('chosen:updated');

            }

        });

    };

    return new UI_MODIS();

});