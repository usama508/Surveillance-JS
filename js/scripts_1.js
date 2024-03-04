var testClass;
(function ($) {
    var opti = {
        lazyLoadImages: function() {
            jQuery('.custom-img').each(function(){
                img = jQuery(this).data('src');
                jQuery(this).css('background-image', 'url('+img+')');
            });
            jQuery('.custom-image').each(function(){
                img = jQuery(this).data('src');
                jQuery(this).attr('src', img);
            });
        },
    }
    $( window ).one( 'scroll', function(){
        // opti.lazyLoadImages();
    } );
    var app = {
        navTabDoubleTap: function () {
            $('.site-menu').navTabDoubleTap();
        },
        range: function () {
            var oldmin, oldmax  = '';
            if($('.selected-min-price').attr('data-setminprice')) {
                oldmin = $('.selected-min-price').attr('data-setminprice');
            }
            if($('.selected-max-price').attr('data-setmaxprice')) {
                oldmax = $('.selected-max-price').attr('data-setmaxprice');
            }
            var $rangeslider = $('#listings-price'),
                $minPrice = $('.selected-min-price'),
                $maxPrice = $('.selected-max-price');
            $rangeslider.ionRangeSlider({
                type: 'double',
                min: 0,
                max: 100,
                from: oldmin,
                to: oldmax,
                hide_min_max: true,
                hide_from_to: true,
                onFinish: function () {
                }
            });
            $rangeslider.on("change", function () {
                var $this = $(this),
                    value = $this.prop("value").split(";");
                _minPrice = (value[0] < 1 ? value[0] : value[0] + 'M');
                _maxPrice = (value[1] < 1 ? value[1] : value[1] + 'M');
                $minPrice.text('$' + _minPrice);
                $maxPrice.text('$' + _maxPrice);
                _maxPrice = (parseInt(_maxPrice) * 1000000);
                _minPrice = (parseInt(_minPrice) * 1000000);
                $('.min-price-class').val(_minPrice);
                $('.max-price-class').val(_maxPrice);
            });
            // $rangeslider.update({
            //     from: oldmin, //your new value
            //     to: oldmax
            //  });
        },
        showHideDetails: function () {
            
            jQuery(".show-hide-btn").click(function () {
                if (!(jQuery(this).hasClass('show'))) {
                    jQuery(this).addClass('show');
                    jQuery(".properties-single-slideshow-info").animate({
                        right: -345
                    }, 100);
                    jQuery(this).text("Show Details");
                } else {
                    jQuery(this).removeClass('show');
                    jQuery(".properties-single-slideshow-info").animate({
                        right: 0
                    }, 100);
                    jQuery(this).text("Hide Details");
                }
            });
            jQuery(".properties-single-slideshow-next, .properties-single-slideshow-prev, .our-properties-single-thumbnail, .our-properties-single-add-thumbnail").click(function () {
                if (!(jQuery(".show-hide-btn").hasClass('show'))) {
                    jQuery(".show-hide-btn").addClass('show');
                    jQuery(".properties-single-slideshow-info").animate({
                        right: -345
                    }, 100);
                    jQuery(".show-hide-btn").text("Show Details");
                }
            });
            jQuery(window).resize(function(){
                if (jQuery(window).width() <= 991) {
                    if ((jQuery('.show-hide-btn').hasClass('show'))) {
                        jQuery('.show-hide-btn').click();
                    }
                }
                 if (jQuery(window).width() <= 568) {
                    jQuery('a.our-offices-party-video').attr('target','_blank');
                }
            })
        },
        ListingDetailsBtn: function(){
            var showbtnRefHeight = jQuery(".properties-single-slideshow-info").height() + 2;
            var leftMargin =  ((Math.ceil(showbtnRefHeight/2)) -26) + 3; 
            jQuery(".show-hide-btn").css({
                'width' : showbtnRefHeight,
                'left' : -leftMargin
            });
        },
        getParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        },
        checkIfUrlHasToScroll: function () {
            var queryString = app.getParameterByName('scrollTo');
            if (queryString !== null) {
                var $target = $('#' + queryString);
                if ($target.length != 0) {
                    var offset = $target.offset().top,
                        windowWidth = $(window).width(),
                        windowTopOffset = 0;
                    if (windowWidth > 991) {
                        windowTopOffset = $('.fixed-header').height() + 50;
                    } else {
                        windowTopOffset = $('.custom-mobile-header').height() + 50;
                    }
                    $('html, body').animate({
                        scrollTop: offset - windowTopOffset,
                    }, 1000);
                }
            }
        },
        fixedHeader: function () {
            var fixedHeaderEl = $('.fixed-header');
            $(window).on('load scroll orientationchange', function () {
                var currentScroll = window.pageYOffset || document.documentElement.scrollTop,
                    windowSize = $(window).width();
                if (windowSize < 992) {
                    fixedHeaderEl.removeClass('active');
                    return false;
                }
                if (currentScroll > 100) {
                    fixedHeaderEl.addClass('active');
                } else {
                    if (currentScroll == 0) {
                        fixedHeaderEl.removeClass('active');
                    }
                }
            });
        },
        offcanvas: function () {
            var bodyEl = $('body'),
                offcanvasEL = $('#site-offcanvas');
            var offcanvas = {
                open: function () {
                    bodyEl.addClass('offcanvas-active');
                    offcanvasEL.addClass('active');
                    setTimeout(function () {
                        offcanvasEL.find('.offcanvas-wrap').addClass('active');
                        offcanvasEL.find('.offcanvas-close').addClass('active');
                    }, 200);
                },
                close: function () {
                    var currentWindowWidth = $(window).width(),
                        delay = 1000;
                    if (currentWindowWidth < 992) {
                        delay = 300;
                    }
                    offcanvasEL.find('.offcanvas-wrap').removeClass('active');
                    offcanvasEL.find('.offcanvas-close').removeClass('active');
                    setTimeout(function () {
                        bodyEl.removeClass('offcanvas-active');
                        offcanvasEL.removeClass('active');
                    }, delay);
                }
            }
            $('[data-offcanvas]').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    action = $this.data('offcanvas');
                if (action == 'open') {
                    offcanvas.open();
                }
                if (action == 'close') {
                    offcanvas.close();
                }
            });
            offcanvasEL.on('click', function () {
                offcanvas.close();
            });
            offcanvasEL.find('.offcanvas-wrap').on('click', function (e) {
                e.stopImmediatePropagation();
            });
            $(window).on('load resize orientationchange', function () {
                var windowWidth = $(window).width();
                if (windowWidth < 992) {
                    offcanvas.close();
                }
            });
        },
        homepageSlideshow: function () {
            var $body = $('body');
            if ($body.hasClass('ip-container')) {
                return false;
            }
            $('.hp-slideshow .slideshow-wrap .slideshow-slider-arrow span').on('click', function (e) {
                e.preventDefault();
                var currentWindowSize = $(window).width(),
                    target = $('.hp-fl').offset().top - $('.fixed-header').outerHeight();
                $('html, body').animate({
                    scrollTop: target,
                }, 1000);
            });
        },
        meetTheTeam: function () {
            var _this = this;
            if (!$('body').hasClass('home')) {
                return false;
            }
            this.newAgentsMap = function () {
                var map = $("#new-agents-map #map");
                var mapOrigWidth = 1600;
                var mapOrigHeight = 840;
                var container = $("#new-agents-map");
                var containerWidth = container.width();
                var scale = containerWidth / mapOrigWidth;
                scale = scale > 1 ? scale : scale;
                map.css({
                    transform: 'scale(' + scale + ')',
                    transformOrigin: '0 0'
                });
                container.css({
                    height: (mapOrigHeight * scale),
                });
            }
            this.newAgentsMapHover = function () {
                var $target = $('#new-agents-map #map map area');
                
                $(document).mouseup(function (e) {
                    if (!$target.is(e.target) && $target.has(e.target).length === 0) {
                        $target.removeClass('active');
                        $('.new-agents-map .new-agents-map-hover-details > div').removeClass('active');
                    }
                });
                
                //$('#new-agents-map #map map area').on('click touchend', function (e) {
                //    e.preventDefault();
                //
                //    var $this = $(this),
                //        href = $this.attr('href'),
                //        mapHover = $this.data('map-hover'),
                //        mapHoverDetails = $this.data('map-hover-details'),
                //        windowWidth = window.outerWidth;
                //
                //    if ($('html').hasClass('mobile')) {
                //        window.location.href = href;
                //    }
                //
                //});
                
                $('#new-agents-map #map map area').hover(function () {
                    var $this = $(this),
                        mapHover = $this.data('map-hover'),
                        mapHoverDetails = $this.data('map-hover-details'),
                        windowWidth = window.outerWidth;
                    $('#' + mapHover).css("opacity", 1);
                    if ($('html').hasClass('mobile')) {
                        return false;
                    }
                    $('#' + mapHoverDetails).addClass('active');
                }, function () {
                    var $this = $(this),
                        mapHover = $this.data('map-hover'),
                        mapHoverDetails = $this.data('map-hover-details');
                    $('#' + mapHover).css("opacity", 0);
                    if ($('html').hasClass('mobile')) {
                        return false;
                    }
                    $('#' + mapHoverDetails).removeClass('active');
                });
                $('.new-agents-map-hover-details > div').hover(function () {
                    var $this = $(this),
                        $area = $('#new-agents-map #map map area[data-map-hover-details="' + $this.attr('id') + '"]'),
                        mapHover = $area.data('map-hover'),
                        mapHoverDetails = $this.attr('id');
                    $('#' + mapHover).css("opacity", 1);
                    $('#' + mapHoverDetails).addClass('active');
                }, function () {
                    var $this = $(this),
                        $area = $('#new-agents-map #map map area[data-map-hover-details="' + $this.attr('id') + '"]'),
                        mapHover = $area.data('map-hover'),
                        mapHoverDetails = $this.attr('id');
                    $('#' + mapHover).css("opacity", 0);
                    $('#' + mapHoverDetails).removeClass('active');
                });
                jQuery('.new-agents-map map area').click(function(e){
                    // console.log('adsasd');
                    if(jQuery(window).width() <= 992){
                        e.preventDefault();
                        window.location.replace("https://ogroup.com/our-team/");
                    }
                });
            }
            this.init = function () {
                _this.newAgentsMap();
                $(window).on('load resize orientationchange', function () {
                    _this.newAgentsMap();
                });
                _this.newAgentsMapHover();
            }
            this.init();
        },
        testimonials: function () {
            $('.testi-slider').not('.slick-initialized').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false,
                prevArrow: '.testi-prev',
                nextArrow: '.testi-next',
                autoplay: true,
                autoplaySpeed: 4000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            prevArrow: '.mob-testi-prev',
                            nextArrow: '.mob-testi-next',
                        }
                    }
                ]
            });
        },
        ourNumbersProvenPerformance: function () {
            var performanceEl = $('.hp-performance .performance-wrap .performance-list');
            var speed = 0;
            performanceEl.elementPeek({
                onViewportIn: function (object) {
                    
                    if (!performanceEl.hasClass('done-calculation')) {
                        object.addClass('done-calculation');
                        performanceEl.find('li span i').each(function (index, value) {
                            
                            if ($(this).parent().parent().hasClass('fast')) {
                                speed = 300;      
                            }else{
                                speed = 1000;
                            }
                            // console.log(speed);
                            var _this = $(this),
                                value = _this.text();
                            _this.animateNumber({
                                number: value
                            }, speed);
                        });
                    }
                },
                peekAmountToTrigger: 0.1
            });
        },
		
		ipMarketingGlobalExposureNumbers: function () {
            var performanceEl = $('.page-template-template-marketing-list .ip-marketing-global-exposure-numbers');
            performanceEl.elementPeek({
                onViewportIn: function (object) {
                    if (!performanceEl.hasClass('done-calculation')) {
                        object.addClass('done-calculation');
                        performanceEl.find('div.ip-marketing-global-exposure-numbers-item span em').each(function (index, value) {
                            var _this = $(this),
                                value = _this.text();
                            _this.animateNumber({
                                number: value
                            }, 1000);
                        });
                    }
                },
                peekAmountToTrigger: 0.1
            });
            jQuery(".page-template-template-marketing-list .hp-performance .performance-wrap .performance-list li").chainHeight({
                breakpoints: [
                    {
                        min: 321,
                    }
                ]
            });
        },
        innerPageBreadcrumbs: function () {
            if ($('#content .rank-math-breadcrumb').length == 0) {
                return false;
            }
            /* Custom Breadcrumbs */
            var $breadcrumbsClone = $('#content .rank-math-breadcrumb').clone(true).addClass('clone');
            $('#content .rank-math-breadcrumb').not('.clone').remove();
            $('.inner-page-breadcrumbs .container').append($breadcrumbsClone);
            /* Custom Breadcrumbs Link Remover */
            /* Only use this if you're unable to edit the parent page of the selected page due to redirects/301 redirects */
            var pages = [
                {
                    page: 'http://ogroup.com/properties/recent-sales/',
                    placement: 2,
                    affectsChild: true,
                },
                {
                    page: 'http://ogroup.com/properties/our-properties/',
                    placement: 2,
                    affectsChild: true,
                },
            ];
            var currentPage = window.location.href;
            $.each(pages, function (i, v) {
                var page = v.page;
                if (v.affectsChild) {
                    if (currentPage.includes(page)) {
                        $('.rank-math-breadcrumb > span > span').eq(v.placement - 1).remove();
                        var breadcrumbs = $('.rank-math-breadcrumb > span').html();
                        var index = 0;
                        breadcrumbs = breadcrumbs.replace(/( » )/g, function (match) {
                            index++;
                            // console.log(match);
                            return (index === (v.placement)) ? '' : match;
                        });
                        $('.rank-math-breadcrumb > span').html(breadcrumbs);
                    }
                }
                else {
                    if (currentPage == page) {
                        $('.rank-math-breadcrumb > span > span').eq(v.placement - 1).remove();
                        var breadcrumbs = $('.rank-math-breadcrumb > span').html();
                        var index = 0;
                        breadcrumbs = breadcrumbs.replace(/( » )/g, function (match) {
                            index++;
                            // console.log(match);
                            return (index === (v.placement)) ? '' : match;
                        });
                        $('.rank-math-breadcrumb > span').html(breadcrumbs);
                    }
                }
            });
        },
        interactiveMap: function () {
            jQuery('.interactive-map-list').addClass('notranslate');
            
            var $body = $('body'),
                map;
            if ($('#interactive-map').length == 0) {
                return false;
            }
            // For Dummy Purposes
            var dummyStatus = ['active', 'sold', 'leased', 'commercial'];
            // Properties JSON Objects
            var properties = [];
            var propertyList = ajax_object.properties;
            console.log( ajax_object.properties.length );
            $.each(propertyList, function (key, data) {
                // console.log(data.status);
                properties.push({
                    image: data.image,
                    address: data.address,
                    price: ((data.price) ? data.price : ''),
                    beds: data.beds,
                    baths: data.baths,
                    status: data.status,
                    link: data.link,
                    position: new google.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
                    leaseprice: data.other_price
                });
            });
            // Converts numbers to string with commas
            var numberWithCommas = function (number) {
                var parts = number.toString().split(".");
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return parts.join(".");
            }
            // Interactive Map `Dropdown`
            var interactiveDropdown = function () {
                $('.interactive-map .interactive-map-wrap .interactive-map-sorter .interactive-map-dropdown').on('click', function (e) {
                    e.stopImmediatePropagation();
                    var _this = $(this);
                    $('.interactive-map .interactive-map-wrap .interactive-map-sorter .interactive-map-dropdown').not(e.currentTarget).removeClass('active');
                    _this.toggleClass('active');
                });
                $('.interactive-map .interactive-map-wrap .interactive-map-sorter .interactive-map-dropdown .interactive-map-dropdown-content').on('click', function (e) {
                    e.stopImmediatePropagation();
                });
                $body.on('click', function (e) {
                    if ($('.interactive-map .interactive-map-wrap .interactive-map-sorter .interactive-map-dropdown.active').length != 0) {
                        $('.interactive-map .interactive-map-wrap .interactive-map-sorter .interactive-map-dropdown').removeClass('active');
                    }
                });
            }
            // Interactive Map `Settings`
            var interactiveMapSettings = function () {
                var listingsStatus = [],
                    priceRange = [],
                    $rangeSlider = $('[data-ui-slider]');
                var $rangeMin2 = $('.range-min span').text(),
                    $rangeMax2 = $('.range-max span').text();
                // console.log($rangeMax2);
                $('[data-imap]').each(function () {
                    var $this = $(this),
                        checked = $this.get(0).checked,
                        statusType = $this.data('imap');
                    if (checked && $.inArray(statusType, listingsStatus) < 0) {
                        listingsStatus.push(statusType);
                    } else {
                        if ($.inArray(statusType, listingsStatus) >= 0) {
                            var index = $.inArray(statusType, listingsStatus);
                            listingsStatus.splice(index, 1);
                        }
                        listingsStatus.splice();
                    }
                });
                 priceRange[0] = $rangeMin2.replace(',').replace(',').replace(',').replace(',');
                 priceRange[1] = $rangeMax2.replace(',').replace(',').replace(',').replace(',');
                 // console.log(priceRange[0]);
                 // console.log(priceRange[1]);
               // priceRange[0] = 0;
               // priceRange[1] = 999999999;
                var ctr = 0;
                var propertyList = '';
                $('.interactive-map-list').html('');
                $.each(properties, function (i, v) {
                    var link = v.link,
                        address = v.address,
                        price = v.price;
                        leaseprice = v.price;
                    if ($.inArray(v.status, listingsStatus) >= 0) {
                        // Removes all non-numerice characters on the price
                        var truePrice = price.replace(/\D/g, '');
                        truePrice = parseFloat(truePrice / 1000000);
                        // console.log(truePrice);
                        if (truePrice >= priceRange[0] && truePrice <= priceRange[1]) {
                            // console.log(truePrice);
                            // console.log(priceRange[1]);
                            v.marker.labelContent = ctr + 1;
                            v.marker.setVisible(true);
                            map.panBy(0, 0);
                            if (ctr == 0) {
                                propertyList += '<div class="interactive-map-list-col">';
                            }
                            propertyList += '<span>' +
                                '<a href="' + link + '" data-imap-marker=' + (i + 1) + '>' + (ctr + 1) + '. ' + address + ' - $' + numberWithCommas(price) + '</a>' +
                                '</span>';
                            if (ctr != 0 && ctr != (properties.length - 1) && ((ctr + 1) % (Math.round(properties.length / 4)) == 0)) {
                                propertyList += '</div><div class="interactive-map-list-col">';
                            }
                            if (ctr == (properties.length - 1)) {
                                propertyList += '</div>';
                            }
                            ctr++;
                        } else {
                            v.marker.setVisible(false);
                            v.infoWindow.close();
                        }
                    } else {
                        v.marker.setVisible(false);
                        v.infoWindow.close();
                    }
                });
                $('.interactive-map-list').append(propertyList);
            }
            testClass = interactiveMapSettings;
            // Interactive Map `Range UI Slider`
            var interactiveMapSlider = function () {
                var $rangeMin = $('.range-min span'),
                    $rangeMax = $('.range-max span');
                $("[data-ui-slider]").ionRangeSlider({
                    type: "double",
                    grid: false,
                    min: 0,
                    /* max: 100000000, */
                    max: 100,
                    //step: 1000000,
                    onChange: function (data) {
                        // console.log(data);
                        // console.log(data.from);
                        $rangeMin.text(numberWithCommas(data.from));
                        $rangeMax.text(numberWithCommas(data.to));
                        interactiveMapSettings();
                    }
                });
            }
            // Interactive Map `Marker Sorter`
            var interactiveMapMarkerSorter = function () {
                $('[data-imap]').on('click', function (e) {
                    interactiveMapSettings();
                });
            }
            // Interactive Map `Google Checker`
            var interactiveMapGoogleChecker = function () {
                if (!google.maps) {
                    var googleScript = $('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDrrlU2mAATXaWOZh-otgZGc_B4woIm_40&callback=initMap"><\/script>');
                    $('.interactive-map-middle').append(googleScript);
                    //AIzaSyAk6EDKxO0WHMiXGIm6p-f-IBzJcFUtD1k
                }
            }
            // Interactive Map `Google Map Functions`
           
            var interactiveGoogleMap = function () {
                map = new google.maps.Map(document.getElementById('interactive-map-google'), {
                    zoom: 11,
                    center: new google.maps.LatLng(34.077818, -118.362637),
                    mapTypeId: google.maps.MapTypeId.TERRAIN
                });
                var icons = {
                    active: {
                        icon: stylesheet_directory + 'images/marker-active.png', 
                    },
                    sold: {
                        icon: stylesheet_directory + 'images/marker-sold.png', 
                    },
                    leased: {
                        icon: stylesheet_directory + 'images/marker-leased.png', 
                    },
                    commercial: {
                        icon: stylesheet_directory + 'images/marker-commercial.png', 
                    },
                    default: {
                        icon: stylesheet_directory + 'images/marker-default.png'
                    }
                };
                // bounds.extend(markers[i].getPosition());
                // map.fitBounds(bounds);
                var markerDropDelay = 200;
                $.each(properties, function (index, property) {
                    var link = property.link,
                        image = property.image,
                        address = property.address,
                        price = property.price,
                        status = property.status,
                        beds = property.beds,
                        bedWord = 'Bed',
                        baths = property.baths,
                        bathWord = 'Bath',
                        position = property.position;
                    if (parseInt(beds) > 1) {
                        bedWord = 'Beds';
                    }
                    if (parseInt(baths) > 1) {
                        bathWord = 'Baths';
                    }
               
                    var marker = new MarkerWithLabel({
                        position: property.position,
                        map: map,
                        draggable: false,
                        raiseOnDrag: false,
                        //icon: ((icons[status]) ? icons[status].icon : icons['default'].icon),
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 0
                        },
                        labelContent: index + 1,
                        labelClass: 'interactive-map-label ' +property.status,
                        labelInBackground: true,
                    });
                    properties[index].marker = marker;
                    var infoWindowContent = '<a href="' + link + '" class="interactive-map-info">' +
                        '<div class="clearfix">' +
                        '<div class="info-image pull-left">' +
                        '<img src="' + image + '" alt="Property Image">' +
                        '</div>' +
                        '<div class="info-content pull-right">' +
                        '<div class="info-status">' +
                        '<span class="pin-' + status + '"></span>' + status +
                        '</div>' +
                        '<div class="info-address">' + address + '</div>' +
                        '<ul class="info-extras">' +
                        '<li class="test">' + parseInt(beds) + ' ' + bedWord + '</li>' +
                        '<li>' + parseInt(baths) + ' ' + bathWord + '</li>' +
                        '</ul>' +
                        '<div class="info-price notranslate">' +
                        '$' + numberWithCommas(price) +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>';
                    var infoWindow = new SnazzyInfoWindow({
                        marker: marker,
                        panOnOpen: false,
                        closeWhenOthersOpen: true,
                        openOnMarkerClick: false,
                        wrapperClass: 'interactive-map-info-window',
                        latlang: property.position,
                    });
                    properties[index].infoWindow = infoWindow;
                    google.maps.event.addListener(marker, 'click', function () {
                        properties[index].infoWindow.setContent(infoWindowContent);
                        properties[index].infoWindow.open();
                        map.panTo(position);
                    });
                });
            }
            // Interactive Map `Property List`
            var interactiveMapPropertyList = function () {
                var propertyList = '';
                //console.log(properties);
                $.each(properties, function (index, property) {
                    var link = property.link,
                        address = property.address,
                        price = property.price;
                    // console.log(address);
                    //address = address.split(", ");
                    //console.log(address);
                    if (index == 0) {
                        propertyList += '<div class="interactive-map-list-col">';
                    }
                    propertyList += '<span>' +
                        '<a href="' + link + '" data-imap-marker=' + (index + 1) + '>' + (index + 1) + '. ' + address + ' - $' + numberWithCommas(price) + '</a>' +
                        '</span>';
                    if (index != 0 && index != (properties.length - 1) && ((index + 1) % (Math.round(properties.length / 4)) == 0)) {
                        propertyList += '</div><div class="interactive-map-list-col">';
                    }
                    if (index == (properties.length - 1)) {
                        propertyList += '</div>';
                    }
                });
                $('.interactive-map-list').append(propertyList);
                // Adds Click Event on Interactive Map List
                $('.interactive-map-list').on('click', '.interactive-map-list-col > span > a', function (e) {
                    e.preventDefault();
                    var $this = $(this),
                        markerIndex = $this.data('imap-marker');
                    var selectedMarker = properties[markerIndex - 1];
                    $('html, body').animate({
                        scrollTop: $('.interactive-map .interactive-map-middle').offset().top - 100,
                    }, 800);
                    google.maps.event.trigger(selectedMarker.marker, 'click');
                });
            }
            var interactiveMapImgAlt = function() {
                setTimeout(function(){ 
                jQuery('#interactive-map img').attr('alt','Interactive Map Image');
                }, 2000);
            }
            // Initialize all Interactive Map Functions
            var init = function () {
                interactiveMapSlider();
                interactiveDropdown();
                interactiveMapGoogleChecker();
                interactiveGoogleMap();
                interactiveMapMarkerSorter();
                interactiveMapPropertyList();
                interactiveMapImgAlt();
            }
            init();
        },
        ourPropertiesSingle: function () {
            var $innerPageBreadCrumbs = $('#inner-page-breadcrumbs'),
                $ourPropertiesSingle = $('.our-properties-single'),
                $ourPropertiesSingleSlideshowWrap = $ourPropertiesSingle.find('.our-properties-single-slideshow-wrap'),
                $ourPropertiesSingleThumbnails = $('.our-properties-single-thumbnail-list');
            if ($ourPropertiesSingle.length == 0) {
                return false;
            }
            var $cloneInnerPageBreadCrumbs1 = $innerPageBreadCrumbs.clone(true).addClass('clone hidden-md hidden-lg'),
                $cloneInnerPageBreadCrumbs2 = $innerPageBreadCrumbs.clone(true).addClass('clone hidden-xs hidden-sm');
            $cloneInnerPageBreadCrumbs1.insertAfter('.our-properties-single-slideshow');
            $cloneInnerPageBreadCrumbs2.insertAfter('.our-properties-single-slideshow-controls');
            $('#inner-page-breadcrumbs').not('.clone').remove();
            $ourPropertiesSingleSlideshowWrap.find('.our-properties-single-slideshow').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 4000,
                fade: true,
                dots: false,
                prevArrow: '.properties-single-slideshow-prev',
                nextArrow: '.properties-single-slideshow-next',
            });
            $('.our-properties-single-slideshow').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $('.our-properties-single-thumbnail, .our-properties-single-floating-thumbnail').removeClass('active');
                // $('.our-properties-single-thumbnail').eq(nextSlide).addClass('active');
                // $('.our-properties-single-floating-thumbnail').eq(nextSlide).addClass('active');
            });
            $('.our-properties-single-thumbnail, .our-properties-single-floating-thumbnail').on('click', function (e) {
                var $this = $(this);
                var getIndex = $this.index();
                $('.our-properties-single-thumbnail, .our-properties-single-floating-thumbnail').removeClass('active');
                $('.our-properties-single-thumbnail').eq(getIndex).addClass('active');
                $('.our-properties-single-floating-thumbnail').eq(getIndex).addClass('active');
                $('.our-properties-single-slideshow').slick('slickGoTo', getIndex);
            });
            $('.our-properties-single-add-thumbnail').on('click', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                $(this).addClass('active');
                $('.our-properties-single-floating-thumbnail-wrap').addClass('active');
            });
            $('.our-properties-single-floating-thumbnail-close').on('click', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                $('.our-properties-single-add-thumbnail, .our-properties-single-floating-thumbnail-wrap').removeClass('active');
            });
            $('.our-properties-single-floating-thumbnail-wrap').on('click', function (e) {
                e.stopImmediatePropagation();
            });
            $(document).on('click', function (e) {
                e.stopImmediatePropagation();
                if (!$(e.target).closest('.our-properties-single-floating-thumbnail-wrap').length) {
                    if ($('.our-properties-single-floating-thumbnail-wrap').hasClass('active')) {
                        $('.our-properties-single-add-thumbnail, .our-properties-single-floating-thumbnail-wrap').removeClass('active');
                    }
                }
            });
            $(document).keyup(function (e) {
                e.stopImmediatePropagation();
                if (e.keyCode == 27) {
                    if ($('.our-properties-single-floating-thumbnail-wrap').hasClass('active')) {
                        $('.our-properties-single-add-thumbnail, .our-properties-single-floating-thumbnail-wrap').removeClass('active');
                    }
                }
            });
            var containerGuide = function () {
                var windowWidth = $(window).width();
                if (windowWidth < 992) {
                    return false;
                }
                var $containerGuide = $('.our-properties-single-container-guide');
                var controlledGuide = ['.our-properties-single-agent'];
                var leftPos = $containerGuide.offset().left + 15;
                $.each(controlledGuide, function (i, v) {
                    var $v = $(v);
                    $v.css("padding-left", leftPos);
                });
            }
            $(window).on('load resize orientationchange', function () {
                containerGuide();
            });
            containerGuide();
            $('#our-properties-single-floating-thumbnail-mobile-list').aiosPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                }
            });
        },
        ourTeamPage: function () {
            var $ourTeamPage = $('.our-team');
            if ($ourTeamPage.length == 0) {
                return false;
            }
            $(window).on('load resize orientationchange', function () {
                var $ourTeamContent = $('.our-team-content'),
                    $ourTeamPhoto = $('.our-team-photo'),
                    $ourTeamTitle = $('.our-team-title');
                $ourTeamContent.height($ourTeamPhoto.height() - 17);
                $ourTeamTitle.css('top', ((0.20) * ($ourTeamPhoto.height() - 17)) + 'px');
                // console.log(((0.20) * ($ourTeamPhoto.height() - 17)));
            });
        },
        ourTeamSinglePage: function () {
            $('#active-listings .agents-single-listings-slider').not('.slick-initialized').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                rows: 2,
                infinite: false,
                dots: false,
                prevArrow: '#active-listings .agents-single-listings-prev',
                nextArrow: '#active-listings .agents-single-listings-next',
            });
            $('#recent-sales-listings .agents-single-listings-slider').not('.slick-initialized').slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                rows: 2,
                infinite: false,
                dots: false,
                prevArrow: '#recent-sales-listings .agents-single-listings-prev',
                nextArrow: '#recent-sales-listings .agents-single-listings-next',
            });
            $(window).on('load', function () {
                $('#recent-sales-listings').hide();
            });
            $('[data-agents-single-listings-tab]').on('click', function () {
                var $this = $(this),
                    target = '#' + $this.data('agents-single-listings-tab');
                $('[data-agents-single-listings-tab]').not($this).removeClass('active');
                $this.addClass('active');
                $('.agents-single-listings-slider-wrap').not(target).hide();
                $(target).fadeIn();
                $(target + ' .agents-single-listings-slider').slick('destroy');
                $(target + ' .agents-single-listings-slider').slick({
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2,
                    infinite: false,
                    dots: false,
                    prevArrow: target + ' .agents-single-listings-prev',
                    nextArrow: target + ' .agents-single-listings-next',
                });
                $(window).trigger('resize');
            });
            $('.agents-single-listings-slide').hover(function () {
                $('.agents-single-listings-prev, .agents-single-listings-next').addClass('bottom-index');
            }, function () {
                $('.agents-single-listings-prev, .agents-single-listings-next').removeClass('bottom-index');
            });
            $(window).on('load resize orientation', function () {
                var currentWidth = $(window).width();
                var targets = ['active-listings', 'recent-sales-listings'];
                if (currentWidth < 992) {
                    $.each(targets, function (i, v) {
                        var target = '#' + v;
                        $(target + ' .agents-single-listings-slider').slick('destroy');
                        $(target + ' .agents-single-listings-slider').slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: false,
                            dots: false,
                            prevArrow: target + ' .agents-single-listings-prev',
                            nextArrow: target + ' .agents-single-listings-next',
                        });
                    });
                } else {
                    $.each(targets, function (i, v) {
                        var target = '#' + v;
                        $(target + ' .agents-single-listings-slider').slick('destroy');
                        $(target + ' .agents-single-listings-slider').slick({
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            rows: 2,
                            infinite: false,
                            dots: false,
                            prevArrow: target + ' .agents-single-listings-prev',
                            nextArrow: target + ' .agents-single-listings-next',
                        });
                    });
                }
            });
            $('.agents-single-testi-slider').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 15000,
                dots: false,
                prevArrow: '.agents-single-testi-prev',
                nextArrow: '.agents-single-testi-next',
            });
            $('[data-link-target]').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    target = '#' + $this.data('link-target'),
                    offset = $(target).offset().top;
                if ($this.attr('data-link-offset') != "") {
                    offset = offset - $this.attr('data-link-offset');
                }
                $('html, body').animate({
                    scrollTop: offset
                }, 1000);
            });
        },
        newDevelopmentPage: function () {
            $('.new-development-testi-slider').not('.slick-initialized').slick({
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: false,
                prevArrow: '.new-development-testi-prev',
                nextArrow: '.new-development-testi-next',
                autoplay: true,
                autoplaySpeed: 4000,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            prevArrow: '.mob-testi-prev',
                            nextArrow: '.mob-testi-next',
                        }
                    }
                ]
            });
        },
        ourOffices: function () {
            $('#our-offices-party-gallery-list').aiosPopup({
                delegate: 'a',
                type: 'image',
                tLoading: 'Loading image #%curr%...',
                mainClass: 'mfp-img-mobile',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
                },
                image: {
                    tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                }
            });
        },
        newHomepage: function () {
            var _this = this;
            if (!$('body').hasClass('page-id-25017')) {
                return false;
            }
            this.bootstrapContainerUnwrap = function () {
                var $body = $('body');
                $body.find('#inner-page-wrapper > .container .new-homepage').unwrap();
            }
            this.newAgentsMap = function () {
                var map = $("#new-agents-map #map");
                var mapOrigWidth = 1600;
                var mapOrigHeight = 971;
                var container = $("#new-agents-map");
                var containerWidth = container.width();
                var scale = containerWidth / mapOrigWidth;
                scale = scale > 1 ? scale : scale;
                map.css({
                    transform: 'scale(' + scale + ')',
                    transformOrigin: '0 0'
                });
                container.css({
                    height: (mapOrigHeight * scale),
                });
            }
            this.newAgentsMapHover = function () {
                $('#new-agents-map #map map area').hover(function () {
                    var $this = $(this),
                        mapHover = $this.data('map-hover'),
                        mapHoverDetails = $this.data('map-hover-details');
                    $('#' + mapHover).css("opacity", 1);
                    $('#' + mapHoverDetails).addClass('active');
                }, function () {
                    var $this = $(this),
                        mapHover = $this.data('map-hover'),
                        mapHoverDetails = $this.data('map-hover-details');
                    $('#' + mapHover).css("opacity", 0);
                    $('#' + mapHoverDetails).removeClass('active');
                });
                $('.new-agents-map-hover-details > div').hover(function () {
                    var $this = $(this),
                        $area = $('#new-agents-map #map map area[data-map-hover-details="' + $this.attr('id') + '"]'),
                        mapHover = $area.data('map-hover'),
                        mapHoverDetails = $this.attr('id');
                    $('#' + mapHover).css("opacity", 1);
                    $('#' + mapHoverDetails).addClass('active');
                }, function () {
                    var $this = $(this),
                        $area = $('#new-agents-map #map map area[data-map-hover-details="' + $this.attr('id') + '"]'),
                        mapHover = $area.data('map-hover'),
                        mapHoverDetails = $this.attr('id');
                    $('#' + mapHover).css("opacity", 0);
                    $('#' + mapHoverDetails).removeClass('active');
                });
            }
            this.init = function () {
                this.bootstrapContainerUnwrap();
                this.newAgentsMap();
                $(window).on('load resize orientationchange', function () {
                    _this.newAgentsMap();
                });
                this.newAgentsMapHover();
            }
            this.init();
        },
        neighborhoodGuides: function () {
            var _this = this;
            if (!$('body').hasClass('page-template-template-neighborhood-guides')) {
                return false;
            }
            this.map = function () {
                var map = $('#neighborhood-guides-map #map'),
                    mapOrigWidth = 1600,
                    mapOrigHeight = 784,
                    container = $('#neighborhood-guides-map'),
                    containerWidth = container.width(),
                    scale = containerWidth / mapOrigWidth;
                scale = scale > 1 ? scale : scale;
                map.css({
                    transform: 'scale(' + scale + ')',
                    transformOrigin: '0 0'
                });
                container.css({
                    height: (mapOrigHeight * scale),
                });
            }
            this.mapHover = function () {
                $('#neighborhood-guides-map #myMap area').hover(function () {
                    var $this = $(this),
                        $target = $('#' + $this.attr('class'));
                    $target.addClass('active');
                }, function () {
                    var $this = $(this),
                        $target = $('#' + $this.attr('class'));
                    $target.removeClass('active');
                });
            }
            this.init = function () {
                _this.map();
                $(window).on('load resize orientationchange', function () {
                    _this.map()
                });
                _this.mapHover();
            }
            this.init();
        },
        listingsPageRedirects: function () {
            var currentPageUrl = window.location.href,
                listingsPageUrl = [
                    {
                        page: 'http://ogroup.com/active-listings/page/',
                        redirect: 'http://ogroup.com/properties/our-properties/',
                        wildcard: true,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/',
                        redirect: 'http://ogroup.com/properties/our-properties/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/',
                        redirect: 'http://ogroup.com/properties/recent-sales/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#HaciendaDeLaPaz',
                        redirect: 'http://ogroup.com/listing/hacienda-de-la-paz/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#9362NightingaleDr',
                        redirect: 'http://ogroup.com/listing/9362-nightingale-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#1546ViewsiteTer',
                        redirect: 'http://ogroup.com/listing/1546-viewsite-ter/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#8842EvanviewDr',
                        redirect: 'http://ogroup.com/listing/8842-evanview-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#1551ViewsiteDr',
                        redirect: 'http://ogroup.com/listing/1551-viewsite-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#1118NWetherlyDr',
                        redirect: 'http://ogroup.com/listing/1118-n-wetherly-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#8693FranklinAve',
                        redirect: 'http://ogroup.com/listing/8693-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#1773NCrescentHeightsBlvd',
                        redirect: 'http://ogroup.com/listing/1773-n-crescent-heights-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#1700QueensCt',
                        redirect: 'http://ogroup.com/listing/1700-queens-ct/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#16MorningDove',
                        redirect: 'http://ogroup.com/listing/16-morning-dove/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#3791MultiviewDr',
                        redirect: 'http://ogroup.com/listing/3791-multiview-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/#8790AppianWay',
                        redirect: 'http://ogroup.com/listing/8790-appian-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#1106MaybrookDr',
                        redirect: 'http://ogroup.com/listing/1106-maybrook-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#4561TaraDr',
                        redirect: 'http://ogroup.com/listing/4561-tara-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8050WillowGlenRd',
                        redirect: 'http://ogroup.com/listing/8050-willow-glen-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#1622SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1628-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8818HummingbirdPl',
                        redirect: 'http://ogroup.com/listing/8818-hummingbird-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#1444QueensRd',
                        redirect: 'http://ogroup.com/listing/1444-queens-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8556FranklinAve',
                        redirect: 'http://ogroup.com/listing/8556-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#1550NElCentroAve',
                        redirect: 'http://ogroup.com/listing/1550-n-el-centro-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#1750ViewmontDr',
                        redirect: 'http://ogroup.com/listing/1750-viewmont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8448HaroldWay',
                        redirect: 'http://ogroup.com/listing/8448-harold-way-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8500SunsetBlvd',
                        redirect: 'http://ogroup.com/listing/8500-sunset-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/2/#8538HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8538-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#118SClarkDr205',
                        redirect: 'http://ogroup.com/listing/118-s-clark-dr-205-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#1413QueensRd',
                        redirect: 'http://ogroup.com/listing/1413-queens-rd-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#2118BeechKnollRd',
                        redirect: 'http://ogroup.com/listing/2118-beech-knoll-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#1630RisingGlenRd',
                        redirect: 'http://ogroup.com/listing/1630-rising-glen-rd-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#3518WoodbineRd',
                        redirect: 'http://ogroup.com/listing/3518-woodbine-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#15450BriarwoodDr',
                        redirect: 'http://ogroup.com/listing/15450-briarwood-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#633CrescentHeightsBlvd',
                        redirect: 'http://ogroup.com/listing/633-crescent-heights-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#2054ColdwaterCanyonDr',
                        redirect: 'http://ogroup.com/listing/2054-coldwater-canyon-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#45StarIslandDr',
                        redirect: 'http://ogroup.com/listing/45-star-island-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#430916thSt-CoastalGA',
                        redirect: 'http://ogroup.com/listing/4309-16th-st-coastal-ga/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#612NGeneseeAve',
                        redirect: 'http://ogroup.com/listing/612-n-genesee-ave-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/active-listings/page/3/#400-420NCanonDr',
                        redirect: 'http://ogroup.com/listing/400-420-n-canon-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#807NCrescentDr',
                        redirect: 'http://ogroup.com/listing/807-n-crescent-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#1975LomaVistaDr',
                        redirect: 'http://ogroup.com/listing/1975-loma-vista-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#8650FranklinAve',
                        redirect: 'http://ogroup.com/listing/8650-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#9222AnthonyPl',
                        redirect: 'http://ogroup.com/listing/9222-anthony-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#8842EvanviewDr',
                        redirect: 'http://ogroup.com/listing/8842-evanview-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#1106NHillcrestRd',
                        redirect: 'http://ogroup.com/listing/1106-n-hillcrest-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#1424RisingGlenRd',
                        redirect: 'http://ogroup.com/listing/1424-rising-glen-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#20659RockcroftDr',
                        redirect: 'http://ogroup.com/listing/20659-rockcroft-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#7000MacapaDr',
                        redirect: 'http://ogroup.com/listing/7000-macapa-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#1764ViewmontDr',
                        redirect: 'http://ogroup.com/listing/1764-viewmont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#432OakhurstDr507',
                        redirect: 'http://ogroup.com/listing/432-oakhurst-dr-507-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/#8718StIvesDr',
                        redirect: 'http://ogroup.com/listing/8718-st-ives-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#8320HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8320-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#1124SierraAltaWay',
                        redirect: 'http://ogroup.com/listing/1124-sierra-alta-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#8515HedgesPl',
                        redirect: 'http://ogroup.com/listing/8515-hedges-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#8448HaroldWay',
                        redirect: 'http://ogroup.com/listing/8448-harold-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#1452QueensRd',
                        redirect: 'http://ogroup.com/listing/1452-queens-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#8538HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8538-hollywood-blvd-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#7187MacapaDr',
                        redirect: 'http://ogroup.com/listing/7187-macapa-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#8787ShorehamDr304',
                        redirect: 'http://ogroup.com/listing/8787-shoreham-dr-304/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#1413QueensRd',
                        redirect: 'http://ogroup.com/listing/1413-queens-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#7104MacapaDr',
                        redirect: 'http://ogroup.com/listing/7104-macapa-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#1604SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1604-stanley-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/2/#152338NDohenyDr',
                        redirect: 'http://ogroup.com/listing/1523-3-8-n-doheny-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#261SReevesDrPH5',
                        redirect: 'http://ogroup.com/listing/261-s-reeves-dr-ph5/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#2102RidgemontDr',
                        redirect: 'http://ogroup.com/listing/2102-ridgemont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#15914TemeculaSt',
                        redirect: 'http://ogroup.com/listing/15914-temecula-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#1707RisingGlenRd',
                        redirect: 'http://ogroup.com/listing/1707-rising-glen-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#13019DeweySt',
                        redirect: 'http://ogroup.com/listing/13019-dewey-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#7218MulhollandDr',
                        redirect: 'http://ogroup.com/listing/7218-mulholland-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#1310ArmacostAve104',
                        redirect: 'http://ogroup.com/listing/1310-armacost-ave-104-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#7947ElectraDr',
                        redirect: 'http://ogroup.com/listing/7947-electra-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#1723ViewmontDr',
                        redirect: 'http://ogroup.com/listing/1723-viewmont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#251NLaytonDr',
                        redirect: 'http://ogroup.com/listing/251-n-layton-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#5639TryonRd',
                        redirect: 'http://ogroup.com/listing/5639-tryon-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/3/#8835EvanviewDr',
                        redirect: 'http://ogroup.com/listing/8835-evanview-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#5717RoundMeadowRd',
                        redirect: 'http://ogroup.com/listing/5717-round-meadow-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#2525HuttonDr',
                        redirect: 'http://ogroup.com/listing/2525-hutton-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#8618FranklinAve',
                        redirect: 'http://ogroup.com/listing/8618-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#1744NDohenyDr',
                        redirect: 'http://ogroup.com/listing/1744-n-doheny-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#8787ShorehamDr707',
                        redirect: 'http://ogroup.com/listing/8787-shoreham-dr-707/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#224NGramercyPl',
                        redirect: 'http://ogroup.com/listing/224-n-gramercy-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#49BrooksAve',
                        redirect: 'http://ogroup.com/listing/49-brooks-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#10776Wilshire1604',
                        redirect: 'http://ogroup.com/listing/10776-wilshire-1604/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#6210PenfieldAve',
                        redirect: 'http://ogroup.com/listing/6210-penfield-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#200ChambersSt8D-NewYork',
                        redirect: 'http://ogroup.com/listing/200-chambers-st-8d-new-york/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#1853SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1853-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/4/#1750ViewmontDr',
                        redirect: 'http://ogroup.com/listing/1750-viewmont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#8672FranklinAve',
                        redirect: 'http://ogroup.com/listing/8672-franklin-ave-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#1351NCursonAve205',
                        redirect: 'http://ogroup.com/listing/1351-n-curson-ave-205/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#1375MillerDr',
                        redirect: 'http://ogroup.com/listing/1375-miller-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#8501HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8501-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#1359MillerDr',
                        redirect: 'http://ogroup.com/listing/1359-miller-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#100SDohenyDr1019',
                        redirect: 'http://ogroup.com/listing/100-s-doheny-dr-1019/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#850NKingsRdPH',
                        redirect: 'http://ogroup.com/listing/850-n-kings-rd-ph/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#469SSherbourneDr',
                        redirect: 'http://ogroup.com/listing/469-s-sherbourne-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#9466CherokeeLn',
                        redirect: 'http://ogroup.com/listing/9466-cherokee-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#2329AbbotKinney',
                        redirect: 'http://ogroup.com/listing/2329-abbot-kinney/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#1551QueensRd',
                        redirect: 'http://ogroup.com/listing/1551-queens-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/5/#1450SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1450-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#440NOakhurstDr101',
                        redirect: 'http://ogroup.com/listing/440-n-oakhurst-dr-101/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#1542MarmontAve',
                        redirect: 'http://ogroup.com/listing/1542-marmont-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#8270WoodshillTrl',
                        redirect: 'http://ogroup.com/listing/8270-woodshill-trl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#1516BeverlyGlenBlvd',
                        redirect: 'http://ogroup.com/listing/1516-beverly-glen-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#27316WindingWay',
                        redirect: 'http://ogroup.com/listing/27316-winding-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#8584FranklinAve',
                        redirect: 'http://ogroup.com/listing/8584-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#2333VasantaWay',
                        redirect: 'http://ogroup.com/listing/2333-vasanta-way-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#7465OakwoodAve',
                        redirect: 'http://ogroup.com/listing/7465-oakwood-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#1206AmalfiDr',
                        redirect: 'http://ogroup.com/listing/1206-amalfi-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#320TrousdalePl',
                        redirect: 'http://ogroup.com/listing/320-trousdale-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#7612WillowGlen',
                        redirect: 'http://ogroup.com/listing/7612-willow-glen/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/6/#8314MarmontLn',
                        redirect: 'http://ogroup.com/listing/8314-marmont-ln-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#9305NightingaleDr',
                        redirect: 'http://ogroup.com/listing/9305-nightingale-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#8312HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8312-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#2630EdenPl',
                        redirect: 'http://ogroup.com/listing/2630-eden-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#1651HaslamTer',
                        redirect: 'http://ogroup.com/listing/1651-haslam-ter/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#4450RadfordAve',
                        redirect: 'http://ogroup.com/listing/4450-radford-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#432OakhurstDr507',
                        redirect: 'http://ogroup.com/listing/432-oakhurst-dr-507/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#1940OutpostCir',
                        redirect: 'http://ogroup.com/listing/1940-outpost-cir/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#2020WattlesDr',
                        redirect: 'http://ogroup.com/listing/2020-wattles-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#394HuntleyDr',
                        redirect: 'http://ogroup.com/listing/394-huntley-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#1830NStanleyAve',
                        redirect: 'http://ogroup.com/listing/1830-n-stanley-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#8448HaroldWay',
                        redirect: 'http://ogroup.com/listing/8448-harold-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/7/#8818PintoPl',
                        redirect: 'http://ogroup.com/listing/8818-pinto-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#555WestbourneDr',
                        redirect: 'http://ogroup.com/listing/555-westbourne-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#8238HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8238-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#8787ShorehamDr1209',
                        redirect: 'http://ogroup.com/listing/8787-shoreham-dr-1209/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1441OrioleDr',
                        redirect: 'http://ogroup.com/listing/1441-oriole-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#7805GranitoDr',
                        redirect: 'http://ogroup.com/listing/7805-granito-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#9922AnthonyPl',
                        redirect: 'http://ogroup.com/listing/9922-anthony-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1546ViewsiteTerrace',
                        redirect: 'http://ogroup.com/listing/1546-viewsite-terrace/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1333MillerDr',
                        redirect: 'http://ogroup.com/listing/1333-miller-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#8842EvanviewDr',
                        redirect: 'http://ogroup.com/listing/8842-evanview-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1310LondonderryPl',
                        redirect: 'http://ogroup.com/listing/1310-londonderry-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1516NBeverlyGlenBlvd',
                        redirect: 'http://ogroup.com/listing/1516-n-beverly-glen-blvd-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/8/#1657MarmontAve',
                        redirect: 'http://ogroup.com/listing/1657-marmont-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#11231BriarcliffLn',
                        redirect: 'http://ogroup.com/listing/11231-briarcliff-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#7177PacificViewDr',
                        redirect: 'http://ogroup.com/listing/7177-pacific-view-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1601SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1601-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1133NClarkSt304',
                        redirect: 'http://ogroup.com/listing/1133-n-clark-st-304/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1604StanleyAve',
                        redirect: 'http://ogroup.com/listing/1604-stanley-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1628SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/1628-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#439SBundyDr',
                        redirect: 'http://ogroup.com/listing/439-s-bundy-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1333SBeverlyGlenBlvd506',
                        redirect: 'http://ogroup.com/listing/1333-s-beverly-glen-blvd-506/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#118SClarkDr205',
                        redirect: 'http://ogroup.com/listing/118-s-clark-dr-205/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#1619NLaBreaAve',
                        redirect: 'http://ogroup.com/listing/1619-n-la-brea-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#2333ColdwaterCanyonDr',
                        redirect: 'http://ogroup.com/listing/2333-coldwater-canyon-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/9/#8560FranklinAve',
                        redirect: 'http://ogroup.com/listing/8560-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#7155MacapaDr',
                        redirect: 'http://ogroup.com/listing/7155-macapa-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#26933SandCanyonRd',
                        redirect: 'http://ogroup.com/listing/26933-sand-canyon-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#8185HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8185-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#6631CahuengaTer',
                        redirect: 'http://ogroup.com/listing/6631-cahuenga-ter/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#1155NLaCienegaBlvd812',
                        redirect: 'http://ogroup.com/listing/1155-n-la-cienega-blvd-812/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#8700FranklinAve',
                        redirect: 'http://ogroup.com/listing/8700-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#8276WoodshillTrl',
                        redirect: 'http://ogroup.com/listing/8276-woodshill-trl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#15740CastlewoodsDr',
                        redirect: 'http://ogroup.com/listing/15740-castlewoods-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#8146LaurelViewDr',
                        redirect: 'http://ogroup.com/listing/8146-laurel-view-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#6357W5thSt',
                        redirect: 'http://ogroup.com/listing/6357-w-5th-st-3/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#104NAlmontDr',
                        redirect: 'http://ogroup.com/listing/104-n-almont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/10/#8572HillsideAve',
                        redirect: 'http://ogroup.com/listing/8572-hillside-ave-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#1247HilldaleAve',
                        redirect: 'http://ogroup.com/listing/1247-hilldale-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#341SCamdenDr',
                        redirect: 'http://ogroup.com/listing/341-s-camden-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#272717thSt',
                        redirect: 'http://ogroup.com/listing/2727-17th-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#1333MillerDr',
                        redirect: 'http://ogroup.com/listing/1333-miller-dr-3/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#4641LemonaAve',
                        redirect: 'http://ogroup.com/listing/4641-lemona-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#3290CarseDr',
                        redirect: 'http://ogroup.com/listing/3290-carse-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#2333VasantaWay',
                        redirect: 'http://ogroup.com/listing/2333-vasanta-way/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#655MildredAve',
                        redirect: 'http://ogroup.com/listing/655-mildred-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#528OrangeDr',
                        redirect: 'http://ogroup.com/listing/528-orange-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#2940NeilsonWay105',
                        redirect: 'http://ogroup.com/listing/2940-neilson-way-105/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#8634HillsideAve',
                        redirect: 'http://ogroup.com/listing/8634-hillside-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/11/#221EGlenoaksBlvd',
                        redirect: 'http://ogroup.com/listing/221-e-glenoaks-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#1162ViaDeLaPaz',
                        redirect: 'http://ogroup.com/listing/1162-via-de-la-paz/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#1146NBrandBlvd',
                        redirect: 'http://ogroup.com/listing/1146-n-brand-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#6357W5thSt',
                        redirect: 'http://ogroup.com/listing/6357-w-5th-st-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#11811KiowaAvePH1',
                        redirect: 'http://ogroup.com/listing/11811-kiowa-ave-ph1/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#432NOakhurstDr407',
                        redirect: 'http://ogroup.com/listing/432-n-oakhurst-dr-407/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#1322NDetroitSt2',
                        redirect: 'http://ogroup.com/listing/1322-n-detroit-st-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#1651HaslamTer',
                        redirect: 'http://ogroup.com/listing/1651-haslam-ter-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#954FiskeSt',
                        redirect: 'http://ogroup.com/listing/954-fiske-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#201AlmontDr',
                        redirect: 'http://ogroup.com/listing/201-almont-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#268OrangeDr',
                        redirect: 'http://ogroup.com/listing/268-orange-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#8368HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8368-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/12/#4601CharmionLn',
                        redirect: 'http://ogroup.com/listing/4601-charmion-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#438NLucerneBlvd',
                        redirect: 'http://ogroup.com/listing/438-n-lucerne-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#1210SCochranAve',
                        redirect: 'http://ogroup.com/listing/1210-s-cochran-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#1687MarmontAve',
                        redirect: 'http://ogroup.com/listing/1687-marmont-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#2054ColdwaterCanyonDr',
                        redirect: 'http://ogroup.com/listing/2054-coldwater-canyon-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#8556FranklinAve',
                        redirect: 'http://ogroup.com/listing/8556-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#1435NLasPalmasAve',
                        redirect: 'http://ogroup.com/listing/1435-n-las-palmas-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#8672FranklinAve',
                        redirect: 'http://ogroup.com/listing/8672-franklin-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#8273MarmontLn',
                        redirect: 'http://ogroup.com/listing/8273-marmont-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#7729GranitoDr',
                        redirect: 'http://ogroup.com/listing/7729-granito-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#1128NVistaAve',
                        redirect: 'http://ogroup.com/listing/1128-n-vista-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#1539LaurelAve102',
                        redirect: 'http://ogroup.com/listing/1539-n-laurel-ave-102/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/13/#3974FarmouthDr',
                        redirect: 'http://ogroup.com/listing/3974-farmouth-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#4801AzucenaRd',
                        redirect: 'http://ogroup.com/listing/4801-azucena-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#3121OakdellLn',
                        redirect: 'http://ogroup.com/listing/3121-oakdell-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#4165CromwellAve',
                        redirect: 'http://ogroup.com/listing/4165-cromwell-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#8572HillsideAve',
                        redirect: 'http://ogroup.com/listing/8572-hillside-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#9200SunsetBlvdLuckmanPlaza',
                        redirect: 'http://ogroup.com/listing/9200-sunset-blvd-luckman-plaza/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#1815SLaBreaAve',
                        redirect: 'http://ogroup.com/listing/1815-s-la-brea-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#9028DicksSt',
                        redirect: 'http://ogroup.com/listing/9028-dicks-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#100SDohenyDrPH1',
                        redirect: 'http://ogroup.com/listing/100-s-doheny-dr-ph1/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#8276WoodshilTrail',
                        redirect: 'http://ogroup.com/listing/8276-woodshil-trail/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#7124HollywoodBlvd1',
                        redirect: 'http://ogroup.com/listing/7124-hollywood-blvd-1/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#8218HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8218-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/14/#24420MalibuRd',
                        redirect: 'http://ogroup.com/listing/24420-malibu-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#450NCamdenDr',
                        redirect: 'http://ogroup.com/listing/450-n-camden-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#6357W5thSt',
                        redirect: 'http://ogroup.com/listing/6357-w-5th-st/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#3992InglewoodBlvd',
                        redirect: 'http://ogroup.com/listing/3992-inglewood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#269NRexfordDr',
                        redirect: 'http://ogroup.com/listing/269-n-rexford-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#1630RisingGlenRd',
                        redirect: 'http://ogroup.com/listing/1630-rising-glen-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#1601NFullerAve404',
                        redirect: 'http://ogroup.com/listing/1601-n-fuller-ave-404/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#8146LaurelViewDr',
                        redirect: 'http://ogroup.com/listing/8146-laurel-view-dr-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#4410WestchesterDr',
                        redirect: 'http://ogroup.com/listing/4410-westchester-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#9314SierraMarDr',
                        redirect: 'http://ogroup.com/listing/9314-sierra-mar-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#9630HeatherRd',
                        redirect: 'http://ogroup.com/listing/9630-heather-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#8654HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8654-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/15/#8003HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8003-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#612NGeneseeAve',
                        redirect: 'http://ogroup.com/listing/612-n-genesee-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#8263HollywoodBlvd',
                        redirect: 'http://ogroup.com/listing/8263-hollywood-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#30SeaColonyDr',
                        redirect: 'http://ogroup.com/listing/30-sea-colony-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#122NKilkeaDr',
                        redirect: 'http://ogroup.com/listing/122-n-kilkea-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#875ComstockAve11DE',
                        redirect: 'http://ogroup.com/listing/875-comstock-ave-11-d-e/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#2856WestbrookAve',
                        redirect: 'http://ogroup.com/listing/2856-westbrook-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#202NCrescentDr4',
                        redirect: 'http://ogroup.com/listing/202-n-crescent-dr-4/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#1516NBeverlyGlenBlvd',
                        redirect: 'http://ogroup.com/listing/1516-beverly-glen-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#1510NBeverlyGlenBlvd',
                        redirect: 'http://ogroup.com/listing/1510-n-beverly-glen-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#825NCrescentHeightsBlvd',
                        redirect: 'http://ogroup.com/listing/825-n-crescent-heights-blvd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#11855GoshenAve306',
                        redirect: 'http://ogroup.com/listing/11855-goshen-ave-306/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/16/#1120GranvilleAve305',
                        redirect: 'http://ogroup.com/listing/1120-granville-ave-305/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#935SDunsmuirAve',
                        redirect: 'http://ogroup.com/listing/935-s-dunsmuir-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#9680HeatherRd',
                        redirect: 'http://ogroup.com/listing/9680-heather-rd/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#8314MarmontLn',
                        redirect: 'http://ogroup.com/listing/8314-marmont-ln/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#2100SunsetPlazaDr',
                        redirect: 'http://ogroup.com/listing/2100-sunset-plaza-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#PanamaCity',
                        redirect: 'http://ogroup.com/listing/panama-city/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#PuntaDelEste',
                        redirect: 'http://ogroup.com/listing/punta-del-este/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#3900DeervaleDr',
                        redirect: 'http://ogroup.com/listing/3900-deervale-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#123822ndSt2',
                        redirect: 'http://ogroup.com/listing/1238-22nd-st-2/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#1310ArmacostAve104',
                        redirect: 'http://ogroup.com/listing/1310-armacost-ave-104/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#4860MammothAve',
                        redirect: 'http://ogroup.com/listing/4860-mammoth-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#4424WhitsettAve206',
                        redirect: 'http://ogroup.com/listing/4424-whitsett-ave-206/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/17/#239SLaskyDr',
                        redirect: 'http://ogroup.com/listing/239-s-lasky-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#2340FoxHillsDrPH3',
                        redirect: 'http://ogroup.com/listing/2340-fox-hills-dr-ph3/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#11547SunshineTer',
                        redirect: 'http://ogroup.com/listing/11547-sunshine-ter/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#1377MillerPl',
                        redirect: 'http://ogroup.com/listing/1377-miller-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#1699NBeverlyDr',
                        redirect: 'http://ogroup.com/listing/1699-n-beverly-dr/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#140SGramercyPl',
                        redirect: 'http://ogroup.com/listing/140-s-gramercy-pl/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#133HollisterAve',
                        redirect: 'http://ogroup.com/listing/133-hollister-ave/',
                        wildcard: false,
                    },
                    {
                        page: 'http://ogroup.com/recent-sales/page/18/#123822ndSt2',
                        redirect: 'http://ogroup.com/listing/1238-22nd-st-2-2/',
                        wildcard: false,
                    },
                ];
            $.each(listingsPageUrl, function (i, v) {
                if (currentPageUrl == v.page) {
                    window.location.href = v.redirect;
                }
            });
        },
        
        listingsPopup: function () {
            $('.pop-sold.listing-item').on('click', function () {
                $('body').addClass('pop-sold-active');
            });
            
            $('.pop-bg, .request-more-info .close, .schedule-showing .close').on('click', function () {
                $('body').removeClass('pop-sold-active popup-show');
            });
        },
        others: function () {
            $('.in-the-media-load-more').click(function () {
                $(this).addClass('hidden');
                $('.in-the-media-article').removeClass('hidden');
            });
            $('.requ-info').click(function () {
                $('.cf-address').val($('.our-properties-single-title').data('title'));
            });
            $('.sc-showing').click(function () {
                $('.cf-address').val($('.our-properties-single-title').data('title'));
            });
            if ($('body').hasClass('single-listing')) {
                $(".our-properties-single-cta .site-button[data-popup='popup-wrap-request'], .our-properties-single-cta .site-button[data-popup='popup-wrap-schedule']").click(function () {
                    $('body').addClass("popup-show");
                });
                $(".pop-outside, .close[data-class='popup-wrap-request']").click(function () {
                    $('body').removeClass("popup-show");
                });
            }
            $('#orig-fb').attr('href', $('.a2a_button_facebook').attr('href'));
            $('#orig-twitter').attr('href', $('.a2a_button_twitter').attr('href'));
            $('#orig-pinterest').attr('href', $('.a2a_button_pinterest').attr('href'));
            $('#orig-google').attr('href', $('.a2a_button_google_plus').attr('href'));
            $('.inner-page-our-properties').parent().attr('class', 'content-Full');
            $('.inner-page-recent-sales').find('#content-full').parent().attr('class', 'content-Full');
            $('.page-numbers').wrap('<li></li>');
            $('.page-numbers.current').wrap('<a href="#" class="active-pager" style="font-color:gray;"></a>');
            $('.active-pager').click(function (e) {
                e.preventDefault;
            });
            $('.post-read-more, .post-title, .post-desc').hover(function () {
                $(this).parent().find('.post-img').addClass('img-hov');
            }, function () {
                $(this).parent().find('.post-img').removeClass('img-hov');
            });
            setTimeout(function () {
                $('.gm-style-pbc').remove();
            }, 3000);
            $('.single-listing .rank-math-breadcrumb span span:nth-child(2)').html('<a property="item" typeof="WebPage" href="http://ogroup.com/properties/our-properties/"><span property="name">Our Listings</span></a>');
            $('.single-neighborhood .rank-math-breadcrumb > span > span:nth-child(1)').append(' &raquo; <span property="itemListElement" typeof="ListItem"><a property="item" typeof="WebPage" href="http://ogroup.com/buyers/neighborhood-guides/"><span property="name">Neighborhood Guides</span></a><meta property="position" content="2"></span> ');
        },
        customPageToFullWidth: function () {
            var $body = $('body'),
                $innerPageWrapper = $('#inner-page-wrapper');
            // Body Class Selector or Inner Pages Selector (On Inner Page Wrapper ID)
            var selectPages = [
                'inner-page-interactive-map',
                'inner-page-jason-oppenheim',
                'inner-page-what-our-clients-are-saying',
                'inner-page-our-properties',
                'page-template-template-our-properties-single',
                'page-template-template-contact-us',
                'inner-page-our-team',
                'inner-page-our-agents',
                'inner-page-our-staff',
                'page-template-template-our-team-single',
                'page-template-template-oppenheim-group',
                'page-template-template-new-development',
                'page-template-template-in-the-media',
                'page-template-template-in-the-media-single',
                'page-template-template-our-offices',
                'page-template-template-community-details',
                'page-template-template-neighborhood-guides',
                'page-template-template-marketing',
                'page-template-template-marketing-list',
                'single-neighborhood',
                'page-template-template-buyers'
            ];
            $.each(selectPages, function (i, v) {
                if ($body.hasClass(v) || $innerPageWrapper.hasClass(v)) {
                    $innerPageWrapper.find('> .container #content-sidebar, > .container #content-full').unwrap();
                    return false;
                }
            });
        },
        
        initListWithUS: function(){
            // List with us
            var refHeight = jQuery(".page-id-4774 .ip-marketing-head").height();
            var titleHeight = jQuery(".ip-marketing-head-wrap .ip-marketing-testi-title").height();
            var imgHeight = jQuery(".ip-marketing-head-img img").height();
            var spacerHeight = (imgHeight - titleHeight) + 5;
            var refWidth = jQuery(".ip-marketing-head").width();
            var conWidth = jQuery(".ip-marketing-head-desc").outerWidth();
            var imgWidth = jQuery(".ip-marketing-head-img img").width();
            var spacerWidth = (imgWidth - ((refWidth - conWidth)/2))+30;
            jQuery(".ip-marketing-head-img-spacer").css('height', spacerHeight+'px');
            jQuery(".ip-marketing-head-img-spacer").css('width', spacerWidth+'px');
            // Marketing
            var refHeightMarketing = jQuery(".ip-marketing-content").height();
            jQuery(".ip-marketing-content-btn").css("height", refHeightMarketing + 'px');
        },
        
        initIntheMedia: function(){
             // jQuery(document).scrollTop(0);
            var cnt = 0;    
            // set locastorage on what post id is clicked
            jQuery("article.in-the-media-article").each(function(){
                var postId = jQuery(this).attr("data-postID");
                jQuery(this).find(".in-the-media-article-content-btn a").click(function(){
                    if (typeof(Storage) !== "undefined") {
                            if(!parseInt(localStorage.getItem("blogPost"))){
                                // console.log("test");
                                localStorage.setItem("blogPost", postId);
                            }else{
                                localStorage.setItem("blogPost", 0);
                            }
                        }
                })
                
            });
            //scroll to post saved in localstorage
            if (typeof(Storage) !== "undefined") {
                if(parseInt(localStorage.getItem("blogPost"))){
                    jQuery("article.in-the-media-article[data-postId='"+localStorage.getItem("blogPost")+"']").each(function(){
                        if (jQuery(this).hasClass('hidden')) {
                            jQuery("a.in-the-media-load-more.site-button").click();   
                              
                        }else{
                                  
                        }
                    })
                    
                            setTimeout(function(){        
                                jQuery('html, body').scrollTop((jQuery("article[data-postId='"+localStorage.getItem("blogPost")+"']").offset().top)-300);
                                localStorage.setItem("blogPost", 0);
                            // console.log("scrollto");
                            },10)   
                    
                    
                }
            }
        },
        createCookie : function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";  
            document.cookie = name + "=" + value + "; path=/";
        },
        readCookie : function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
            
        popUpForm: function () {
			// console.log('11111111112222222');
            var $obj                = this, 
                $popupForm          = jQuery('.site-popup-form'),
                $initialized_popup  = $obj.readCookie('site-popup-form');
            
            jQuery(window).on('load', function () {
                
                // console.log(Cookies.get('site-popup-form'));
                // console.log('test');
                // console.log(Cookies.get());
                if ( $initialized_popup != 'true') {
                    
                    setTimeout(function () {
                        $popupForm.addClass('active');
                        
                        var date = new Date();
                        // var minutes = 1440;
                        var minutes = 525600;  // 1 year
                        date.setTime(date.getTime() + (minutes * 60 * 1000));
                        
                        Cookies.set('site-popup-form', true, { expires: date });
                    }, 10000);
                }
            });
            
            jQuery('.popup-form-wrap, .popup-form-close').on('click', function (e) {
                $popupForm.removeClass('active');
                $obj.createCookie('site-popup-form', 'true', 1);
            });
            
            jQuery('.popup-form-container').on('click', function (e) {
                e.stopImmediatePropagation();
                $obj.createCookie('site-popup-form', 'true', 1);
            });
			
			
			jQuery('.popup-form-field.submit').click(function(){
				setTimeout(function(){
				    var _checkok = jQuery('.wpcf7-mail-sent-ok').text();
				    if( _checkok ){
					    jQuery('span.ai-font-x-sign').click();
                        $obj.createCookie('site-popup-form', 'true', 1);
				    }
				}, 4000);
			}); 
        },
		
		stoppopUpIfloggedin: function () {
			setTimeout(function(){
			var _checkloggedin  = jQuery('li#wp-admin-bar-my-account').html();
			   if(_checkloggedin){
				   jQuery('#site-popup-form').remove();
			   }
			  },3000);
			 setInterval(function(){
				 // console.log('1');
			 });
		},
        hpFeaturedPropertyWidth: function () {
            var max_width = window.innerWidth;
            max_width = max_width * .92;
            jQuery('.fl-container.site-container').css('max-width', max_width + 'px');
        },
		
		conciergeNewPhotoSlides: function () {
            jQuery('.in-the-media-heading-photo').not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				arrows: true,
				appendArrows: '.in-the-media-photo-nav',
				prevArrow: '<span class="prev-button"><em class="ai-font-arrow-b-p"></em></span>',
				nextArrow: '<span class="prev-next"><em class="ai-font-arrow-b-n"></em></span>',
			});
			jQuery('.in-the-media-heading-photo2').not('.slick-initialized').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				arrows: true,
				appendArrows: '.in-the-media-photo-nav2',
				prevArrow: '<span class="prev-button"><em class="ai-font-arrow-b-p"></em></span>',
				nextArrow: '<span class="prev-next"><em class="ai-font-arrow-b-n"></em></span>',
			});
        },
        MapSearchFormImgAlt: function () {
            if (jQuery('#IDX-mapContainer').length > 0) {
                 setTimeout(function(){ 
                    jQuery('#IDX-mapContainer img').attr('alt','IDX Image');
                }, 2000);
            }
        },
        ContactMapImgAlt: function () {
            if (jQuery('#contact-us-info-map').length > 0) {
                 setTimeout(function(){ 
                    jQuery('#contact-us-info-map img, #contact-us-info-map area').attr('alt','IDX Image');
                }, 2000);
            }
        },
        initGoogleTranslate: function () {
            $(".translator-trigger").googleTranslator({
                dropdown: true,
                dropdownFlag: true,
                dropdownChangeText: true,
            });
        },
        initChainHeightBlog: function() {
          /*   $("#our-blog .our-blog-item-details").chainHeight({
                refreshDelay: 100,
                breakpoints: [
                    {
                        min: 992
                    }
                ]
            }); */
        },
        sellingSunsetDoubleTap: function() {
            jQuery('.mobile .netflix-v2-col a').click(function(e) {
                e.preventDefault();
                var a = jQuery(e.currentTarget);
                if ( a.hasClass("open") ) {          
                    var url = a.attr("href");
                    var target = typeof a.attr("target") == 'undefined' ? '_self' : a.attr("target") ;
                    window.open(url,target);
                } else {
                    a.toggleClass('open')
                    a.parent().siblings().find("a").removeClass('open')
                }
            });
        },
        removeHPAltCriticalCSS: function(){
            if (jQuery('body').hasClass('page-id-517015')) {
                jQuery('body').one('scroll mousemove touchend',function(){
                    jQuery('#custom-critical-css').remove();
                })
            }
        },
        listingPriceNoTranslate: function(){
            if(jQuery('.listings-price').length > 0){
                jQuery('.listings-price').each(function(){
                    jQuery(this).attr('translate','no');
                });
            }
        },
        initListingDetailBreadcrumbs: function(){
            if(jQuery('.single-listing')){
                if(jQuery('.properties-status').text().toLowerCase().includes('sold')){
                    jQuery('.our-properties-single-wrap > #inner-page-breadcrumbs p > a').eq(1).attr('href','https://ogroup.com/properties/recent-sales/');
                }else{
                    jQuery('.our-properties-single-wrap > #inner-page-breadcrumbs p > a').eq(1).attr('href','https://ogroup.com/properties/our-properties/');
                }
            }
        },
        initIDXBBreadcrumbs: function(){
            if(window.location.href.indexOf('/idx/search/advanced') > -1){
                jQuery('.entry-title').html('Advanced Search');
                jQuery('#inner-page-breadcrumbs .last').html('Advanced Search');
                jQuery(document).prop('title', 'Advanced Search');
            }
            if(window.location.href.indexOf('/idx/search/listingid') > -1){
                jQuery('.entry-title').html('Listing ID');
                jQuery('#inner-page-breadcrumbs .last').html('Listing ID');
                jQuery(document).prop('title', 'Listing ID');
            }
            if(window.location.href.indexOf('/idx/search/address') > -1){
                jQuery('.entry-title').html('Address');
                jQuery('#inner-page-breadcrumbs .last').html('Address');
                jQuery(document).prop('title', 'Address');
            }
            if(window.location.href.indexOf('/idx/map/mapsearch') > -1){
                jQuery('.entry-title').html('Map Search');
                jQuery('#inner-page-breadcrumbs .last').html('Map Search');
                jQuery(document).prop('title', 'Map Search');
            }
            if(window.location.href.indexOf('/idx/results/listings') > -1){
                jQuery('.entry-title').html('Listings');
                jQuery('#inner-page-breadcrumbs .last').html('Listings');
                jQuery(document).prop('title', 'Listings');
            }
            if(window.location.href.indexOf('/idx/details/listing/') > -1){
                var url = window.location.href;
                var address = url.split('/');
                address = address[address.length - 1].replaceAll('-',' ');
                jQuery('.entry-title').html(address);
                jQuery('#inner-page-breadcrumbs .last').html(address);
            }
        },
        noTranslateListPrice: function() {
            // Search Form
            jQuery('.form-group ._range-label').addClass('notranslate');
            jQuery('.form-group ._range').addClass('notranslate');
            // AIOS Listing
            jQuery('.our-properties-listings').addClass('notranslate');
            // IDXB Results
            if(window.location.href.indexOf('/idx/') > -1) {
                // Advanced Search
                jQuery('.IDX-minPrice-maxPrice').addClass('notranslate');
				 
                // Map Search
				jQuery('#IDX-MapSearch-Form').addClass('notranslate');
                // Listing Details
				jQuery('.IDX-field-listingPrice').addClass('notranslate');
				jQuery('.IDX-field-pricePerSqFt').addClass('notranslate');
			}
        },

        delayInitialization: function(){
    
            function initSectionVisibility(){
                app.testimonials();
                app.ourNumbersProvenPerformance();

                jQuery('#hp-testi').css('opacity', 1);
                jQuery('#hp-fl, #hp-netflix, #hp-welcome, #sl-mag, #hp-new-agents, #hp-cta, #hp-performance, #hp-blog, #sl-intro, #hp-download, .footer .footer-top').fadeIn();
            }
    
            var fired = false;
            window.addEventListener('scroll', function() {
                let scroll = window.scrollY;
                if (scroll > 0  && fired === false) {
                    initSectionVisibility();
                    fired = true;
                }
            },{
                passive: true
            });
    
            document.addEventListener('mousemove', function(e) {
                let m_move = e.screenY;
                if (m_move > 0  && fired === false) {
                    initSectionVisibility();
                    fired = true;
                }
            });
    
            document.addEventListener('touchmove', function(e) {
                let t_move = e.isTrusted;
                if (t_move > 0  && fired === false) {
                    initSectionVisibility();
                    fired = true;
                }
            });
        },

        init: function () {
            
            this.sellingSunsetDoubleTap();
            this.listingPriceNoTranslate();
            this.ContactMapImgAlt();
            this.MapSearchFormImgAlt();
			this.hpFeaturedPropertyWidth();
            this.stoppopUpIfloggedin();
            this.popUpForm();
			//this.conciergeNewPhotoSlides();
            
            /* Initialize Popup Form (Join Our Network) */
            this.checkIfUrlHasToScroll();
            
            /* Initialize Checking of url if meant to be scrolled */
            this.checkIfUrlHasToScroll();
            /* Initialize Range */

            if(!jQuery('body').hasClass('home')) {
                this.range();
            }

            /* Initialize Fixed Header */
            this.fixedHeader();
            /* Initialize Offcanvas */
            this.offcanvas();
            /* Initialize Homepage Slideshow */
            this.homepageSlideshow();
            /* Initialize Meet The Team */
            this.meetTheTeam();
            /* Initialize Testimonials / What Our Client Are Saying */
            // this.testimonials();
            // /* Initialize Our Numbers Proven Performance */
            // this.ourNumbersProvenPerformance();
			
			/* Initialize IP Marketing Global Exposure Numbers Item */
			this.ipMarketingGlobalExposureNumbers();
            /* Initialize Inner Page Breadcrumbs */
            this.innerPageBreadcrumbs();
            /* Initialize Interactive Map */
            this.interactiveMap();
            /* Initialize Our Properties Single */
            this.ourPropertiesSingle();
            /* Initialize Our Team Page */
            this.ourTeamPage();
            /* Initialize Our Team Single Page */
            this.ourTeamSinglePage();
            /* Initialize New Development Page */
            this.newDevelopmentPage();
            /* Initialize Our Offices */
            this.ourOffices();
            /* Private Homepage */
            //this.privatehomepageScripts();
            if (jQuery('body').hasClass('single-listing')) {
                this.showHideDetails();
                this.ListingDetailsBtn();
            }
            /* Initialize New Homepage */
            this.newHomepage();
            /* Initialize Neighborhood Guides */
            this.neighborhoodGuides();
            /* Initialize Other functions */
            this.others();
            /* Initialize Custom Page To Full Width */
            this.customPageToFullWidth();
            /* Initialize Nav Tab Double Tap */
            this.navTabDoubleTap();
            /* Initialize Listings Popup */
            this.listingsPopup();
            this.initGoogleTranslate();
            this.initChainHeightBlog();
            if (jQuery('body').hasClass('page-id-4774') && jQuery(window).width() > 991) {
                this.initListWithUS();
            }
            if (jQuery('body').hasClass('page-id-4756')) {
                this.initIntheMedia();
            }
            jQuery(".properties-single-slideshow-info").animate({
                right: 0
            }, 1000);
            this.initIDXBBreadcrumbs();     
            
            this.noTranslateListPrice();

            this.delayInitialization();

            app.removeHPAltCriticalCSS();
        },
        /*singleListingFirstLetter: function() {
            if(jQuery('body').hasClass('single-listing')) {
                jQuery('.our-properties-single-content').html(function (i, html) {
                    return html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="sl-first-letter">$1</span>');
                });
            }
        },*/
    }
    /* Initialize Listings Page Redirects before the dom gets ready */
    app.listingsPageRedirects();
    $(document).ready(function () {

        /*serach radio buttons*/
        if ( jQuery('.our-properties-form').length ) {
            jQuery('.our-properties-form .form-checkboxes-bigger-text input[type="checkbox"]').click(function(e){
                jQuery('.our-properties-form .form-checkboxes-bigger-text input[type="checkbox"]').prop('checked', false);
                jQuery(this).prop('checked', true);
            });
        }
        // translate fix
        // jQuery('.ip-marketing-list-tab').addClass('notranslate');
        if (jQuery('body').hasClass('page-template-template-custom-office') || jQuery('body').hasClass('page-template-template-west-hollywood') || 
            jQuery('body').hasClass('page-template-template-custom-office-gallery')) {
            jQuery('span.scroll-to-gallery').click(function(){
                jQuery( 'html, body' ).animate( { scrollTop: jQuery('.our-offices-party-gallery').offset().top - 100 }, 600 );
            });
        }
        /*properties page*/
        jQuery('#orange-neighborhoods, #losangeles-neighborhoods').change(function(){
            
            $oc = jQuery('#orange-neighborhoods');
            $la = jQuery('#losangeles-neighborhoods');
            if ( ($oc.is(':checked') === true && $la.is(':checked') === true) || ($oc.is(':checked') === false && $la.is(':checked') === false) ) {
                jQuery('#area option').show();
            } else if ( $oc.is(':checked') ) {
                jQuery('#area option[data-type="la"]').hide();
            } else if ( $la.is(':checked') ) {
                jQuery('#area option[data-type="oc"]').hide();
            }
        });
        jQuery("#rentalCheck").click(function(){   
             var checkBox = document.getElementById("rentalCheck");
            
            if (checkBox.checked == true){
                jQuery('#status').val('for lease');
            } else {
               jQuery('#status').val('');
            }
        });
        
    
        /* Initialize All app functions */
        app.init();
        /* PS. Add mixed/uncategorized functions/scripts on app.others() function!!! */
        $(window).resize(function(){
            if (jQuery('body').hasClass('page-id-4774') && jQuery(window).width() > 991) {
                app.initListWithUS();
            }
            if (jQuery('body').hasClass('single-listing')) {
                // app.showHideDetails();
                app.ListingDetailsBtn();
            }
            if (jQuery('body').hasClass('home') && (jQuery('html').hasClass('chrome-true') || jQuery('html').hasClass('safari-true'))) {
                var max_width = window.innerWidth;
            max_width = max_width * .92;
            jQuery('.fl-container.site-container').css('max-width', max_width + 'px');
            }
            
        });
        $(window).load(function(){
            if (jQuery('body').hasClass('page-id-4774') && jQuery(window).width() > 991) {
                app.initListWithUS();
            }
            app.initListingDetailBreadcrumbs();
        });
        detectWidth();
      // privatehomepageScripts();
        jQuery(window).resize(function () {
            //privatehomepageScripts();
            detectWidth();
           // privatehomepageScripts();
        });
  /*      function privatehomepageScripts(){
            var path_privatehomepage = window.location.pathname; 
                path_privatehomepage_new = path_privatehomepage.split('/');
                                if (path_privatehomepage_new[1] == "private-homepage") {
                                                jQuery('.fl-item').each(function(){
                                                    if(jQuery(window).width() <= 1440 ){
                                                    		    jQuery(this).find('.fl-img').css('background-size','170%');
  
                                                                    jQuery(this).hover(
                                                                            function () {
                                                                                jQuery(this).find('.fl-img').stop().animate({backgroundSize: '190%'}, 250).addClass('flitemcolored');
                                                                            },function () 
                                                                            {
                                                                                jQuery(this).find('.fl-img').stop().animate({backgroundSize: '170%'}, 250).removeClass('flitemcolored');
                                                                            }
                                                                     );
                                                
                                                    }
                                                    else{
                                                    		    jQuery(this).find('.fl-img').css('background-size','140%');
                                                                    jQuery(this).hover(
                                                                            function () {
                                                                                jQuery(this).find('.fl-img').stop().animate({backgroundSize: '160%'}, 250).addClass('flitemcolored');
                                                                            },function () 
                                                                            {
                                                                                jQuery(this).find('.fl-img').stop().animate({backgroundSize: '140%'}, 250).removeClass('flitemcolored');
                                                                             }
                                                                     );
                                                        
                                                    }
                                                });
                                          
                                }
        }
*/
        function detectWidth() {
            var devw = jQuery(window).width();
            var comm_height = jQuery('#content .community-details-title.site-section-title span').height();
            if (devw > 1440) {
                if(comm_height <= 90) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-270px');
                } else if((comm_height <= 140) && (comm_height > 90)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-230px');
                } else if((comm_height <= 180) && (comm_height > 140)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-180px');
                }
                
            } else if ((devw <= 1440) && (devw > 1280)) {
                if(comm_height <= 90) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-230px');
                } else if((comm_height <= 140) && (comm_height > 90)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-190px');
                } else if((comm_height <= 180) && (comm_height > 140)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-140px');
                }
            } else if ((devw <= 1280) && (devw > 1150)) {
                if(comm_height <= 90) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-180px');
                } else if((comm_height <= 140) && (comm_height > 90)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-140px');
                } else if((comm_height <= 180) && (comm_height > 140)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-90px');
                }
            } else if ((devw <= 1150) && (devw > 1100)) {
                if(comm_height <= 90) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-260px');
                } else if((comm_height <= 140) && (comm_height > 90)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-190px');
                } else if((comm_height <= 210) && (comm_height > 140)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-120px');
                }
            } else if (devw <= 1100) {
                if(comm_height <= 90) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-255px');
                } else if((comm_height <= 140) && (comm_height > 90)) {
                    jQuery('.neighborhood-template-default .community-details-text').css('margin-top', '-190px');
                }
            }
        };
    });
})(jQuery);