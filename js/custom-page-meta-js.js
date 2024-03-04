(function ($) {
    $(document).ready(function () {
        var $j = jQuery.noConflict();
        var $document = $(document),
            $window = $(window),
            $viewport = $('html, body'),
            $html = $('html'),
            $body = $('body');

        function __construct() {
            advanced_settings_uploader();
            neighborhood_post_type();
            video_center_post_type();
        }

        /**
         * Upload images
         */
        function advanced_settings_uploader() {
            $('.hero-background-button').on('click', 'input[type=button]', function () {
                // Element var
                var this_parent = $(this).parents('.hero-background-container-parent'),
                    image_input = this_parent.find('.hero-background-image-input'),
                    image_prev = this_parent.find('.hero-background-image-preview');


                if ($(this).hasClass('hero-background-upload')) {
                    var image = wp.media({
                        title: 'Upload Image',
                        // mutiple: true if you want to upload multiple files at once
                        multiple: false
                    }).open()
                        .on('select', function (e) {
                            // This will return the selected image from the hero-background Uploader, the result is an object
                            var uploaded_image = image.state().get('selection').first();

                            // We convert uploaded_image to a JSON object to make accessing it easier
                            var image_url = uploaded_image.toJSON().url;

                            // Let's assign the url value to the input field
                            image_input.val(image_url);
                            image_prev.empty('');
                            image_prev.append('<img src="' + image_url + '">');
                            //animate tabContentWrapper height when content changes
                        });
                } else if ($(this).hasClass('hero-background-remove')) {
                    image_input.val('');
                    image_prev.empty('');
                    image_prev.append('<p>No image uploaded</p>');
                }

            });
        }

        function neighborhood_post_type() {

            neighborhood_post_type = $('.post-type-neighborhood');

            if (neighborhood_post_type.size() >= 1) {

                $first_title = $('#custom_title_first');
                $second_title = $('#custom_title_second_line');
                $default_title = $('#title');

                $first_title.keyup(function () {
                    $first_title_val = $(this).val();
                    $default_title.val($first_title_val);
                })

                $second_title.keyup(function () {
                    $first_title_val = $($first_title).val();
                    $second_title_val = $(this).val();

                    $default_title.val($first_title_val + ' ' + $second_title_val);
                })

                $('#postimagediv').appendTo('.hero-neighborhoods');

                $('#titlediv').appendTo('.custom-title');

                $('#postdivrich').appendTo('.neighbordescription');


                $('.meta-button.area_text_1').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_1" type="text" name="area_text_1[]" value="" placeholder="Title" /><input class="area_link_1" type="text" name="area_link_1[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_2').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_2" type="text" name="area_text_2[]" value=""/><input class="area_link_2" type="text" name="area_link_2[]" value=""/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_3').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_3" type="text" name="area_text_3[]" value="" placeholder="Title"/><input class="area_link_3" type="text" name="area_link_3[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_4').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_4" type="text" name="area_text_4[]" value="" placeholder="Title"/><input class="area_link_4" type="text" name="area_link_4[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_5').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_5" type="text" name="area_text_5[]" value="" placeholder="Title"/><input class="area_link_5" type="text" name="area_link_5[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_6').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_6" type="text" name="area_text_6[]" value="" placeholder="Title"/><input class="area_link_6" type="text" name="area_link_6[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_7').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_7" type="text" name="area_text_7[]" value="" placeholder="Title"/><input class="area_link_7" type="text" name="area_link_7[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_8').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_8" type="text" name="area_text_8[]" value="" placeholder="Title"/><input class="area_link_8" type="text" name="area_link_8[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_9').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_9" type="text" name="area_text_9[]" value="" placeholder="Title"/><input class="area_link_9" type="text" name="area_link_9[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.meta-button.area_text_10').click(function () {

                    var panel = $('<div class="fpform"><span><i class="ai-font-x-sign"></i></span><input class="area_text_10" type="text" name="area_text_10[]" value="" placeholder="Title"/><input class="area_link_10" type="text" name="area_link_10[]" value="" placeholder="Link"/></div>');

                    $(this).parent().find('.key-features').append(panel);

                    panel.find("span").click(function (e) {
                        $(e.currentTarget).parent().remove();
                    })

                });


                $('.key-features').find("span").click(function (e) {
                    $(e.currentTarget).parent().remove();
                });
            }


            $('.postbox').on('click', '.delete', function (event) {
                event.preventDefault();
                event.stopPropagation();

                connection = $(this).data('connection');
                photo_holder = $('.metabox-row[data-connection="' + connection + '"] .photo-holder');

                if (photo_holder.find('canvas').length <= 0) {
                    photo_holder.find('img').remove();
                    photo_holder.find('canvas').remove();
                    photo_holder.append('<canvas></canvas>');
                    photo_holder.parent().find('.photo-field').val('');
                }
            });

            $('.postbox').on('click', '.upload', function (event) {
                event.preventDefault();
                event.stopPropagation();

                popup_title = $(this).data('title');
                connection = $(this).data('connection');


                photo_holder = $('.metabox-row[data-connection="' + connection + '"] .photo-holder');


                var image = wp.media({
                    title: popup_title,
                    // mutiple: true if you want to upload multiple files at once
                    library: {
                        type: 'image' // limits the frame to show only images
                    },
                    multiple: false

                }).open()
                    .on('select', function (e) {
                        // This will return the selected image from the Media Uploader, the result is an object

                        var uploaded_image = image.state().get('selection').first();

                        // We convert uploaded_image to a JSON object to make accessing it easier
                        var image_url = uploaded_image.toJSON().url;
                        var image_id = uploaded_image.toJSON().id;

                        if (photo_holder.find('canvas').length > 0) {
                            photo_holder.find('canvas').remove();

                            photo_holder.append('<img src="' + image_url + '" alt="Photo"/>');

                        } else {
                            photo_holder.find('img').attr('src', image_url);
                            photo_holder.find('img').attr('srcset', image_url);
                        }

                        photo_holder.parent().find('.photo-field').val(image_id);

                    });

            });

        }

        function video_center_post_type() {

            video_post_type = $('.post-type-video-center');

            if (video_post_type.size() >= 1) {

                $('#titlediv').appendTo('.custom-title');
                $('#postdivrich').appendTo('.video-descriptions');


                /// video url parser
                function parseVideoURL(url) {

                    //get video url parameters
                    function getParm(url, base) {
                        var re = new RegExp("(\\?|&)" + base + "\\=([^&]*)(&|$)");
                        var matches = url.match(re);
                        if (matches) {
                            return (matches[2]);
                        } else {
                            return ("");
                        }
                    }

                    ///return parameters value
                    var retVal = {};
                    var matches;

                    if (url.indexOf("youtube.com/watch") != -1) {
                        retVal.provider = "youtube";
                        retVal.id = getParm(url, "v");
                    } else if (matches = url.match(/vimeo.com\/(\d+)/)) {
                        retVal.provider = "vimeo";
                        retVal.id = matches[1];
                    }
                    return (retVal);
                }

                var video_url_handler = $('.video_url');
                videoparse = parseVideoURL(video_url_handler.val());


                video_url_handler.keyup(function () {

                    var current = $(this).val();
                    parseURL = parseVideoURL(current);

                    $('.video-thumbnail').css({
                        'background-image': 'url(https://img.youtube.com/vi/' + parseURL.id + '/0.jpg)'
                    })

                    $('.video-thumbnail-input').val('https://img.youtube.com/vi/' + parseURL.id + '/0.jpg');
                })

                $('.video-thumbnail').css({
                    'background-image': 'url(https://img.youtube.com/vi/' + videoparse.id + '/0.jpg)'
                })

                $('.video-thumbnail-input').val('https://img.youtube.com/vi/' + videoparse.id + '/0.jpg');

            }


        }

        /** Instantiate **/
        __construct();

    });
})(jQuery);