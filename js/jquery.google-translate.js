 /*
 * jquery.google-translate.js v2.0
 * Description: Add multiple Google translators to a webpage
 * Copyright: http://www.agentimage.com
 * License: Proprietary
 */

(function($) {
    
    'use-strict';
    
    // Google Translator functions
    var GoogleTranslator = {
        
        // Helps to add the google translate element easily
        appendGoogleTranslateEl: function () {
            var googleTranslateEl = $('<div id="google_translate_element" class="hidden"><script type="text/javascript">function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: "en"}, "google_translate_element");}</script><script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script></div>');
            
            // Checks if the google translate element/dom had been added already
            if ($('#google_translate_element select').length == 0) {
                // Append the google translate element/dom after the body tag
                $('body').prepend(googleTranslateEl);
            }
        },
        
        // Puts an interval on the google translate
        translateInterval: function (label, loaded) {
            
            var googInterval = setInterval( function() {
                $("#google_translate_element select").attr("title", label);
                if ( loaded ) {
                    clearInterval(googInterval);
                }
            }, 100);
        },
        
        // Adds a no translate on the given element
        noTranslate: function (el) {
            el.addClass('notranslate');
        },
        
        // Triggers the event of the elemenet to the given parameters
        triggerEvent: function(el, eventName) {
            var event;
            
            if(document.createEvent) {
                event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, true);
                el.dispatchEvent(event);
            } else {
                event = document.createEventObject();
                event.eventType = eventName;
                el.fireEvent('on' + event.eventType, event);
            }
        },
        
        // Changes the current google translate value with the selected language
        changeCurrentLanguage: function (lang) {
            
            $('#google_translate_element select').val(lang);
            
            GoogleTranslator.triggerEvent($("#google_translate_element").find("select").get(0), 'change');
        },
        
        // Translator Dropdown Event
        translatorDropdown: function () {
            $(document).on('click', '[data-ai-translator]', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                var _this = $(this);
                
                $('.ai-translator-dropdown-wrap .ai-translator-dropdown').not(_this.parent().find('.ai-translator-dropdown')).removeClass('active');
                _this.parent().find('.ai-translator-dropdown').toggleClass('active');
            });

            $(document).on('mouseup touchstart', function (e) {
                if (!$('.ai-translator-dropdown').is(e.target) && $('.ai-translator-dropdown').has(e.target).length === 0) {
                    $('.ai-translator-dropdown').removeClass('active');
                }
            });
            
            $(document).on('click', '.ai-translator-dropdown ul li', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                
                var $this = $(this),
                    lang = $this.data('ai-translator-lang');
                    
                $('.ai-translator-dropdown ul li').removeClass('active');
                $this.addClass('active');
                GoogleTranslator.changeCurrentLanguage(lang);
                
                if ($this.hasClass('change-text')) {
                    $this.parents('.ai-translator-dropdown-wrap').find('[data-ai-translator]').text($this.text());
                }
            });
        }
    }

    $.fn.googleTranslator = function(options) {
        
        var defaults = {
                button: false,
                drowdown: false,
                dropdownChangeText: false,
                dropdownFlag: false,
                label: 'Translate this page',
                langs: {
                    '': 'Select Language',
                    'en': 'English',
                    'af': 'Afrikaans',
                    'sq': 'Albanian',
                    'am': 'Amharic',
                    'ar': 'Arabic',
                    'hy': 'Armenian',
                    'az': 'Azerbaijani',
                    'eu': 'Basque',
                    'be': 'Belarusian',
                    'bn': 'Bengali',
                    'bs': 'Bosnian',
                    'bg': 'Bulgarian',
                    'ca': 'Catalan',
                    'ceb': 'Cebuano',
                    'ny': 'Chichewa',
                    'zh-CN': 'Chinese (Simplified)',
                    'zh-TW': 'Chinese (Traditional)',
                    'co': 'Corsican',
                    'hr': 'Croatian',
                    'cs': 'Czech',
                    'da': 'Danish',
                    'nl': 'Dutch',
                    'eo': 'Esperanto',
                    'et': 'Estonian',
                    'tl': 'Filipino',
                    'fi': 'Finnish',
                    'fr': 'French',
                    'fy': 'Frisian',
                    'gl': 'Galician',
                    'ka': 'Georgian',
                    'de': 'German',
                    'el': 'Greek',
                    'gu': 'Gujarati',
                    'ht': 'Haitian Creole',
                    'ha': 'Hausa',
                    'haw': 'Hawaiian',
                    'iw': 'Hebrew',
                    'hi': 'Hindi',
                    'hmn': 'Hmong',
                    'hu': 'Hungarian',
                    'is': 'Icelandic',
                    'ig': 'Igbo',
                    'id': 'Indonesian',
                    'ga': 'Irish',
                    'it': 'Italian',
                    'ja': 'Japanese',
                    'jw': 'Javanese',
                    'kn': 'Kannada',
                    'kk': 'Kazakh',
                    'km': 'Khmer',
                    'ko': 'Korean',
                    'ku': 'Kurdish (Kurmanji)',
                    'ky': 'Kyrgyz',
                    'lo': 'Lao',
                    'la': 'Latin',
                    'lv': 'Latvian',
                    'lt': 'Lithuanian',
                    'lb': 'Luxembourgish',
                    'mk': 'Macedonian',
                    'mg': 'Malagasy',
                    'ms': 'Malay',
                    'ml': 'Malayalam',
                    'mt': 'Maltese',
                    'mi': 'Maori',
                    'mr': 'Marathi',
                    'mn': 'Mongolian',
                    'my': 'Myanmar (Burmese)',
                    'ne': 'Nepali',
                    'no': 'Norwegian',
                    'ps': 'Pashto',
                    'fa': 'Persian',
                    'pl': 'Polish',
                    'pt': 'Portuguese',
                    'pa': 'Punjabi',
                    'ro': 'Romanian',
                    'ru': 'Russian',
                    'sm': 'Samoan',
                    'gd': 'Scots Gaelic',
                    'sr': 'Serbian',
                    'st': 'Sesotho',
                    'sn': 'Shona',
                    'sd': 'Sindhi',
                    'si': 'Sinhala',
                    'sk': 'Slovak',
                    'sl': 'Slovenian',
                    'so': 'Somali',
                    'es': 'Spanish',
                    'su': 'Sundanese',
                    'sw': 'Swahili',
                    'sv': 'Swedish',
                    'tg': 'Tajik',
                    'ta': 'Tamil',
                    'te': 'Telugu',
                    'th': 'Thai',
                    'tr': 'Turkish',
                    'uk': 'Ukrainian',
                    'ur': 'Urdu',
                    'uz': 'Uzbek',
                    'vi': 'Vietnamese',
                    'cy': 'Welsh',
                    'xh': 'Xhosa',
                    'yi': 'Yiddish',
                    'yo': 'Yoruba',
                    'zu': 'Zulu'
                },
            },
            plugin = this;
            
        
        var settings = $.extend({}, defaults, options);
        
        if (settings.button) {
            return plugin.each(function () {
                var _this = $(this);

                // Adds a `notranslate` class to the element to prevent the translation
                GoogleTranslator.noTranslate(_this);

                // Binds a on `click` event to the initialize google translate dom/element to trigger the selected language
                $(_this).on('click', function (e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    
                    var lang = $(e.currentTarget).data('ai-translator-button-lang');
                    
                    GoogleTranslator.changeCurrentLanguage(lang);
                });
            });
        }
        
        if (settings.dropdown || settings.dropdownFlag) {
            
            return plugin.each(function () {
                var _this = $(this);
                
                if (_this.data('ai-translator') == undefined) {
                    _this.attr('data-ai-translator', '');
                }
                
                _this.wrap('<div class="ai-translator-dropdown-wrap"></div>');
                
                GoogleTranslator.noTranslate(_this.parent());
                
                var dropdownEl = $('<div class="ai-translator-dropdown" data-simplebar><ul></ul></div>');
                
                if (settings.dropdownFlag || (settings.dropdownFlag && settings.dropdown)) {
                    var changeText = '';
                    
                    if (settings.dropdownChangeText) {
                        changeText = 'change-text';
                    }
                    
                    var stylesheet_directory = '';
                    
                    $.each(settings.langs, function(i,v) {
                        if (i != '') {
                            var langEl = '<li data-ai-translator-lang="' + i + '" class="' + changeText + '">' + 
                                            '<div class="ai-translator-flag">' +
                                                '<span class="ai-flag-' + i + '"></span>' + 
                                            '</div>' + 
                                            '<div class="ai-translator-name">' + v + '</div>' + 
                                            '<div class="ai-translator-check glyphicon glyphicon-ok"></div>' +
                                         '</li>';

                            dropdownEl.find('ul').append($(langEl));
                        }
                    });
                }
                else if (settings.dropdown && !settings.dropdownFlag) {
                    $.each(settings.langs, function(i,v) {
                        if (i != '') {
                            var langEl = '<li data-ai-translator-lang="' + i + '">' +
                                            '<div class="ai-translator-name">' + v + '</div>' + 
                                            '<div class="ai-translator-check glyphicon glyphicon-ok"></div>' +
                                         '</li>';

                            dropdownEl.find('ul').append($(langEl));
                        }
                    });
                }
                
                var loaded = false;
                
                $(window).on('load', function () {
                    loaded = true;
                    setTimeout( function() {
                        var currentLanguage = $("#google_translate_element select").val();
                        dropdownEl.find('li[data-ai-translator-lang="' + currentLanguage + '"]').addClass('active');
                    }, 1000);
                });
                
                _this.parent().append(dropdownEl);
            });
        }
        
        if (!settings.button && !settings.drowdown) {
            
            return plugin.each(function () {
                
                var _this = $(this);
                
                var selectEL = $('<select class="ai-google-translate-select-element" data-translator-select></select>');

                GoogleTranslator.noTranslate(selectEL);

                selectEL.attr('title', settings.label);

                $.each(settings.langs, function(i,v) {
                    selectEL.append('<option value="' + i + '">' + v + '</option>');
                });
            
                var loaded = false;
                
                $(window).on('load', function () {
                    loaded = true;
                    setTimeout( function() {
                        var currentLanguage = $("#google_translate_element select").val();
                        selectEL.val(currentLanguage);
                    }, 1000);
                });
                
                GoogleTranslator.translateInterval(settings.label, loaded);
                
                _this.append(selectEL);
            
                _this.find('[data-translator-select]').on('change', function (e) {
                    var _this = $(this),
                        lang = _this.val();
                    
                    GoogleTranslator.changeCurrentLanguage(lang);
                });
            });
        }
    }
    
    $(document).ready(function () {
        
        // Appends Google Translate Element after the body tag
        GoogleTranslator.appendGoogleTranslateEl();
        
        // Initialize AI Google Translator plugin on single elements
        $('[data-ai-translator-button]').googleTranslator({
            button: true,
        });
        
        // Initialize AI Google Translator plugin on dropdown layout
        $('[data-ai-translator]').googleTranslator({
            dropdown: true,
        });
        
        // Initialize Translator Dropdown Event
        GoogleTranslator.translatorDropdown();
    });
    
})(jQuery);