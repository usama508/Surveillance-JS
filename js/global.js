( function($) {

	var aios_starter_theme = {

		init: function(){

			this.aiosFramePopUp();
			this.aiosImagePopUp();
			this.aiosContentPopup();
			this.aios_scroll_top();


		},
		aiosFramePopUp: function(){

			$('.aios-frame-popup, .aios-video-popup').aiosPopup({
			  disableOn: 700,
			  type: 'iframe',
			  mainClass: 'aiosp-fade',
			  removalDelay: 160,
			  preloader: false,
			  fixedBgPos: true,
			  fixedContentPos: true
			});	
		},
		aiosImagePopUp: function(){
			$('.aios-image-popup').aiosPopup({
				type: 'image',
				closeOnContentClick: true,
				mainClass: 'aiosp-img-mobile',
				image: {
				verticalFit: true
				}
			});
		},
		aiosContentPopup: function(){

			$('.aios-content-popup').aiosPopup({
    			type: 'inline',
    			preloader: false,
    			focus: '#username',
    			modal: true,
    			callbacks : {
    				open : function(){
    					var aiosContent=  $('.aiosp-content');
    				 	aiosContent.addClass('aios-popup-body')
    				 	$('.aios-popup-body').append('<button title="%title%" type="button" class="aiosp-close">&#215;</button>')
    					aiosContent.parent().append('<div class="outside-content"></div>');
    					$('.outside-content').on('click', function(){
    						$(this).aiosPopup('close');
    					})
    				}
    			}
    		});
		},
		aios_scroll_top : function(){

			var aios_scroll_to = $(".aios-scroll-to");
			
			var aios_scroll_offset = aios_scroll_to.data('offset');

			var aios_scroll_speed = aios_scroll_to.data('speed');

			aios_scroll_to.on('click', function(e) {
				 e.preventDefault();
				 var target = $(this).attr('href');
				 $('html, body').animate({
				   scrollTop: ($(target).offset().top - aios_scroll_offset)
				 }, aios_scroll_speed);
			});
		}
		
	}

	
	jQuery(document).ready( function() {
		aios_starter_theme.init();

	});

	jQuery(window).resize( function() {

	});


	jQuery(window).load(function(){

	})

})(jQuery);

