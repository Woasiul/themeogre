(function ($) {
	'use strict';
	
	var themeogre = themeogre || {};
	
	themeogre.init = function () {
		this.body = $(document.body);
		
		this.hero_slider();
		this.menu_toggle();
		this.quick_view();
		this.modal_backdrop();
		this.body_freeze();
		this.body_click();
		this.search_form();
		this.product_tab();
		this.toggle_switcher();
		
		this.body.trigger('themeogre_init', [themeogre]);
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.product_tab = function () {
		this.body
				.on('click', '.product-tab__navigation li', function (e) {
					let $this = $(this),
							$form = $this.closest('form'),
							value = $this.attr('data-category');
					
					$form.find('input[name="product_cat"]').val(value).trigger('change');
					
					if (value) {
						let action = 'http://themeogre.wp/shop/?' + $form.serialize();
						$form.attr('action', action).submit();
					}
				})
				.on('change', '.product-tabs select.orderby', function (e) {
					let $this = $(this),
							$form = $this.closest('form'),
							value = $this.val();
					
					if (value) {
						let action = 'http://themeogre.wp/shop/?' + $form.serialize();
						$form.attr('action', action).submit();
					}
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.body_click = function () {
		this.body
				.on('click', function (e) {
					let target = $(e.target);
					
					if (!target.closest('.search-form').length) {
						$('#masthead').removeClass('search-active');
					}
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.search_form = function () {
		this.body
				.on('click', '.search-form span.icon', function (e) {
					let $form = $(this).closest('.search-form');
					
					$form.find('input.search-field').focus();
					$('#masthead').addClass('search-active');
				})
				.on('click', '.search-active .search-form span.icon', function (e) {
					let $form = $(this).closest('form'),
							search_value = $form.find('.search-field').val();
					
					if (search_value.length) {
						$form.submit();
					}
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.body_freeze = function () {
		this.body
				.on('disable_scroll', function (e) {
					let scrollTop =
							window.pageYOffset || document.documentElement.scrollTop;
					let scrollLeft =
							window.pageXOffset || document.documentElement.scrollLeft;
					
					window.onscroll = function () {
						window.scrollTo(scrollLeft, scrollTop);
					};
				})
				.on('enable_scroll', function (e) {
					window.onscroll = function () {
					};
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.modal_backdrop = function () {
		this.body
				.on('click', '#modal-backdrop', function (e) {
					themeogre.body.removeClass('navigation-active freeze').trigger('enable_scroll');
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.menu_toggle = function () {
		this.body
				.on('click', '.menu-toggle', function (e) {
					if (themeogre.body.hasClass('navigation-active')) {
						themeogre.body.removeClass('navigation-active freeze').trigger('enable_scroll');
					} else {
						themeogre.body.addClass('navigation-active freeze').trigger('disable_scroll');
					}
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.quick_view = function () {
		this.body
				.on('click', 'a.quick-view.open-paypal', function (e) {
					let product_id = $this.data('product_id'),
							$modal = $('#quickview-modal'),
							$product = $modal.find('.product-container');
					
					themeogre.body.addClass('quickview-active freeze').trigger('disable_scroll');
					$modal.addClass('modal-active loading');
					$product.html('');
					
					$product.load('ajax-single.html#product-' + product_id);
				})
				
				.on('click', '#quickview-modal', function (e) {
					let target = $(e.target);
					
					if (target.hasClass('quickview-modal')) {
						$('#quickview-modal').removeClass('modal-active');
						themeogre.body.removeClass('quickview-active freeze').trigger('enable_scroll');
					}
				});
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.hero_slider = function () {
		// Carousel
		let $carousel = $('.carousel');
		
		if ($carousel.length) {
			$carousel.slick({
				autoplay: false,
				arrows: false,
				dots: false
			});
		}
		
		// Typewriter
		let $typewriter = $('#typewriter');
		
		if ($typewriter.length) {
			new Typewriter('#typewriter', {
				strings: ['Wordpress', 'Joomla', 'Opentcart', 'Magento'],
				autoStart: true,
				loop: true,
			});
		}
	};
	
	
	/**
	 * Toggle AdminBar On Press Ctrl+Q
	 */
	themeogre.toggle_switcher = function () {
		themeogre.body
				.on('keyup', function (e) {
					if (81 === e.keyCode && e.ctrlKey) {
						
						if (themeogre.body.hasClass('gumroad-active')) {
							themeogre.body.removeClass('gumroad-active').addClass('paypal-active');
							setup_paypal();
							
						} else if (themeogre.body.hasClass('paypal-active')) {
							themeogre.body.removeClass('paypal-active');
							reset_ogre();
							
						} else {
							themeogre.body.addClass('gumroad-active');
							setup_gumroad();
						}
						
					}
				});
		
		function setup_gumroad() {
			$('a.quick-view').each(function () {
				let $this = $(this),
						gum_link = $this.attr('data-road');
				
				$this.attr('href', 'https://gum.co/' + gum_link);
			});
		}
		
		function setup_paypal() {
			$('a.quick-view').each(function () {
				$(this).addClass('open-paypal').attr('href', 'javascript:void(0)');
			});
		}
		
		function reset_ogre() {
			$('a.quick-view').each(function () {
				$(this).removeClass('open-paypal');
			});
		}
	};
	
	
	/**
	 * Document ready
	 */
	$(function () {
		themeogre.init();
	});
})(jQuery);
