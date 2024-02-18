/*!

	Pure Black/White - Creative Multipurpose Template
	Copyright (c) 2011-2021, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 2.0.0
	Release Date: July 2015
    Last change: Jaunary 2021
	
*/	


"use strict";
		
/* Initialize supersized fullscreen image gallery */
		  function superGalleryInit (mc){	
		  	
			  var transType = 1;	
			  var mc2 = mc;

			  if(mc){
				  if(mc.length > 0){					   
					  for(var kj=0; kj<mc.length; kj++){
						  if( $(mc[kj]).attr("data-supersizeTransition") !== undefined){
							  mc2 = $(mc[kj]);
						  }
					  }
				  }					  
				  transType = isNaN(mc2.attr("data-supersizeTransition")) ? transType : Number(mc2.attr("data-supersizeTransition"));
			  }
				
			  jQuery(function($){
				  $.supersized({
					  slideshow               	:   1,			// Slideshow on/off
					  autoplay					:	1,			// Slideshow starts playing automatically
					  transition				:	transType,	// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left, 8-slide top bottom
					  slide_interval          	:   4000,		// Length between transitions	
					  kenburn					: 	false,		// Enable/Disable kenburn effect
					  
			  
					  slides 	:  	[	// Slideshow Images, image_small attribute is used to load the mobile version image, main_title attribute is used to add the image tile div
									  // For kenburn effect, zoomIn attribute is used, just add yes or no for zoomin and zoomout, To remove the kenburn effect just leave it blank value. 
									  {   image 			: 'images/home_slider/home_slide_image2.jpg', 
										  image_small 		: 'images/home_slider/home_slide_image2_s.jpg', 
										  main_title 		: ".home_slider_title1", 
										  slide_interval	: 5000},
										  
									  {   image 			: 'images/home_slider/home_slide_image1.jpg', 
										  image_small 		: 'images/home_slider/home_slide_image1_s.jpg', 
										  main_title 		: ".home_slider_title2", 
										  slide_interval	: 5000},
										  
									  {   image 			: 'images/home_slider/home_slide_image3.jpg', 
										  image_small 		: 'images/home_slider/home_slide_image3_s.jpg', 
										  main_title 		: ".home_slider_title3", 
										  slide_interval	: 5000},
									  {   image 			: 'images/home_slider/home_slide_image4.jpg', 
										  image_small 		: 'images/home_slider/home_slide_image5_s.jpg', 
										  main_title 		: ".home_slider_title4", 
										  slide_interval	: 5000},
										    
									  {   image 			: 'images/home_slider/home_slide_image5.jpg', 
										  image_small 		: 'images/home_slider/home_slide_image6_s.jpg',
										  main_title 		: ".home_slider_title5", 
										  slide_interval	: 5000}										   
									  
								  ]
				  });
			  });	
			  
		  }
		   

/* Initialize owlcarousel plugin */		  
		function owlSliderInit (mc, eventClickMc){
			mc.find('.owlSlider').each(function(){	
				var owlMc =	$(this);	
				owlMc.find("img").css({"visibility":"visible"}).show();
				var owlAutoplay = owlMc.attr("data-owlAutoplay") === "no" ? false : true;
				var touchDrag = owlMc.attr("data-touchDrag") === "no" ? false : true; 
				var autoplayTimeout = owlMc.attr("data-autoplayTimeout") === undefined ? 4500 : owlMc.attr("data-autoplayTimeout");
				var autoplayHoverPause = owlMc.attr("data-autoplayHoverPause") === "no" ? false : true;
				owlMc.data("autoPlayRun", false);
				
				if(!owlAutoplay){
					owlMc.data("playIt", false);
				}else{
					owlMc.data("playIt", true);
					}
				
				
				var dirNav = owlMc.find(".owlDirNav");				
				if(dirNav.length>0){
					dirNav.hide();
					$("body").prepend(dirNav)
				}

				if(owlMc.hasClass("owlSingleSlider")){
						owlMc.data("owlLoad", true);
						owlMc.owlCarousel({
							items : 1,
							nav : false, // Show next and prev buttons
							autoplay:false,
							autoplaySpeed:700,
							autoplayTimeout:autoplayTimeout,
							loop:true,
   							autoplayHoverPause:autoplayHoverPause,
							touchDrag : touchDrag,
							navSpeed:700,
							dots : true,
							dotsSpeed : 700														 
						});
						
						owlMc.find('.owl-dot').on('click', function () {
							owlMc.data("autoPlayRun", false);	
							owlMc.trigger('stop.owl.autoplay');            
						})						
						
								
						owlMc.find('.owlDirNav').on('click', function () {							
							owlMc.data("autoPlayRun", false);	
							owlMc.trigger('stop.owl.autoplay');            
						})
	
				}
				
				
				if(owlMc.hasClass("owlSlider_4")){					
					var itmShow4;
							if(owlMc.hasClass("showMinOneItem")){
								itmShow4 = {0:{ items:1 }, 480:{ items:2 }, 991:{ items:3 }, 1400:{ items:4 }, 1800:{ items:5 } };
							}else{
								itmShow4 = {0:{ items:1 }, 860:{ items:2 }, 1260:{ items:3 }, 1600:{ items:4 } };
								}
								
					owlMc.data("owlLoad", true);
					owlMc.owlCarousel({
					  responsive: itmShow4,	
					  nav : false, // Show next and prev buttons
					  autoplay:false,
					  autoplaySpeed:700,
					  autoplayTimeout:autoplayTimeout,
					  autoplayHoverPause:autoplayHoverPause,
					  touchDrag : touchDrag,	
					  navSpeed:700,				  
					  dots : true,
					  dotsSpeed : 700
					});					
				}
				
				if(owlMc.hasClass("owlSlider_5")){
					owlMc.data("owlLoad", true);
										
					var itmShow;
					if(owlMc.hasClass("showMinOneItem")){
						itmShow = {0:{ items:1 }, 480:{ items:2 }, 991:{ items:3 }, 1400:{ items:4 }, 1800:{ items:5 } };
					}else{
						itmShow = {0:{ items:2 }, 480:{ items:3 }, 786:{ items:4 }, 1600:{ items:5 } };
						}
						
					owlMc.owlCarousel({	
					  responsive: itmShow,							
					  nav : false, // Show next and prev buttons
					  autoplay:false,
					  autoplaySpeed:700,
					  autoplayTimeout:autoplayTimeout,
					  autoplayHoverPause:autoplayHoverPause,
					  touchDrag : touchDrag,
					  navSpeed:700,				 
					  dots : true,
					  dotsSpeed : 700
					});		
				}	
				

				try{
					if(dirNav.length>0){
						owlMc.prepend(dirNav.show());			
						dirNav.find(".owlNextBtn").on(eventClickMc, function(){ 
							owlMc.data("autoPlayRun", false);	
							owlMc.trigger('stop.owl.autoplay'); 
							owlMc.trigger('next.owl.carousel', [700]);
						});
						dirNav.find(".owlPrevBtn").on(eventClickMc, function(){ 
							owlMc.data("autoPlayRun", false);	
							owlMc.trigger('stop.owl.autoplay'); 
							owlMc.trigger('prev.owl.carousel', [700]);
						});
					}
				} catch (e) { }
				
				
				
			});
		 }
		 
		 
		$(document).ready(function(){
			

				
			/* Site Main plug-in initialize */
				jQuery(function($){
					$("body").mainFm({
						
						animationSpeed : 1000,		// Default animation speed						
						
						slideshowSpeed : 5000		// FlexSlider slideshow speed 
						
					});
				});
				
				
			/* Portfolio masonry plugi-n initialize */
			$("body").find(".portfolioPage").each(function(){
				
				var porfolioPg = $(this);
				
				$(function(){
			  
			  		var $container = porfolioPg.find(".masonry_items");
			  		var $optionSets = porfolioPg.find('.options .option-set');
					
					if($optionSets.length < 1){
						$optionSets = $(porfolioPg.attr("data-portfolioCategoryPath"));						
					}
					
					var $optionLinks = $optionSets.find('a');
			
					  $optionLinks.on('click', function() {
						var $this = $(this);
						
						// don't proceed if already selected
						if ( $this.hasClass('selected') ) {
						  return false;
						}
						var $optionSet = $this.parents('.option-set');
						$optionSet.find('.selected').removeClass('selected');
						$this.addClass('selected');
						
						$container.find(".item").removeClass("selPopup");
				  
						// make option object dynamically, i.e. { filter: '.my-filter-class' }
						   var options = {},
							  key = $optionSet.attr('data-option-key'),
							  value = $this.attr('data-option-value');
						  // parse 'false' as false boolean
						  value = value === 'false' ? false : value;
						  options[ key ] = value;
						  
						   $container.find(value).addClass("selPopup");
						   
						  if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
							// changes in layout modes need extra logic
							changeLayoutMode( $this, options )
						  } else {
							// otherwise, apply new options
							$container.isotope( options );
						  }
						
						return false;
					  });
				});	
				
				
				// Portfolio Filterable gallery project detail plug-in initialize

				jQuery(function($){
					porfolioPg.detailPage({
						filter : porfolioPg.find(".options")
					})
				});	
					
			});	
				
			
				
	
			// Email submit action			
				$("#email_submit").on('click', function() {
										
					$('#reply_message').removeClass();
					$('#reply_message').html('')
					var regEx = "";	 
									
					// validate Name				
					var name = $("input#name").val();  
					regEx=/^[A-Za-z .'-]+$/; 
					if (name == "" || name == "Name"  || !regEx.test(name)) { 
						$("input#name").val(''); 
						$("input#name").focus();  
						return false;  
					}
					
					// validate Email						  
					var email = $("input#email").val();  
					regEx=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;											
					if (email == "" || email == "Email" || !regEx.test(email)) { 
						$("input#email").val(''); 
						$("input#email").focus();  
						return false;  
					}  
					
					// validate comment			
					var comments = $("textarea#comments").val(); 
					if (comments == "" || comments == "Comments..." || comments.length < 2) { 
						$("textarea#comments").val(''); 
						$("textarea#comments").focus();  
						return false;  
					}  
										
					var dataString = 'name='+ $("input#name").val() + '&email=' + $("input#email").val() + '&comments=' + $("textarea#comments").val();									
					$('#reply_message').addClass('email_loading');
					
					// Send form data to mailer.php 
					$.ajax({
						type: "POST",
						url: "php/mailer.php",
						data: dataString,
						success: function() {
							$('#reply_message').removeClass('email_loading');
							$('#reply_message').addClass('list3');
							$('#reply_message').html("Mail sent sucessfully")
							.hide()
							.fadeIn(1500);
								}
							});
					return false;				
				});	
				
				
				
				$("#joinus_submit").click(function() {									
					$('#reply_joinus_message').removeClass();
					$('#reply_joinus_message').html('');
					var regEx = "";	 
					
					// validate Email						  
					var email = $(".form_news input").val();  
					regEx=/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;											
					if (email == "" || email == "JOIN OUR NEWS LETTER" || !regEx.test(email)) { 
						$(".form_news input").val(''); 
						$(".form_news input").focus();  
						return false;  
					} 
										
					var dataString = 'joinus_email=' + $(".form_news input").val();									
					$('#reply_joinus_message').addClass('email_loading');
					
					
					// Send form data to mailer.php 
					$.ajax({
						type: "POST",
						url: "php/mailer.joinus.php",
						data: dataString,
						success: function() {
							$('#reply_joinus_message').removeClass('email_loading');
							$('#reply_joinus_message').addClass('list3');
							$('#reply_joinus_message').html("Added sucessfully")
							.hide()
							.fadeIn(1500);
								}
							});
					return false;				
				});	
			
					
					
		});	