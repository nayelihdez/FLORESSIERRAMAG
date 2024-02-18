/*!
	Pure Black/White - Creative Multipurpose Template
	Copyright (c) 2011-2021, Subramanian 

	Author: Subramanian
    Profile: themeforest.net/user/FMedia/
	
    Version: 2.0.0
	Release Date: July 2015
    Last change: Jaunary 2021
 */

(function( $ ){	
	
	"use strict";
	
	function detailPage(selector, params){
		// default variables
		var defaults = $.extend({}, { 
			filter 		: ".filters",
			buttonColor : ""

		} , params);
		
			var self = this;
			self.curSlide = 0;
			self.mainCont = $(selector);
			
			self.scrollObj = $("body, html");
			self.htmlScroll = isNaN($("html").scrollTop()) ? $("body") : $("html");	
			
			self.selEle = self.mainCont.find(".portfolio_items");
			self.filter = $(defaults.filter).find("#options").length > 0 ? $(defaults.filter).find("#options") : $(defaults.filter);
			self.portCat = $(defaults.filter);
			
			self.eventHoverMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'mouseover';
			self.eventHoutMc = ('ontouchstart' in document.documentElement) ? 'mouseleave' : 'mouseleave';
			self.eventClickMc = ('ontouchstart' in document.documentElement) ? 'touchend' : 'mousedown';
			
			self.buttonColor = defaults.buttonColor;			
			self.proDetPos = 0;			
			self.posIt = false;
			self.backPage  = self.mainCont.find(".projDetailLoad");
			self.backPage.css({"height":"0px", "overflow":"hidden"});
			self.alignPgHor = $("body").hasClass("horizontal_layout");	
			self.initPortfolioSlider();
			
	}
	
	
		
	detailPage.prototype = {
		
		autoOpenProject : function(){
						
			var self = this;
			var fgr = self.selEle.find(".item .detail_btn");
				
			var posT = 0;
			var ddm = window.innerWidth < 768 ? 45 : 68;
			posT = 0;
			
			self.cItem = 0;
			
			for(var hs = 0; hs < self.filterEle.length; hs++){
				if( (self.filterEle[hs]).hasClass('selected')) {
					self.cItem = hs;
				}
			}
			
			var ppp = isNaN(fgr.parent().data("iii")) ? fgr.parent().parent() : fgr.parent();
			
			if(self.cItem == 0){
				self.curFmSlider = self.selEle.data("sArry");
				self.curSlide = ppp.data("iii");
			}else{
				self.curFmSlider = self.filterEle[self.cItem].data("sArry");
				self.curSlide = ppp.data("jjj");
			}
			
			self.curSlide = 0;
			setTimeout(function(){
				self.showDetailPage(self.curFmSlider[self.curSlide]);
			},500);

		},
		
		// initPortfolioSlider function is used to create a portfolio and news items
 		
		initPortfolioSlider : function(){
			
			var self = this;
			self.backPage.hide();
			
			
			self.filterArry = [];
			self.filterEle = [];			
			
			self.filter.find("a").each(function(){
				var value = $(this).attr('data-option-value');
				var gh = value.split('.')
				self.filterArry.push(gh[1]);
				self.filterEle.push($(this));
				var sArry = [];
				self.filterEle[self.filterEle.length-1].data("sArry", sArry);
				self.filterEle[self.filterEle.length-1].data("jjj", -1)
			});
			
			self.selEle.each(function(){
				var ff2 = $(this);
				var sArry = [];
				var iii = 0;
				ff2.data("slides",$(this).find('.item').length);
				
				try{
				  $(this).find('.item').each(function(){										
					  for(var hs = 0; hs < self.filterArry.length; hs++){							
						  if( $(this).hasClass(self.filterArry[hs])) {							  
							  self.filterEle[hs].data("sArry").push($(this));								
							  self.filterEle[hs].data("jjj", self.filterEle[hs].data("jjj")+1);
							  $(this).data("jjj", self.filterEle[hs].data("jjj") );
						  }
					  }
					  
					 
					  				
					  sArry.push($(this));
					  $(this).data("iii",iii++);
					  $(this).find('.flexSlideshow').addClass('flexslider');
					  $(this).data("details",$(this).find(".fullDetails"));
					  $(this).find(".detail_btn").data("mc",$(this));	
					  
					  try{				  
					  	$(this).find(".item_numImages span").text($(this).find('.flexSlideshow li').length);	
					  } catch (e) { }
					  				  
					  $(this).find(".fullDetails").remove();
				  });
				  ff2.data("sArry",sArry);
				} catch (e) { }
			});
			
			self.cItem=0;

			self.filter.find("a").each(function(){
				$(this).on(self.eventClickMc, function() {
					var pgg = self.mainCont.attr("data-id") !== undefined ? self.mainCont.attr("data-id") : currentPage_menu;
					self.posIt = false;
					self.closeBackCon();									
				});
			});
			

			self.navv = self.backPage.find(".itemNav");
			
			self.p_Btn = self.backPage.find(".previous_button_pro");			
			
			self.c_Btn = self.backPage.find(".close_button_pro");			
			
			self.n_Btn = self.backPage.find(".next_button_pro");			

			self.n_sli = self.backPage.find(".sliderNumber_pro");
			
			self.n_Btn.on(self.eventClickMc, function() {
				self.curSlide = self.curSlide+1 < self.curFmSlider.length ? self.curSlide+1 : 0;
				self.showDetailPage(self.curFmSlider[self.curSlide]);
			});
			
			self.p_Btn.on(self.eventClickMc, function() {
				self.curSlide = self.curSlide-1 > -1 ? self.curSlide-1 : self.curFmSlider.length-1;
				self.showDetailPage(self.curFmSlider[self.curSlide]);
			});
			
			self.c_Btn.on(self.eventClickMc, function() {
				self.posIt = true;
				self.closeBackCon();
			});
			
			self.isTouchMove = false;
			
			self.selEle.find(".item .detail_btn").on(self.eventClickMc, function(event) {
				var mcc = $(this);				
				self.itemAction(mcc);				
			});			
		},
		
		itemAction : function(mcc){
			var self = this;
			
			self.cItem = 0;				
			for(var hs = 0; hs < self.filterEle.length; hs++){
				if( (self.filterEle[hs]).hasClass('selected')) {
					self.cItem = hs;
				}
			}
			
			var ppp = mcc.data("mc");
			
			if(self.cItem == 0){
				self.curFmSlider = self.selEle.data("sArry");
				self.curSlide = ppp.data("iii");
			}else{
				self.curFmSlider = self.filterEle[self.cItem].data("sArry");
				self.curSlide = ppp.data("jjj");
			}
					
			self.showDetailPage(ppp);
			
		},

// Close projDetailLoad div
		closeBackCon : function(){
			var self = this;
			var posT = 0;
			var ddm = window.innerWidth < 768 ? 45 : 68;
			posT = 0;
			try{ posT = parseInt(self.filter.position().top)-ddm; } catch (e) { }
			
			self.selEle.find(".item").removeClass("active");
			
			self.navv.hide();
			if(lowResDesktop){
				self.backPage.hide();
			}

			if(!lowResDesktop){
				setTimeout(function(){
					self.backPage.animate({"height":0}, 500, "easeInOutQuart",function(){						
						self.removeBackCon();
						self.pageScrollPos(true);						
						self.posIt = false;				
					}, 1000);
				});
			}else{
				self.backPage.stop().css({"height":0});
				self.removeBackCon();
				self.pageScrollPos(false);
				self.posIt = false;
			}
			
			headerClose = false;

		},

// Remove the content that load inside the projDetailLoad div
		removeBackCon : function(){
			var self = this;
			try{
				self.backPage.find(".slider_loading").each(function(){
					try{ $(this).remove();  } catch (e) { }
				});
			} catch (e) { }
			
			try{	
				for(var ss=0; ss < self.sliderArr.length; ss++){
					self.sliderArr[ss].pause();
					self.sliderArr[ss].destroy();
				}
				self.sliderArr=[];	
			} catch (e) { }			
			
			try{
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider("remove") } catch (e) { }
				});	
							
				self.backPage.find('.flexSlideshow').each(function(){
					try{ $(this).flexslider.remove()} catch (e) { };
				});				
			} catch (e) { }
			
			try{ 
				self.backPage.find("img").each(function(){
					try{ $(this).remove(); } catch (e) { }
				});
			} catch (e) { }
			
			try{ self.backPage.find(".projConWarp").remove();  } catch (e) { }
			
			self.selEle.find(".item").removeClass("active");
		
			self.posIt = false;			
			
		},
		

// Show the details page		
		showDetailPage : function(el){

				var self = this;
				var pr = el;
				self.n_sli.text((self.curSlide+1)+"/"+(self.curFmSlider.length));	
							
				self.navv.show();
				
				if(!pr){ return; }
				
				var timT = self.htmlScroll.scrollTop() > 50 ? 900 : 0;
				
				
				// Remove the flex slider and content before load the new content							
				
				setTimeout(function(){
					if(pr.data("details").length == 0){
						self.backPage.stop();
	
						try { 
							for(var ss=0; ss < self.sliderArr.length; ss++){
								self.sliderArr[ss].pause();
							}
						} catch (e) { }
						
						
						if(!lowResDesktop){
							self.backPage.animate({"height": "0px"}, 500, "easeInOutQuart", function(){ 
								self.posIt = true;
								self.removeBackCon();
								});
						}else{
							self.backPage.stop().css({"height": "0px"});
							self.posIt = true;
							self.removeBackCon();
						}
						
						if($(pr).find("a").attr("data-fancy") != undefined){
							var fancy = $(pr).find("a");
							var _href = !self.mobileDevice ? fancy.attr("href") : (fancy.attr("data-src-small")? fancy.attr("data-src-small")  : fancy.attr("href"));
							$.fancybox({
								'href' : _href,
								'title': fancy.attr("data-title"),
								'padding'			: 0,
								'titlePosition'		: 'outside',
								'transitionIn'		: 'fade',
								'transitionOut'		: 'fade',
								'overlayColor'		: fancy_bgCol,
								'overlayOpacity'	: 0.9
							});
							
						}else{
							return;
						}		
						
					}
					
					self.backPage.show();
					
					// reset the detail page size 
					
					self.backPage.stop();	
							
					self.backPage.css({"height": self.backPage.height(), "overflow":"hidden"});
					
					var spp = self.backPage.height()<70 ? 0 : 500;
					var dCon = self.backPage.find(".projConWarp");
					
					self.backPage.children(":last-child").transition({"opacity": "0"}, spp, "easeInOutQuart", function(){ 
							self.addNewContent(pr);
						});

					
				}, timT)
		},	
		
		addNewContent : function(pr){
			var self = this;
			
			$(".previousPage, .nextPage").hide();
			
			
			self.backPage.children(":first-child").css({"opacity": 1});							
			// Remove the previous page if it not remove completely
			self.posIt = true;
			self.removeBackCon();
			
			self.selEle.find(".item").removeClass("active");
			self.curFmSlider[self.curSlide].addClass("active");		
			
			self.pageScrollPos();
			
			// load the lazyload image
			if(pr.data("details").length>0){
				self.backPage.append('<div style="position:releative;" class="projConWarp"></div>');
				pr.data("details").clone().appendTo(self.backPage.children(":last-child"));
				self.backPage.children(":last-child").children(":last-child").css({"height":"auto", "width":"auto"});
				
				self.backPage.find(".max_height").each(function(){
					var se2 = $(this);
					if(window.innerWidth <= 979 ){
						se2.css({"height":"auto", "min-height":"auto"});	
					}else{
						se2.css({"min-height": Math.round($(window).height()-pageBorder_z)});
					}
								
				});
				
				self.backPage.children(":last-child").children(":last-child").find(" a.lazyload").each(function(){
					var img = !self.mobileDevice ? $(this).attr("href") : ($(this).attr("data-src-small")? $(this).attr("data-src-small")  :$(this).attr("href"));
					var cc = $(this).attr('class');
					$(this).replaceWith('<img class="'+cc+'" data-src="'+img+'"/>');
					$(this).removeClass('lazyload');
				});
			}
				
			self.detailNoMar = pr.data("details").hasClass("noMargin");				
			
			$("body").mainFm('intVideoObject', self.backPage);
			
			// Add loading bar for each image and fadein the image after image completely load	

			self.backPage.children(":last-child").find("img").each(function(){	
				$(this).hide();
				var imSrc = $(this).attr("data-src") ? $(this).attr("data-src") : $(this).attr("src");
				var fxx = $(this).parent();
				$(".loading_objects .loading_x").clone().appendTo(fxx.parent());
				if(!fxx.parent().hasClass("slides")){					
					if(self.selEle.hasClass("darkStyle")){
						fxx.children(":last-child").addClass("black");
					}
				}				
				$(this).attr('src', imSrc).load(function() {
					$(this).parent().parent().find(".loading_x").remove();	
					$(this).fadeIn(500);											
				}).error(function () {
					$(this).parent().parent().find(".loading_x").remove();
				}).each(function() {
					if(this.complete) $(this).trigger('load');
				});
			});						
			
			// Store the flex slider in array
			self.sliderArr = [];
			self.backPage.find('.flexSlideshow').each(function(){
				try{
					if(!$(this).data("loaded")){
						$(this).data("loaded", true);
						var aniTyp = $(this).hasClass('slideAnimation') ? "slide" : "fade";								
						if(aniTyp === "slide"){
							$(this).find("li").each(function(i){
								$(this).find(".loading_x").remove();
								$(this).find("img").show().css({"opacity":1});
							});
						}
						var ffx = $(this);
						ffx.children(":first-child").css({"top":ffx.height()/2-15});
						ffx.flexslider({
							slideshow: true,
							animation: aniTyp,
							slideshowSpeed: self.flxDelay,
							start: function(slider){
								$(slider.slides.eq(0).html()).hide();
								$(slider.slides.eq(0).html()).attr('src', $(slider.slides.eq(0).html()).attr("src")).load(function() {
									$(slider.slides.eq(0).html()).fadeIn(300);
								}).error(function () { 
								}).each(function() {
								  if(this.complete) { $(this).trigger('load'); }
								});
								self.sliderArr.push(slider);
							}
						});
					}
				} catch (e) { }	
			});
				
			self.backPage.css({"height": self.backPage.outerHeight()});
			self.update_pageHeight();
			
			
		},
		
		
		
		
		pageScrollPos : function(pgClose){
			var self = this;
			pgClose = pgClose ? true : pgClose;			

			var curY = 0;
			try{ curY = Math.round(self.curFmSlider[self.curSlide].position().top); } catch (e) { }	

			var heightT = 0;

				
			heightT = !pgClose ?  Math.round(self.mainCont.position().top+self.backPage.position().top) :  Math.round(self.mainCont.position().top);				
			if(window.innerWidth < 991){
				heightT = heightT-50;
			}
			
			if(pgClose === false){
				heightT = Math.round(self.mainCont.position().top);
			}

			self.scrollTopAction(self.htmlScroll, heightT+"px", 500);
		},	
		
		
		scrollTopAction : function (mc, pixels, aniSpd) { 
			var self = this;


			if(!isTouch){
				mc.stop(false).animate({ scrollTop: pixels}, aniSpd , "easeInOutQuart", function(){ });
			}else{
				mc.stop(false).animate({ scrollTop: pixels});	
			}			
		},
			
		
		update_pageHeight : function(){
			var self = this;
			
			
			
			if(!lowResDesktop){
				self.backPage.children(":last-child").transition({"opacity":1}, 200, "easeInOutQuart");
			}else{
				self.backPage.children(":last-child").stop().css({"opacity":1});
			}
					
			// Show the full detail page					
					
			var hhh = self.backPage.children(":first-child").outerHeight()+self.backPage.children(":last-child").outerHeight();
			hhh = self.backPage.children(":last-child").outerHeight()>70 ? hhh : self.backPage.children(":first-child").outerHeight();
			
				if(!lowResDesktop){  
					self.backPage.animate({"height": hhh}, 500, "easeInOutQuart", function(){
						self.backPage.css({"height": "auto"});						
						self.backPage.find('.addVideo').each(function(){
							if(!$(this).data("added")){
								var vid = $(this);
								var W = vid.attr('data-width') ? vid.attr('data-width')+"px" : "100%";
								var H = vid.attr('data-height') ? vid.attr('data-height')+"px" : "100%";
								var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
								if(H == "100%"){
									vid.css({"height":"100%"})
								}
								vid.prepend('<div class="vid"></div>');
								vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A, vid.children(':first-child'), false);
							}
						});						
						
						self.pageScrollPos();
						
					
						
				//	setTimeout(function(){	
						$("body").mainFm('scroll_update');
						//$("html").getNiceScroll().resize(); 
				//	}, 500 );
						
					});
				}else{

					self.backPage.stop().css({"height": "auto"});
					
					self.backPage.find('.addVideo').each(function(){
						if(!$(this).data("added")){
							var vid = $(this);
							var W = vid.attr('data-width') ? vid.attr('data-width') : "100%";
							var H = vid.attr('data-height') ? vid.attr('data-height') : "100%";
							var A = vid.attr('data-autoplay') == "true" && !self.mobileDevice? true : false;
							if(H == "100%"){
								vid.css({"height":"100%"})
							}
							vid.prepend('<div class="vid"></div>');
							vid.children(':first-child').vid.children(':first-child').embedPlayer(vid.attr('data-url'), W, H, A, vid.children(':first-child'), false);
						}
					});
					
				
					
					//setTimeout(function(){	
					$("body").mainFm('scroll_update'); 
					//}, 500 );
					
				}
				
				
				
				
				
			
		}
		
		
		
		},
	

	/*  Initizlize and create the slider plug-in */
	$.fn.detailPage = function(params) {
		var $fm = $(this);
		var instance = $fm.data('GBInstance');
		if (!instance) {
			if (typeof params === 'object' || !params){
				return $fm.data('GBInstance',  new detailPage($fm, params));	
			}
		} else {
			if (instance[params]) {					
				return instance[params].apply(instance, Array.prototype.slice.call(arguments, 1));
			}
		}
	};
	
	
})( jQuery );
