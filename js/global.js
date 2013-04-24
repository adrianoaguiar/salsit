(function($) {

	var Salsit = {

		init: function() {
			
			this.helpers.init();
			this.bind();
		
			this.homePage();
			this.limited_rack();
			this.hot_styles();

		},
		
		bind: function() {

			// Replace select boxes with custom styling
			//$(".toolbar select").customSelect();
				
			// Keyboard navigation for slides
			$(document).keydown(function(e){
				if (e.keyCode == 37) {
					$('.bx-prev').click();
				} else if (e.keyCode == 39) {
					$('.bx-next').click();
				}
			});


			var container = $('.product .gallery .more_images img');
			container.on("mouseover", function() {
				$(this).click();
			});

			
		},
		
		homePage: function() {

			var radioContainer = $(".product .label-radio-configurable");

			if (radioContainer.length) {
				radioContainer.each( function(index) {
					var radioTitle = $(this).find('span').text();
					$(this).append('<div class="ss-radio">' + radioTitle + '</div>');
				});
			}

			$(".ss-radio", radioContainer).on('click', function() {
				$(this).parent().find('input:radio').attr('checked', 'checked');

				$(".ss-radio", radioContainer).removeClass('checked');
				$(this).addClass('checked');
			});

		},


		limited_rack: function() {

			if ($("body").hasClass("category-limited-rack")) {

				$(".products-grid").bxSlider({
					minSlides: 3,
					maxSlides: 3,
					slideWidth			:	300,
					infiniteLoop		:	true,
					hideControlOnEnd	:	true
					//easing				:	'ease-in-out'
				});

				// Disabled link following on bxSlider nav arrow clicks
				$('.bx-prev, .bx-next').click(function(e) {
					e.preventDefault;
				});
			}


		},


		hot_styles: function() {

			if ($("body").hasClass("category-hot-styles")) {
				//$(".category-image").append('<div class="category-menu"><a href="/hot-styles/be-cute">Be Cute</a> | <a href="/hot-styles/be-wild">Be Wild</a></div>');
			}


		},



		fancybox: {
			
			init: function() {
				//$("nav a[href^='http'], nav a[href*='index-php']").fancybox({
				$("[rel~='fancybox']").fancybox( this.options() );
			},
			
			options : function(options) {
				return $.extend({
					padding			: 0,
					autoSize		: true,
					autoCenter		: true,
					maxWidth		: 1000,
					maxHeight		: 800,
					arrows			: true,
					closeBtn		: true,
					loop			: false,
					wrapCSS			: 'no-scrollbars',
					iframe			: {
						scrolling	: 'no'
					}
				}, options);
			},
			
			mediaOptions: function(options) {
				return $.extend({
					type			: 'iframe',
					scrolling		: 'no',
					padding			: 0,
					margin			: [40, 0, 20, 0],
					wrapCSS			: 'no-scrollbars',
					autoCenter		: true,
					closeClick		: false,
					fitToView		: true,
					loop			: false,
					width			: 1000,
					/*helpers			: {
						overlay		: {
							closeClick	: false
						}
					},*/
					beforeShow		: function() {
						$("body").css({'overflow':'hidden'});
					},
					afterClose		: function() {
						$("body").css({'overflow':'auto'});
					}
				}, options);
			}

		},


		
		helpers: {
			
			scrollElement: 'html, body',
			scrolling: false,
			
			init: function() {
				
				this.toTop();
				
				// Find out which browser supported root element to use for scrolling
				// http://www.zachstronaut.com/posts/2009/01/18/jquery-smooth-scroll-bugs.html
				$('html, body').each(function () {
					var initScrollTop = $(this).attr('scrollTop');
					$(this).attr('scrollTop', initScrollTop + 1);
					if ($(this).attr('scrollTop') == initScrollTop + 1) {
						this.scrollElement = this.nodeName.toLowerCase();
						$(this).attr('scrollTop', initScrollTop);
						return false;
					}    
				});
				

				// Open external links in new windows
				$('a[rel="external"]').click( function() {
					window.open( $(this).attr('href') );
					return false;
				});
				
				// Open all external links in a new window
				$('a').each(function() {
					if ( !($(this).hasClass('live') || $(this).hasClass('fancybox') || $(this).attr('rel') == "fancybox") ) {
						var a = new RegExp('/' + window.location.host + '/'); var b = new RegExp('postback');
						if(!a.test(this.href) && !b.test(this.href.toLowerCase())) {
							$(this).click(function(event) {
								event.preventDefault(); event.stopPropagation(); window.open(this.href, '_blank');
							});
						}
					}
				});
			},
			
			padWithZeros: function(num, max) {
				num = num.toString();
				return num.length < max ? this.padWithZeros("0" + num, max) : num;
			},
			
			
			scrollContent: function(step, speed) {
				
				var amount = "+=" + step + "px";
				
				$(Salsit.helpers.scrollElement).animate({
					scrollTop: amount
				}, speed, function() {
					if (Salsit.helpers.scrolling) {
						Salsit.helpers.scrollContent(step, speed);
					}
				});
			},

			toTop: function() {

				// Scroll to Top START
			    $("#totop").hide();
			    $(window).scroll(function () {
			        if ($(this).scrollTop() > 700) {
			            $('#totop').fadeIn();
			        } else {
			            $('#totop').fadeOut();
			        }
			    });

			    // scroll body to 0px on click
			    $('#totop').click(function () {
			        $('body, html').animate({ scrollTop: 0 }, 800);
			        return false;
			    });
			    // Scroll to Top END
			}
			
		}
		
	};




	$(function(){

		$('body').append('<div id="totop"></div>');;

		Salsit.init();

	});


/*!
 * jquery.customSelect() - v0.3.3
 * http://adam.co/lab/jquery/customselect/
 * 2013-03-04
 *
 * Copyright 2013 Adam Coulombe
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License
 */
(function(a){a.fn.extend({customSelect:function(b){var c={customClass:null,mapClass:true,mapStyle:true},d=function(f,i){var e=f.find(":selected"),h=i.children(":first"),g=e.html()||"&nbsp;";h.html(g);setTimeout(function(){i.removeClass("customSelectOpen")},60)};if(typeof document.body.style.maxHeight==="undefined"){return this}b=a.extend(c,b);return this.each(function(){var e=a(this),g=a('<span class="customSelectInner" />'),f=a('<span class="customSelect" />');f.append(g);e.after(f);if(b.customClass){f.addClass(b.customClass)}if(b.mapClass){f.addClass(e.attr("class"))}if(b.mapStyle){f.attr("style",e.attr("style"))}e.addClass("hasCustomSelect").on("update",function(){d(e,f);var i=parseInt(e.outerWidth(),10)-(parseInt(f.outerWidth(),10)-parseInt(f.width(),10));f.css({display:"inline-block"});var h=f.outerHeight();if(e.attr("disabled")){f.addClass("customSelectDisabled")}else{f.removeClass("customSelectDisabled")}g.css({width:i,display:"inline-block"});e.css({"-webkit-appearance":"menulist-button",width:f.outerWidth(),position:"absolute",opacity:0,height:h,fontSize:f.css("font-size")})}).on("change",function(){f.addClass("customSelectChanged");d(e,f)}).on("keyup",function(){e.blur();e.focus()}).on("mousedown",function(){f.removeClass("customSelectChanged").addClass("customSelectOpen")}).focus(function(){f.removeClass("customSelectChanged").addClass("customSelectFocus")}).blur(function(){f.removeClass("customSelectFocus customSelectOpen")}).hover(function(){f.addClass("customSelectHover")},function(){f.removeClass("customSelectHover")}).trigger("update")})}})})(jQuery);


})($j);