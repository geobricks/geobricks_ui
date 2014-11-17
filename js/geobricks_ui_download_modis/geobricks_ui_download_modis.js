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
            url_countries: 'http://localhost:5555/browse/modis/countries/',
            url_products: 'http://localhost:5555/browse/modis/'
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

        /* Cache JQuery selectors. */
        this.countries_selector = $('#countries_selector');
        this.products_selector = $('#products_selector');
        this.year_selector = $('#year_selector');
        this.from_date_selector = $('#from_date_selector');
        this.to_date_selector = $('#to_date_selector');

        /* Initiate Chosen drop-downs. */
        this.countries_selector.chosen({disable_search_threshold: 10});
        this.products_selector.chosen({disable_search_threshold: 10});
        this.year_selector.chosen({disable_search_threshold: 10});
        this.from_date_selector.chosen({disable_search_threshold: 10});
        this.to_date_selector.chosen({disable_search_threshold: 10});

        /* Populate countries. */
        this.populate_countries();

        /* Populate drop-downs. **/
        this.populate_products();

    };

    UI_MODIS.prototype.populate_countries = function() {

        /* This. */
        var _this = this;

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
                _this.countries_selector.html(s).trigger('chosen:updated');
                $('#countries_label').html(translate.countries);

            }

        });

    };

    UI_MODIS.prototype.populate_products = function() {

        /* This. */
        var _this = this;

        /* Fill data source list and initialize Chosen. */
        $.ajax({

            type: 'GET',
            url: this.CONFIG.url_products,

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Fill the drop-down. */
                var s = '';
                s += '<option value=""></option>';
                for (var i = 0 ; i < json.length ; i++) {
                    s += '<option ';
                    s += 'value="' + json[i].code + '">';
                    s += json[i].label;
                    s += '</option>';
                }

                /* Trigger Chosen. */
                _this.products_selector.html(s).trigger('chosen:updated').change(function() {
                    _this.populate_years();
                });
                $('#products_label').html(translate.products);

            }

        });
    };

    UI_MODIS.prototype.populate_years = function() {

        /* This. */
        var _this = this;

        /* Fetch selected product. */
        var product = this.products_selector.find('option:selected').val();

        /* Fill data source list and initialize Chosen. */
        $.ajax({

            type: 'GET',
            url: this.CONFIG.url_products + product + '/',

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Fill the drop-down. */
                var s = '';
                s += '<option value=""></option>';
                for (var i = 0 ; i < json.length ; i++) {
                    s += '<option ';
                    s += 'value="' + json[i].code + '">';
                    s += json[i].label;
                    s += '</option>';
                }

                /* Trigger Chosen. */
                _this.year_selector.html(s).trigger('chosen:updated').change(function() {
                    _this.populate_dates();
                });
                $('#year_label').html(translate.year);

            }

        });
    };

    UI_MODIS.prototype.populate_dates = function() {

        /* This. */
        var _this = this;

        /* Fetch selected product. */
        var product = this.products_selector.find('option:selected').val();
        var year = this.year_selector.find('option:selected').val();

        /* Fill data source list and initialize Chosen. */
        $.ajax({

            type: 'GET',
            url: this.CONFIG.url_products + product + '/' + year + '/',

            success: function (response) {

                /* Cast the response to JSON, if needed. */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);

                /* Fill the drop-down. */
                var s = '';
                s += '<option value=""></option>';
                for (var i = 0 ; i < json.length ; i++) {
                    s += '<option ';
                    s += 'value="' + json[i].code + '">';
                    s += json[i].label;
                    s += '</option>';
                }

                /* Trigger Chosen. */
                _this.from_date_selector.html(s).trigger('chosen:updated');
                _this.to_date_selector.html(s).trigger('chosen:updated');
                $('#from_date_label').html(translate.from_date);
                $('#to_date_label').html(translate.to_date);

            }

        });
    };

    return new UI_MODIS();

});