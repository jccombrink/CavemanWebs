///Extending jquery with some nifty functions start
///Dragable    
$.fn.draggable = function(lim, callmemaybe){
    var $this = this,
    ns = 'draggable_'+(Math.random()+'').replace('.',''),
    mm = 'mousemove.'+ns,
    mu = 'mouseup.'+ns,
    $w = $(window),
    isFixed = ($this.css('position') === 'fixed'),
    adjX = 0, adjY = 0;

    $this.mousedown(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var pos = $this.offset();
        if (isFixed) {
            adjX = $w.scrollLeft(); 
            adjY = $w.scrollTop();
        }
        var ox = (ev.pageX - pos.left), oy = (ev.pageY - pos.top);
        $this.data(ns,{ x : ox, y: oy });
        $w.on(mm, function(ev){
            
            ev.preventDefault();
            ev.stopPropagation();
            if (isFixed) {
                adjX = $w.scrollLeft(); 
                adjY = $w.scrollTop();
            }
            var offset = $this.data(ns);
            
            if(!toppedOut){
                $this.css({left: ev.pageX - adjX - offset.x, top: ev.pageY - adjY - offset.y});
            }
            else{
                $("#ripcord").css({top: y});
            }
            
            
            
            if ($this.offset().top >= lim){
                
                var y = $this.offset().top;
                
                $this.on('dragstart', function(event) { event.preventDefault(); });
                toppedOut = true;
                //ev.preventDefault();
                //ev.stopPropagation();
                
               
            }
        });
        $w.on(mu, function(){
           
            $w.off(mm + ' ' + mu).removeData(ns);
            $this.css({top: pos.top});
            if (toppedOut){
                callmemaybe();
            }
        });
    });

    return this;
};

///Scrollto
$.fn.goTo = function (animCB) {
    return this.each(function () {
        $('html, body').animate({
            scrollTop: $(this).offset().top
        }, 500).promise().then(animCB);
    });
}     

///Extending jquery with some nifty functions close

entered = false;

var isMobile = false;

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    isMobile = true;
}

//FUNCTIONS AND VARS start//
var b = 0;
var vital=[];
var secondary=[];
var toppedOut = false;
function colorator() {
  function rgb_me() {
    return Math.floor(Math.random()*256).toString(16)
  }
  return "#"+"10"+rgb_me()+"10";//rgb_me();
}

function tabPulled(){
    $("body").removeClass("stop-scrolling");
    
    $("#sectHome").goTo();
//    $(".introStuff").css({transform: "rotateX(90deg)"});
    toppedOut = false;
}

function moveCosmos(){
            cosmos = $('#contact');
        if (b==0){
             cosmos.css('background-size', '100% auto, 150% 150%');   
             cosmos.css('background-position', 'bottom left, bottom left'); 
            b=1;
        }
        else{
            cosmos.css('background-size', '100% auto, 100% 100%');
            cosmos.css('background-position', 'bottom left, bottom center');
            b=0;
        }
}
    
function toggleAbout(){
    $("#line_1").toggleClass("line_1_small");
    $("#about_left").toggleClass("about_left_collapsed");
    $("#about_right").toggleClass("about_right_collapsed");
    
    
//    console.log("line left:" + line_left + " Width right:" + width_right + " Total width:" + vW);
//    console.log("about left:" + $("#about_left").width() + " about right:" + $("#about_right").width());
}

  function calculateTicks(){
      
        tickAbout =  -(280 - 0.5*pAbout.height());
        tickCoffee = -(216 - 0.5*pCoffee.height());
        tickPeople = -(265 - 0.5*pPeople.height());
        tickFood =   -(271 - 0.5*pFood.height());
    }

function coffeeCallback(){
    
     
            scrollListen = false;
            setTimeout(function(){scrollListen = true},50);
            $("#wrap_about_right").toggle();
            $("#wrap_coffee_right").toggle();
            $("#p_coffee p").text(aboutLookup["coffee"]);
            //$("#line_1").toggleClass("line_1_small");
            $("#btnExpandCoffee").toggle();
            toggleAbout(); 
           
}

function peopleCallback(){
    
        
//            $("#carouCrew .carousel-inner .item").eq(0).addClass("active");
            scrollListen = false;
            setTimeout(function(){scrollListen = true},1000);
            $("#wrap_about_right").toggle();
//            $("#wrap_people_right").toggleClass("tooit");
            $("#wrap_people_right").toggle();
            $("#p_people p").text(aboutLookup["crew"]);
            $("#line_1").toggleClass("line_1_small");
            $("#btnExpandCrew").toggle();
            $("#people_social").hide();
            toggleAbout();
            
}
  
function foodCallback(){
    
        console.log("wrap_food_callback");
            scrollListen = false;
            setTimeout(function(){scrollListen = true},1000);
            $("#wrap_about_right").toggle();
//            $("#wrap_food_right").toggleClass("tooit");
            $("#wrap_food_right").toggle();
            $("#p_food p").text(aboutLookup["food"]);
            $("#btnExpandFood").toggle();
            toggleAbout();
}

function storyCallback(){
    scrollListen = false;
    setTimeout(function(){scrollListen = true},1000);
    $("#carouEtc").toggleClass("carouEtcShow");
    $("#storyWrap").toggleClass("storyWrap_collapsed");
    $("#p_story").toggleClass("story_out");
}

function popCrew(){
        //$("#wrap_people_right").show();
        console.log("pop crew started");
    
        $.each(crewLookup,function(key, value){
            
            $("#carouCrew .carousel-inner").append('<div id=' + '"' + value.name + '"' +' class="item"'+ ' data-accent=' +'"'+value.accent+'"'+ ' data-name=' +'"'+value.name+'"'+'></div>');

            $("#carouCrew .carousel-inner").append('<div class="item"'+ ' data-accent="grey"' + ' data-name='+'"'+value.name+'2'+'"'+'></div>');
            
        
        });
    
    $("#carouCrew .carousel-inner .item").eq(0).addClass("active");
    
    $("#carouCrew .carousel-inner .item").each( function(){
        name = $(this).data("name");
        $(this).css({"background-image": "url('./img/staff/" +name+".jpg')"});
    });
    console.log("pop crew done");
    //$("#wrap_people_right").hide();
}
function popFood(){
        $.each(foodLookup,function(key, value){
            
        $("#carouFood .carousel-inner").append('<div id=' + '"' + value.name + '"' +' class="item" data-name=' +'"'+value.name+'"'+'></div>');
                    
    });
    
    $("#carouFood .carousel-inner .item").eq(0).addClass("active");
    
    $("#carouFood .carousel-inner .item").each( function(){
        name = $(this).data("name");
        $(this).css({"background-image": "url('./img/food/" +name+".jpg')"});
    });
}

function popEtc(){
        $.each(etcLookup,function(key, value){
            
        $("#carouEtc .carousel-inner").append('<div id=' + '"' + value.name + '"' +' class="item" data-name=' +'"'+value.name+'"'+'></div>');
                    
    });
    
    $("#carouEtc .carousel-inner .item").eq(0).addClass("active");
    
    $("#carouEtc .carousel-inner .item").each( function(){
        name = $(this).data("name");
        $(this).css({"background-image": "url('./img/polaroid/" +name+".jpg')"});
    });
}

function getBio(key){
     return $.grep(crewLookup, function(item) {return item.name == key;})[0].bio;
}

function getFoodBio(key){
    console.log("getfood called with: "+key);
     return {bio: $.grep(foodLookup, function(item) {return item.name == key;})[0].bio, title: $.grep(foodLookup, function(item) {return item.name == key;})[0].title };
}

function getEtcBio(key){
    console.log(key);
    console.log($.grep(etcLookup, function(item) {return item.name == key;})[0].bio);
     return $.grep(etcLookup, function(item) {return item.name == key;})[0].bio;
   
}



var coffeeLookup ={"where" : "High quality beans deserve a high quality roast. We only source freshly roasted coffees from the master roasters at Deluxe Coffee Works in Cape Town.",
                   "what" : "Deluxe's House Blend - 'It’s full bodied, full flavoured, complex and downright delicious. A blend of the best Brazil Cerrado, Guatemala Huehuetenango and Ethiopian Yirgacheffe.'",
                   "how" : "All our coffee starts with a 20g double shot espresso- beautifully extracted through a traditional naked portafilter- because if it's worth doing, it's worth overdoing.",
                   "why" : "Because there is no sadness in the world that cannot be cured with a bike ride and a good cup of coffee.", 
                   "cav" : "We are currently working together with Deluxe to produce our own signature, Caveman-worthy blend. Coming soon!"
    }

var crewLookup =[
    {name: "wian",
     accent: "skyblue",
     bio: "Technically a machine and not a person- a prodigy barista with skills beyond his years. Aspiring pro roadie Wian-David Slabert is the bru behind the brew."},
     {name: "conrad",
      accent: "crimson",
      bio: "7x Triathlon World Champion. Some say he once hand-dug a 25m pool, that he has an FTP North of 420 and that he enjoys the ocasionally stick-fight            with the wild baboons on his farm.."},
     {name: "lamarzocco",
      accent: "seagreen",
      bio: "Technically a person and not a machine. The iconic La Marzocco Linea PB is the acclaimed gold standard of espresso machines. It adds deep Italian character to each cup it lovingly brews to impossible standards."},
     {name: "adi",
      accent: "orange",
      bio: "The cuisine, coffee and photography sage- Adi Van der Merwe is a seemingly calm presence behind the coffee machine. You could well be forgiven for forgetting that he is an elite downhill racer, on his way to Europe to ride his bike down mountains at speeds which your mom would not approve of."},
     {name: "amy",
      accent: "purple",
      bio: "The all-round queen of coffee and one of the masterminds behind our recipes. Internationally ranked at 11th in the UCI Junior World XC series, Amy Williams is also pretty espresso on the bike"}
    ]

var foodLookup =[
     {name: "cyclists",
      title: "",
      bio: "Our  menu is carefully formulated to cater to cyclists. Pre-ride, post-ride, eating or snacking - we serve quality food to crank-               crushing, KOM-conquering, berm-bending bicycle riders."},
     {name: "civilians",
      title: "",
      bio: "People who are not yet cyclists will enjoy our cuisine all the same. From healthy, tasty to downright decadent - our options include            Banting, raw and chocoholic choices."},
     {name: "muesli",
      title: "Breakfast muesli",
      bio: "Raw, organic, steel cut oats with coconut slivers, pumpkin seeds, sunflower seeds, mixed nuts, chia seeds, raisins, Goji berries, topped with double cream Greek yoghurt & honey."},
     {name: "rocky",
      title: "Rocky single track",
      bio: "Like Rocky Road, only better. Made with love by #PrincessHotstuff. Rolled oats, nuts, cherries, cocoa, honey, turkish delight & Ricecrispies."},
     {name: "sandwich",
      title: "Baked brilliance",
      bio: "If you'r café stop happens to be a traditional boulangerie in Nice, feel free to stop reading. The rest need not fear, as the freshest pastries from Peregrine outside Grabouw are an institution at Caveman Café. Croissants, bagels and beautiful, beautiful bread. Vive la France!"},
     {name: "juice",
      title: "Juice",
      bio: "The legal kind, although often described as criminally refreshing. Always made the way it should be: raw and on the spot."},
     {name: "smoothie",
      title: "Smoothies",
      bio: "As smooth and invigorating as a stretch of Jonkershoek singletrack in the break of dawn. Fyi, the macadamia nut butter, oats and date smoothie comes highly recommended by Conrad himself."},
     {name: "more",
      title: "Etc...",
      bio: "If it's raw, organic and fresh- chances are you'll find it at Caveman Café. This includes unpasteurized, badger-friendly honey. Sourced from Western Cape hives, the batches vary from veldblom to Fynbos and most often Eucalyptus."}
    ]

var etcLookup =[
    {name: "in",
      bio: ""},
    {name: "cafe",
      bio: ""},
    {name: "coffee",
      bio: ""},
    {name: "barista",
      bio: ""},
    {name: "front",
      bio: ""},
    {name: "track",
      bio: "Kids track outside the café."},
    {name: "bike",
      bio: ""},
    {name: "night",
      bio: "Night racing on the XC course at Caveman Cafe"},
    {name: "vibe",
      bio: "Ok, but first coffee..."}
    ]

var socialLookup ={"wian-fb" : "https://www.facebook.com/CavemanCafebyStoltz/?fref=ts",
                   "wian-t" : "https://twitter.com/skinnywiandavid",
                   "wian-in" : "https://www.instagram.com/doppioshot/",
                   "conrad-fb" : "https://www.facebook.com/CavemanCafebyStoltz/?fref=ts",
                   "conrad-t" : "https://twitter.com/ConradStoltz",
                   "conrad-in" : "https://www.instagram.com/conradstoltz",
                   "lamarzocco-fb" : "https://www.facebook.com/CavemanCafebyStoltz/?fref=ts",
                   "lamarzocco-t" : "https://www.twitter.com/LaMarzocco",
                   "lamarzocco-in" : "https://www.instagram.com/lamarzocco",
                   "adi-fb" : "https://www.facebook.com/CavemanCafebyStoltz/?fref=ts",
                   "adi-t" : "https://www.twitter.com/LaMarzocco",
                   "adi-in" : "https://www.instagram.com/adivandermerwe",
                   "amy-fb" : "https://www.facebook.com/CavemanCafebyStoltz/?fref=ts",
                   "amy-t" : "https://twitter.com/amy_williams3",
                   "amy-in" : "https://twitter.com/amy_williams3"
                   
    }

var aboutLookup ={"about" : "The first hint of greatness, is passion. Period. This is why we're so good at this. We strive to create the best damn cup of coffee                    you've ever tasted. Then do it again and again and again.",
                   "coffee" : "In coffee, as in life- perfection is quite simply the beautiful consequence of getting all the little things exaclty right.",
                   "food" : "From the Rockies of Boulder to Australia's Gold Coast to the French wine region, and the beaches of Maui. All menu items were collected and compiled from our travels to training meccas around the world.",
                   "crew" : "Because winning is infectious, we surround ourselves with champions. From the beans we buy and the equipment we insist on, to our pro barista and the world champion athletes we host. Whichever way you look, Caveman Café is basically a podium with wifi."          
    }

//FUNCTIONS AND VARS close//
//Die doc sal altyd reg wees want ek load eers script na die dom gebou is...
$(document).ready(function(){ 
//    var docWidth = document.documentElement.offsetWidth;
//
//[].forEach.call(
//  document.querySelectorAll('*'),
//  function(el) {
//    if (el.offsetWidth > docWidth) {
//      console.log(el);
//    }
//  }
//);
//    
    $('#ripcord').draggable(-100, tabPulled);
    var path = $('#path_1').get(0);
    var length = path.getTotalLength();

    $('#path_1').attr({"stroke-dasharray": length,"stroke-dashoffset": length});
    
    vW = $(window).width();
    vH = $(window).height();
    
    $("#p_about").text(aboutLookup["about"]);
    $("#p_coffee p").text(aboutLookup["coffee"]);
    $("#p_food p").text(aboutLookup["food"]);
    $("#p_people p").text(aboutLookup["crew"]); 
    
    $(".waitforme").imagesLoaded({ background: true }, function(){
        $("#loading_text").hide();
        $('.secondary').css("visibility", "visible");
        $("#rattle_wrapper, #bike_wrapper").css({animation:'none'});
        $("#wheel_1, #wheel_2").css({animation: "rolin 10s linear infinite"});
        //pop();
        getImages();
        preloadPictures(vital,preLoadCallback);            
        if(isMobile){
            tabPulled();
            $("body").removeClass("stop-scrolling");
            $("#intro_section").addClass("tabLoaded");
        } else{
            $("#ripcord").css({top:'-340px'});
            $("#ripcord_instruct").show();
        }
    });

    var preloadPictures = function(pictureUrls, callback) {
        console.log("preload images started");
    var i,
        j,
        loaded = 0;
        //console.log(pictureUrls);

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function (value) {
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };

            // Use the following callback methods to debug
            // in case of an unexpected behavior.
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
            //console.log(src);
        } (new Image(), pictureUrls[i]));
    }
       
};

function preLoadCallback(){
    pop();
    init_google();
    //preloadPictures(secondary,init_google());
    console.log("preload callback");
    //pop();
}
function pop(){
    popCrew();
    popFood();
    popEtc();
}
             


function getImages(){
    console.log("get image list started");
        $.each(crewLookup,function(key, value){
            if(key==0 || key==4){
                vital.push('./img/staff/' +value.name+'.jpg');
                vital.push('./img/staff/' +value.name+'2.jpg');
            }
            else{
                secondary.push('./img/staff/' +value.name+'.jpg');
                secondary.push('./img/staff/' +value.name+'2.jpg');
            }
        });
            
        $.each(foodLookup,function(key, value){
            if(key<2 || key>6){
                vital.push('./img/food/' +value.name+'.jpg');
            }
            else{
                secondary.push('./img/food/' +value.name+'.jpg');
            }
        });
    
        $.each(etcLookup,function(key, value){
            if(key<1 || key>7){
                vital.push('./img/polaroid/' +value.name+'.jpg');
            }
            else{
                secondary.push('./img/polaroid/' +value.name+'.jpg');
            }
        });
    console.log("get image list done");
}

        
//Sandbox Mode
//            $("body").removeClass("stop-scrolling");
//            $("#intro_section").addClass("tabLoaded");
///////////////////////////////
    
    
    pAbout = $('#p_about'); 
    pCoffee = $('#p_coffee');
    pPeople = $('#p_people');
    pFood = $('#p_food');
    

//    $('.menu_item').hide();
    
    $(".navbar-fixed-top").mouseover( function(){
        $(".menu_item").addClass("navbar_active");
    });
    
    $(".navbar-fixed-top").mouseleave( function(){
        $(".menu_item").removeClass("navbar_active");
    });
    
    $("#btnExpandCoffee").click(function(){
         $("#left_coffee").goTo(coffeeCallback);                                                                                               
    });
    
    $("#btnExpandCrew").click(function(){
         $("#left_people").goTo(peopleCallback); 
    });
    
    $("#btnExpandFood").click(function(){
         $("#left_food").goTo(foodCallback); 
    });
    
    $("#btnExpandStory").click(function(){
        $("#sectStory").goTo(storyCallback); 
    });
    
    carouCrew = $("#carouCrew");
    carouFood = $("#carouFood");
    
    
    
    
    configTimelines();
    
    $("#btnMap").click(function(){
        if($("#map_wrap").hasClass("mapShow")){
            $(this).html('<i class="fa fa-bicycle fa-fw"></i> <span class=>where are we?</span>');
        }
        else{
            $(this).html('<i class="fa fa-bicycle fa-fw"></i> <span>hide map</span>');
        }
        $("#map_wrap").toggleClass("mapShow");
        google.maps.event.trigger(map, 'resize');
    });
    
    
    $(".vectie").click(function(){
        $(this).addClass("vectie_selected");
        
    });
    
    $(".vectie").mouseleave(function(){
        $(this).removeClass("vectie_selected");
    console.log("vectie left");
    });
    
//    $(".vectie").hover(function(){
//        $(this).toggleClass("vectie_selected");
//    });
    
    $(".btn").hover(function(){
        if(!isMobile){
            $(this).children(".bgButton").toggleClass("flush");
        }
        
    });
    
     $(".vectie").click(function(){
         var key = $(this).data("key");
         $("#btnExpandCoffee").hide();
         $("#p_coffee p").css({color: "transparent"});
         
         $("#p_coffee p").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
    function() { $("#p_coffee p").text(coffeeLookup[key]);
            $("#p_coffee p").css({color: "black"});
            });
       
 });
    
    $('#ripcord').mousedown(function(e) {

    // You can record the starting position with
    var start_x = e.pageX;
    var start_y = e.pageY;

    $().mousemove(function(e) {
        // And you can get the distance moved by
        var offset_x = e.pageX - start_x;
        var offset_y = e.pageY - start_y;

        return false;
    });

    $().one('mouseup', function() {
        alert("This will show after mousemove and mouse released.");
        $().unbind();
    });

    // Using return false prevents browser's default,
    // often unwanted mousemove actions (drag & drop)
    return false;
});
    

    //Prevent the carousel from auto sliding
    $('.carousel').carousel({
        pause: true,
        interval: false
    });
    $(".flip-container").click(function(){
        $(this).closest(".flip-container").toggleClass("flip");
        $(this).closest(".flip-container").toggleClass("can_scroll");
        
        return false;
    });

    if (!isMobile){
        
        var intervalCosmos = setInterval(function(){
        
         moveCosmos();
        
    }, 30000);
    }
    

    $(carouCrew).bind('slid.bs.carousel',function(e){
        
        
        var key = $("#carouCrew div.active").data("name");
        var clr = $("#carouCrew div.active").data("accent");        

        $("#wrap_people_right").css({"background-color": clr});
        
        if(clr !== "grey"){
            
            $("#people_social").show();
            console.log("key is grey");
        $("#a_facebook").attr("href", socialLookup[key+'-fb']);
        $("#a_twitter").attr("href", socialLookup[key+'-t']);
        $("#a_instagram").attr("href", socialLookup[key+'-in']);
            
        
        $("#p_people p").css({color: "transparent"});     
        $("#p_people p").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                             function() { $("#p_people p").text(getBio(key));
                                          $("#p_people p").css({color: "black"});                                                                                               
                            });
        } 
        
        
    });
    
    $('#carouFood').bind('slid.bs.carousel',function(e){
        console.log("food slide bind");
        var key = $("#carouFood div.active").data("name");
        
      
//        $("#wrap_food_right").css({"background-color": clr});
        $("#p_food p").css({color: "transparent"});     
        $("#p_food p").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                             function() {
                                          $("#p_food p").html('<span class="soft_heading">'+getFoodBio(key).title+'</span><br>'+getFoodBio(key).bio);
                                          $("#p_food p").css({color: "black"});  
                                       
                            });
//        $("#p_food p").animate({color: "transparent"},500,function(){
//            $("#p_food p").text(getFoodBio(key));
//            $("#p_food p").css({color: "black"});
//        });
    });
    
           $('#carouEtc').bind('slide.bs.carousel',function(e){
                $("#carouEtc .carousel-inner .item").addClass("sepiate");
            });
    
       $('#carouEtc').bind('slid.bs.carousel',function(e){
        console.log("etc slide bind");
        var key = $("#carouEtc div.active").data("name");
        console.log("key is: "+ key);
      
//        $("#wrap_food_right").css({"background-color": clr});
        $("#p_polaroid").css({color: "transparent"});
//        $("#carouEtc .carousel-inner .item").removeClass("sepiate");
        $("#p_polaroid").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                             function() { $("#p_polaroid").text(getEtcBio(key));
                                          $("#p_polaroid").css({color: "black"}); 
                                         $("#carouEtc .carousel-inner .item").removeClass("sepiate");
                            });

    });
    
var resizeTimer;

$(window).resize(function(){
       vW = $(window).width();
       vH = $(window).height();
    
            if(($("#btnExpandCoffee").css("display")=="none")&&(scrollListen)){
        coffeeCallback();
    }
    else if(($("#btnExpandCrew").css("display")=="none")&&(scrollListen)){
        peopleCallback();
    }
    else if(($("#btnExpandFood").css("display")=="none")&&(scrollListen)){
        foodCallback();
    }
    else if($("#carouEtc").hasClass("carouEtcShow")){
        storyCallback();
    }
    
//  clearTimeout(resizeTimer);
//  resizeTimer = setTimeout(function() {
//
//    configTimelines();
//            
//  }, 250);
    
});
    



// scrolling
$(window).scroll(function() {
    
    var windowScrollTop = $(window).scrollTop();
    if(!isMobile&&entered&&(windowScrollTop < vH)){
        console.log("upper scroll limit reached");
        $(document).scrollTop(vH);
    }
    
    
    if (($(".navbar").offset().top >= vH)&&(!isMobile)) {
        entered = true;
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
    
    if(($("#btnExpandCoffee").css("display")=="none")&&(scrollListen)){
        coffeeCallback();
    }
    else if(($("#btnExpandCrew").css("display")=="none")&&(scrollListen)){
        peopleCallback();
    }
    else if(($("#btnExpandFood").css("display")=="none")&&(scrollListen)){
        foodCallback();
    }
    else if($("#carouEtc").hasClass("carouEtcShow")&&(scrollListen)){
        storyCallback();
    }
    
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
    
function configTimelines(){
    
    console.log("Timelines configured");
        //Racenumber timelines
        calculateTicks();

               //Init ScrollMagic Controller
          var controller = new ScrollMagic.Controller();


        ////About timeline
          var tweenLineAbout = new TimelineMax({onStart: startAbout});

            tweenLineAbout.to('#flippy_A1', 4, { transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_A1', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineAbout.to('#flippy_A1', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_B1, #flippy_B3', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B1, #flippy_B3', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineAbout.to('#flippy_B1, #flippy_B3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_C2', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_C2', 0, { backgroundImage: 'url()',color: 'black'});
            tweenLineAbout.to('#flippy_C2', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_B2', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B2', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineAbout.to('#flippy_B2', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});


            //Reverse Timeline
            tweenLineAbout.to('#flippy_A1', 1, { transform: 'rotateX(90deg)',ease:Power0.easeIn},"+=2");
            tweenLineAbout.to('#flippy_A1', 0, {backgroundImage: 'url("img/flippynums/A1.png")',color: 'transparent'});
            tweenLineAbout.to('#flippy_A1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_B1', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B1', 0, {backgroundImage: 'url("img/flippynums/B1.png")',color: 'transparent'});
            tweenLineAbout.to('#flippy_B1', 5.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B3', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B3', 0, {backgroundImage: 'url("img/flippynums/B3.png")',color: 'transparent'});
            tweenLineAbout.to('#flippy_B3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_C2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_C2', 0, { backgroundImage: 'url("img/flippynums/C2.png")',color: 'transparent'});
            tweenLineAbout.to('#flippy_C2',3.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineAbout.to('#flippy_B2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineAbout.to('#flippy_B2', 0, {backgroundImage: 'url("img/flippynums/B2.png")',color: 'transparent'});
            tweenLineAbout.to('#flippy_B2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});


          var scene = new ScrollMagic.Scene({
            triggerElement: '#left_about',
            duration: "100%"})
          .setTween(tweenLineAbout)
          .addTo(controller);


        //Coffee timeline  
            var tweenLineCoffee = new TimelineMax({onStart: startCoffee, onReverseComplete: startAbout});

            tweenLineCoffee.to('#flippy_A3', 2, { transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_A3', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineCoffee.to('#flippy_A3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_B1, #flippy_B3', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B1, #flippy_B3', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineCoffee.to('#flippy_B1, #flippy_B3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_C1, #flippy_C2', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_C1, #flippy_C2', 0, { backgroundImage: 'url()',color: 'black'});
            tweenLineCoffee.to('#flippy_C1, #flippy_C2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_B2', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B2', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineCoffee.to('#flippy_B2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            //Then Reverse
        //    tweenLineCoffee.add( function(){ console.log("Turn this thing around!")});

            tweenLineCoffee.to('#flippy_A3', 0.5, { transform: 'rotateX(90deg)',ease:Power0.easeIn},"+=2");
            tweenLineCoffee.to('#flippy_A3', 0, {backgroundImage: 'url("img/flippynums/A3.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_A3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_B1', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B1', 0, {backgroundImage: 'url("img/flippynums/B1.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_B1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B3', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B3', 0, {backgroundImage: 'url("img/flippynums/B3.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_B3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_C1', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_C1', 0, { backgroundImage: 'url("img/flippynums/C1.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_C1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_C2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_C2', 0, { backgroundImage: 'url("img/flippynums/C2.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_C2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineCoffee.to('#flippy_B2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineCoffee.to('#flippy_B2', 0, {backgroundImage: 'url("img/flippynums/B2.png")',color: 'transparent'});
            tweenLineCoffee.to('#flippy_B2', 2, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

          var scene2 = new ScrollMagic.Scene({
              triggerElement: '#left_coffee',
              duration: "100%"})
          .setTween(tweenLineCoffee)
          .addTo(controller);


        //people timeline  
            var tweenLinePeople = new TimelineMax({onStart: startPeople, onReverseComplete: startCoffee});

            tweenLinePeople.to('#flippy_A1', 4, { transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_A1', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLinePeople.to('#flippy_A1', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLinePeople.to('#flippy_C1, #flippy_C3', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C1, #flippy_C3', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLinePeople.to('#flippy_C1, #flippy_C3', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //    
            tweenLinePeople.to('#flippy_C2', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C2', 0, { backgroundImage: 'url()',color: 'black'});
            tweenLinePeople.to('#flippy_C2', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //
            tweenLinePeople.to('#flippy_B2,#flippy_A2', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_B2,#flippy_A2', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLinePeople.to('#flippy_B2,#flippy_A2', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            //Reverse Timeline
            tweenLinePeople.to('#flippy_A1', 1, { transform: 'rotateX(90deg)',ease:Power0.easeIn},"+=3");
            tweenLinePeople.to('#flippy_A1', 0, {backgroundImage: 'url("img/flippynums/A1.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_A1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLinePeople.to('#flippy_C1', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C1', 0, {backgroundImage: 'url("img/flippynums/C1.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_C1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C3', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C3', 0, {backgroundImage: 'url("img/flippynums/C3.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_C3', 6, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //    
            tweenLinePeople.to('#flippy_C2', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_C2', 0, { backgroundImage: 'url("img/flippynums/C2.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_C2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //
            tweenLinePeople.to('#flippy_B2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_B2', 0, {backgroundImage: 'url("img/flippynums/B2.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_B2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_A2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLinePeople.to('#flippy_A2', 0, {backgroundImage: 'url("img/flippynums/A2.png")',color: 'transparent'});
            tweenLinePeople.to('#flippy_A2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});


          var scene3 = new ScrollMagic.Scene({
            triggerElement: '#left_people',
            duration: "100%"})
          .setTween(tweenLinePeople)
//          .addIndicators() // add indicators (requires plugin)
          .addTo(controller);

        //food timeline  
            var tweenLineFood = new TimelineMax({onStart: startFood, onReverseComplete: startPeople});


            tweenLineFood.to('#flippy_B1, #flippy_B2', 2, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B1, #flippy_B2', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineFood.to('#flippy_B1, #flippy_B2', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineFood.to('#flippy_B3', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B3', 0, { backgroundImage: 'url()',color: 'black'});
            tweenLineFood.to('#flippy_B3', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            tweenLineFood.to('#flippy_C3', 4, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_C3', 0, {backgroundImage: 'url()',color: 'black'});
            tweenLineFood.to('#flippy_C3', 1, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

            //Reverse Timeline
            tweenLineFood.to('#flippy_B1', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B1', 0, {backgroundImage: 'url("img/flippynums/B1.png")',color: 'transparent'},"+=3");
            tweenLineFood.to('#flippy_B1', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B2', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B2', 0, {backgroundImage: 'url("img/flippynums/B2.png")',color: 'transparent'});
            tweenLineFood.to('#flippy_B2', 3.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //    
            tweenLineFood.to('#flippy_B3', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_B3', 0, { backgroundImage: 'url("img/flippynums/B3.png")',color: 'transparent'});
            tweenLineFood.to('#flippy_B3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});
        //
            tweenLineFood.to('#flippy_C3', 1, {transform: 'rotateX(90deg)',ease:Power0.easeIn});
            tweenLineFood.to('#flippy_C3', 0, {backgroundImage: 'url("img/flippynums/C3.png")',color: 'transparent'});
            tweenLineFood.to('#flippy_C3', 0.5, {transform: 'rotateX(0deg)',ease:Power0.easeIn});

          var scene4 = new ScrollMagic.Scene({
            triggerElement: '#left_food',
            duration: "100%"})
          .setTween(tweenLineFood)
          .addTo(controller);


            //food timeline  
            var tweenLineBow = new TimelineMax();

            tweenLineBow.to('#flippy_A1', 4, {top:-0.5*vH,ease:Power0.easeIn});
            tweenLineBow.to('#flippy_A2', 1, {top:-0.5*vH,ease:Power0.easeIn});
            tweenLineBow.to('#flippy_B3', 4, {top:-vH,ease:Power0.easeIn},"-=2");
            tweenLineBow.to('#flippy_A3, #flippy_B2', 4, {top:-0.7*vH,ease:Power0.easeIn},"-=2");
            tweenLineBow.to('#flippy_C2,#flippy_C1', 1, {top:-1.2*vH,ease:Power0.easeIn},"-=4");
            tweenLineBow.to('#flippy_B1', 1, {top:-1.2*vH,ease:Power0.easeIn},"-=3");
            tweenLineBow.to('#flippy_C3', 4, {top:-1.5*vH,ease:Power0.easeIn},"-=4");

            var scene5 = new ScrollMagic.Scene({
            triggerElement: '#apresFood',
            duration: "100%"})
          .setTween(tweenLineBow)
          .addTo(controller);





        //Callback functions for the timeline

          function startAbout(){
            $("#flippy_A1").text("A");
            $("#flippy_B1").text("B");
            $("#flippy_B2").text("O");
            $("#flippy_B3").text("U");
            $("#flippy_C2").text("T");
        }
            function startCoffee(){
            $("#flippy_A3").text("C");
            $("#flippy_B1").text("O");
            $("#flippy_B2").text("F");
            $("#flippy_B3").text("F");
            $("#flippy_C1").text("E"); 
            $("#flippy_C2").text("E");
        }

            function startPeople(){
            $("#flippy_A1").text("P");
            $("#flippy_A2").text("E");
            $("#flippy_B2").text("O");
            $("#flippy_C1").text("P");
            $("#flippy_C2").text("L"); 
            $("#flippy_C3").text("E");
        }

            function startFood(){
            $("#flippy_B1").text("F");
            $("#flippy_B2").text("O");
            $("#flippy_B3").text("O");
            $("#flippy_C3").text("D");
        }
    
}
    
//  init controller
var controller = new ScrollMagic.Controller();
    
     new ScrollMagic.Scene({triggerElement:"#sectAbout", triggerHook:"onEnter",offset:-70,duration: "100%"})
					.setTween(TweenMax.to("#path_1",1, {strokeDashoffset: 0, ease: Power2.easeOut}))
					.addTo(controller);

    
// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
//google.maps.event.addDomListener(window, 'load', init);
google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(new google.maps.LatLng(-33.964306, 18.851020));
});
    
//Initialise Google Maps
function init_google() {
    
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 12,
        backgroundColor: 'hsla(0, 0%, 0%, 0)',
        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(-33.964306, 18.851020), // New York

        // Disables the default Google Maps UI components
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{"featureType":"all","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#296D2C"},{"lightness":0}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"},{"color":"transparent"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"}]},
{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"color":"#ff0000"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);

    // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
    var image = 'img/mrkr.png';
    var myLatLng = new google.maps.LatLng(-33.964306, 18.851020);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        animation: google.maps.Animation.Bounce
    });
    
    beachMarker.setAnimation(google.maps.Animation.BOUNCE);
    
//    google.maps.event.addListenerOnce(map, 'idle', function() {
//    google.maps.event.trigger(map, 'resize');
//});
}
 

}); //Doc ready//

