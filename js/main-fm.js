/*!
	Pure Black/White - Creative Multipurpose Template
	Copyright (c) 2011-2021, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 2.0.0
	Release Date: July 2015
    Last change: Jaunary 2021
	
	Built using: jQuery 		version:1.6.2	http://jquery.com/
	
 */



	
	
(function( $ ){	
	
	"use strict";
	
	function mainFm(selector, params){
		
		var defaults = $.extend({}, {
				
				// default variables

				animationSpeed : 1000,				// Default animation speed
				
				slideshowSpeed : 5000				// Flexslider slideshow delaytime on porfolio detail page 
				
			} , params);

			
// Initialize required variables and objects
			var self = this;
			
			self.onePage = $("body").hasClass("not_onepage_ver") ? false : true;	
			
			self.screenWidth =  window.innerWidth;
			
			self.homePage = $("body").attr("data-menuSelected") === "" || $("body").attr("data-menuSelected") === undefined ? "!home" : $("body").attr("data-menuSelected");
			
			self.aniDelay = 50;
			
			self.stageWidth =  window.innerWidth;
			self.stageHeight =  window.innerHeight;

			self.winWidth =  self.stageWidth;
			self.winHeight =  self.stageHeight;

			self.selEle = $(selector);
			self.IEbrowser = $.browser.msie;
			self.mobile = self.stageWidth <= 959;
			self.midMobile = self.stageWidth <= 767 && self.stageWidth > 479;
			self.minMobile = self.stageWidth <= 480;
			self.mobileDevice = self.screenWidth < 1024 && screen.height < 1024;
			ipad = (self.stageWidth === 768 || self.stageHeight === 768) && (self.stageWidth === 1024 || self.stageHeight === 1024) ;
			self.ipadPort = (self.stageWidth >= 768 &&  self.stageWidth < 1024);
			self.navTop = self.stageWidth <= 959;	
			self.StgHig = iPhoneDevice ? screen.height-60 : self.winHeight;
			
			self.stopActionWhileScroll = false;
			
			lowResDesktop = self.stageWidth <= 979;
						
			self.lowMobile = self.stageWidth < 768;

			self.aniSpeed = defaults.animationSpeed;
			self.flxDelay =  flxDelay = defaults.slideshowSpeed;
			
			self.headerMc = $(".header, .headerFixed");	
			
			self.headHig = pageHeaderHeight_mini;
			
			self.curPgChk = undefined;								
			self.isoAniFin = false;
			
			self.removeAutoposition = false;			
			self.enableAutoposition = true;
			self.temprDisableAutoposition;
			
			self.miniMenu = $(".header, .headerFixed").hasClass("mini_menu");	
			self.horizNav = $(".horizontal-nav li a");		
			self.horizNav_added = self.horizNav.length > 0 ? true : false;
			
			self.enableLowPerformance = isTouch || window.innerWidth < 1025;	
			self.HideUnuse = self.enableLowPerformance ? true : false;

			/* Enable/Disable page content animaation*/				
			self.disableAnimation =  isTouch || self.screenWidth < 1025 ? true : false;

			self.azh = undefined;
								
			if(!self.onePage){
				$('.contentWrapper').attr("data-id", self.homePage);
			}
			
			$(".itemOver").attr({"aria-haspopup":"true"});
			$(".overlay").attr({"aria-haspopup":"true"});
			$(".popup_overlay").attr({"aria-haspopup":"true"});
			
			self.homeFlexSlider = $(".homeSlider .flexslider");
			self.homeBanner =  $(".homeBanner");
			
			self.owlSliderArry = [];
			$("body").find(".owlSlider").each(function(){
				self.owlSliderArry.push($(this));
				self.owlSliderArry[self.owlSliderArry.length-1].data("owlLoad", false);
				});
			
			self.bdy = $("body");
			self.htmlBody = $("html, body");
			self.foot = $(".footer");	
			self.foter_close = $(".footer_close");
			self.navUl = $('.nav');
						
			self.pgNex = $(".nextPage");
			self.pgPre = $(".previousPage");
			self.pgNexPre = $(".pageNavigation");
			
			self.pgUp = $(".pgScrollUp");
			
			self.bdy.data("width", Number(self.stageWidth));
			self.bdy.data("height", Number(self.stageHeight));
			
			self.fixedMenu = $(".fixedMenu");

			self.pageLoaded = false;
			
			self.pageLoadfinished = false;
			self.projFm = false;
			self.apis = [];
			self.ff = -1;
			
			self.ContPgTopSpace = 360;
			
			self.supportScrollBar = true;
			if($.browser.mozilla){			
				self.supportScrollBar = false;
			}		
			
			self.singleBg = true;
			
			if(self.onePage){
				self.cM = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]').parent();
				self.cM_= $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
			}else{
				self.cM = $('.contentWrapper [data-id="'+self.homePg+'"]').parent();
				self.cM_= $('.contentWrapper [data-id="'+self.homePg+'"]');
			}
			
			self.homDia = $(".homeDiamond");
			self.hSlider = $(".homeImgSlider, .homeSlider");
			self.hBanner = $(".homeBanner, .homeSlider.homeBanner");
			self.hSliderResp = $(".homeImgSlider.fullHeight.fullResponse");
			self.hSliderVid = $(".video_content.backGroundVideo");
			
			self.eventHoverMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'mouseover';
			var eventHoverMc = self.eventHoverMc;
			self.eventHoutMc = ('ontouchstart' in document.documentElement) ? 'mouseleave' : 'mouseleave';
			var eventHoutMc = self.eventHoutMc;
			self.eventClickMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click';
			
			self.isTouchMove = false;
			self.isAddedHover = false;
			self.dff = 0;
			
			if(isTouch){	
				try {
					$("body").find(".itemOver").each(function() {			
						var mcBt = $(this);	
												
						this.ontouchstart = function(e) {
								
								self.isTouchMove = false;							
								return true;
							};
						this.ontouchend = function(e) {	
							$(".itemOver.addHover").removeClass("addHover");
							
							if(!self.isTouchMove){
								
								$(this).addClass("addHover");
							}
							self.isTouchMove = false;
							return true;
						};	
						
						this.ontouchmove = function(e) {
							
							self.isTouchMove = true;
							return true;
						};					
					});
					self.isAddedHover = true;	
				}catch(e){					
					self.isAddedHover = false;					
				}
			}
			
			
				
			if(!isTouch || !self.isAddedHover || eventHoverMc === 'mouseover'){
				$(".itemOver").on(self.eventHoverMc, function(event) {
					self.dff = self.dff+1;
					$(".itemOver.addHover").removeClass("addHover");
					$(this).addClass("addHover");
				});				
				$(".itemOver").on(self.eventHoutMc, function(event) {
					$(this).removeClass("addHover");
				});
			}
			
			// create Menu fadeout layer
			self.headerFad = $(".pageFade");
			if(isTouch){ self.headerFad.removeClass("addIntroGraphic"); }

			
			self.contClose = $(".closeBtn");
			

			$(".header_content").data("open", false)
			
			self.bdy.prepend('<div id="dumDiv" style="position:absolute"> </div>');	
			self.dumDiv = self.bdy.children(':first-child');
			
			self.conArry = [];
			$("body").find('.contentWrapper').each(function(i){
				self.conArry.push($(this));
				
				var aniArryZ = [];
				 self.conArry[i].find('[data-animated-in]').each(function(){  aniArryZ.push($(this));  });
				 self.conArry[i].data("aniArryZ",aniArryZ);
				 
				 var owlArryZ = [];
				 self.conArry[i].find('.owlSlider').each(function(){ owlArryZ.push($(this)); });
				 self.conArry[i].data("owlArryZ",owlArryZ);
			});	
			
			var prId = 0;
			$("body").find('.gallery_autoThumbnail').each(function(){				
				$(this).find(".carousel_preview").attr("id", "prjId"+prId);					
				if($(this).find(".carousel_container").length == 0){
					$(this).append('<div class="carousel_container thumbItem_holder withoutThumb spaBot_0"> <ul class="carousel_thumbails"> </ul></div>');
					var carThu = $(this).find(".carousel_thumbails");
					var thuNo = 0;
					$(this).find(".carousel_preview").find(".carousel_item").each(function(){
						var txt = undefined;
						var mcc = $(this);
						mcc.find(".team_name").each(function(){
							txt = $(this);
						});		
										
						mcc.attr('id', "prjId"+prId+"-"+thuNo);
						carThu.append('<li> <img src="images/0.png" alt="image01" /> </li>');
						carThu.children(":last-child").attr('data-preview', "#prjId"+prId+"-"+thuNo);
						
						if(txt !== undefined){
							carThu.children(":last-child").addClass("removeNumber");
							carThu.children(":last-child").append(txt);							
						}
						
						thuNo++;
					});
				}
				
				$(this).find(".carousel_container").attr("data-link", "#prjId"+prId);				
				
				prId++;		
			});
			
			
			$('body').find('.flexSlideshow').each(function(){
				  $(this).data("loaded", false);
			  });
					
			if(self.HideUnuse){
				for(var bb=0; bb < self.conArry.length; bb++){	
					self.conArry[bb].css({"visibility":"hidden"});
				}
			}
			
			try{
				self.conArry[0].css({"visibility":"visible"});
			} catch (e) {										
			}
								
			
			
			self.navArry = [];
			for(var ab=0; ab < self.conArry.length; ab++){
				var n_spt = self.conArry[ab];
				if(n_spt.attr("data-id") !== undefined){
					self.navArry.push(self.conArry[ab]);
				}		
			}
			
			for(var ik=0; ik < self.navArry.length; ik++){
				self.navArry[ik].addClass("enablHardwareAcc");
			}
			
			$("a").each(function() {
				if($(this).attr("href") === "#" ){				
					$(this).removeAttr("href");								
				}
			});
			
			if($(".setting_tools").length > 0){
				self.previewSetting();
			}
			
			// Scroll bar added for require div
			
			  if(isTouch){
				self.htmlBody.css({ "-webkit-overflow-scrolling": "touch"});
			  }

			
			// Initialize niceScroll to html
			if(!isTouch && !self.IEbrowser && self.supportScrollBar ){	
				self.nicScrl = $("body").niceScroll({ zindex : 92200000, styler:"fb", cursorborder : "0px",scrollspeed : 100, cursorminheight:100 , cursorwidth:"10px", horizrailenabled:false });
				
				
			}else{
				$("html").addClass("forceAddScr");
				$("body").addClass("forceAddScr");
			}
			
			self.bdy.css("display","block");
						

			/* Map load navigation */			
			
			$("body").find('.map_holder').each(function(){
				

				var mapBtn = $(this).find(".openGoogleMap");
				$(this).find('#map_canvas').each(function(){
		
					var mp = $(this);
					mapBtn.data("mp", mp);
					
					var showMap = $(this).find(".showMap");
					var removeMap = $(this).find(".removeMap");
					
					if(mp.hasClass("autoLoadOff")){					
						mapBtn.on(self.eventClickMc, function(){	
							var mBtn_ =  $(this);				
							
							if(mBtn_.data("mp").data("addMap") !== "yes"){						
								try{
									map_initialize(); 
									mapResizer();
								} catch (e) {
									$("#map_canvas").html($(this).data("mp").data("con"));			
								}
								mapBtn.removeClass("hideMap");
								mBtn_.data("mp").data("addMap", "yes");	
							}else{
								$("#map_canvas").children(":first-child").remove();
								mapBtn.addClass("hideMap");
								mBtn_.data("mp").data("addMap", "no");	
							}
						});
					}
				});
			});	
			
// Page buttons ==================================================================
			 
			
			// Page scrollUp button
			self.pgScrUp =  $(".move_up, .goTop");
			
			$(".pgScrollUp, .goTop").click(function(){
				self.scroll_update(0);
				if(self.onePage && !isMobileChk){
					window.location.href = "#"+self.homePage;
				}
				
				self.scrollTopAction(self.htmlScroll, "0px", 500);
			});
			
			// Cache the Window object
			self.scrollObj = $("body, html");
			self.pgAll = $(".bodyContainer");
			self.$html = $("html");
			self.$window = $("body");	
			


			$(".contactPage .contactPage_content").css({ "min-height": self.stageHeight - self.ContPgTopSpace, "margin-top": self.ContPgTopSpace } );
			
			self.htmlScroll = isNaN($("html").scrollTop()) ? $("body") : $("html");
			
			self.scrollPos = 0;

			
			// Full Screen gallery thumbnail code
			for(var ab=0; ab < self.conArry.length; ab++){
				var url__ = self.conArry[ab].attr("data-id");
				self.conArry[ab].find(".fullScreenGallery_thumbnails").each(function(){
					$(this).data("url_",url__);
				});
				
				self.conArry[ab].find(".projDetailLoad").each(function(){
					$(this).data("url_",url__);
				});
			}
			
			// Portfolio project detail page - up down arrow keyboard  action
			$(".projDetailLoad").each(function(){				
				var sel = $(this);
				$('html').keydown(function(e){
					if(sel.data("url_") === self.url && sel.find(".projConWarp").length>0){
						if (e.keyCode === 39) { //up
							sel.find(".next_button_pro").trigger('click');
							return false; 
						} 
						if (e.keyCode === 37) { //down 
							sel.find(".previous_button_pro").trigger('click');
							return false; 
						} 
					}
				});
			});
			
			
			// Fullscreen gallery - up down arrow keyboard  action
			$(".fullScreenGallery_thumbnails").each(function(){
				var me = $(this);
				var mc = $(this).find(".carousel_container").parent();
				
				me.find(".carousel_thumbails").each(function(){
					var sel = $(this);
					$('html').keydown(function(e){ 
						if(me.data("url_") === self.url){
							if (e.keyCode === 39) { //up
								var cur = sel.children().length-1 > sel.data("cur") ? sel.data("cur")+1 : 0;
								sel.data("fn")(sel.children().eq( cur ), cur,true);
								return false; 
							} 
							if (e.keyCode === 37) { //down 
								var cur = sel.data("cur") > 0 ? sel.data("cur")-1 : sel.children().length-1;
								sel.data("fn")(sel.children().eq( cur ), cur,true);
								return false; 
							} 
						}
					});
				});
				
			
				if(lowResDesktop || isTouch){
					$(".fullScreenGallery_thumbnails").removeClass("miniView");
				}				
			});

			$("body").find(".contentWrapper").each(function(){

				if($(this).find(".thumbnail_hitArea").length>0){
					var thu = $(this).find(".fullScreenGallery_thumbnails");
					var hitArea = $(this).find(".thumbnail_hitArea");
					
					hitArea.data("mcThumb",thu);
					console.log(self.eventClickMc);
					hitArea.on(self.eventClickMc, function(event) {
					   if($(this).data("mcThumb").hasClass("miniView")){
						   $(this).data("mcThumb").removeClass("miniView");
					   }else{
						   $(this).data("mcThumb").addClass("miniView");
						   }						
					});	
				}
			});
			
			
			// Store variable to identify animate objects
			for(var ab=0; ab < self.conArry.length; ab++){
				var mcc = self.conArry[ab];				
				 
				 var biVid = [];
				 self.conArry[ab].find('.big_video').each(function(i){
					 biVid[i] = $(this);
				 });
				 self.conArry[ab].data("biVid", biVid);
			};
					
				
			$('.carousel_preview').each(function(){	
				$(this).find('[data-animated-in]').each(function(){
					$(this).data("caro_prev",true);
				});	
			});	  
			
			// Store variable to identify animate objects holding content animation  
			for(var ab=0; ab < self.conArry.length; ab++){				
				var main_holder = self.conArry[ab];
				main_holder.find('[data-animated-in]').each(function(){
					var aniMc = $(this);	
					aniMc.data("isAniObj", false);				
					aniMc.data("main_holder", main_holder);
											
					if(aniMc.find('.graph_container').length > 0){
						aniMc.data("isAniObj", true);						
					}
										
					if(aniMc.find('.animate_counter').length > 0){
						aniMc.data("isAniObj", true);
					}	
					
					if(aniMc.find('.big_video').length > 0){
						aniMc.data("isVidObj", true);
					}	
					
				});	
							  
				main_holder.find('[data-animated-innerContent]').each(function(){
					$(this).children().each(function(){
						$(this).data("main_holder",main_holder);
					});					  
				});
								
			};
			
			// Hide animate objects
			if(!self.disableAnimation){
				$("body").find('[data-animated-in]').css({"visibility":"hidden"});	
				
				$("body").find('[data-animated-innerContent]').each(function(){
					  $(this).children().css({"visibility":"hidden"});
				});
			}
			
			
			// Hide portfolio Page animate objects

			$("body").find('.portfolioPage').each(function(){
				  var main_holder = $(this);
				  main_holder.find('[data-animated-in]').each(function(){
					  $(this).data("isMasonry", true);
					  if(self.alignPgHor){
					  	$(this).css({"visibility":"visible"});	
					  }
				  });
				  
				  main_holder.find('[data-animated-innerContent]').each(function(){
					$(this).children().each(function(){
						$(this).data("isMasonry", true);
						 if(self.alignPgHor){
							$(this).css({"visibility":"visible"});
						 }
					});					  
				});
			});
			
			
			$("body").find('.mainContent .addVideo.backGroundVideo').each(function(){
				if(isTouch){
					$(this).data("inMain", true);
				}else{
					$(this).data("inMain", "undefined");
				}					
			});
			$(".addVideo.backGroundVideo").data("inMain", "undefined");
			
			
			
			// Footer Open - close button
			if(isTouch){			
				$(".nav a, .footer_close, .btn-navbar").click(function(){					
					$("body").find('.addVideo.backGroundVideo, .video_content.fullscreenVideo').each(function(){
						var vid2 = $(this);
						vid2.data("isPlaying", false);	
						self.video_delete(vid2);
					});				
					self.videoRest();					
				});
			}
					
			
			// Set knob animation
			self.knobAni = false;
			try{		
				$("body").find('.animate_counter, .knob').each(function(i){
					var selK = $(this);	
					selK.data("val", selK.attr("data-value"));
					selK.data("display", selK.parent().parent().find(".display"));	
					selK.data("ani", selK.append($('<div><div/>')).children(":last-child"));
					selK.data("ani").css({"top":0,"position":"absolute"});
					selK.data("display").text(selK.attr("data-value"));
					if(!selK.hasClass("animate_counter")){
						if(selK.hasClass("knob")){
							selK.val(selK.attr("data-value")).trigger("change");
						}
					}
					self.knobAni = true;
					});	
			} catch (e) { self.knobAni = false; }
			
			
			
			// Push all the preload image into a preloadImages array			
			self.preloadImages = [];
			
			$('.preload').each(function(){
				self.preloadImages.push($(this));
				});
				
			$('.preloadimages_inline img').each(function(){
				var th = $(this);
				var img;
				if(th.hasClass("cssBackground")){
					img = retinaDevice ? $(this).attr("data-src-2x") : $(this).attr("data-src");					
				}else{
					img = window.innerWidth > 767 ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));
					}
				th.attr("data-src", img);
				th.addClass("preload");
				self.preloadImages.push(th);
			});
			
			self.imgFinished = 0;
			
			if( self.preloadImages.length>0){
				self.intImgLoad(self.preloadImages[self.imgFinished]);
			}else{
				siteStartOpen = true;
			}
					
			setTimeout( function(){	$(".pageFade .loading_2x").removeClass("out"); }, 200);
			 
			 

			// Initialize the site after the required time interval	
			var intV = setInterval(function() {					
				  if(siteStartOpen ){
					  clearInterval(intV);
					  setTimeout( function(){						 
						self.headerMc.show();
						$(".homeSlider .homepage_con").show();	
						self.initialize();							
					}, 200);
				}				
			},10);
			
	}	
	
	
	mainFm.prototype = {				
				
		// Initialize the require objects and variables 
		initialize : function(){
			
			var self = this;
			
			self.prePg = "";
			self.curPg = "";
			self.menuList = [];	
			
			// Loading object added
			self.bdy.prepend('<div id="preloadImg" style="width:150px; height:150px; visibility:hidden; position:absolute; left:0; top:0; overflow:hidden"> </div>');
			self.dumDiv.addClass('email_loading');
			self.dumDiv.removeClass('email_loading');
			
			if(isTouch){
				$("html , body").css({"overflow":"auto"});
			}

			$(".isotope_option").show();				

			$("body").find('.masonry_items').each(function(){
				$(this).find(".item").addClass("enablHardwareAcc");				
			});		

			self.nexButton_detailPg = $("a.next_button");
			self.preButton_detailPg = $("a.previous_button");
			
			

// Initialize the menu navigation action
			var kk = -1;
			var qq = -1;
			self.rez = false;
			self.rezV = false;
			
			try {
				document.createEvent('TouchEvent');
				$(".lightStyle, .inverseStyle, .contentWrapper").on('click', function() {
				});
			} catch (e) {
				// nothing to do
			}
			
			
			$(".header .nav li, .headerFixed .nav li").each(function() {
				var slf = $(this).children();
				var liMc = $(this).parent();
				qq++;
				if(slf.attr("href") === "" || slf.attr("href") === undefined){
					return;
				}
				
				slf.on('click', function() {
					var menuMc2 = $(this);
					var uul = menuMc2.attr("href");
					var trg = menuMc2.attr("_target");
					if(menuMc2.attr("href") && menuMc2.attr("href") !== "undefined" && uul.charAt(0) !== "#"){						
						self.headerFad.css({"height":"100%"});
						self.headerFad.addClass("in").removeClass("out");						
						setTimeout(function(){
							if(trg !== undefined){
								window.open(uul, trg);
							}else{
								window.location.href = uul;	
							}
						}, 1000);												
						return false;
					}else{
						self.removeAutoposition = false;			
						$(".nav li a").removeClass("active");
						$(".nav li ul").removeClass("active");
						menuMc2.addClass("active");		
						liMc.addClass("active");
						var gg =  String(menuMc2.attr("href")).split("#");
						if(gg[1] === self.url){
							self.page_position();
						}else{
							if(String(menuMc2.attr("href")) === "#filter"){
								try{ 
									var utl = menuMc2.parent().parent().parent().children(":first-child");
									var uul2 = utl.attr("href");
									var gg2 =  String(uul2).split("#");									
									if(gg2[1] === self.url){										
										self.scroll_by(utl.position().top, self.scrollObj);
									}else{
										window.location.href = uul2;
									}									
								} catch (e) { }	 	
							}
						}
					}
				});
				
			});
			
			self.parallaxBgUpdate();
			self.setPageBorder();
			
			setTimeout(function(){
				$("body").find('.hideForLoad').each(function(){
					$(this).css({"height":"auto", "overflow":"inhert"});
				});
			},1000);
			
			
			// Initialize the cycle slideshow			
			$("body").find('.slideshow_cycle').each(function(){
				cycle_pluign($(this)); 
				if(self.onePage){ $(this).cycle("pause"); }
			});
			
			
			$(".smoothPageLoad").each(function() {
				var slf = $(this);
				slf.on('click', function() {	
					var uul = $(this).attr("href");
					var trg = $(this).attr("_target");
					if($(this).attr("href") && $(this).attr("href") !== "undefined" && uul.charAt(0) !== "#"){									
						self.headerFad.css({"height":"100%"});
						self.headerFad.addClass("in").removeClass("out");						
						setTimeout(function(){
							if(trg !== undefined){
								window.open(uul, trg);
							}else{
								window.location.href = uul;	
							}
						}, 1000);						
						return false;
					}
				});
			});
			
			
			$(".menu_link").each(function() {
				var slf = $(this);
				qq++;
				if(slf.attr("href") === "" || slf.attr("href") === undefined){
					return;
				}
				slf.on('click', function() {	
					self.removeAutoposition = false;					
					var gg =  String($(this).attr("href")).split("#");
					if(gg[1] === self.url){
						self.page_position();
					}
				});	
			});

			
			
			$("body").find(".move_down, .move_down_white").each(function(){
				$(this).on('click', function() {
					self.removeAutoposition = false;
					var gg =  $(this).attr("href").split("#");
					if(gg[1] === self.url){
						self.page_position();
					}
				});
			});
			
			$("body").find(".homeEleFade").each(function(){
				self.animateObject($(this), 0);				
			});
			

			self.homePg = self.homePage === "" ? self.menuList[0].substr(1, self.menuList[0].length): self.homePage;
			self.cM = self.curP = $('.contentWrapper [data-id="'+"#"+self.menuList[0]+'"]').parent();

			
			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').css("visibility","visible");			
			$('.contentWrapper [data-id="'+"#"+self.homePg+'"]').hide();			
			
			
			for(var ab=0; ab < self.conArry.length; ab++){	
				self.conArry[ab].data("loaded", true);
				self.page_dimension(self.conArry[ab]);	
				self.load_plugin_Items(self.conArry[ab]);					
			};

			
			// Initialize the video	

			self.intVideoObject(self.bdy);
			
			self.site_display();			
			self.moveItem =  $(".mainContent");
			
			
			
			// display isotope item
			$('.isotope_items').show();			
			
			
			self.bdy.css({"height":self.winHeight, "overflow":"hidden"});
			


			if(self.headerFad.hasClass("addIntroGraphic")){			
			
			
				var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x	
				
				self.headerFad.on(mousewheelevt, function(e){					
					self.introClose();			
				});
				
				self.headerFad.on(self.eventClickMc, function(){					
					self.introClose();
				});
				
				
		
				
				$('html').keydown(function(e){					
					if(self.headerFad.hasClass("addIntroGraphic")){
						if (e.keyCode === 32 || e.keyCode === 40) {
							self.introClose();
							return false; 
						}
					}
				});
				
			}else{				
				if(self.headerFad){	 
					setTimeout( function(){	
						self.headerFad.addClass("addIntroGraphic");
						self.introClose();
					}, 750);	
				}
			}
			

			
			if(self.headerFad){				
				setTimeout( function(){	
					self.headerFad.find(".loading_2x").addClass("fadeout");
				}, 500);		
				setTimeout( function(){	
					self.headerFad.addClass("loadFinished");
					self.headerFad.find(".loading_2x").remove();
				}, 1500);			
			}
			
			
			
			
			$(".previousPage, .nextPage").on('click', function() {
				if($(this).data("url") && $(this).data("url") !== "undefined"){
					self.removeAutoposition = false;
					if($(this).data("url") !== self.url){
						window.location.href = "#"+$(this).data("url");
					}else{
						self.page_position();
					}
					if($('.nav a[href$="#'+$(this).data("url")+'"]').length > 0){
						$(".nav li a").removeClass("active");
						$('.nav a[href$="#'+$(this).data("url")+'"]').addClass("active");
					}
				}
			});
			
			if(isTouch){
				$(".fadeAfterLoad").css({"display":"block"});
			}else{
				$(".fadeAfterLoad").delay(200).fadeIn(300);
			}

			
			
			
			// Initialize the window resize function
			clearInterval(self.intr);
			$(window).resize(function() {	
				clearInterval(self.intr);
				self.intr = setInterval(function(){clearInterval(self.intr); self.windowRez();},100);
			});
			
			//Initialize the mobile orientationchange function
			$(window).on( 'orientationchange', function(){
				self.windowRez();
			});
			
			
			var oTim = self.onePage ? 1000 : 1200;
			
			
			self.history();
			
			setTimeout( function(){	
				
				if((self.url !== self.homePg && self.url !== undefined) || !self.onePage){
					
					self.introClose();
					if(self.onePage){						
						setTimeout( function(){
							try{ self.scroll_by(self.curP.position().top, self.scrollObj); } catch (e) { }					
						}, 500);	
					}					
				}else{

					if(self.onePage){
						setTimeout( function(){					
							try{  self.scrollTopAction(self.htmlScroll, "0px", 20); } catch (e) { }	 
						}, 500);
					}
				}
			  
				self.vertical_scroll();
				self.page_setup();				
				 
				try{
				  if(self.homeFlexSlider.length > 0 && self.url === "!home"){					   						 
					  if(self.homeFlexSlider.data("slid") !== undefined){						 
						 self.homeFlexSlider.data("slid").resume();
					  }
				  }
			   } catch (e) { }	
			   
			   
						
			}, oTim);
			
			$('.preloadimages_inline img').each(function(){
				$(this).remove();
			});
			$('.preloadimages_inline').remove();
			
			
							
			
			self.isSuperSliderAdded = $(".homeSlider").length > 0 ? true : false;
			
			self.superSlider = self.isSuperSliderAdded ? ( typeof superGalleryInit !== "undefined" && typeof superGalleryInit !== undefined) : false;
			
			self.rsSlider = typeof rsSliderInit !== "undefined" && typeof rsSliderInit !== undefined;						
		
			self.superSliderInt;
			
			if(self.superSlider){
				superGalleryInit(self.hSlider);
				if(!supersizedOnBody){
					$(".supersized_gallery").show();
					$("#superNav").show();
					$(".supersized-nav").show();
					if(self.hSlider.attr("data-supersizeDotNav") !== "no"){
						setTimeout( function(){	 api.min_thumb();  }, 500);
					}
				}else{
					if($.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1){ api.playToggle(); }
				}
				
				
				$('.palyPause_slideshow').on(self.eventHoverMc, function(event) {
					clearInterval(self.superSliderInt);
					if(!$.supersized.vars.is_paused){ api.playToggle(); }
				},function(){ 
				
					clearInterval(self.superSliderInt);
					self.superSliderInt = setInterval(function(){
						clearInterval(self.superSliderInt);
						if($.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1){ api.playToggle(); }						
					}, 1000);
										
				});
			}
			
			if(self.rsSlider){
				rsSliderInit();				
				apiRS.revpause();
			}
			
			
			
			if( self.stageWidth < 1025 || self.miniMenu){
				self.headerMc.addClass("mini");	
			}
			
			
	
	
			
		},
		
		// Site Preload image  function
		intImgLoad : function  (img){
		
			var self = this;
				img.attr('src', img.attr("data-src"));
                 img.load(function() {
					if(self.imgFinished < self.preloadImages.length-1){
                      self.imgFinished = self.imgFinished+1;					  
                      self.intImgLoad(self.preloadImages[self.imgFinished]);
					  $(".site_loading_bar").stop().animate({"width":Math.round(self.imgFinished/(self.preloadImages.length)*100)+"%"});
					}else{
						$(".site_loading_bar").stop().animate({"width":"100%"});
						siteStartOpen = true;
					}
					
                  }).error(function () {

				  if(self.imgFinished < self.preloadImages.length-1){
					self.imgFinished = self.imgFinished+1;
					self.intImgLoad(self.preloadImages[self.imgFinished]);					  
					$(".site_loading_bar").stop().css({"width":Math.round(self.imgFinished/(self.preloadImages.length)*100)+"%"});
				  }else{
					  $(".site_loading_bar").stop().css({"width":"100%"});
				   	siteStartOpen = true;
				  }
                  
				  }).each(function() {
                    if(this.complete) { $(this).trigger('load'); }
                  }); 
		
	               
          },
		
		// Page vertical scroll action
		vertical_scroll : function(){	 
			var self = this;
			self.scrspy_curPg = self.url;
			self.sliderTimm;
			
			self.scrpyMc = [];
			for(var ab=0; ab < self.conArry.length; ab++){
				self.scrpyMc.push(self.conArry[ab]);
				self.scrpyMc[ab].data("data-id", self.scrpyMc[ab].attr("data-id"));
			};
			
			self.curPageShow = self.scrpyMc[0];
			
			self.chkScrDown = 0;
			
			self.interVal4;
			self.interVal5;
			self.interVal6;
			
			self.chkHideMc = undefined;
			
			var fixedMenuAttach = $(".hortalMenuFixIt");
			var fixedMenuVal = self.winHeight;
			
			$(window).trigger("scroll");
			
			$("body").find(".pageContent").each(function() {	
				var scrObj = $(this);
				
				$(this).find(".move_up").each(function() {
					
					var mup = $(this);						
					mup.find("span").data("mObj",scrObj).on(self.eventClickMc, function(event) {
						var mcP = $(this);	
						mcP.data("pgCon", scrObj);
											
						var space = isNaN(parseInt(scrObj.css("margin-top")), 10) ? 0 : parseInt(scrObj.css("margin-top"), 10);
						space = self.stageWidth > 991 ?  0 : self.stageWidth < 481 ? 70 : mcP.parent().hasClass("plain") ? 40 : 50-self.borderSize;
								
						if(!mcP.parent().hasClass("last") && !mcP.parent().hasClass("prev")){	
							if(mcP.parent().parent().next().length !== 0){
								self.scroll_by(mcP.parent().parent().next().position().top+mcP.data("mObj").parent().position().top+space, self.scrollObj);	
							}else{
								if(mcP.parent().parent().parent().parent().next().length !== 0){
									self.scroll_by(mcP.parent().parent().parent().parent().next().position().top, self.scrollObj);	
									}
								}
						}
						
						if(mcP.parent().hasClass("last")){																	
							self.scroll_by(0, self.scrollObj);
						}
						
						if(mcP.parent().hasClass("nextSection")){															
							self.scroll_by(mcP.data("pgCon").parent().next().position().top+space, self.scrollObj);	
						}
						
						
						if(mcP.parent().hasClass("prev")){	
							if(mcP.parent().parent().next().length !== 0){																
								self.scroll_by(mcP.data("mObj").parent().parent().position().top+space, self.scrollObj);
							}else{
								self.scroll_by(mcP.data("mObj").parent().position().top+space, self.scrollObj);
							}
						}
						
					});	
				
				});
				
				$(this).find(".move_down span").on(self.eventClickMc, function(event) {
					
				});
						
			});
			
			setTimeout(function(){
				$(window).trigger("scroll");
			}, 1000);
			
			var scrIntervalTim = 300;	
			var scrMenuIntervalTim = 30;		
			
			
			self.menuEffect1 = $(".header.effect1, .fixedMenu.effect1, .headerFixed.effect1");
			self.menuEffect2 = $(".header.effect2, .fadeBgOnTop, .headerFixed.effect2");
			
			
			clearInterval(self.scrIntr);
			clearInterval(self.scrMenuIntr);
			
			
			if(!isTouch){ scrIntervalTim = 100; scrMenuIntervalTim = 300; }
			
			// Window scroll event
			$(window).scroll(function() {
				
				clearInterval(self.scrIntr);
				clearInterval(self.scrMenuIntr);
				
				if(!self.fixedMenu.hasClass("onlyTop")){
					self.scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();
					
					if( self.stageWidth > self.scrollPos){}
					
					  if(self.stageWidth > 1023){	
					 
						  fixedMenuVal = fixedMenuAttach.length > 0? fixedMenuAttach.outerHeight() : self.winHeight-60;				
						  if(self.scrollPos > fixedMenuVal-2){
								self.fixedMenu.addClass("fixedPos").css({"top":0});
							}else{
								self.fixedMenu.removeClass("fixedPos");
								self.fixedMenu.css({"top":fixedMenuVal});
							}
					  }else{
						  self.fixedMenu.addClass("fixedPos").css({"top":0});
					  }
				 }
				
				  self.scrIntr = setInterval(function(){					  
					  clearInterval(self.scrIntr); 
					  self.scrollAction();
				  }, scrIntervalTim );				
						
			});			
			
		},
		
		
		scrollAction : function (){
			
			var self = this;			
			
			clearInterval(self.scrIntr);
			clearInterval(self.interVal6);
			clearInterval(self.interVal5);
			clearInterval(self.interVal4);

						
			self.scrollPos = self.$html.scrollTop() > 0 ?  self.$html.scrollTop() :  self.$window.scrollTop();				
		
			if(self.scrollPos < 65 && self.stageWidth > 1024){								
				self.menuEffect1.removeClass("removeEffect");
				self.menuEffect2.addClass("bgTransparent");							
			}else{
				self.menuEffect1.addClass("removeEffect");
				self.menuEffect2.removeClass("bgTransparent");
			}	
							
			
			
			if(!self.miniMenu){
				if( self.stageWidth > 1024){
					if(self.scrollPos > 65){
						self.headerMc.addClass("mini");
					}else{
						self.interVal4 = setInterval(function(){
							clearInterval(self.interVal4);
							self.headerMc.removeClass("mini");
						}, 500);
					}
				}else{
					self.headerMc.addClass("mini");
				}
			}
			
			
			self.enableAutoposition = self.chkScrDown < self.scrollPos ? true : false;
			self.chkScrDown = self.scrollPos;
			
			
			if(self.scrollPos > 240){
				self.pgUp.show();					
			}else{
				self.pgUp.hide();
			}
			
			try{  
			
				var scrpyPos = [];
				for(var ab=0; ab < self.conArry.length; ab++){
					scrpyPos.push(self.conArry[ab].position().top);
				};
				
				var ii = self.scrpyMc.length-1;
				var isY = false;
				self.sUrl = "!home";
				self.curScrlPgMc = self.scrpyMc[0];
				var scrPP = 0;
				
				
				
				/* Page triggering code */
				if(self.enableAutoposition){
					scrPP = Math.round(self.scrollPos+60+(self.winHeight/2));
				}else{
					scrPP = Math.round(self.scrollPos)+60+100;
				}
				
				for(var b2b=0; b2b < self.conArry.length && !isY; b2b++){
					if(Math.round(self.conArry[b2b].position().top) > scrPP ){								
						isY = true;			
						self.sUrl = self.scrpyMc[b2b-1].data("data-id");
						self.curScrlPgMc = self.scrpyMc[b2b-1];	
						ii = b2b-1;	
					}							
				}

				if(!isY){
					self.sUrl = self.scrpyMc[self.scrpyMc.length-1].data("data-id");
					self.curScrlPgMc = self.scrpyMc[self.scrpyMc.length-1];							
				}
				
				
						
				if(self.enableLowPerformance){							
					if(self.chkHideMc !== self.curScrlPgMc.data("data-id")){
						self.update_menu(self.curScrlPgMc);
					}							
				}
				
				
				if(self.chkHideMc !== self.curScrlPgMc.data("data-id")){							
					self.chkHideMc = self.curScrlPgMc.data("data-id");
					
					if(!supersizedOnBody){
						if(self.chkHideMc !== "!home"){		
							$("#supersized li").css({"visibility":"hidden", "display":"none"});
							$("#supersized li.activeslide").css({"visibility":"visible", "display":"block"});
							if(!$.supersized.vars.is_paused ){  api.playToggle(); }																
						}else{
							$("#supersized li").css({"visibility":"visible", "display":"block"});
							if($.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1 ){ api.playToggle(); }	
						}
					}
				}
				
				
				if(isTouch){ return; }				

				
				if(self.chkHideMc !== self.curScrlPgMc.data("data-id")){							
										
					if(self.HideUnuse){								
						for(var bb=0; bb < self.conArry.length; bb++){							  
							if(ii+1 !== bb && ii-1 !== bb && ii !== bb || (ii+1 === self.conArry.length+1)){
								if(self.conArry[bb].css("visibility") !== "hidden"){
									self.conArry[bb].css({"visibility":"hidden"});
								}
							}else{
								 if(self.conArry[bb].css("visibility") !== "visible"){							
									self.conArry[bb].css({"visibility":"visible"});
								}
							}
						}
					}
					
					try{
			
						if(self.homeFlexSlider.length > 0 && !isTouch){									 
							if(self.homeFlexSlider.data("slid") !== undefined){
								if(self.chkHideMc !== "!home"){	
									self.homeFlexSlider.data("slid").pause();
								}else{
									self.homeFlexSlider.data("slid").resume();
								}
							}
						}
					} catch (e) { }
					
					try{
						
						self.owlSlideStop();
						
						self.owlSlidePlay(curScrlPgMc);	
						
						
					} catch (e) { }
				
					
					if(self.scrspy_curPg !== self.sUrl){ 
						if(self.hSliderVid.length > 0){	
							if(self.azh !== undefined){
								self.curP = self.curScrlPgMc;
							}
							if(self.chkHideMc !== "!home"){	
								self.video_delete(self.hSliderVid);						
							}else{ 
								self.videoRest($(".homeSlider"));
								
							}
						}
					}
			  }
			  
			  if(self.scrspy_curPg !== self.sUrl || self.azh === undefined){								
				  self.scrspy_curPg = self.sUrl;
				  if(!self.enableLowPerformance && self.azh !== undefined){						   
					  self.updatePage(self.curScrlPgMc);					
					  self.interVal6 = setInterval(function(){							
						clearInterval(self.interVal6);
						if(self.scrollPos < 250){
							  if(self.onePage && !isMobileChk){		
								  window.location.href = "#"+self.homePage;
							  }
						  }	
					}, 500);
				  }	
				  self.azh = self.scrspy_curPg;
			  }	
							  
				if(!self.disableAnimation){							
					for(var aniAry=0; aniAry < self.curScrlPgMc.data("aniArryZ").length; aniAry++){
						if(!self.curScrlPgMc.data("aniArryZ")[aniAry].data("isDisplay")){
							self.animateObject(self.curScrlPgMc.data("aniArryZ")[aniAry], self.scrollPos);
						}
					};
				}	  
						
				
			}	catch (e) { }
		
		},
		
		introClose : function(){
			var self = this;

			self.headerFad.addClass("out");
			
			if(siteStartOpen && self.headerFad.hasClass("addIntroGraphic")){				  			
				  self.headerFad.removeClass("addIntroGraphic");
				
				  $(window).trigger("scroll");
				  setTimeout(function(){
				  	  self.bdy.css({"height":"auto", "overflow-y":"auto"});
					  if(!isTouch && !self.IEbrowser && self.supportScrollBar){ self.nicScrl.resize(); }
					  self.headerFad.find(".introMc").remove();			 					  
					  self.headerFad.css({"height":"0px"}).off();	
					  if(self.superSlider && !supersizedOnBody){
					  	if($.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1){ api.playToggle(); }	
					  }		
					 $(window).trigger("scroll");
				  },500);
			}
			
			
		},
		
		
		scroll_by : function (pixels, mc) { 
		
			var self = this;
			var curMc = mc !== undefined ? mc : self.curP;			

			try {				
				if(!isNaN(pixels)){
					var movPos = pixels;
					
					if(lowResDesktop && ! self.midMobile && !self.minMobile){
						movPos = movPos-40;
						}
						
					if(self.midMobile){	
						movPos = movPos-40;						
						}
						
					if(self.minMobile){
						movPos = movPos-70;
						}				
					self.scrollTopAction( curMc, movPos, 500);	
				}else{
					curMc.scrollTop(0);	
					
				}					
			} catch (e) { } 
			
		},
		
		
		scrollTopAction : function (mc, pixels, aniSpd) { 		
			var self = this;
			if(!isTouch){
				self.stopActionWhileScroll = true;
				mc.stop(false).animate({ scrollTop: pixels}, aniSpd , "easeInOutQuart", function(){
					self.stopActionWhileScroll = false;
				});
			}else{
				mc.stop(false).scrollTop(pixels);		
			}			
		},
		
		


		// Scrollbar update function
		scroll_update : function(rPos){		
			var self = this;
			
			var rePos = (typeof rPos !== "undefined" && typeof rPos !== undefined )? rPos : 0;
			
		 	if(!isTouch && !self.IEbrowser && self.supportScrollBar){ 
				self.nicScrl.resize(); 		
				}
			
					
			if(self.stageWidth > 991){ 
				if(rPos !==  undefined){
					self.scrollTopAction( self.scrollObj, rePos+"px", 500);
				}
			}else{					
				if(!isTouch && !self.IEbrowser && self.supportScrollBar){ 				
					self.nicScrl.resize();
					if(rPos !==  undefined){						
						self.scrollTopAction( self.scrollObj, rePos+"px", 500);
					}
				}			
			}
					
		},
		
		
		// Fullscreen gallery video load function
		fullScreenGallery : function(obj){
			var self = this;
			try{
				$(obj).find('.addVideo').each(function(){
					var vid_ = $(this);
					self.video_delete(vid_);
				});
			} catch (e) { }
		},
		

/* Resize Image */
		
		resizeImg : function (obj){
						
			var self = this;
          	if(obj.width() === 0){ return; }
			var hold;

			if(obj.parent().parent().parent().parent().hasClass("projImgs") || obj.hasClass("resize_align")){				
				if(obj.hasClass("resize_align")){
					hold =obj.parent();
				}else{
					hold =obj.parent().parent().parent().parent();
				}
			}else{
				return;
			}

			obj.css({"width":"auto", "height":"auto"});

			if(obj.data("width_") === undefined){
				var image = new Image();				
				image.onload = function() {
				  appy_resizeImg(obj, this.width, this.height);
					obj.data("width_", this.width);
					obj.data("height_", this.height);
					try {	this.remove();	} catch (e) { }
					self.scroll_update();				
					};				
				image.src = obj.attr("src");
			}else{
				appy_resizeImg(obj,obj.data("width_"), obj.data("height_"));	
				self.scroll_update();		
			}
			
			function appy_resizeImg(obj,wid, hig){				
				var	iw = wid,
					ih = hig,
					ww = hold.width(),
					wh = hold.height(),
					rw = wh / ww,
					ri = ih / iw,
					tp = 0,
					lp = 0,
					newWidth, newHeight,
					newLeft, newTop,
					properties;

					if(obj.hasClass("resize_align") && !obj.hasClass("fitInside") ){
						obj.css({ "margin-left": "0px" });
						var rezr = hold.width() < hold.height() ? rw < ri : rw > ri;
						newWidth = ww;
						newHeight = ww * ri;
						if ( rezr ) {
							lp = ( ww  -newWidth)/2;				
						} 
						obj.css({'margin-left': Math.round(lp) + "px"});
					}else{
						if (ww > wh) {	
							newWidth = ww;
							newHeight = ww * ri;
							if(ww < newWidth || wh < newHeight ){
								newWidth = wh / ri;
								newHeight = wh;
							}
						} else {							
							newWidth = ww;
							newHeight = ww * ri;
						}
						lp = ( ww  -newWidth)/2;
						obj.css({'margin-left': Math.round(lp) + "px"});
					}
					
					newWidth =  Math.round(newWidth);
					newHeight = Math.round(newHeight);
					
					tp = Math.round((wh-newHeight)/2);
					
			  		properties = {
							'width': Math.round(newWidth) + 'px',
							'height': Math.round(newHeight) + 'px',
							'margin-top': Math.round(tp) + "px",
							"left":"auto",
							"right":"auto",
							'bottom': "auto"		
						};
						
					obj.css( properties);
				}
		},


// Site start display function
		
		site_display : function(){			
			var self = this;			

			if(!self.IEbrowser){
				$(".isotope_items .item a .img_text").css("visibility","visible");
			}
			
			/* Portfolio masonry plugin initialize */
			$("body").find(".masonry_items").each(function(){
				var $container = $(this).isotope({ 
					masonry: {
					  columnWidth: '.grid-sizer',
					  gutter: '.gutter-sizer'
					},
					itemSelector : '.item',
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false,
					},
				});					
				 $(this).data("masonryElement", $container);
			});
				
			$(".contentWrapper").find('#mapWrapper').each(function(){
				if(!self.IEbrowser){
					$(this).parent().prepend($(this).data('map'));
					$(this).parent().children(":first-child").addClass('mapStyle');
					$(this).remove();
				}
			});	
			
			/*	.parallax(xPosition, speedFactor, outerHeight) options:
				xPosition - Horizontal position of the element
				inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
				outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
			*/
			
			if(!isTouch){
				$('.addParallaxEffect').each(function(){
					$(this).parallax("50%", 0.6);
				});
			}		
			
			// Flex slideshow initialize
			$('body').find('.flexslider').each(function(){
				if(!$(this).hasClass("flexSlideshow_twitter")){
					try{
						
						if(!$(this).data("loaded")){
							$(this).data("loaded", true);
							var aniTyp = $(this).hasClass('slideAnimation') ? "slide" : "fade";
							var tim_ = $(this).attr('data-slidetime') ? Math.abs($(this).attr('data-slidetime')) : 5000;
							$(this).find("a.lazyload").each(function(){
								self.lazyLoadInt($(this));
							});								
							if(aniTyp === "slide"){
								$(this).find("li").each(function(i){
									$(this).find(".loading_x").remove();
									$(this).find("img").show();
								});
							}
							var laz = $(this).hasClass('flexslider');
							if(!laz){  $(this).addClass("flexslider"); }						
							var ffx = $(this);
							ffx.append('<div class="slider_loading" ></div>');
							$(this).find(" a.lazyload").each(function(){
								self.lazyLoadInt($(this));
							});
							var flexs = $(this);
							flexs.flexslider({
							slideshow: true,
							animation: aniTyp,
							slideshowSpeed: tim_,
							start: function(slider){
								flexs.data("slid",slider);
								flexs.find(".slider_loading").remove();
								slider.pause();
								}
							});	
						}
					} catch (e) { }	
				}
			});			
		},
		
		
		// Site footer code
		siteFooter : function( triggerIt_ ){
			var self = this;
			return;
		
			var removeTopSpc = true;
			var tpSpMc = $(".top_space");
			
			var triggerIt = window.innerWidth < 768 ? false : triggerIt_;
			
			if(!self.footActive){
				self.footActive = true;
				self.isHide = false;
				
				$(".header_content").data("open", false);
				self.foter_close.each(function(){
					var fc = $($(this).attr("data-close"));					
					$(this).click(function(){
						var btn = $(this);						
						$(btn.attr("data-close")).each(function(){
							var mc = $(this);							
							if(!self.isHide){
								var h1 =  mc.height();
								mc.css({"height": h1});
								btn.addClass("footOpen");
								if(cssAnimate){
									mc[animateSyntax]({"height": "0px"}, 500 , "easeInOutQuart");
								}else{
									mc.animate({"height": "0px"}, 500 , "easeInOutQuart");
									}
								removeTopSpc = true;
								headerClose = true;																	
							}else{
								if(self.stageWidth > 991){
									$(".header_content").css({"display":"block"});
								}
								btn.removeClass("footOpen");
								var h1 =  mc.height();
								mc.css({"height": "auto"});
								var h2 = mc.height();	
								if(h1 !== h2){										
									mc.css({"height": "0px"});								
									mc[animateSyntax]({"height": h2},500 , "easeInOutQuart", function(){
										$(this).css({"height": "auto"});
									});	
									removeTopSpc = false;
								}
								headerClose = false;	
							}
														
							setTimeout(function(){self.page_setup();},500);							
						});
						
						self.isHide = self.isHide ? false : true;
						
						if(removeTopSpc){				
							tpSpMc.addClass("removePad");
						}else{
							tpSpMc.removeClass("removePad");
						}											
					});
				});				
			}
					

			if(triggerIt){
				
				self.foter_close.each(function(){
					var fc = $($(this).attr("data-close"));					
					$(this).each(function(){
						var btn = $(this);
						$(btn.attr("data-close")).each(function(){
							var mc = $(this);
							var h1 =  mc.height();
							mc.css({"height": h1});							
							btn.addClass("footOpen");
							mc[animateSyntax]({"height": "0px"}, 500 , "easeInOutQuart");
							removeTopSpc = true;							
						});				
					});
				});
				self.isHide = true;				
			}	
			
			if(!headerClose && !triggerIt){ 
				  self.foter_close.removeClass("footOpen");
				  self.foter_close.each(function(){
					  $($(this).attr("data-close")).each(function(){					
						  var mc = $(this);
						  var h1 =  mc.height();
						  mc.css({"height": "auto"});
						  var h2 = mc.height();	
						  if(h1 !== h2){							
							  mc.css({"height": "0px"});								
							  mc[animateSyntax]({"height": h2},500 , "easeInOutQuart", function(){
								  $(this).css({"height": "auto"});
							  });
						  }
					  });
				  });
				 		
				  if(self.stageWidth > 991){
					  $(".header_content").css({"display":"block"});
					  $(".header_content").css({"height":"auto"});
					  self.headerMc.addClass("menuOpen");
					  removeTopSpc = false;
				  }else{
					  $(".header_content").css({"height":"auto"});
					  if($(".header_content").data("open")){
						  $(".header_content").css({"display":"block"});
						  $(".header_content").css({"height":"auto"});
						  self.headerMc.addClass("menuOpen");
					  }else{
						  $(".header_content").css({"display":"none"});	
						  self.headerMc.removeClass("menuOpen");						
					  }
					  $(".header_content ul li ul li").css({"opacity":1, "bottom":0});
					  removeTopSpc = true;
				  }				  
				   self.isHide = false;	
			}else{
				self.foter_close.addClass("footOpen");
				 self.isHide = true;	
			}		
			
			if(removeTopSpc){				
				tpSpMc.addClass("removePad");
			}else{
				tpSpMc.removeClass("removePad");
			}
			
			setTimeout( function(){ if(!isTouch && !self.IEbrowser && self.supportScrollBar){ self.nicScrl.resize(); }	 }, 500);		
		},
		
		
		
		// Set page dimension
		page_dimension : function(e){
			var self = this;
			
			if(self.rezV && isTouch && self.stageWidth < 1025){ return; }
			
			var curPgDim = e;
			var conPos = 0;
			self.numCon = 0;

			$(".mainContent").children().each(function(){
				self.numCon++;
			});	
			
			
			curPgDim.find(".addPageBorder").each(function(){
				var mcc = $(this);
				var mps = self.stageWidth > 1500 ? 60 : 50;
				mcc.css({"width": self.winWidth-(self.borderSize*2), "min-height": self.StgHig-(self.borderHSize*2),	 
				"margin-top": mps+"px", "margin-left": self.borderSize+"px", "margin-right": self.borderSize+"px", "margin-bottom": "0px" });
				});	
				
				
				$("body").find(".contentWrapper.fillHeight").each(function(){
					var mcc = $(this);
					mcc.css({"width": self.winWidth,  "min-height": self.StgHig });
				});	
								
				if(self.scrollHorizontal){
					$(".mainContent").css({"width":(self.numCon*self.winWidth)+50+"px"});					
				}else{
					$(".mainContent").css({"width": self.winWidth, "overflow-x":"hidden" });
				}
			
			curPgDim.find(".fullHeight").each(function(){
				var se2 = $(this);
				
				if(self.stageWidth > 991){
					if(se2.hasClass("fixed")){
						se2.css({"height": self.StgHig-(self.borderHSize)});
					}else{
						se2.css({"min-height": self.StgHig-(self.borderHSize)});
					}
				}else{
					se2.css({"height": "auto", "min-height": "auto"});
				}
				
				if(se2.hasClass("fullResponse")){
					var dumY = !self.alignPgHor || self.stageWidth < 992 ? self.headMeuTyp1 ? pageHeaderHeight : pageHeaderHeight_mini : 0;
					
					if(se2.hasClass("fullscreenVideo")){
						se2.css({"min-height": self.StgHig-dumY, "min-width": "100%"});
					}
				
					se2.find(".video_content.fullscreenVideo, .fullscreenVideo ").css({"min-height": self.StgHig-dumY, "min-width": "100%"});
				}else{
					if(self.mobile){ 
						se2.css({"min-height": "50px"});
						se2.css({"min-height": "auto"});
					}
				}				
			});		
				
			
			setTimeout(function(){	
			
				curPgDim.find(".portion").each(function(){
					var se2 = $(this);
					if(self.stageWidth > 991){
						se2.css({"min-height": self.StgHig-(60)});
					}else{
						se2.css({"min-height": "auto"});
					}	
				});
			
			
				curPgDim.find(".fitHeight").each(function(){
					var se3 = $(this);
					se3.find(".makeFit").css({"min-height": "auto", "height": "auto"});
					var hhf = 0;
					se3.find(".makeFit").each(function(){
						hhf = $(this).height() > hhf ? $(this).height() : hhf;
					});	
					
					if(se3.hasClass("fullHeight")){
						hhf = hhf < self.StgHig-(self.borderSize) ? self.StgHig-(self.borderHSize) : hhf;					
						se3.find(".makeFit").css({"min-height": self.StgHig-(self.borderHSize)});
					}
					
					se3.find(".makeFit").each(function(){	
						if(self.stageWidth <= 991 && $(this).hasClass("mobFitRemove") ){								
							$(this).css({"height": "auto", "min-height": "auto"});								
						}else{
							$(this).css({"height": hhf});
							}							
							
					});
				});
				
				
				self.homeSliderDimension();
				
				
				curPgDim.find('.slideshow_cycle').each(function(){ 
					$(this).css({"width":"auto"});
					var cw = 0;
					var ch = 0;
					
					$(this).find(".slide").each(function(){
						$(this).css({"width":"auto", "height":"auto"})
						cw = $(this).outerWidth() > cw ? $(this).outerWidth() : cw;  
						ch = $(this).outerHeight() > ch ? $(this).outerHeight() : ch;						
						});
						
					$(this).find(".slide").css({"width":cw});   
					$(this).css({"width":cw});   
					$(this).css({"height":ch});  
				});
				
				curPgDim.find('#supersized').each(function(){ 		
					try{	api.resizeNow(); } catch (e) { }
				});
				
				self.videoRest();
				
				if(BigVid !== undefined){
					curPgDim.find('#big-video-wrap').each(function(){ 
						$(this).css({"height": $("#big-video-wrap").parent().parent().height()});
					});
				}
		
			},250);
			
						
			self.homeSliderDimension();
						
		},
		
		update_menu : function(ele){ 
			var self = this;
			var menuDefined = false;
			
			var iid = ele.attr("data-id");
			
			if($('.nav a[href$="#'+ ele.attr("data-id")+'"]').length > 0 || !self.onePage){
				menuDefined = true;
				$(".nav li a").removeClass("active");	
				$(".nav li ul").removeClass("active");							  			
				$(".nav li ul li a").removeClass("active");
				
				if(self.onePage){
					if(!$('.nav a[href$="#'+iid+'"]').parent().parent().hasClass("nav")){
					  $('.nav a[href$="#'+iid+'"]').parent().parent().parent().children(":first-child").addClass("active");					
					  }
					  $('.nav a[href$="#'+iid+'"]').addClass("active");	
					  $('.nav a[href$="#'+iid+'"]').parent().parent().addClass("active");	
				}else{
					if(!$('.nav a[href$="'+self.homePage+'"]').parent().parent().hasClass("nav")){
					  $('.nav a[href$="'+self.homePage+'"]').parent().parent().parent().children(":first-child").addClass("active");					
					  }
					$('.nav a[href$="'+self.homePage+'"]').addClass("active");
				}
			}
				
			if(!menuDefined){ 
			  	$(".nav li a").removeClass("active");
			  	$(".nav li ul li a").removeClass("active"); 
			}
			
			$(".dotted-nav li a").removeClass("active");
			$('.dotted-nav li a[href$="#'+ele.attr("data-id")+'"]').addClass("active");
			
			if(self.horizNav_added){
				self.horizNav.removeClass("active");
				$('.horizontal-nav li a[href$="#'+ele.attr("data-id")+'"]').addClass("active");
			}	
		},
		
		// Update the page, when the page change is or resize 
		updatePage : function(ele){			
			var self = this;	

			if(self.rez){ return; }		
			
			self.update_menu(ele);
			
			ele.find('.flexslider').each(function(){
				try{  
					if($(this).data("slid") !== undefined){
						$(this).data("slid").windowRez(); 
					}
				} catch (e) { }	
			});
				
					self.owlSlideStop();	
					
					self.owlSlidePlay(ele);	
			
			
			ele.find('.flexslider').each(function(){
				try{  
					if($(this).data("slid") !== undefined){
						$(this).data("slid").windowRez(); 
					}
				} catch (e) { }	
			});
			
			
			
			
			ele.find('.masonry_items').each(function(){	
				$(this).data("masonryElement").isotope('layout');		
			});				
			
			if(self.onePage){ 
				$("body").find('.slideshow_cycle').each(function(){
					$(this).cycle('pause');		
				});
				
				ele.find('.slideshow_cycle').each(function(){
					$(this).cycle('resume'); 
				});
			}
			
			if(lowResDesktop){
				ele.find('img.resize_align').each(function(){
					self.resizeImg($(this));
				});	
			}			
				
			if(!ele.hasClass('portfolioPage')){
				setTimeout(function(){ 
					self.scroll_update() 
				}, 1000);	
			}
				
			if(!self.enableLowPerformance){
				if(self.enableAutoposition && !self.temprDisableAutoposition){					
					if(ele.hasClass("autoPosition") && self.onePage){
						self.autoPagePos(ele);	
						if(!isTouch && !self.IEbrowser && self.supportScrollBar){
							self.nicScrl.cancelScroll();
						}
						
						window.location.href = "#"+ele.attr("data-id");	
						
						$("body").on("mousewheel.myEvents", function() {	return false;	});	
										
						setTimeout(function(){	
							$("body").off("mousewheel.myEvents");								
						},2000)	;						
					};
				}else{
					setTimeout(function(){	
						self.enableAutoposition = true; 
						self.temprDisableAutoposition = false	
					}, 2000)				
				}
			}				

			
			$("#big-video-wrap").css({"display":"none"});
			
			try{
				if(BigVid !== undefined){
					BigVid.getPlayer().pause();			
				}
			} catch (e) { }	
			
			try{
				if(ele !== undefined && !self.enableLowPerformance){			
					ele.find('.big_video').each(function(){
						var vmc = $(this);
						if(!self.lowMobile){
							if(vmc.attr("data-background-video") !== undefined){
								$("#big-video-vid").css({"display":"block"});
								vmc.append($("#big-video-wrap"));							
								var videoVolume = isNaN(vmc.attr("data-video-volume")) ? defaultVolume : Number(vmc.attr("data-video-volume"));
								if(bgVideopath !== vmc.attr("data-background-video"))	{
									bgVideopath = vmc.attr("data-background-video");	
									if(BigVid !== undefined){
										var vpp = bgVideopath.split(",");
										if(vpp < 2){
											BigVid.show(vpp[0] );
										}else{
											BigVid.show(vpp[0], {altSource:vpp[1]}  );
										}
									}												
								}else{	
									if(BigVid !== undefined){
										$(".vidPlyPauBtn").data("view", true);	
										$(".vidPlyPauBtn").find("i").addClass("highlight");	
										BigVid.getPlayer().play();	
									}
								}
								
								try{ 
									if(BigVid !== undefined){ 
										BigVid.getPlayer().volume(videoVolume); 
									} 
								} catch (e) { }
							}
						}else{
							if(BigVid !== undefined){
								$(".vidPlyPauBtn").data("view", false);	
								$(".vidPlyPauBtn").find("i").removeClass("highlight");	
								BigVid.getPlayer().pause();	
							}
						}
					});	
					
					if(ele.find('.big_video').length > 0){
						$("#big-video-wrap").css({"display":"block"});	
					}
				}
			} catch (e) { }	
			
			
		},
		
		
		load_plugin_Items : function (e){
			var self = this;
			self.curP = e;
			
			self.curP.find(".carousel_container a.lazyload, .elastislide-carousel a.lazyload, a.lazyload_single").each(function(){
				self.lazyLoadInt($(this));
			});
			
			if(self.curP.data("owlLoad") === undefined ){
				self.curP.data("owlLoad", true);	
				
				/*// Initialize carousel Elasticslider */		
				try{	owlSliderInit(self.curP, self.eventClickMc);	} catch (e) { }	
			}  			
	
			if(self.curP.data("carouselLoad") === undefined ){
				self.curP.data("carouselLoad", true);	
				
				// Initialize carousel Elasticslider 
				self.curP.find('.carousel').each(function(){
					
					$(this).find("img").css({"visibility":"visible"}).show();
					$(this).elastislide();
				});					
			};

			
			
			if(self.curP.data("carouseGallLoad") === undefined ){
				self.curP.data("carouseGallLoad", true);
								
				var fullThumbnail = self.curP.find('.fullScreenGallery_thumbnails');
				
				self.curP.find('.carousel_container').each(function(){					
					$(this).data("thu",fullThumbnail);
					
					
					// Initialize carousel galler Elasticslider										
					if($(this).attr("data-link") === undefined){
				 		$(this).find(".carousel_thumbails").elastislide( { minItems : 1 });	
					}else{
						carousel_gallery_int ($(this));	
					}					
					if(self.disableAnimation){
					 	$(this).find(".carousel_thumbails").css({"visibility":"visible"});	
					}					
				});

			}
			
			if(self.url !== self.curPgChk){	
				try{					
					self.curP.find(".carousel_container").each(function(){
						var mc = $(this);
						if(mc.data("firstLoad") === undefined){
							mc.data("firstLoad", true);
							mc.css({"height":"auto"});	
							mc.data("hig", mc.height());
						}else{
							mc.find(".carousel_thumbails").each(function(){
								$(this).data("fn")($(this).children().eq( 0 ),0,true);
							});
						}
						
					});	
				} catch (e) { }				
			}
											
			if(self.curP.hasClass("bodyBackground")){
				  var img = !isMobileChk ? self.curP.attr("data-src") : (self.curP.attr("data-src-small")? self.curP.attr("data-src-small")  : self.curP.attr("data-src"));	
				  var imgAtt = !isTouch ? "fixed" : "scroll";
				  var vd = self.curP.hasClass('.backGroundVideo');
				  
				  if(img !== undefined){
					if(img !== "none"){
						$("body").addClass("addBackground").css({"background-image":"url("+img+")"});	
					}else{
						$("body").removeClass("addBackground").css({"background-image":"none"});
					}
				  }
			};	
					
			
			
			if(!self.curP.data("linkBugFix")){
				self.curP.data("linkBugFix", true)
				$(".thumbItem_holder .thumbItem").find("a").on("click", function(event) {
					var aLink = $(this);					
					if(aLink.attr("href") !== undefined && !aLink.hasClass("magnificPopup") && !aLink.hasClass("smoothPageLoad") ){	
						if(aLink.attr("_target") !== undefined){
							window.open(aLink.attr("href"), aLink.attr("target"));
						}else{
							window.location.href = aLink.attr("href");	
						}																
					}		
					return false;

				});
			}
			
			self.beforePageLoad(self.curP);
			
		},
		
		
		
		// Position the page
		page_position : function (e){	
			var self = this;
			
			self.curP = self.navArry[0];	
			
			 for(var ik=0; ik < self.navArry.length; ik++){
				if(self.navArry[ik].attr("data-id") === self.url){
					self.curP = self.navArry[ik];					
				}
			}

			var isInCont = undefined;
			for(var ab=0; ab < self.conArry.length; ab++){
				if(self.conArry[ab].attr("data-id") === self.url){
					isInCont = self.conArry[ab];
				}
			};
				
			self.pgAll.stop();
			
			setTimeout(function(){				
				if(isInCont !== undefined){
					isInCont.find('[data-animated-in]').each(function(){
						if(lowResDesktop){
							self.animateObject($(this), 1000000);
						}else{
							self.animateObject($(this), self.scrollPos);
						}
					});
				}
			},500);		
						

			if(self.superSlider && !supersizedOnBody && self.onePage){			
				if("!home" !== self.url){
					setTimeout(function(){  
						if(!$.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1){ api.playToggle();} 
						$("#supersized li").css({"visibility":"hidden", "display":"none"});
						$("#supersized li.activeslide").css({"visibility":"visible", "display":"block"});
						api.sliderAnimateEngine();
					},200);
				}else{				
					setTimeout(function(){ 
						if($.supersized.vars.is_paused && $.supersized.vars.options.autoplay === 1){ api.playToggle(); } 
						$("#supersized li").css({"visibility":"visible", "display":"block"});
					},200);
				}				
			}
			
			if(self.rsSlider){				
				if(self.url === self.homePg){
					setTimeout(function(){  apiRS.revresume(); },1000);
				}else{				
					setTimeout(function(){ apiRS.revpause(); },1000);
				}				
			}
				  
			var posT = 0;

			var scrollPos = self.pgAll.scrollTop();			
			var sped2 = scrollPos < (posT+self.headHig)-10 && scrollPos > 0	? 0 : self.aniSpeed;			
			
			
			if(self.onePage){			
				self.autoPagePos(isInCont);					
				}
			
			self.pageUpdate();
			
			
			if(self.pgNex.data( "url") === "undefined"){
				self.pgNex.addClass("endPage");
			}else{
				self.pgNex.removeClass("endPage");
			}
						
			if(self.pgPre.data( "url") === "undefined"){
				self.pgPre.addClass("endPage");
			}else{
				self.pgPre.removeClass("endPage");
			}
						
			self.pgNex.removeClass("autoPosition");
			self.pgPre.removeClass("autoPosition");		
			
			self.headerMc.removeClass("bg_transparent");
			
			self.curPgChk = self.url;
			
			setTimeout( function(){
				if(self.bdy.hasClass("menuAutoClose")){
					self.bdy.removeClass("menuOpenIt");
					self.bdy.addClass("menuCloseIt");
					self.bdy.removeClass("autoHideMenuEnable");
					self.bdy.addClass("autoHideMenuDisable");
					}
			}, 750);
						
			setTimeout(function(){ 
				self.videoRest(); 
				}, 1000);
		
		},
		
		
		// Page auto position
		autoPagePos : function(ele){
			
			var self = this;	
			
			self.scrollObj.stop(false);
			
			var posT = 0;
			
			posT  = ele === undefined ? 0 : isMobileChk ? Math.round((ele.position().top)+self.headHig) : Math.round((ele.position().top ) - self.headHig);

			self.scrollTopAction( self.scrollObj, posT, self.aniSpeed);

		},
		
		
		pageUpdate : function(){
			var self = this;		
			for(var ik=0; ik < self.navArry.length; ik++){
				if(self.navArry[ik].attr("data-id") === self.url){					
					self.updatePage(self.curP);
				}
			}					
			self.scroll_update();	
		},
		

	// Page border setup
		setPageBorder : function(){
				var self = this;
				if($("body").attr("data-removePageBorder") !== "yes"){
					$("body").addClass("borderAdded");
					self.borderSize = pageBorder_z = self.stageWidth > 1440 ? 60 : self.minMobile ? 0 : self.midMobile ? 20 : 30;
					self.borderHSize = self.borderSize;
				}else{
					self.borderSize = pageBorder_z = 0;
					self.borderHSize = self.stageWidth > 1500 ? 60 : 50;
					$("body").removeClass("borderAdded");
				}
			},
	
	// Page border setup
		homeSliderDimension : function(){
			  var self = this;	
			  var borderSze = self.stageWidth > 1500 ? 60 : 50;
			  $(".fullScreenSlider").css({"min-height":self.StgHig-borderSze});
			  if(!isMobileChk){					
				  self.hSlider.css({"height":self.StgHig-borderSze, "min-height":self.StgHig-borderSze});
				  self.hBanner.css({"height":self.StgHig-260, "min-height":self.StgHig-260});
				  self.hSliderResp.css({"height":self.StgHig, "min-height":self.StgHig});
			  }else{
				  self.hSlider.css({"height":self.StgHig-(borderSze), "min-height":self.StgHig-(borderSze)});
				  self.hBanner.css({"height":self.StgHig, "min-height":self.StgHig});
				  self.hSliderResp.css({"height":self.StgHig, "min-height":self.StgHig});
			  }
		 },
		
				
// The entire page will reposition, resize and modified by page_setup function
		page_setup : function (){
			
			var self = this;
			
			if(self.rezV && isTouch && self.stageWidth < 1025){
				return;
			}

			self.stageWidth =  window.innerWidth;
			self.stageHeight =  window.innerHeight;

			self.winWidth =  self.stageWidth;
			self.winHeight =   self.stageHeight;
			
			self.ipadPort = (self.stageWidth >= 768 &&  self.stageWidth < 1024);
			self.mobile = self.stageWidth <= 959 && !self.ipadPort;
			self.midMobile = self.stageWidth <= 767 && self.stageWidth > 479;
			self.minMobile = self.stageWidth <= 480;
			isMobileChk = self.stageWidth < 768;		
			self.navTop = true;				
			
			$(".tst").text(self.stageWidth);
			$(".tst2").text(self.stageHeight);
			
			lowResDesktop = self.stageWidth <= 991;
			self.lowMobile = self.stageWidth < 768;
			
			self.StgHig = iPhoneDevice ? screen.height-60 : self.winHeight;	
			
			self.setPageBorder();		

			self.enableLowPerformance = isTouch || window.innerWidth < 1025;
			self.HideUnuse =  false;
			
			if((!self.HideUnuse)){
				for(var bb=0; bb < self.conArry.length; bb++){
					if(self.conArry[bb].css("visibility") === "hidden"){							  
						self.conArry[bb].css({"visibility":"visible"});
					}
				}
			}		
			
			$("body").data("bgType",isMobileChk);

			if(self.headerFad.hasClass("addIntroGraphic")){
				self.bdy.css({"height":self.winHeight, "overflow":"hidden"});
			}
			
			if(self.headHig > 0){
				$(".mobile_topSpc").removeClass("removeSpc");
			}else{
				$(".mobile_topSpc").addClass("removeSpc");
			}

			if(self.stageWidth > 991){
				$(".header_content").css({"display":"block"});
			}
			
			if(isMobileChk){
				self.pgNexPre.addClass("pageNavHorizontal");
			}else{
				self.pgNexPre.removeClass("pageNavHorizontal");
			}
			
			
			self.parallaxBgUpdate();
			
			
			
			// Change the default image in img tag, if mobile version(data-src-small) image is assign on the img tag
			self.bdy.find('img').each(function() {
				self.loadResponsiveImg($(this));				
			});
			
			
			if(self.rez){
				
				for(var ab=0; ab < self.conArry.length; ab++){
					self.page_dimension(self.conArry[ab]);
				};
			
				$(self.contClose.attr("data-content")).css({"top":"0px"});
				self.contClose.children(":first-child").children(":first-child").css({"right" : "-40px"});
				
				$(window).trigger("scroll");
			}

			$("body").find('.addVideo.backGroundVideo').each(function(){
				var vid2 = $(this);
				try{ 
					var img = !self.mobile ? vid2.attr("data-src") : (vid2.attr("data-src-small")? vid2.attr("data-src-small")  : vid2.attr("data-src"));	
					if(img !== "none" || img !== undefined){
						vid2.css({"background-image":"url("+img+")"});
					}else{
						vid2.css({"background-image":"none"});
					}
				}catch(e){}
			});	

			var tppp = 0;
			
			
			$("body").find(".video_content.backGroundVideo").each(function(){
				$(this).css({"min-height": self.StgHig, "min-width": "100%"});
			});
			
			$("body").find(".carousel_preview.fullScreenGallery_items, .carousel_preview.fullScreenGallery_items .carousel_item").each(function(){
				$(this).css({"height": self.StgHig-(self.headHig), "width":"100%"});
			});


			self.ContPgTopSpace = self.stageHeight > 360 ? 360 : 150;
			$(".contactPage .contactPage_content").css({ "min-height": self.stageHeight - self.ContPgTopSpace, "margin-top": self.ContPgTopSpace } );

			
			
			$('body').find('img.resize_align').each(function(){
				self.resizeImg($(this));
			});
			
			$("body").find('.masonry_items').each(function(){
				$(this).data("masonryElement").isotope('layout');	
			});
			
			if(isTouch){	
				$(".overlayPattern").hide();
			}
			
			if(BigVid !== undefined){
				$("#big-video-wrap").css({"height": "100%"});
			}
			
			if((self.IEbrowser || !self.supportScrollBar)){
				self.htmlBody.css({"overflow":"auto"});
			}
		},
		
		loadResponsiveImg : function(ele){
			var self = this;	
			var thsImg = ele;
			var mobVer = thsImg.hasClass("lowResSupport") ? (self.stageWidth <= 979 ? true : false) : self.mobile;
			
			if(thsImg.attr('data-src-small')){		
				if(!mobVer || !thsImg.attr('data-src-small')){
					var img_Src = thsImg.data('src').split(".");
					var iimg = thsImg.attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : thsImg.data('src');	
						if(String(thsImg.attr('src')) !== iimg){
							thsImg.attr("src", iimg);
							thsImg.data("i_src",thsImg.data('src'));
						}			
				}else{
					if(thsImg.attr('data-src-small')){
						img_Src = thsImg.attr('data-src-small').split(".");
						iimg = thsImg.attr('data-retina') === "yes" && retinaDevice ? img_Src[0]+"@2x."+ img_Src[1] : thsImg.attr('data-src-small');
						if(String(thsImg.attr('src')) !== String(thsImg.attr('data-src-small')) && String(thsImg.attr('src')) !== iimg){
							thsImg.attr("src",iimg);
							thsImg.data("i_src",thsImg.attr('data-src-small'));
						}
					}
				}
			}
		},
		
		
		beforePageLoad : function(ele){
			var self = this;			
			
			var isInCont = undefined;
			

			if(ele.attr("data-id") === self.url){
				isInCont = self.conArry[ab];					
				try{ 
					ele.find('.flexslider').each(function(){
						var fc = $(this);
						if(fc.data("loadInPop") === undefined && fc.data("slid") !== undefined && fc.data("autPly") ){												
							fc.data("slid").resume();
						}
					});
				} catch (e) { }		
				
				try{ 					
					if(ele.data("owlLoad")){
						ele.find('.owlSlider').each(function(){	
							if(!$(this).data("autoPlayRun")){	
								$(this).data("autoPlayRun", true);					
								$(this).data('owlCarousel').trigger('play.owl.autoplay');
							}
						});
						
					}
				} catch (e) { }	
					
			}else{					
				try{ 
					ele.find('.flexslider').each(function(){
						if($(this).data("slid") !== undefined){
							 $(this).data("slid").pause();
						}
					}); 
				} catch (e) { }
									
				self.owlSlideStop();					
			}
				
				
					
			if(!ele.hasClass("portfolioPage")){
				ele.find('.flexSlideshow').each(function(){
					try{
						if(!$(this).data("loaded")){
							$(this).data("loaded", true);
							var aniTyp = $(this).hasClass('slideAnimation') ? "slide" : "fade";
							var tim_ = $(this).attr('data-slidetime') ?  Math.abs($(this).attr('data-slidetime')) : 5000;
							
							$(this).find("a.lazyload").each(function(){
								self.lazyLoadInt($(this));
							});								
							if(aniTyp === "slide"){
								$(this).find("li").each(function(i){
									$(this).find(".loading_x").remove();
									$(this).find("img").show();
								});
							}
							var laz = $(this).hasClass('flexslider');
							if(!laz){  $(this).addClass("flexslider"); }				
							var ffx = $(this);
							ffx.removeClass('flexSlideshow');
							ffx.append('<div class="slider_loading" ></div>');
							var flexs = $(this);
							
							flexs.flexslider({
							slideshow: true,
							animation: aniTyp,
							slideshowSpeed: tim_,
							start: function(slider){
								flexs.data("slid",slider);
								flexs.find(".slider_loading").remove();
								slider.pause();
								}
							});	
						}
					} catch (e) { }				
				});	
			}
			  
			ele.find('#map_canvas').each(function(){
				if($(this).data("addMap") !== "yes" && !$(this).hasClass("autoLoadOff")){
					$(this).data("addMap", "yes");
					try{
						map_initialize(); 

					} catch (e) {
						$("#map_canvas").html($(this).data("con"));			
					}					
				}
				if($(this).data("addMap") == "yes"){
					mapResizer();
				}
			});									
		},
		
		parallaxBgUpdate : function(e){	
			
			var self = this;
			$("body").find('.parallax').each(function(){
				var img = !isMobileChk ? $(this).attr("data-src") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  : $(this).attr("data-src"));	
				var imgAtt = !isTouch ? "scroll" : "scroll";
				var vd = false;
				var thbg = $(this);
				thbg.find('.backGroundVideo').each(function(){
					vd = true;
				});	
				
				if(img !== undefined && !thbg.hasClass("bodyBackground") && img !== thbg.data("imgPath")){			
					if(img !== "none"){
						thbg.css({"background-image":"url("+img+")"});
						thbg.data("imgPath",img );
					}else{
						thbg.css({"background-image":"none"});
						thbg.data("imgPath","none");
					}
				}
			});			
		},
		
		
		
// The page_load function is used to position the page as per current menu
		page_load : function (e){			
			
				
			var self = this;			
			self.url = e  ? e : self.homePg;			
			self.cM = $('a[href$="#'+self.url+'"]').parent();
			self.cM_= !self.onePage ? $('.contentWrapper') : $('a[href$="#'+self.url+'"]');
			self.pgViewed = false;
			
			var jjj = false; 
			
			
			self.pgNexPre.removeClass("hideBtn");			
			for(var ik=0; ik < self.navArry.length; ik++){				
				if(self.navArry[ik].attr("data-id") === self.url){					
					if(self.navArry[ik].hasClass("removeNexPrevBtn")){
						self.pgNexPre.addClass("hideBtn");
					}						
					if(self.navArry[ik-1]){
						self.pgPre.data( "url" , self.navArry[ik-1].attr("data-id") );
					}else{
						self.pgPre.data( "url", "undefined"); 
					}
					if(self.navArry[ik+1]){						
						self.pgNex.data( "url" , self.navArry[ik+1].attr("data-id") );
					}else{
						self.pgNex.data( "url", "undefined"); 
					}
					break;
				}				
			}		
			
			
			
			var isInCont = undefined;	
			var beforePg = -1;		
			for(var ab=0; ab < self.conArry.length; ab++){				
				if(self.conArry[ab].attr("data-id") === self.url){
					beforePg = ab;
					isInCont = self.curPageShow = self.conArry[ab];
				}
			};
			
				
			$("body").find('.addVideo').each(function(){	
				$(this).data("isPlaying", false);
			});		
							
				
			if($("body").find('.mfp-wrap').length > 0){
				try{ $.magnificPopup.close(); } catch (e) { }
			} 
					
			try{ 
				if(BigVid !== undefined){
					BigVid.getPlayer().pause();
				}
			} catch (e) { }	
			
			if(isInCont !== undefined ){
				isInCont.find('.big_video').each(function(){
					try{
						var vmc = $(this);
						if(vmc.attr("data-background-video") !== undefined){
							vmc.append($("#big-video-wrap"));
							$("#big-video-vid").css({"display":"block"});
							var videoVolume = isNaN(vmc.attr("data-video-volume")) ? defaultVolume : Number(vmc.attr("data-video-volume"));
							if(bgVideopath !== vmc.attr("data-background-video"))	{
								bgVideopath = vmc.attr("data-background-video");
								if(BigVid !== undefined){
									var vpp = bgVideopath.split(",");
									if(vpp < 2){
										BigVid.show(vpp[0] );
									}else{
										BigVid.show(vpp[0], {altSource:vpp[1]}  );
									}
								}							
							}else{	
								if(BigVid !== undefined){
									$(".vidPlyPauBtn").data("view", true);	
									$(".vidPlyPauBtn").find("i").addClass("highlight");		
									BigVid.getPlayer().play();
								}
							}						
							try{ 
								if(BigVid !== undefined){ 
									BigVid.getPlayer().volume(videoVolume); 
								} 
							} catch (e) { }
						}
					} catch (e) { }	
				});	
				
			}

			$("body").find('.flexslider').each(function(){
				  if($(this).data("slid") !== undefined && self.url !== "!home"){				 
					  $(this).data("slid").pause();
				  }
			});

		   if(self.stageWidth <= 991){				
			  $(".header_content").data("open", false);
			  self.headerMc.removeClass("menuOpen");					
			}
			
			try{ 
				if(isInCont !== undefined && isTouch){
					setTimeout(function(){
						isInCont.find('.masonry_items').each(function(){	
							$(this).data("masonryElement").isotope('layout');		
						});
					},20);	
				}
			}catch(e){}
			 
			// Check the previous and current page			
			
			
			if(self.prePg === self.curPg){
				
				try { self.fflod.remove(); } catch (e) { }
				
				if(isTouch){
					setTimeout(function(){
						isInCont.find('.masonry_items').each(function(){	
							$(this).data("masonryElement").isotope('layout');		
						});
					},20);		
				}
				
				
												
				// Initialize to load the opening page as per history
				if(self.curPg === "" ){						
					self.curPg = self.prePg = self.url;	
					 
					if(self.pgSub === undefined && self.onePage){
						window.location.href = "#"+self.url;						
					}
					self.cM = $('a[href$="#'+self.curPg+'"]').parent();
				}else{	
					// Initialize to load current page, background and animate to left side			
					self.curPg = self.url;
					var pagScrl_Speed = window.pageYOffset !== 0 ? self.aniSpeed : 50;
					var con_Speed = 0;
					if(self.prePg === self.url){
						if(isInCont !== undefined){
							self.page_position();
							
						}
					}
				}
			}
	
			self.temprDisableAutoposition = true;			
			self.page_position();				

		},

		
		
		// Lazy load function
		lazyLoadInt : function(obj){
			var self = this;
			
			var imSrc = !self.mobileDevice ? obj.attr("href") : (obj.attr("data-src-small")? obj.attr("data-src-small")  :obj.attr("href"));
			var lodr = obj.parent().hasClass('large_image');
			lodr = !lodr ? obj.parent().hasClass('medium_image') : lodr;
			lodr = !lodr ? obj.parent().hasClass('fixedHeight') : lodr;
			lodr = !lodr ? obj.hasClass('lazyload_single') : lodr;
			lodr = !lodr ? obj.hasClass('lazyload_fluid') : lodr;			
			lodr = !lodr ? obj.hasClass('lazyload_gallery') : lodr;
			
			
				
			if(obj.parent().hasClass('imgBorder')){
				lodr = !lodr ? obj.parent().parent().hasClass('fixedHeight') : lodr;
			}			
			var cc = obj.attr('class');
			var st = obj.attr('style');				
			var $img;
			if(st){
				$img = $('<img class="'+cc+' style="'+st+'" />');
			}else{
				$img = $('<img class="'+cc+'" />');
			}
			
			if(obj.hasClass('dataInOutAttrAdded')){
				$img.attr("data-in", obj.attr("data-in"))
				$img.attr("data-out", obj.attr("data-out"))
			}

			$img.removeClass('lazyload_single');
			$img.removeClass('lazyload_fluid');			
			$img.removeClass('lazyload_gallery');
			$img.removeClass('lazyload');
			obj.replaceWith($img);
			$img.hide();
			
			$(".loading_objects .loading_x").clone().appendTo($img.parent());
			
			if(lodr){
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".loading_x").remove();
					if($(this).hasClass("resize_align")){	
						self.resizeImg($(this));						
					};

					if(!$(this).hasClass("noSelfAnimate")){
						$(this).show().addClass(aniInEff);
					}else{
						$(this).show();
					}
										
				}).error(function () { 
					$(this).parent().find(".loading_x").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});
            }else{
				
				$img.attr('src', imSrc).load(function() {
					$(this).parent().find(".loading_x").remove();
					
					if($(this).hasClass("resize_align")){
						self.resizeImg($(this));						
					};	
					$(this).fadeIn(300);
					
					var pim = $img.parent().parent().hasClass('projImgs');
					pim = pim ? pim : $img.parent().parent().parent().parent().hasClass('projImgs');
					if(pim){
						self.resizeImg($(this));
					}else{						

						var posY = $(this).hasClass("scale_fill");
						posY = !posY ? $(this).hasClass("scale_fit") : posY;
						posY = !posY ? $(this).hasClass("scale_cover") : posY;						
						if(posY){							
							if($(this).width() > $(this).parent().width()+5	){
								$(this).css({"left":-($(this).width()-$(this).parent().width())/2});
							}
							$(this).css({"top":-($(this).height()-$(this).parent().height())/2});
						}							
					}
					
				}).error(function () {
					$(this).parent().find(".loading_x").remove();
				}).each(function() {
                  if(this.complete) { $(this).trigger('load'); }
				});	
			}
			
			return $img;
			
		},
		
		
// Initialize the History 
		history : function(){
			var self = this;

			(function($){
				var hrf = window.location.href;
				
				var origContent = "";			
				function loadContent(hash2) {
										
					window.location.href.substr(0, window.location.href.indexOf('#'));
					var splt = hash2.split("?");
					var hash = !self.onePage ? self.homePg : splt[0];
					self.pgSub = splt[1];

					if(hash !== "") {
						if(origContent === ""  && self.curPg === "") {
							origContent = $('.contentWrapper [data-id="'+"#"+self.homePg+'"]');
						}
						if(self.hisPath !== hash ){
							self.hisPath = hash;
							self.page_load(hash);							
						}
					} else {

						if(origContent !== "" && self.curPg === "") {
							if(self.hisPath !== hash ){
								self.hisPath = hash;
								self.page_load(self.homePg);
							}
						}
					}
					
					if(hash === "" && self.curPg === ""){
						self.page_load(self.homePg);
					}
				}
				
				

				$(document).ready(function() {
					$.history.init(loadContent);
					$('#navigation a').not('.external-link').click(function() {
						var url = $(this).attr('href');
						url = url.replace(/^.*#/, '');
						$.history.load(url);
						return false;
					});
				});
				
			})(jQuery);
			
		},
		

// Animating the required object
		
		animateObject : function (mc, scrlPos){
			var self = this;
			
			if(self.disableAnimation){
				return;
			}
						
			var mcPos = Math.round(mc.position().top);	
			
						
			if(mc.data("isSliderObj") || (mc.data("isDisplay")) ){
				return;
			}
		
			var par = 0;
			if(mc.attr("data-anchor-to") !== undefined){
				var mc2 = mc;
				for(var io=0; io<mc.attr("data-anchor-to").split(".").length; io++){
					mc2 =  mc2.parent();
				}				
				par = mc2.position().top;
			}
		
			/* The below code is used to find the animation triggering point */
			
			var mcPos = Math.round(mcPos + self.moveItem.position().top);	
							
			if((mcPos+par)-(self.winHeight-(self.winHeight/4-200)) > Math.abs(scrlPos)){
				return;
			}	

			mc.data("isDisplay" , true);		
			
			
			if(mc.data("isAniObj")  && !isTouch){				
				self.animate_objectBeforeDisplay(mc);
			}
					
			if(mc.attr("data-animated-innerContent") === "yes"){

				var kk = 0;
				mc.css({"visibility":"visible"});
				mc.children().css({"visibility":"hidden"});
				mc.children().each(function(){										
					var mc2 = $(this);					
					mc2.stop();
					var aniTyp = mc.attr("data-animated-in") !== undefined ? mc.attr("data-animated-in") : "animated fadeIn";
					mc.data("in", aniTyp)
					kk = !isNaN(mc.attr("data-animated-time")) && mc.attr("data-animated-time") > kk ? Number(mc.attr("data-animated-time")) : kk+3;					
					var aniTim = self.aniDelay*kk;
					aniTim = cssAnimate ? aniTim : aniTim-50;				
					mc2.removeClass(aniTyp);
					
					setTimeout(function(){											
						if(cssAnimate){						
							mc2.css({"visibility":"visible"}).removeClass(aniTyp).addClass(aniTyp).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
								$(this).removeClass(mc.data("in"));								
								if(mc.data("isAniObj") && !isTouch){
									self.animate_objectAfterDisplay($(this));
								}				
							});
						}else{
							
							var posTyp = mc2.css("position");
							if(posTyp === "static"){ mc2.css({"position":"relative"}); }	
							var tp = !isNaN(parseInt(mc2.css("top"), 10)) ? parseInt(mc2.css("top"), 10) : mc2.css("position") == "absolute" ? "auto" : 0;
							var tp2 = tp !== "auto" ? tp2+15 : "auto";
													
							mc2.css({"visibility":"visible", "opacity":0, "top":tp2}).removeClass(aniTyp).animate({"opacity":1, "top":tp},350, "easeInOutQuad",function(){
								mc2.css({"position":posTyp});								
								$(this).removeClass(mc.data("in"));							
								if(mc.data("isAniObj") && !isTouch){
									self.animate_objectAfterDisplay($(this));
								}				
							});
						}
					}, aniTim );
				});
				
			}else{
				
				mc.stop();					
				var aniTyp = mc.attr("data-animated-in") !== undefined ? mc.attr("data-animated-in") : "animated fadeIn";
				mc.data("in", aniTyp);
				var kk = !isNaN(mc.attr("data-animated-time")) && mc.attr("data-animated-time") > kk ? Number(mc.attr("data-animated-time")) : kk+3;
				var aniTim = !isNaN(mc.attr("data-animated-time")) ? self.aniDelay*mc.attr("data-animated-time") : self.aniDelay*(kk);
				aniTim = cssAnimate ? aniTim : aniTim-50;	
				mc.removeClass(aniTyp);					
				setTimeout(function(){	
									
					if(cssAnimate){						
						mc.css({"visibility":"visible"}).removeClass(aniTyp).addClass(aniTyp).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
							$(this).removeClass($(this).data("in"));
							if(mc.data("isAniObj") && !isTouch){
								self.animate_objectAfterDisplay($(this));
							}					
						});
					}else{
						var posTyp = mc.css("position");
						if(posTyp === "static"){ mc.css({"position":"relative"}); }
						
						var tp = !isNaN(parseInt(mc.css("top"), 10)) ? parseInt(mc.css("top"), 10) : mc.css("position") == "absolute" ? "auto" : 0;
						var tp2 = tp !== "auto" ? tp+15 : "auto";
						
						
						
						mc.css({"visibility":"visible", "opacity":0, "top":tp2}).removeClass(aniTyp).animate({"opacity":1, "top":tp}, 350, "easeInOutQuad",function(){
							mc.css({"position":posTyp});	
							$(this).removeClass(mc.data("in"));							
							if(mc.data("isAniObj") && !isTouch){
								self.animate_objectAfterDisplay($(this));
							}				
						});
					}
				}, aniTim );
			}
			
		},
		
		animate_objectBeforeDisplay : function(obj){
			var self = this;
			
			obj.find('.graph_container li').each(function() {
				$(this).each(function() {
					$(this).children(':first-child').css("width","100%");
					 $(this).find(".display").text("00");
				});
			});	
			
			if(obj.hasClass('graph_container')){ 
				obj.find('li').each(function() {
					$(this).each(function() {
						$(this).children(':first-child').css("width","100%");
						 $(this).find(".display").text("00");
					});
				});	
			}
			
			
			if(self.knobAni){
				try{					
					obj.find('.animate_counter').each(function(){
						 var selK = $(this);
						 if(selK.hasClass("knob")){
						 	selK.val(0).trigger("change");
							selK.parent().parent().find(".knob_arrow").css({ "transform": "rotate("+0+"deg)" });
						 }
						 selK.data("display").text(0);
					});	
				} catch (e) { }	
			 }			
		},
		
		
			
		animate_objectAfterDisplay : function(obj){
			var self = this;

			obj.find('.graph_container').each(function(){ 
					self.graph_display($(this));
				});
				
			if(obj.parent().hasClass('graph_container')){
				self.graph_display(obj);
			}
				
			if(self.knobAni){						
				try{					
					obj.find('.animate_counter').each(function(i){			
						var selK = $(this);
							selK.data("ani").stop().css({"top":0});
							if(selK.hasClass("knob")){
								selK.val(0).trigger("change");							
								selK.parent().parent().find(".knob_arrow").css({ "transform": "rotate("+0+"deg)" });
								}
							$(selK.data("ani")).animate({
								'top': selK.data("val")
							  },
							  {
								step: function(now, fx) {	
									if(selK.hasClass("knob")){
								  		selK.val(now).trigger("change");										
										selK.parent().parent().find(".knob_arrow").css({ "transform": "rotate("+(Number(now)/100)*360+"deg)" });
										}
								  	if( selK.data("display")){
									 	selK.data("display").text(Math.round(now));
								  	}
								},
								duration: 2500, 
								easing: "easeInOutQuad"							 
							  });	
					});
				} catch (e) { }	
			}
			
		},
		
		owlSlideStop : function(obj){
			var self = this;		
			try{						
				if(self.owlSliderArry.length > 0 ){	
					for(var hir=0; hir < self.owlSliderArry.length; hir++){
						if(self.owlSliderArry[hir].data("owlLoad")){										
							if(self.owlSliderArry[hir].data("autoPlayRun")){										
								self.owlSliderArry[hir].data("autoPlayRun", false);																								
								self.owlSliderArry[hir].trigger('stop.owl.autoplay');
							}
						}
					}
				}					
			} catch (e) { }		
		},
		
		owlSlidePlay : function(obj){
			var self = this;			
			try{	
				if(obj.data("owlLoad")){									
					for(var owlAry=0; owlAry < obj.data("owlArryZ").length; owlAry++){										
						if( obj.data("owlArryZ")[owlAry].data("owlLoad") && obj.data("owlArryZ")[owlAry].data("playIt")){										
							if(!obj.data("owlArryZ")[owlAry].data("autoPlayRun")){
								obj.data("owlArryZ")[owlAry].data("autoPlayRun", true);	
								obj.data("owlArryZ")[owlAry].trigger('play.owl.autoplay');
							}							
						}
					}
				}								
			} catch (e) { }				
		},
		
		
// Initialize video cover image
		intVideoObject : function(obj){
			var self = this;
			obj.find('.addVideo').each(function(){		
				var addCover = false;			
				var vidd = $(this);	
				var delBtn = $();
				vidd.find('.videoClose').each(function(){
					delBtn = $(this);
					delBtn.on(self.eventClickMc, function(){ 
						self.video_delete(vidd);
					});
					delBtn.hide();
				});
				
				vidd.data("delBtn", delBtn);
				
				$(this).find('.video_hover').each(function(){
					addCover = true;
					var vv =  $(this);
					var vid = vidd;
					vid.data("added", true);
					vid.data("delBtn", delBtn);
					var eventMc = ('ontouchstart' in document.documentElement) ? 'touchstart' : 'click';
					vv.on(eventMc, function(event) {
						vid.data("delBtn").show();	
						$("body").find('.addVideo').each(function(){
							$(this).data("isPlaying", false);
							if($(this).parent().hasClass("tabVideo")){ return; }							
							if(!$(this).data("added")){
								vid.children(':first-child').removeClass("enablHardwareAcc");
							}
							$(this).find('.vid').remove();
							if(!$(this).hasClass("backGroundVideo")){
								$(this).find('img').fadeIn();
								$(this).find('.video_hover').fadeIn();
								$(this).find('.video_hover').css({"z-index":"55"});
							}
						});
			
						vid.prepend('<div class="vid" ></div>');
						vid.data("added", true);
						vid.data("isPlaying", true);
						var autply = vid.attr("data-autoPlay") === "true" ? true : false;
						vid.data("autoplay", autply);
						vid.data("url_", self.curP.attr("data-id"));
						vid.find('.video_hover').css({"z-index":"-1"});
						vid.find('img').fadeOut(100,function(){});
						
						var vid_ = vidd;					
						vid_.children(':first-child').embedPlayer(vid_.attr('data-url'), vid_.width()+"px", vid_.height()+"px", true, vid_.children(':first-child'), false);	
						
						self.owlSlideStop();		 
							
									
					});
				});	
				
				
			});
			
		},
		
		
		


// Video Reset function
		videoRest : function(obj){
			var self = this;
			$("#fancybox-wrap").find('.addVideo').each(function(){	
				self.video_delete($(this));
			});
			
			try{
				$("body").find('.addVideo').each(function(){		
					if(!$(this).hasClass("backGroundVideo")  && !$(this).data("isPlaying") || ($(this).data("url_") !== self.curP.attr("data-id")) ){
						self.video_delete($(this));
					}
					if($(this).data("isPlaying") ){
						var vid = $(this);
						var www = Math.round(vid.width());
						var hhh = Math.round(vid.height());
						vid.find("iframe").css({"width": www+"px", "height": hhh+"px"});						
						if(isTouch){ vid.find("iframe").css({"top":self.headHig }); }
					}
				});
			} catch (e) { }
			try{
								
				self.curP.find('.addVideo.backGroundVideo').each(function(){ 
					var vid = $(this);
					var www = Math.round(vid.width());
					var hhh = Math.round(vid.height());					
					var vidW = !self.lowMobile ? www * 1.7 : www;
					var vidH = !self.lowMobile ? hhh * 1.7 : hhh;
					var ww = vidW;	
					var hh = vidH; 
					
					var rati = self.stageWidth/self.stageHeight;					
					var vZwid = rati < 1.77 && !self.lowMobile ? (1.78*self.stageHeight) : 0;
					vid.css({"width":vZwid});
					
					if(!vid.data("added") && vid.data("inMain") === "undefined"){				
						vid.data("url_", self.curP.attr("data-id"));
						vid.prepend('<div class="vid" ></div>');
						vid.children(':first-child').addClass("enablHardwareAcc");
						vid.find('.video_hover').css({"z-index":"55"});							
						vid.find('img').show(); 
						vid.children(':first-child').embedPlayer(vid.attr('data-url'), vidW+"px", vidH+"px", true, vid.children(':first-child'), true);
					}
					vid.data("added", true);
					vid.children(':first-child').css({ "top": -Math.round((hh-hhh)/2)});
					if(vZwid > 0){
						vid.children(':first-child').css({ "left": -Math.round((vZwid-self.stageWidth)/2)});
					}
					
					vid.find("iframe").css({"width": ww+"px", "height": hh+"px" });
				});					
		
				$("body").find('.addVideo.backGroundVideo').each(function(){
					var vid_ = $(this);
							
					if(vid_.data("url_") !== self.curP.attr("data-id")){ 
						self.video_delete(vid_);
					}
				});

			  } catch (e) { }
		},
		
		video_delete : function(mc){ 
			mc.data("added", false);
			mc.data("delBtn").hide();
			mc.find('.vid').each(function(){
				$(this).removeClass("enablHardwareAcc");
				try{ 				
					if($(this).length>0){
						jQuery("#"+$(this).children(':first-child').attr("id")).tubeplayer('destroy');
					}
				} catch (e) { }
				$(this).remove();
			});
			mc.find('img').show();
			mc.find('.video_hover').show();
			mc.find('.video_hover').css({"z-index":"55"});	
		},

		
// Graph display function
		graph_display : function (e){			
			e.find('li').each(function() {
				var selK = $(this).find(".display");
				selK.text("0%");				
				$(this).each(function() {
					$(this).children(':first-child').css("width","100%");
					$(this).children(':first-child').stop();	
					var vall = parseInt($(this).attr('data-level'), 10) >= 100 ? "0%" : (100 - parseInt($(this).attr('data-level'), 10))+"%";						  
					$(this).children(':first-child').animate( { width: vall },
							  {
								step: function(now, fx) {						
								  	selK.text(Math.round(now > 100 ? "0" : (100 - parseInt(now, 10)) ));
								},
								duration: 1500, 
								easing: "easeInOutQuad"							 
					});	
				});
			});
		},
		
		
// Window Resize function
		windowRez : function (){			
			var self = this;
			if(Number(self.bdy.data("width")) !== Number(window.innerWidth) || Number(self.bdy.data("height")) !== Number(window.innerHeight)){				
				if(Number(self.bdy.data("width")) === Number(window.innerWidth) && Number(self.bdy.data("height")) !== Number(window.innerHeight)){
					self.rezV = true;
				}
				self.bdy.data("width", Number(window.innerWidth));
				self.bdy.data("height", Number(window.innerHeight));
				self.rez = true;
				self.page_setup();
				self.rez = false;
				self.rezV = false;
			}
		},
		
		
		previewSetting : function (){
			var self = this;
			// Preview_set
			self.curColor = "color-white";
			self.curTempColor = "";
			
			var colr = $("#set_color").attr("href");
			if( colr.split("blue").length > 1){
				self.curTempColor = "-blue";
			}else if( colr.split("red").length > 1){
				self.curTempColor = "-red";
			}
				
			self.setting_tool = $(".setting_tools");
			setPreviewBtn();
			
			$(".setting_tools .iButton").click(function(){
				if(self.setting_tool.hasClass("hideTool")){
					self.setting_tool.removeClass("hideTool");
				}else{
					self.setting_tool.addClass("hideTool");
				}
			});
			
			$(".mUp").click(function(){
					if( self.stageWidth < 1024){
						$(".setting_tools").removeClass("mUp");
					}else{
						$(".setting_tools").addClass("mUp");
					}
				});
			
			$(".mDown").click(function(){
				if( self.stageWidth < 1024){
						$(".setting_tools").addClass("mUp");
					}else{
						$(".setting_tools").removeClass("mUp");
					}
				});
				
			if( self.stageWidth < 1024){
				$(".setting_tools").addClass("mUp");
			 }		
			
			$(".colWhite").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/color-white"+self.curTempColor+".css");
					$("body").addClass("white_ver");
					$(".slider1").removeClass("inverseStyle");
					$(".preview_set").addClass("inverseStyle");
					setPreviewBtn();
				}
			});
			
			$(".colNight").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/color-night"+self.curTempColor+".css");
					$("body").removeClass("white_ver");
					$(".slider1").addClass("inverseStyle");
					$(".preview_set").removeClass("inverseStyle");	
					setPreviewBtn();
				}
			});
			
			$(".colBlack").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/color-black"+self.curTempColor+".css");
					$("body").removeClass("white_ver");
					$(".slider1").addClass("inverseStyle");
					$(".preview_set").removeClass("inverseStyle");	
					setPreviewBtn();
				}
			});
			
			/* --- */
			
			$(".mType1").click(function(){
				$(".header, .fixedMenu, .headerFixed").removeClass("menuInverse");
				$(".smartMenu_btn").removeClass("inverse");				
				setPreviewBtn();
			});	
			
			$(".mType2").click(function(){
				$(".header, .fixedMenu, .headerFixed").addClass("menuInverse");
				$(".smartMenu_btn").addClass("inverse");	
				setPreviewBtn();
			});	
			
			$(".borderType1").on('click', function() {
				$("body").attr("data-removePageBorder", "yes");
				self.rez = true;
				self.page_setup();
				
				$("body").find('.owlSlider').each(function(i){
					if($(this).data("owlLoad")){						
						$(this).trigger('refresh.owl.carousel');
					}
				});
				setPreviewBtn();
				});	
							
			$(".borderType2").on('click', function() {
				$("body").attr("data-removePageBorder", "no");
				self.rez = true;
				self.page_setup();
				$("body").find('.owlSlider').each(function(i){
					if($(this).data("owlLoad")){					
						$(this).trigger('refresh.owl.carousel');
					}
				});
				setPreviewBtn();
				});	
			
			$(".fontStyle1").click(function(){
				$("#set_font").attr("href", "css/font-style1.css");
				setPreviewBtn();
				
			});
			
			$(".fontStyle2").click(function(){
				$("#set_font").attr("href", "css/font-style2.css");
				setPreviewBtn();				
			});
			
			/* --- */
			
			$(".temHigLight1").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/"+self.curColor+""+".css");
					self.curTempColor = "";
					setPreviewBtn();
				}
			});
			
			$(".temHigLight2").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/"+self.curColor+"-blue"+".css");
					self.curTempColor = "-blue";
					setPreviewBtn();
				}
			});
			
			$(".temHigLight3").click(function(){
				if(!$(this).hasClass("active")){
					$("#set_color").attr("href", "css/"+self.curColor+"-red"+".css");
					self.curTempColor = "-red";
					setPreviewBtn();
				}
			});
			

			
			function setPreviewBtn(){
				$(".fontStyle1, .fontStyle2, .mType1, .mType2, .colWhite, .colNight, .colBlack").removeClass("active");
				$(".temHigLight1, .temHigLight2, .temHigLight3, .borderType1, .borderType2").removeClass("active");
				
				
				var whitVerSion = $("body").hasClass("white_ver");
				if(self.curColorSetup !== whitVerSion){				
					try{		
						$(".imgSwp_preview").each(function(){
							var bgRepc = $(this);
							var str = bgRepc.attr("data-src");						
							if(whitVerSion) { 
								bgRepc.attr("data-src", str.replace("background/black_i", "background/i"));
								bgRepc.attr("data-src-small", str.replace("background/black_i", "background/i"));
							}else{
								bgRepc.attr("data-src", str.replace("background/i", "background/black_i"));
								bgRepc.attr("data-src-small", str.replace("background/i", "background/black_i"));
							}
							
							self.loadResponsiveImg(bgRepc);
							self.parallaxBgUpdate();
							
							if(bgRepc.prop("tagName") === "IMG"){
								if(whitVerSion) { 
									bgRepc.attr("src", str.replace("background/black_i", "background/i")); 
								}else{
									bgRepc.attr("src", str.replace("background/i", "background/black_i"));
								}
							}
							
						});
					} catch (e) {  }
				}
				
				self.curColorSetup = $("body").hasClass("white_ver");
				
				
				if($("body").attr("data-removePageBorder") !== "yes"){
					$(".borderType2").addClass("active");
				}else{
					$(".borderType1").addClass("active");
					}

				var cUrl = $("#set_color").attr("href");
				
				if( cUrl.split("white").length > 1){
					$(".colWhite").addClass("active");
					self.curColor = "color-white";
				}else if( cUrl.split("night").length > 1){
					$(".colNight").addClass("active");
					self.curColor = "color-night";
				}else{
					$(".colBlack").addClass("active");
					self.curColor = "color-black";
				}
					
				if($(".header").hasClass("menuInverse") || $(".headerFixed").hasClass("menuInverse")){
					$(".mType2").addClass("active");
				}else{
					$(".mType1").addClass("active");
					}	
				
				if($("#set_font").attr("href") == "css/font-style1.css"){
					$(".fontStyle1").addClass("active");
				}else{
					$(".fontStyle2").addClass("active");
				}	
				
				if( cUrl.split("blue").length > 1){
					$(".temHigLight2").addClass("active");
				}else if( cUrl.split("red").length > 1){
					$(".temHigLight3").addClass("active");
				}else{
					$(".temHigLight1").addClass("active");
				}				
									
				if(!self.miniMenu){
					if( self.stageWidth > 1024){
						if(self.scrollPos > 150 && !self.headerMc.hasClass("menuType1")){
							self.headerMc.addClass("mini");					
						}else{
							self.headerMc.removeClass("mini");
						}
					}else{
						self.headerMc.addClass("mini");
					}
				}
				
			}	
		}
	};

		
// Initizlize and create the main plug-in
	$.fn.mainFm = function(params) {
		var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new mainFm($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	
})( jQuery );





