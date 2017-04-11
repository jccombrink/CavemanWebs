




    $(".waitforme").imagesLoaded({ background: true }, function(){
        console.log("Imagesloadedd");
            
//        $('body').addClass('loaded');
        $("#loading_text").hide();
        $('.secondary').css("visibility", "visible");
        $("#rattle_wrapper, #bike_wrapper").css({animation:'none'});
        $("#wheel_1, #wheel_2").css({animation: "rolin 10s linear infinite"});
        //pop();
        getImages();
        preloadPictures(vital,preLoadCallback);            
        if(isMobile){
            //tabPulled();
            $("body").removeClass("stop-scrolling");
            $("#intro_section").addClass("tabLoaded");
        } else{
            $("#ripcord").css({top:'-340px'});
            $("#ripcord_instruct").show();
        }

    });

