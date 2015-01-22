/* NYLife Core JavaScript
  * All JavaScript plugin information lives in /js/plugins.js
  * You'll find URLs to the plugins home page
*/

/* Prevent conflicts whenever possible */

var _NYLIFE = {

  /* Language Drop Down
    * Out of scope but you should consider this as an alternative to an ordinary drop down <select> node
    * You'd need javascript in either case, so by using this approach, you can create custom styled drop downs :)
  */
  dropDown : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      var selectionTarget = target.find('#choice');
        var options = target.find('li');
        target.toggle(function(event){
          event.preventDefault();
          event.stopPropagation(); 
          showList(options);
        },
        function(event){
          event.preventDefault();
          event.stopPropagation(); 
          hideList(options);
        });
      function showList(list){var listContainer = list.parent();var targetList = list;listContainer.fadeIn(400)};
      function hideList(list){var listContainer = list.parent();var targetList = list;listContainer.fadeOut(400)};}
      
  },
  
  /* Top Slide Down Navigation
    * The Object passed into this method can be any element (node). The node must have a child with the className 'child'
    * All Objects will have mouseover/moustout type events attached to them via hoverIntent (reference plugins.js for Plugin project page
    * We are equalizing the heights of the 'child' node's immediate children
  */
  navigationSlideDown : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentNode = jQuery(this);
        var displayTarget = currentNode.find('.child');

        var makeTall = function(){
          displayTarget.stop(false,true).animate({
            height: 'toggle' ,
            easing: 'linear'
          },300,
          function(){
            // Equalize inner content's height in the case of background colors or borders
            var equalizeNavigationContent = _NYLIFE.equalizeNavContent(displayTarget);
          });
        };
        
        var makeShort = function(){
          displayTarget.stop(false,true).animate({
            height: 'toggle' ,
            easing: 'linear'
          },300);
        };
        
        currentNode.hoverIntent(makeTall, makeShort);
        
      });
    }
  },
  
  /* Height Equalizer Plugin
   *  This will match a group (array) of Objects' heights
  */
  equalizeNavContent : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.equalizer({
        columns: target.find('> div'),
        useHeight  : 'inner',
        min: 0,
        max: 0,
        resizeable : true
      });
    }
  },

/*Accordion Plugin
 *  Will run against any Object having the className "accordion" 
 *  Requires markup from /includes/accordions/accordion-default
*/
  accordion : function(selector, customClassName){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentAccordion = jQuery(this);
        var slideClassName = customClassName;
        var allSlides = currentAccordion.find('li');
        allSlides.addClass(slideClassName);
        var allCopy = currentAccordion.find('.content p');
        allSlides.each(function(){
          var parentNode = jQuery(this);
          var toggleNode = jQuery(this).find('.toggle');
          var getCopy = parentNode.find('.content p')
          parentNode.click(function(){
            var currentNode = jQuery(this);
            allSlides.not(this).stop().animate({width: 140}).addClass('normal').removeClass('toggled');
            allCopy.not(getCopy).fadeOut(100);
            parentNode.stop().animate({width: 225},function(){
              if(currentNode.hasClass('toggled') == false){
                getCopy.fadeIn(300);
                currentNode.removeClass('normal').addClass('toggled');
              }else{
                currentNode.stop().animate({width: 140}).addClass('normal').removeClass('toggled');
                getCopy.fadeOut(100);
              }
            })
          });
        });
      });
    }
  },

/*Vertical Accordion Plugin
 *  Will run against any Object having the className "vaccordion" 
*/
  vaccordion : function(selector, customClassName){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentAccordion = jQuery(this);
        var slideClassName = customClassName;
        var allSlides = currentAccordion.find('.fold');
        allSlides.addClass(slideClassName);
        allSlides.addClass('normal');
        var allCopy = currentAccordion.find('.content');
        allSlides.each(function(){
          var parentNode = jQuery(this);
          var toggleNode = jQuery(this).find('.toggle');

          toggleNode.click(function(){
            var currentNode = jQuery(this).closest('.fold');
            allSlides.not(currentNode).stop().addClass('normal').removeClass('toggled');
		if(currentNode.hasClass('normal')){
			currentNode.removeClass('normal').addClass('toggled');
		}else{
			currentNode.stop().addClass('normal').removeClass('toggled');
		}
          });

        });
      });
    }
  },



  /*  Content Slider
    * Will run against any Object having the className = 'slider'
    * Requires markup from /includes/content-sliders/default-slider
  */
  contentSlider : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentNode = jQuery(this);
        
        /*  Each Flexslider has been extended to expect certain parameters for presentation
              We attempt to aquire these parameters. If they do not exist, we simply return a false value.
              Currently, we are only passing in carousel indicators and slide show status
        */
        var circleIndicators = currentNode.hasClass('indicators') ? true : false;
        var slideShow = currentNode.hasClass('slideshow') ? true : false;
        
        currentNode.flexslider({
          slideDirection: "horizontal",
          controlsContainer: currentNode,
          animation: "slide",
          prevText: "slider-control prev",
          nextText: "slider-control next",
          pauseOnHover: true,
          pauseOnAction: true,
          keyboardNav: true,
          mousewheel: false,
          randomize: false,
          slideshow: slideShow,
          slideshowSpeed: 7000,
          animationLoop: true,
          slideToStart: 0,
          controlNav: circleIndicators,
          start: function(){},
          before: function(){},
          after: function(){},
          end: function(){}
        });
        
      });
    }
  },
  
  /*  Tabbed Slider
    * Will run against any Object having the className = 'tabbed-slider'
    * Requires markup from /includes/content-sliders/careers.php
  */
  tabSlider : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentNode = jQuery(this);
        var tabInstance = currentNode;
        var circleIndicators = currentNode.hasClass('indicators') ? true : false;
        var slideShow = currentNode.hasClass('slideshow') ? true : false;
        var createTabs = currentNode.hasClass('tabbed-slider') ? true : false;
        
        if(createTabs == true){
          /* Get the job description (copy) and apply toggle function */
          var jobDescription = currentNode.find('.job-description');
            if(jobDescription.length > 0){
            jobDescription.each(function(){
              var currentNode = jQuery(this);
              var toggleButton = currentNode.find('.toggle');
              var content = currentNode.find('.hidden');
              toggleButton.click(function(){
                content.toggle(function(){
                  content.animate({opacity: 1},300);
                });
              });
            });
          }
            
          /* Created Tab */
          var tabItems = currentNode.find(' .slides > li');
          var tabContainer = document.createElement('div');
          tabContainer.className = 'tab-item-container';
          
          tabItems.each(function(k){
            var currentTarget = jQuery(this).find('.container');
            var tabTextValue = currentTarget.attr('career-title');
            var tabText = document.createElement('span');
            tabText.className = 'tab';
            tabText.innerHTML = tabTextValue;

            jQuery(tabText).click(function(){
              var currentNode = jQuery(this);
              tabInstance.find('.tab-item-container span.tab').removeClass('active');
              jQuery(currentNode).addClass('active');
              tabInstance.find('.flex-control-nav li span').eq(k).click();
            });
            
            jQuery(tabContainer).append(tabText);
            currentNode.find('> .wrapper').prepend(tabContainer);
          });
        };
        
        currentNode.flexslider({
          slideDirection: "horizontal",
          controlsContainer: currentNode,
          animation: "slide",
          prevText: "slider-control prev",
          nextText: "slider-control next",
          pauseOnHover: true,
          pauseOnAction: true,
          keyboardNav: true,
          mousewheel: false,
          randomize: false,
          slideshow: slideShow,
          animationLoop: true,
          slideToStart: 0,
          controlNav: circleIndicators,
          start: function(slider){},
          before: function(slider){},
          after: function(slider){
            currentNode.find('.tab-item-container span.tab').removeClass('active');
            currentNode.find('.tab-item-container span.tab').eq(slider.currentSlide).addClass('active');
          },
          end: function(slider){}
        });
      });
    }
  },
  
  /* Quiz - Standard user tool 
    * Will run against any Object having the className = 'init-quiz'
    * Requires markup from /includes/quizes/quiz-default.php
    * Each Form must have a processing page and an ID to track it by
    * 
  */
  quizSequence : function(selector){
    var target = jQuery(selector);
    if(target.length >0){
      target.each(function(){
        var quizValuesContainer = [];
        var quizForm = jQuery(this).find('form');
        var quizQuestions = quizForm.find('li');
        var quizAction = quizForm.attr('action');
        var quizID = quizForm.attr('quiz-id');
        var quizLength = quizQuestions.length;
        quizQuestions.each(function(count){
          var question = jQuery(this);
          var prevQuestion = question.prev();
          var nextQuestion = question.next();
          var backButton = question.find('.back-button');
          var option = question.find('.option');
          count++;
          // back button handle for each quiz/question
          backButton.click(function(){
            if(count == 1){
              //console.log('nothing to go back to');
            }else{
              question.animate({
                height: 'toggle'
              },{
                duration : 500,
                specialEasing: {
                  height: 'linear',
                  height: 'easeOutCubic'
                },
                complete: function(){
                prevQuestion.animate({
                  height: 'toggle'
                },{
                  duration : 300,
                  specialEasing: {
                    height: 'linear',
                    height: 'easeInQuint'
                  },
                  complete: function(){
                    /* Call back function area */
                  }
                });
                }
              });
            }
          });

          option.click(function(){
            var currentOption = jQuery(this);
            // collect the user's response and reset the count for proper array index assignment
            quizValuesContainer[count-1] = currentOption.attr('option-value');
              if(count == quizLength){
                if(currentOption.last()){
                  var sendQuizData = jQuery.ajax({
                    url: quizAction,
                    type: "POST",
                    dataType: "json",
                    traditional: true,
                    data: {
                      quizFormID : quizID,
                      questionValues: quizValuesContainer
                    },
                    success: function(data){
                      question.html("<h4>SUCCESS!! This is a placeholder success message. You've sent the follow data to the server and received a valid response:"  + quizValuesContainer + "</h4>");
                    }
                  });
                  sendQuizData.fail(function(){

location = results[j[0]]+ext;

                      question.html("<h4>FAILURE!! The destination URL of this quiz can't be found! You've sent the following data but have not received a valid response:"  + quizValuesContainer + "</h4>");
                  });
                }
              }else{
                question.animate({
                  height: 'toggle'
                },{
                  duration : 500,
                  specialEasing: {
                    height: 'linear',
                    height: 'easeOutCubic'
                  },
                  complete: function(){
                  nextQuestion.animate({
                    height: 'toggle'
                  },{
                    duration : 300,
                    specialEasing: {
                      height: 'linear',
                      height: 'easeInQuint'
                    },
                    complete: function(){
                      /* Call back function area */
                    }
                  });
                  }
                });
              }
            });
        });
      });
    }
  },
  
  /* Slider Control
    * Will run against any Object having the className = 'slider-control'
    * Requires markup from /includes/quizes/slider-default.php
  */
  sliderControl : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentNode = jQuery(this);
        var minRage = currentNode.parent().find('.range').attr('min-range');
        var maxRange = currentNode.parent().find('.range').attr('max-range');
        var userGoalValue = currentNode.parent().parent().find('.option');
        
        currentNode.slider({
          range: "max",
          min: 1,
          max: 2000000,
          value: 10,
          slide: function(event, ui){
            var currentSlider = jQuery(this);
            var currentGoal = currentNode.parent().find('.goal');
            var goalValContainer = currentGoal.find('.floating-value');
            var slideHandler = currentSlider.find('.ui-slider-handle');
            var sliderLeftPos = slideHandler.position();
            sliderLeftPos = sliderLeftPos.left;
            currentGoal.css('left', sliderLeftPos);
            goalValContainer.html(ui.value).formatCurrency({
              roundToDecimalPlace: 0,
              symbol: '$'
            });
            userGoalValue.attr('option-value', goalValContainer.html());
          }
        });
      });
    }
  },

  /* Talk To Us Module
   *  
  */
  talkToUs : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      var talkContainer = target.find(".talk-to-us-button");
      var talkContent = target.find(".talk-to-us-content");
      var talkToUsExpand = target.find('.expand');
      var talkToUsCollapse = target.find('.collapse');
      var talkToUsExpand = target.find('.expand');
      var talkToUsCollapse = target.find('.collapse');

      talkContainer.mousedown(function(event){
        event.preventDefault();
        event.stopPropagation();
        talkContent.addClass('expanded');

        talkContent/*.css('display','block')*/.stop().animate({
        },200,function(){
          jQuery(this).animate({
          },200);
        });

      });
      
      talkToUsCollapse.mousedown(function(event){
        event.preventDefault();
        event.stopPropagation();
        talkContent.removeClass('expanded');

        talkContent.stop().animate({
        },200,function(){
          jQuery(this).animate({
          },10,function(){
            jQuery(this).css({
              /*'display' : 'none'*/
            });
          });
        });

      });
    }
  },

  /* Video Player (Lightbox module)
    * Will run against any Object having the className = 'video-action'
    * Requires markup from /includes/hero/hero-video-item.php
  */
  videoPlayer : function(selector){
      var target = jQuery(selector);
      if(target.length > 0){
      
      var brightCoveFrag = document.createDocumentFragment();
      var brightCoveContainer = document.createElement('div');
      brightCoveContainer.className = 'bright-cove-player';
      brightCoveFrag.appendChild(brightCoveContainer);
      
      jQuery('body').append(brightCoveFrag);
      
      target.each(function(){
        var currentNode = jQuery(this);
        currentNode.click(function(e){
          e.preventDefault();
          //create dialog instance
          var currentNode = jQuery(this);
          var videoModal = jQuery(brightCoveContainer).dialog({
            width: 660,
            modal: true,
            closeOnEscape: true,
            dialogClass: "dialog-open",
            beforeClose: function(event, ui){
              var currentTarget = jQuery(this);
              currentTarget.empty();
            },
            open: function(event, ui){
              jQuery(".ui-widget-overlay").click(function(){
                jQuery(brightCoveContainer).dialog("close");
              });
              
              var videoID = currentNode.attr('playerid');
              var BCL = {};
              /* BC PLayer Configuration */
              BCL.playerData = {
                "playerID" : "820247940001",
                "playerKey" : "AQ~~,AAAAEX25TWE~,xvg18eraEADHm_FKoxvVcLC6wYaLgzta",
                "width" : "640",
                "height" : "360",
                "videoID" : videoID
              };
              BCL.isPlayerAdded = false;
              BCL.playerTemplate = "<div style=\"display:none\"></div><object id=\"myExperience\" class=\"BrightcoveExperience\"><param name=\"bgcolor\" value=\"#ffffff\" /><param name=\"width\" value=\"{{width}}\" /><param name=\"height\" value=\"{{height}}\" /><param name=\"playerID\" value=\"{{playerID}}\" /><param name=\"playerKey\" value=\"{{playerKey}}\" /><param name=\"isVid\" value=\"true\" /><param name=\"isUI\" value=\"true\" /><param name=\"dynamicStreaming\" value=\"true\" /><param name=\"@videoPlayer\" value=\"{{videoID}}\"; /><param name=\"templateLoadHandler\" value=\"BCL.onTemplateLoaded\"</object>";
              BCL.addPlayer = function(){
                if(BCL.isPlayerAdded == false){
                  BCL.isPlayerAdded = true;
                  var playerHTML = "";
                  // set the videoID to the selected video
                  BCL.playerData.videoID = videoID;
                  // populate the player object template
                  playerHTML = BCL.markup(BCL.playerTemplate, BCL.playerData);
                  // inject the player code into the DOM
                  jQuery(brightCoveContainer).html(playerHTML);
                  brightcove.createExperiences();
                }
                // user must have requested a different video for player already loaded
                else {
                  BCL.videoPlayer.loadVideo(videoID);
                }
              };
              BCL.markup = function (html, data) {
                var m;
                var i = 0;
                var match = html.match(data instanceof Array ? /{{\d+}}/g : /{{\w+}}/g) || [];
                while (m = match[i++]){
                  html = html.replace(m, data[m.substr(2, m.length-4)]);
                }
                return html;
              };
              BCL.addPlayer();
            }
          });
          // end click event
        });
      });
    }
  },
  
  /* Tabbed Content 
  * Will run against any Object having the className = 'tab-panel'
  * Requires markups from /includes/tab-panel/default-tab-panel.php
  */
  tabPanel : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var getTabs = target.find('li');
        var getTabContent = target.find('.tab-content');

        //get tab index from parameter
        var url = document.URL;
        var urlIndex = url.indexOf("?tab=");
        if(urlIndex > -1){
          var tabIndex = Number(url.substring(urlIndex+5,urlIndex+6)) - 1;
          getTabs.removeClass('selected');
          var currentNode = $(getTabs[tabIndex]);
          currentNode.addClass('selected');
          getTabContent.css('display','none');
          getTabContent.eq(tabIndex).css('display','block');
        }

        getTabs.each(function(i){
          var currentNode = jQuery(this);
          currentNode.click(function(){
            getTabs.removeClass('selected');
            var currentNode = jQuery(this);
            currentNode.addClass('selected');
            getTabContent.filter(function(index){
              if(index == i){
                getTabContent.css('display','none');
                getTabContent.eq(index).css('display','block');
              }
            });
          });
        });
      })
    }
  },
  
  /* Toggle Content
    * Will run against any Object having the className = 'toggle-container'
    * Requires markup from /includes/toggle-content/toggle-default.php
  */
  toggleContent : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(i){
        var currentNode = jQuery(this);
        var toggleItem = currentNode.find('>ul>li');
        toggleItem.each(function(){
          var currentNode = jQuery(this);
          var toggleButton = currentNode.find('.toggle');
          var toggleText = toggleButton.attr('toggle-text');
          var defaultText = toggleButton.attr('toggle-default');
          var content = currentNode.find('.toggle-content');
          toggleButton.click(function(e){
            e.preventDefault();
            toggleButton.toggleClass('toggled');
            toggleButton.html((toggleButton.hasClass('toggled') ? toggleText : defaultText));
            content.toggle(function(){
              var currentNode = jQuery(this);
              currentNode.animate({opacity: 1},300);
            });
          });
        });
      });
    }
  },

  /* Reveal Full Image Toggle (very specific plugin)
    * Will run against any Object having the className = 'reveal-toggle'
    * Requires markup from /includes/toggle-content/toggle-reveal-full-image.php
    * You will need to get creative with your images and how you'd like to customize the animations (if needed)
  */
  toggleRevealImage : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(i){
        var currentNode = jQuery(this);
        var toggleImage = currentNode.find('img');
        var revealTarget = currentNode.find('.reveal');
        var toggleButton = currentNode.find('span.toggle');
        var targetHeight = revealTarget.height();
        var toggleHeight = currentNode.height();
        toggleButton.click(function(){
          toggleButton.toggleClass('toggled');
          
          if(toggleButton.hasClass('toggled')){
            currentNode.animate({height : [targetHeight, 'swing']});
            toggleImage.animate({top: '2%'},400);
            revealTarget.animate({opacity: 1,top: '2%'},{queue: false,duration: 650});
          }else{
            currentNode.animate({height : [toggleHeight, 'swing']});
            toggleImage.animate({top: '-65%'},300);
            revealTarget.animate({opacity: 0},{queue: false,duration: 600});
          }
        });
      });
    }
  },

  /* Search Results Pagination Plugin
    * Very simple  :) All you need to do is provide a model, ie: <li> or <article> or even <div>...literally any object.
    * The pagination needs a custom attribute to be appended to the list container, ie: <ul default-show="10">
    * Refer to the markup in: /includes/search/category-search-results.php
  */
  resultsPagination : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentNode = jQuery(this);
        var paginationControlContainer = currentNode.find('.pagination-controls');
        var showDefault = parseInt(currentNode.attr('default-show'));
        var paginationItems = currentNode.find('article');
        var showVaues = currentNode.find('select').find('option');
        var docFrag = document.createDocumentFragment();
        var navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        docFrag.appendChild(navContainer);
        paginationControlContainer.append(docFrag);
        showDefault =  showDefault === 0 ? 100 : showDefault;
        if(showDefault <= 100){
          currentNode.pajinate({
            items_per_page : showDefault,
            num_page_links_to_display : 2
          });
        };
        currentNode.find('select').change(function(){
          var currentValue = parseInt(jQuery(this).val());
          currentValue =  currentValue === 0 ? 100 : currentValue;
          jQuery('.' + navContainer.className).html('');
          if(currentValue < 100){
            currentNode.pajinate({
              items_per_page : currentValue,
              num_page_links_to_display : 2
            });
          }else{
            paginationItems.show();
          }
        })
      });
    }
  },
  
  /* Facebook Commenting */
  facebookComments : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      jQuery('body').append('<div id="fb-root"></div>');
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  },
  
  /* My NYL Folder List */
  folderView : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      var articleContainer = target.find('.folders-listing');
      var articleItems = articleContainer.find('article');
      var showDefault = parseInt(target.attr('default-show'));
      
      articleContainer.pajinate({
        items_per_page : showDefault,
        num_page_links_to_display : 1
      });
    }
  },
  
  /* My NYL Folder List Toggle */
  listView : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      var articleContainer = target.find('.folders-listing');
      var gridView = document.createElement('div');
      gridView.className = 'change-view grid toggled'
      gridView.setAttribute('title','Toggle Grid View');
      var listView = document.createElement('div');
      listView.className = 'change-view list-view';
      listView.setAttribute('title','Toggle List View');
      
      jQuery(gridView).click(function(event){
        event.preventDefault();
        jQuery(this).addClass('toggled');
        jQuery(listView).removeClass('toggled');
        articleContainer.removeClass('toggled');
        articleContainer.parent().removeClass('toggled');
      });
      
      jQuery(listView).click(function(event){
        event.preventDefault();
        jQuery(this).addClass('toggled');
        articleContainer.addClass('toggled');
        articleContainer.parent().addClass('toggled');
        jQuery(gridView).removeClass('toggled');
      });
      
      articleContainer.append(gridView);
      articleContainer.append(listView);
    }
  },
  
  /* Form Validation 
   *  Reference https://github.com/jzaefferer/jquery-validation for full details on implementation
  */
  validateRequiredFields : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      /* Set validation rules here or you could inject it when only necessary, ie: only on templates that have forms on them */
    }
  },
  
  /* Select Node styling
    * This is an extension of jQuery UI
    * The plugin will take any <select> node and apply custom stying to it.
    * If you ultimately decide this is unecessary, simply remove this method fron the _NYLIFE singleton
  */
  beautifySelects : function(selector){
    var target = jQuery(selector);
    if(target.length > 0){
      target.each(function(){
        var currentTarget = jQuery(this);
        currentTarget.selectBox({});
      });
    }
  },
  
  /* Viewport Triggers */
  viewportTriggers : function(){
    jQuery(window).setBreakpoints({
    /* Use only largest available vs use all available */
        distinct: true, 
    /* Array of widths in pixels where breakpoints should be triggered */
        breakpoints: [
            320,
            480,
            768,
            1024,
            1280
        ]
    });
      
    /*  
          The plugin will dynamically add/remove classnames based on the breakpoints you've specified,
          ie: class="breakpoint-1024", class="breakpoint-768", class="breakpoint-480", etc...
          Alternatively, you can force your hand and inject stylesheets dynamically. As shown below.
          If the class name approach fits implementation needs, simply remove everything within the BLOCK comment.
          
          Please refer to /js/plugins.js for dedicated project documentation (URL to project included in comments)
    */
    
    
    /* BLOCK start */
    
    jQuery(window).bind('enterBreakpoint320', function(){
      //console.log('320 width hit');
      jQuery('head').append('<link rel="stylesheet" href="css/YOUR-DEDICATED-STYLESHEET.css" />');
    });

    jQuery(window).bind('exitBreakpoint320', function(){
      //console.log('320 width hit');
    });

    jQuery(window).bind('enterBreakpoint768', function(){
      //console.log('768 width hit');
    });

    jQuery(window).bind('exitBreakpoint768', function(){
      //console.log('768 width hit');
    });

    jQuery(window).bind('enterBreakpoint1024', function(){
      //console.log('1024 width hit');
    });

    jQuery(window).bind('exitBreakpoint1024', function(){
      //console.log('1024 width hit');
    });

    jQuery(window).bind('enterBreakpoint1280', function(){
      //console.log('1280 width hit');
    });

    jQuery(window).bind('exitBreakpoint1280', function(){
      //console.log('1280 width hit');
    });
    
    /* BLOCK end */
    
  }
}

jQuery(document).ready(function(){
  var navigationHover = _NYLIFE.navigationSlideDown('#navigation > ul > li');
  var talkToUsFloatingModule = _NYLIFE.talkToUs('.talk-to-us');
  var contentSlider = _NYLIFE.contentSlider('.slider');
  var enableQuizTypes = _NYLIFE.quizSequence('.init-quiz');
  var enableSliderControls = _NYLIFE.sliderControl('.slider-control');
  var initTabs = _NYLIFE.tabPanel('.tab-panel');
  var initToggles = _NYLIFE.toggleContent('.toggle-container');
  var initRevealImage = _NYLIFE.toggleRevealImage('.reveal-toggle');
  var initFacebookComments = _NYLIFE.facebookComments('.fb-comments');
  var tabbedSlider = _NYLIFE.tabSlider('.tabbed-slider');
  var formValidations = _NYLIFE.validateRequiredFields('form.required');
  var selectNodeStyling = _NYLIFE.beautifySelects('#yourStory select');
  var talkToUsAccordion = _NYLIFE.accordion('.accordion','slide');
  var verticalAccordion = _NYLIFE.vaccordion('.vaccordion','slide');
  var videoPlayer = _NYLIFE.videoPlayer('a.video-action');
  var initPagination = _NYLIFE.resultsPagination('.pagination');
  var activateDropDown = _NYLIFE.dropDown('#language-select li.options');
  var mostPopularHeights = _NYLIFE.equalizeNavContent('.popular-slider article');
  
  var myFolderList = _NYLIFE.folderView('.my-folder');
  var folderListView = _NYLIFE.listView('.my-folder');
  
  var detectViewport = _NYLIFE.viewportTriggers();
});