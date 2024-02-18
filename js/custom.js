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
		
/* Define required varaible */
	var isMobile = screen.width <= 767; 
	var mobileDevice = screen.width < 1024 && screen.height < 1024;
	var isSmartPhone = ((screen.width <= 959) || (screen.height <= 959));
	var ipad = (screen.width === 768 || screen.height === 768) && (screen.width === 1024 || screen.height === 1024) ;
	var lowResDesktop = window.innerWidth <= 979;
	var isMobileChk = screen.width < 768;
	var isMouseDrag = ($("body").hasClass("not_mouseDrag") ||  $("body").hasClass("not_onepage_ver")) ? false : true;	
	var siteStartOpen = false;
	var scrollPos = 0;
	var flxDelay = 5000;
	var headerClose = false;
	var pageHeaderHeight = 90;
	var pageHeaderHeight_mini = 0;
	var defaultVolume = 0;
	var apiRS;
	var supersizedOnBody = true;	
	var superSliderLoad = false;
	var sSliderInter;
	var pageBorder_z = 60;
	
	
	var isTouch = false;
	var swipeThreshold = 75;
	var siteStartOpen = false;
	var scrollPos = 0;
	var flxDelay = 5000;
	var fmUrl = undefined;
	var currentPage_menu = "home";
	var leftMenu = true;
	var pageAlignCenter =  false;
	var scrollHorizontal =  false;
	var onePageVersion =  false;
	var browserWebkit;	
	/* set top Menu height - to fix the browser bug */
	var topMenuHeight = 60;
	/* Enable/disable Menuauto Hide */
	var menuAutoHide = true;
	/* preload images are defined here */	
	var preLoadImgs = [];
	
	var cssAnimate = true;
	
	var animateSyntax = "transition";
	
	
	var BigVid;
	var bgVideopath = "videos/video.mp4";
	
	
	/* set the Final date in YYYY/MM/DD HH:SEC:MIN formate  */
	var countdown_value = '2016/10/18 00:00:00 ';
	var countdown_finish = 'countdown finished';
	
	
	var agent;
	var ipadDevice;
	var iPhoneDevice;
	var iVersion;
	var retinaDevice;	

	var fancy_bgCol = "#fff";
	var fancy_bgCol_alpha = 1;
	
	var aniInEff = "animated fast fadeIn";
	var aniOutEff = "animated fast fadeOut";
	

	$(document).ready(function(){
	
		
		var templateBody = $("body");
		
		/* Setting tool create */

		var prevz = '<div class="setting_tools hideTool">';
		prevz += '<a class="iButton"><i class="fa fa-gears" ></i></a>'; 	
		prevz += '<div class="setting_holder">';
		prevz += '<p class="noPadding">Move Panel : &nbsp; <a class="button mUp"><i class="fa fa-long-arrow-up" ></i></a> <a  class="button mDown"><i class="fa fa-long-arrow-down" ></i></a></p>'; 
		prevz += '<hr class="separator_bar">';
		prevz += '<p class="first">Color</p>';
		prevz += '<a class="colWhite button"></a>';
		prevz += '<a class="colBlack button"></a>';
		prevz += '<p>Page Border</p>';
		prevz += '<a class="borderType2 button">Add</a>';
		prevz += '<a class="borderType1 button">Remove</a>';
		prevz += '<p class="first">Menu</p>';
		prevz += '<a class="mType1 button">Normal</a>';
		prevz += '<a class="mType2 button">Inverse</a>';
		/*prevz += '<p>FONT</p>';
		prevz += '<a class="fontStyle2 button">Bebas Neue</a>' ;    
		prevz += '<a class="fontStyle1 button">Raleway</a>' ;*/
		prevz += '<p>Highlight color</p>';
		prevz += '<a class="temHigLight1 button"></a>';
		prevz += '<a class="temHigLight2 button"></a>';	
		prevz += '<a class="temHigLight3 button"></a>';
		prevz += '<p></p>';
		prevz += '</div></div>';
	//	$("body").prepend( prevz );
		
	
		var prevTst = '<a class="button tst"></a>'; 	
		prevTst += '<a class="button tst2"></a>';
	//	$("body").prepend( prevTst );
	
	
	
	
		
		var eventHoverMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'mouseover';
		var eventHoutMc = ('ontouchstart' in document.documentElement) ? 'mouseleave' : 'mouseleave';
		var eventClickMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'mousedown';
		
		cssAnimate = Modernizr.webgl ? true : false;
		animateSyntax = cssAnimate ? "transition" : "animate";
		
		/* Find touch device */		
		if (window.navigator.msMaxTouchPoints) {
			isTouch = Boolean(window.navigator.msMaxTouchPoints>1);			
		} else if (window.navigator.maxTouchPoints && window.navigator.pointerEnabled) {
			isTouch = Boolean(window.navigator.maxTouchPoints);			
		} else {
			isTouch = Modernizr.touch;
		}
		


		retinaDevice = window.devicePixelRatio !== undefined &&  window.devicePixelRatio > 1 ? true : false;
		
		if(retinaDevice){
			templateBody.addClass("retinaDevice");
		}
		
		if(!isTouch){
			templateBody.addClass("notTouchDevice");
		}else{
			templateBody.addClass("touchDevice");
		}

		pageHeaderHeight = templateBody.hasClass("horizontal_layout") || $(".header").hasClass("menuType1") ? 90 : 55;
		
		
		
		
		// Find ipad device
		agent = (window.navigator.userAgent).toLowerCase();
		ipadDevice = agent.indexOf("ipad") > -1;
		iPhoneDevice = agent.indexOf("iphone") > -1;
		iVersion = agent.slice(agent.indexOf("version/")+8,agent.indexOf("version/")+11);
		
		fancy_bgCol = $('body').hasClass("white_ver") ? "#fff" : "#111";
		fancy_bgCol_alpha = .98;
		
		var iimg = !retinaDevice ? "images/supersized/pause.png" : "images/supersized/pause@2x.png";
		$("#pauseplay").attr("src",iimg);
		
		$(".addFxEmbossBtn li a").addClass("fxEmbossBtn");
		$(".addFxEmbossBtn li a").append('<span class="btn_hover"></span> ');

		
		
		if( ! ($.browser.msie && ($.browser.version <= 11)) && !isTouch ) {
			templateBody.addClass("addCssTransition");
		}
		
		if( (($.browser.version < 10))) {
			templateBody.addClass("itsBadIE");
		}
		
		if(isTouch){	
			$(".hideInTouchDevice").remove();
			$(".removeInTouchDevice").remove();				
		}
		
		
/* Fit Text plugin Initialization */	
		try { $(".fittext1").fitText(1.5, { minFontSize: '12px', maxFontSize: '85px' }); } catch (e) { }
		try { $(".fittext2").fitText(1.2, { minFontSize: '12px', maxFontSize: '60px' }); } catch (e) { }
		try { $(".fittext3").fitText(1.1, { minFontSize: '12px', maxFontSize: '40px' }); } catch (e) { }
		
		
	// FitVids Initialization
		try {  $(".container").fitVids(); } catch (e) { }
		try {  $(".container-fluid").fitVids(); } catch (e) { }	
	
	
// Smart Menu
	try {
		$(".smartMenu_btn").on(eventClickMc, function(event) { 		
			if(templateBody.hasClass("menuCloseIt")){
				templateBody.removeClass("menuCloseIt");
				templateBody.addClass("menuOpenIt");	
				templateBody.removeClass("autoHideMenuDisable");	
				templateBody.addClass("autoHideMenuEnable");					
			}else{
				templateBody.removeClass("menuOpenIt");
				templateBody.addClass("menuCloseIt");
				templateBody.removeClass("autoHideMenuEnable");
				templateBody.addClass("autoHideMenuDisable");
			}
		});
	} catch (e) { }
	
	try {	
		var fixHorMenu = $(".smartMenu_fixBtn");
		if(fixHorMenu.length > 0){
			var itmAct = $(fixHorMenu.attr("data-openCloseItem"));
			fixHorMenu.on(eventClickMc, function(event) { 				
				if(itmAct.hasClass("openIt")){
					itmAct.removeClass("openIt");
					itmAct.addClass("closeIt");				
				}else{
					itmAct.addClass("openIt");
					itmAct.removeClass("closeIt");						
				}
			});
		}
	} catch (e) { }	
	
	try {	
		var navHorMenu = $(".horizontal-nav");
		if(navHorMenu.length > 0){
			var itmNavAct = $(navHorMenu.attr("data-openCloseItem"));
			navHorMenu.find("li a").on(eventClickMc, function(event) { 
				setTimeout( function(){
					itmNavAct.removeClass("openIt");
					itmNavAct.addClass("closeIt");
				}, 500);	
			});
		}
	} catch (e) { }		
		
		
		$(".autoHideMenu").on(eventClickMc, function(event) {
			$("body").removeClass("menuOpenIt");
			$("body").addClass("menuCloseIt");
			$("body").removeClass("autoHideMenuEnable");
			$("body").addClass("autoHideMenuDisable");
		});
		
	
// Mobile Menu
	
		$(".mobile_menu_btn").on(eventClickMc, function(event) {
			
			if($(".header_content").css("display") === "block"){
				$(".header_content").data("open", false);				
				$(".header").removeClass("menuOpen");
			}else{
				$(".header_content").data("open", true);				
				$(".header").addClass("menuOpen");				
			}
			
			if($(".headerFixed_content").css("display") === "block"){
				$(".headerFixed_content").data("open", false);				
				$(".headerFixed").removeClass("menuOpen");
				
				$($(this).attr("data-openCloseItem")).removeClass("openIt");	
				$($(this).attr("data-openCloseItem")).addClass("closeIt");
			}else{
				$(".headerFixed_content").data("open", true);				
				$(".headerFixed").addClass("menuOpen");
				
				$($(this).attr("data-openCloseItem")).removeClass("closeIt");	
				$($(this).attr("data-openCloseItem")).addClass("openIt");				
			}
			
			setTimeout( function(){ if(!isTouch){ $("html").getNiceScroll().resize(); }	 }, 500);
		});
		
	
		$("#options").each(function(){
			$(this).addClass("options" );
		});
		
		$("#filters").each(function(){
			$(this).addClass("filters" );
		});
		
		$(".options .catName").each(function(){
			$(this).children(":first-child").clone().appendTo($(this));
			$(this).children(":last-child").addClass("iover")
			$(this).children(":first-child").addClass("nover")
		});
	

	$(".post_blog").each(function(){
			var p_mc = $(this);
			var len = $(this).children().length;
			p_mc.data("cm", 0);

			
			for (var ik=0; ik < len; ik++){
				var nm = $(this).children().eq(ik);				
				nm.data("nn", ik);				
				$(this).children().eq(ik).on("mouseover", function(event) {
					var ni = $(this);					
					if(p_mc.data("cm") !== ni.data("nn")){
						
						if(p_mc.data("cm") > ni.data("nn") ){
							p_mc.addClass("cursorMoveUp");
						}else{
							p_mc.removeClass("cursorMoveUp");
						}
					}

					p_mc.data("cm", ni.data("nn"));
								
				});				
			}
			
		});
	
// magnificPopup plugin Initialization 

		//Initialize Image
		$('.magnificPopup').each(function(){
			var mc = $(this);
			var tit = mc.attr("data-title") !== undefined ? "data-title" : "title";
			var typ = mc.attr("data-type") !== undefined ? mc.attr("data-type") : "image";
			mc.magnificPopup({
			  image: { titleSrc : tit },
			  type: typ,
			  removalDelay: 500, //delay removal by X to allow out-animation
			  callbacks: {
				change: function() {
					this.content.addClass("animated fadeInLeft");
				  },
			  },
			  closeOnContentClick: true,
			  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			 });
		 });	
		  
		 
		 //Initialize Gallery
		 $('.magnificPopup_gallery').each(function() { // the containers for all your galleries
			$(this).magnificPopup({
				delegate: 'a', // the selector for gallery item
				type: 'image',
				gallery: {
				  enabled:true
				},
				callbacks: {
				change: function() {
					this.content.addClass("animated fadeInLeft");
				  },
				},
				closeOnContentClick: true,
				midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		}); 	
			 
		 
		 // Initialize portfolio item gallery
		 $('.magnificPopup_item_gallery').each(function(){
			 var mc = $(this);
			var  p_items = [];
			 mc.find(".i_gallery").children().each(function(){
				var mc2 = $(this);
				var tit = mc2.attr("data-title") !== undefined ? mc2.attr("data-title") : mc2.attr("title");
				p_items.push({ src : mc2.attr("data-href") , title : tit, type : mc2.attr("data-type") });
			});			
		 	mc.magnificPopup({	
				items:  p_items, // the selector for gallery item
				type: 'image', // this is default type
			  	removalDelay: 500, //delay removal by X to allow out-animation
				gallery: {
				  enabled:true
				},
			  	callbacks: {
				change: function() {
					this.content.addClass("animated fadeInLeft");
				  },
			  	},
			  	closeOnContentClick: true,
			 	midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		});
		
		// Initialize inline content
		$('.magnificPopup_inline').magnificPopup({
		  type:'inline',
		  callbacks: {
		  change: function() {
			  this.content.addClass("animated fadeInLeft");
			},
		  },
		  closeOnContentClick: true,
		  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});

	
		// Initialize popup detail text	
		$('.detail_text').each(function(){	
			var cont = $(this).find(".popup_text")
			$(this).find(".link_btn").magnificPopup({
			  items: {
				  src: cont,
				  type: 'inline'
			  },
			  removalDelay: 500, //delay removal by X to allow out-animation				  
			  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
			});
		});
		
		
		$('.ajaxPopup_link').magnificPopup({
			type: 'ajax',
			settings: null,
			alignTop: false,
			cursor: 'mfp-ajax-cur',
			closeOnContentClick: false,
			closeBtnInside : true
		});
		
		
		try{
			 //Initialize Gallery
			 $('.ajaxPopup_gallery').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					delegate: '.selPopup a.ajaxPopup_galItem', // the selector for gallery item
					type: 'ajax',
					settings: null,
					alignTop: true,
					cursor: 'mfp-ajax-cur',
					gallery: {
					  enabled:true
					},
					closeOnContentClick: false,
					midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
				});
			}); 	
		}	catch (e) { }
		
		
// Initialize Background video show Hide button code
		
		$(".bgVideoBtn").each(function(){
			var on_ = $(this).find(".videoUnMute");
			var off_ = $(this).find(".videoMute");
			
			on_.on(eventClickMc, function(event) {
				off_.show();
				on_.hide();
			});
			
			off_.on(eventClickMc, function(event) {
				off_.hide();
				on_.show();
			});
			
		});

		
		
// Load Big Video for desktop 
		
			if(Modernizr.video){
						
				$(function() {
					BigVid = new $.BigVideo();
					BigVid.init();					
				});				

				$(".vidPlyPauBtn").data("view", true);
				
				$("body").find('.big_video').each(function(){
					var vmc = $(this);
					var vpath = "";
					var vVolume = "";
					if(vmc.attr("data-background-video") !== undefined){
						vpath = vmc.attr("data-background-video");
						vVolume = isNaN(vmc.attr("data-video-volume")) ? defaultVolume : Number(vmc.attr("data-video-volume"));
					};
					
					vmc.find(".vidPlyPauBtn").each(function() {
						$(this).data("vpath", vpath);
						$(this).data("vVolume", vVolume);
						$(this).data("vHolder", vmc);
					});
					
					vmc.find(".vidPlyPauBtn").on('click', function() {
						if(bgVideopath !== $(this).data("vpath")) {								
							$("#big-video-wrap").css({"display":"block"});				
							$("#big-video-vid").css({"display":"block"});
							$(this).data("vHolder").append($("#big-video-wrap"));	
							bgVideopath = $(this).data("vpath");	
							if(BigVid !== undefined){
								var vpp = bgVideopath.split(",");
								if(vpp < 2){
									BigVid.show(vpp[0] );
								}else{
									BigVid.show(vpp[0], {altSource:vpp[1]}  );
								}
								BigVid.getPlayer().volume($(this).data("vVolume")); 
							}	
							$("#big-video-wrap").css({"display":"block"});
							$("#big-video-vid").css({"display":"block"});
							$(this).find("i").addClass("highlight");	
												
						}else{											
							if($("#big-video-wrap").css("display") !== "none"){
								BigVid.getPlayer().pause();
								$(this).find("i").removeClass("highlight");
								$("#big-video-vid").css({"display":"none"});
								$("#big-video-wrap").css({"display":"none"});
							}else{														
								BigVid.getPlayer().play();
								$(this).find("i").addClass("highlight");
								$("#big-video-vid").css({"display":"block"});
								$("#big-video-wrap").css({"display":"block"});
							}
						}
						
						
					});
				});
				$("#big-video-wrap").css({"display":"none"});
			}
			
		
		
		/* Twitter initialize  		*/		
							
		$(function () {
			// start jqtweet!
			try{
				if($('#jstwitter').length>0){
					JQTWEET.loadTweets( { numTweets: 5 } );
				}
			}catch(e){}
		});	
		
			
/* Flicker feed */
		

		try {  
		   $('.flickerFeed').each(function(){
			   var numItem = $(this).attr("data-numPost") ? Number($(this).attr("data-numPost")) : 6;
				$(this).jflickrfeed({
				limit: numItem,
				qstrings: {
					id: '52617155@N08'
				},
				itemTemplate:
				'<li>' +
					'<a class="flickerPop" href="{{image}}" title="{{title}}">' +
						'<img src="{{image_s}}" alt="{{title}}" />' +
					'</a>' +
				'</li>'
			  }, function(data) {			  
					
			  });
		  });
		  
		 
		   $('.flickerFeed').each(function(){
				$(this).magnificPopup({
				  delegate: 'a', // child items selector, by clicking on it popup will open
				  type: 'image',
				  gallery:{
					enabled:true
				  },
				  removalDelay: 500, //delay removal by X to allow out-animation
				  callbacks: {
					change: function() {
						this.content.addClass("animated fadeInLeft");
					  },
				  },
				  closeOnContentClick: true,
				  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
				});
		  	});
			
			
			
		} catch (e) { }		
		
		  

// Hexagon mask fix
  		if(!Modernizr.cssmask){
			$(".hexagon").addClass('circular');
		}
	
		try {
		
			/* Contact page close button*/	
			$(".closeBtn").on('click', function() {
				var sel =	$($(this).attr("data-content"));
				if( parseInt(sel.css("top"), 10) < sel.height()-70){
					sel[animateSyntax]({"top":sel.height()-50},500, "easeInOutQuart");
					$(this).children(":first-child").children(":first-child").css({"right" : "0px"});
				}else{
					sel[animateSyntax]({"top":"0px"},500, "easeInOutQuart");
					$(this).children(":first-child").children(":first-child").css({"right" : "-40px"});
				}
			});
			
			
			/* Add background if it placed below the parallax */
			$("body").find(".inverseStyle.parallax").each(function(){
				$(this).prepend('<div class="inverseStyle" style="position:absolute; width:100%; height:100%; top:0px; left:0px">  </div>')
			});
			
			
			$("body").find(".contentWrapper.lightStyle.parallax").each(function(){
				$(this).prepend('<div class="lightStyle" style="position:absolute; width:100%; height:100%; top:0px; left:0px">  </div>')
			});
			
		} catch (e) { }

		

// initialize Tab
		
		$('body').find('ul.nav-tabs > li > a').each( function(){
			
			 $($(this).attr('href')).data("vidd",  $($(this).attr('href')).find('.tabVideo .addVideo') );
		});
		
		$('body').on('click', 'ul.nav-tabs > li > a', function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr('href');
			
			
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();

				//Make Tab Active
				$(this).parent().siblings().children('a').parent().removeClass('active');
				$(this).parent().addClass('active');
								
			
				//Show Tab Content & add active class
				$(contentLocation).addClass('active').siblings().removeClass('active');
				
				$('body').find('ul.tabs > li > a').each( function(){
					$($(this).attr('href')).find('.tabVideo .addVideo').remove();
				});

				$(contentLocation).find('.tabVideo').append($(contentLocation).data("vidd"))
				
				$("body").mainFm('scroll_update');
					
				$(contentLocation).find('.graph_container').each(function() {
					$("body").mainFm('graph_display',$(this));
				});
			}
		});



		
// initialize tipsy 

		try{
			$('.hastip').tipsy({gravity: 's'});		
			$('.dotted-nav li a').tipsy({gravity: 'n', opacity:1 });
			$('.dotted-nav li a, .nav.onlyIcon').on('click', function() {
				$(".tipsy").hide();
				});
		}	catch (e) { }


	
// initialize Graph
		
		$("body").find('.contentWrapper').each(function(){
			$(this).find('.graph_container').each(function(){
				$(this).find('li').each(function() {
					var selK = $(this).find(".display");
					$(this).each(function() {
						var vall = parseInt($(this).attr('data-level'), 10) >= 100 ? "0%" : (100 - parseInt($(this).attr('data-level'), 10))+"%";
						$(this).children(':first-child').css("width",vall);						
						selK.text(parseInt($(this).attr('data-level'), 10));
					});
				});
			});

		});
		
		
// Accordion
		
		jQuery(function($){
				 
			$('.accordion').each( function(){
				
				var allDt = $(this);
				var allPanels = allDt.find(' > dd').hide();
				allDt.find(' dt a').removeClass("active");
				 
				if($(this).attr("data-openFirstElement") === "true"){
				  $(this).children(":first-child").find("a").data('show',true);
				  $(this).children(":first-child").find("a").addClass("active");
				  var $target =  $(this).children(":first-child").next();
				  $target.addClass('active').slideDown();
				}
				
				
				$(this).find(' > dt > a').on('click', function() {
					var $this = $(this);
					var $target =  $this.parent().next();
					
					$("body").mainFm('intVideoObject', $this);				
					$("body").find('.tabVideo').each(function(){
						$(this).find('.vid').remove();
						$(this).find('img').show();
						$(this).find('.video_hover').show().css({"z-index":"5"});
					});
					
					$target.find("a.lazyload").each(function(){
						$("body").mainFm('lazyLoadInt', $(this));
					});
					
					$target.find("a.lazyload_single").each(function(){
						$("body").mainFm('lazyLoadInt', $(this));
					});
					
					$target.find("a.lazyload_fluid").each(function(){
						$("body").mainFm('lazyLoadInt', $(this));
					});
										
					
					$("body").mainFm('intVideoObject', $this);
									
					$("body").find('.tabVideo').each(function(){
						$(this).find('.vid').remove();
						$(this).find('img').show();
						$(this).find('.video_hover').show().css({"z-index":"5"});
					});
					
					
					if($(this).parent().parent().attr("data-autoHide") !== "false"){
						if($this.hasClass("active")){
							allDt.find(' dt a').removeClass("active");
							allPanels.removeClass('active').slideUp();
						}else{
						allDt.find(' dt a').removeClass("active");
						$this.addClass("active");
						$target =  $this.parent().next();
						if(!$target.hasClass('active')){
							allPanels.removeClass('active').slideUp();
							$target.addClass('active').slideDown();
						}
						
						}
					}else{	
						
						if($this.data('show')){
							$this.data('show',false);
							$this.removeClass("active");
							$target.removeClass('active').slideUp();
						}else{
							$this.data('show',true);
							$this.addClass("active");
							$target.addClass('active').slideDown();							
						}
						
					}
					
					setTimeout(function(){ $("body").mainFm('scroll_update'); },500);
					
					return false;
				});
			});
		}); 
	
		jQuery(function($){
		  var allPanels = $('.accordion_autoHide > dd').hide();
		  $('.accordion_autoHide > dt > a').prepend('<span class="closeOpen" ></span>');
		  $('.accordion_autoHide > dt > a').on('click', function() {
			$('.accordion_autoHide dt a').removeClass("active");
			var $this = $(this);
			$this.addClass("active");
			$target =  $this.parent().next();
			if(!$target.hasClass('active')){
			  allPanels.removeClass('active').slideUp();
			  $target.addClass('active').slideDown();
			}

			setTimeout(function(){ $("body").mainFm('scroll_update'); },500);
			return false;
		  });
		});
	
	});






		

/* initialize vimeo player */



function vimeo_video(mc){
	(function(){
	  // Listen for the ready event for any vimeo video players on the page
	  var  player = document.querySelector(mc);
	   $f(player).addEvent('ready', ready);
	  

	  function addEvent(element, eventName, callback) {
		  if (element.addEventListener) {
			  element.addEventListener(eventName, callback, false);
		  }
		  else {
			  element.attachEvent('on' + eventName, callback);
		  }
	  }

	  function ready(player_id) {
		  // Keep a reference to Froogaloop for this player
		  var container = document.getElementById(player_id).parentNode.parentNode,

			  froogaloop = $f(player_id);
		  
		  //buttons = container.querySelector('div dl.simple'),
			  var volumeBtn = container.querySelector('.volume');
			  
			  if(volumeBtn){
				  froogaloop.api('setVolume', 0);
			   
				  // Call setVolume when volume button clicked
				  addEvent(volumeBtn, 'click', function(e) {
					  // Don't do anything if clicking on anything but the button (such as the input field)
					  if (e.target != this) {
						  return false;
					  }
	
					  // Grab the value in the input field
					  var volumeVal = this.querySelector('input').value;
	
					  // Call the api via froogaloop
					  froogaloop.api('setVolume', volumeVal);
				  }, false);
	
				  // Call setLoop when loop button clicked 
			  }
	  }
  })();
}



/* cycle slideshow plugin  initialize */

function cycle_pluign(mc){
	var aniType = mc.attr("data-transition") ? mc.attr("data-transition") : 'scrollDown';
	var tim = !isNaN(mc.attr("data-starttime")) ? Number(mc.attr("data-starttime")) : 0;
	var tim_end = !isNaN(mc.attr("data-endtime")) ? Number(mc.attr("data-endtime")) : 2000;
	var easingType = mc.attr("data-easing") ? mc.attr("data-easing") : 'easeInOutBack';
	var pauseHover = mc.attr("data-pauseHover") === "no" ? false : true;
	mc.hide();
	var nextBtn = mc.find(".next");
	var prevBtn = mc.find(".prev");
	mc.parent().find(".cycleNextPrev").append(nextBtn);
	mc.parent().find(".cycleNextPrev").append(prevBtn);
	setTimeout(function(){
		mc.show();
		mc.cycle({
			fx: aniType, // choose your transition type, ex: fade, scrollUp, shuffle, etc...
			speed:    1000, 
			easing: easingType,
			containerResize: 1,
			cleartypeNoBg:true,
			slideResize:      1,
			timeout:  tim_end ,
			pause:   pauseHover,
			next: nextBtn,
            prev: prevBtn
		});
	}, tim)
}	







// initialize elastislide slider, Used in fullScreen Gallery, Portfolio detail page gallery (see portfolio.html file)
	
	function carousel_gallery_int (mc){	

		mc.find(".carousel_thumbails").css({"visibility":"hidden", "opacity":0});							
		var current = 0,					
		$carouselEl = mc.find(".carousel_thumbails"),
		$preview = $( mc.attr("data-link") ),
		$carouselItems = $carouselEl.children(),
		isFullScreen = mc.hasClass("fullScreen"),
		isSmoothResize = $preview.hasClass("smooth_resize"),
		smothFirstLod = true,
		nextBtn = $preview.find('.proj_next'),
		prevBtn = $preview.find('.proj_prev'),
		fullNextBtn = $preview.find(".gallery_navigations a.next_button"),
		fullPrevBtn = $preview.find(".gallery_navigations a.previous_button"),
		fullClosBtn = $preview.find(".gallery_navigations a.thumbClose_btn"),
		
		carousel = $carouselEl.elastislide( {
			current : current,
			minItems : 1,
			onClick : function( el, pos, evt ) {
				changeImage( el, pos, isFullScreen);
				evt.preventDefault();
			},
			onReady : function() {
				mc.find(".carousel_thumbails").css({"visibility":"visible"}).animate({"opacity":1}, 200, "easeInOutQuart");		
					 
				try{
					var thu = $( mc.data("thu"));
					var sc = thu.find('.thumbClose_btn .btn_icon');
					var cc = thu;
					thu.css({"visibility":"visible"});
					if(self.alignPgHor && !isTouch){
						ele.mCustomScrollbar("update");
						ele.mCustomScrollbar("scrollTo","top");	
					}
					
					thu.addClass("mobileView");
					sc.children(":first-child").text("Thumbnails");					
					
					if(sc.data("firLod") === undefined){
						sc.data("firLod", true);
					}
					
					prevBtn.css({"opacity":.5});

					nextBtn.on('click', function() { goNextSlider(); });					
					prevBtn.on('click', function() {  goPrevSlider(); });
					fullNextBtn.on('click', function() { goNextSlider(); });
					fullPrevBtn.on('click', function() { goPrevSlider(); });					
					
					fullClosBtn.on('click', function() {			
						if(!mc.data("thu").hasClass("miniView")){
							var ccc = $carouselEl.data("cur");
							if($carouselEl.data("cur") < 3 || $carouselEl.data("cur") > $carouselEl.children().length-5){
								ccc = $carouselEl.data("cur") < 3 ? 3 : $carouselEl.children().length-5;
							}
							carousel._slideTo(ccc);
						}
					});
					
					
				} catch(e){ }
					
					if($preview !== undefined && (isTouch || !isMouseDrag)){
						try{		  
						$(function() {	
							$preview.swipe( {
								//Generic swipe handler for all directions
								swipe:function(event, direction, distance, duration, fingerCount) {
									if(direction === "left"){
										goNextSlider();
									}
									if(direction === "right"){
										goPrevSlider();
									}
									
								},
								allowPageScroll : "vertical",
								//Default is 75px, set to 0 for demo so any distance triggers swipe
								threshold:swipeThreshold
							});
						});
						
					  }catch(e){}
					}					
					mc.data("thu").data("cHovBtn", "nx");
					setTimeout(function(){ changeImage( $carouselItems.eq( current ), current, isFullScreen ); }, 1000)	
				} 
					                 
			});
		
		var interval;
		
		function goNextSlider(){				
			
			if($carouselItems.length-1 > current){							
				  current = current+1;	
			}else{
				 current = 0;
			}
									
			$carouselItems.removeClass( 'current-img' );
			$carouselItems.eq( current ).addClass( 'current-img' );
			if(!$($carouselEl).parent().parent().parent().hasClass("withoutThumb")){
				carousel.setCurrent( current );			
			}
			changeImage( $carouselItems.eq( current ), current, false );			
			mc.data("thu").data("cHovBtn", "nx");			  			
		}
		
		function goPrevSlider(){
			if(current > 0){							
				current = current - 1;	
			}else{
				current = $carouselItems.length-1;
			}				
			$carouselItems.removeClass( 'current-img' );
			$carouselItems.eq( current ).addClass( 'current-img' );
			if(!$($carouselEl).parent().parent().parent().hasClass("withoutThumb")){
				carousel.setCurrent( current );
			}
			changeImage( $carouselItems.eq( current ), current, false );			
			mc.data("thu").data("cHovBtn", "px");
		}
			
		function changeImage( el, pos, isFullScreen ) {				
					
			if(isSmoothResize && !smothFirstLod){
				$preview.css({"height":$preview.height()});				
			}	
			
			$("body").mainFm('fullScreenGallery', $preview);					

			var nn = 0;		
			
			var inAnimat = "";
			var outAnimat = "";			
					
			$preview.data("startLoaded", false);
			
			function resetImg (mc){
				$preview.data("startLoaded", true);	
			};
						 
			$preview.find(".carousel_item").each(function(){				
				if("#"+$(this).attr("id") != el.data( 'preview')){
					clearInterval(interval);
					
					if( $(this).css("display") !== "none"){
						nn++;
					 
						 var kk = -5;
						 var self = $(this);
						 var aniInTyp = "";
						 var aniOutTyp = "";
						 
						 var mc_ = $(this);
						 var jj = 0;
					  
						if(jj == 0){
					  
							mc_.find(".animated").each(function(){
							  $(this).removeClass($(this).attr("data-in"));
							  $(this).removeClass($(this).attr("data-out"));
							});
							
							mc_.find(".animated").each(function(){
							 $(this).addClass($(this).attr("data-out"));
							});
							
							$preview.css({"height":  $preview.outerHeight() });
							
							setTimeout(function(){ mc_.hide(); },500);			
							resetImg(mc_);
						}
					}
				}				  
			});
			
			var displayInterval = 600;
			if(nn === 0){
				displayInterval = 0;
				$preview.data("startLoaded", true);
			}
			
			interval =	setInterval(function(){

				if($preview.data("startLoaded") == undefined){
					clearInterval(interval); 
				}
				
				if($preview.data("startLoaded")){
					clearInterval(interval); 
					
					  var itm = $preview.find(el.data('preview'));					  
					  itm.find("a.lazyload").each(function(){	
						var dd = $(this);		
						$("body").mainFm('lazyLoadInt', $(this))
					  });
					  
					  itm.find("a.lazyload_gallery").each(function(){
						  var dd2 = $(this);		
						 $("body").mainFm('lazyLoadInt', $(this))
					  });
					  
					  var pattern = $preview.find(".overlayPattern");
					  if(!isTouch){	
						pattern.show();
						 itm.find(".addVideo").each(function(){
							$(this).find(".overlayPattern").show();
							pattern.hide();
						});
					  }else{
						   pattern.hide();
					  }
					  
					  var kk = -5;
					  var mc_ = itm;
					  var leng = 0;
					  var aniTyp  = inAnimat;
					  
					 var mct = $preview.find(el.data('preview'));
					 
					 mct.stop().show();
					 
					mct.find(".animated").each(function(){
						$(this).removeClass($(this).attr("data-in"));
						$(this).removeClass($(this).attr("data-out"));
					  });
					  
					mct.find(".animated").each(function(){
					 	$(this).addClass($(this).attr("data-in"));
					});
					
					if(isSmoothResize){
						  $preview.delay(600).animate({"height": $preview.outerHeight()}, 500 , "easeInOutQuart", function(){
							  $preview.css({"height": "auto"});
						  });
					 }
					
					$("body").mainFm('scroll_update');						  				  
					  
				}
			}, displayInterval);				  
  
				  
			$carouselItems.removeClass( 'current-img' );
			el.addClass( 'current-img' );
			if(!$($carouselEl).parent().parent().parent().hasClass("withoutThumb")){
				carousel.setCurrent( pos );	
			}

			$carouselEl.data("cur", pos);		
			

			prevBtn.css({"opacity":1});
			nextBtn.css({"opacity":1});
			
			if(pos > $carouselItems.length-2){
				nextBtn.css({"opacity":.5});				
			}
			
			if(pos < 1){
				prevBtn.css({"opacity":.5});
			}	
			
			current = pos;
					
			var tim = $carouselEl.data("fLod") === undefined ?  3500 : 1200;
			$carouselEl.data("fLod" , true);

		}
		
		$carouselEl.data("fn",changeImage);
		$carouselEl.data("pl",carousel);
		
		
}








// Google map Code

/**/

var gMapStore;
var mapPos;
var latlng;
var wWid_ = window.innerWidth;
var wHig_ = window.innerHeight;
var pointerHorPos = wWid_ > 991 ? wWid_/4 - 40 :  0;
var pointerVerPos = 0;

function map_initialize() {
  "use strict";  

	var map;
	var openedInfoWindow = null;
	
	var context = new AudioContext();
	
	pointerHorPos = wWid_ > 991 && !$("#map_canvas").hasClass("pointerCenter") ? wWid_/4 - 40 :  0;
	
	mapPos = new google.maps.LatLng(34.05223, -118.24368);
	latlng = mapPos;

	var MY_MAPTYPE_ID = 'custom_style';
  
  	  var featureOpts = [
    {
      stylers: [
        { hue: "#222222" },
        { visibility: 'simplified' },
        { saturation: -100 },
        { weight: .5 }
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: '#222222' }
      ]
    }
  ];
  
  
  
 var styledMapOptions = {
	  name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);
  
  var companyPos = mapPos;
  var settings = {
	  zoom: 15,
	  scrollwheel: false,
	  center: latlng,
	  mapTypeControl: true,
	  
	  navigationControl: true,
	  navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
	  mapTypeId: MY_MAPTYPE_ID};
		
	var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	

  	map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

	google.maps.Map.prototype.panToWithOffset = function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView();
		ov.onAdd = function() {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
		}; 
		ov.draw = function() {}; 
		ov.setMap(this); 
	};
	
	map.panToWithOffset(latlng, pointerHorPos, pointerVerPos);
	 
	var contentString = '<div id="content">'+
		'<div id="siteNotice">'+
		'</div>'+
		'<h4 id="firstHeading" class="mapStyle firstHeading">FMediastudios</h4>'+
		'<div id="mapStyle">'+
		'<p class="mapStyle">Leading web design studio</p>'+
		'</div>'+
		'</div>';
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	var companyImage = new google.maps.MarkerImage('images/map/logo.png',
		new google.maps.Size(100,100),
		new google.maps.Point(0,0),
		new google.maps.Point(50,100)
	);

	var companyShadow = new google.maps.MarkerImage('images/map/logo_shadow.png',
		new google.maps.Size(130,50),
		new google.maps.Point(0,0),
		new google.maps.Point(65, 100));

	/*var companyPos = new google.maps.LatLng(57.0442, 9.9116);*/

	var companyMarker = new google.maps.Marker({
		position: companyPos,
		map: map,
		icon: companyImage,
		shadow: companyShadow,
		title:"Høgenhaug",
		zIndex: 3});
	
	gMapStore = map;
	
	google.maps.event.addListener(companyMarker, 'click', function() {
		if (openedInfoWindow != null) openedInfoWindow.close();  // <-- changed this
		infowindow.open(map,companyMarker);	
		openedInfoWindow = infowindow;
      	google.maps.event.addListener(infowindow, 'closeclick', function() {
		   map.panToWithOffset(latlng, pointerHorPos, pointerVerPos);
		});	
	});
	
	var mapInterval;
	$(window).resize(function() {	
		clearInterval(mapInterval);
		mapInterval = setInterval(function(){
			clearInterval(mapInterval); 
			wHig_ = window.innerHeight;
			mapResizer();
		},700);
	});
	
}

function mapResizer(){
	return;
	wWid_ = window.innerWidth;
	wHig_ = window.innerHeight;
	pointerHorPos = wWid_ > 991 && !$("#map_canvas").hasClass("pointerCenter") ? wWid_/4 - 40 :  0;
	pointerVerPos = 0;
	try{
	gMapStore.panToWithOffset(latlng, pointerHorPos, pointerVerPos);
	} catch (e) { }
}



