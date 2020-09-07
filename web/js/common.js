$(function(){
	navEvents()
	$(window).resize(function(){
		navEvents()
	})
	
/* 	手机二级菜单 */
	  if($(window).width()<767){
		  subnav()
   function subnav(){
	   var  txton=$(".subnav .item.on").html()
	   $(".subnav").append('<div class="subnav-menu"><div class="weui-cell__bd">'+txton+'</div><div class="icon"><div></div>')
	  }
   }
	$(".subnav-menu").click(function(){
		$(this).toggleClass("on")
		$(".subnav .container2").slideToggle()
	})
	$(".temtabs1 .col").hover(function(){
		$(".temyear").stop().slideToggle()
	})
	
	
			$(window).scroll(function(){
				
if ($(window).scrollTop()>10){
	$(".idxtab").addClass("on")
}else{
	$(".idxtab").removeClass("on")
}

if ($(window).scrollTop()>50){
	$("header").fadeOut()
}else{
	$("header").fadeIn()
}
	})
	function navEvents(){
		        var guidemap = new Swiper ('.guideline1 .swiper-container', {
    effect:"fade",
	noSwiping : true,
	 fadeEffect: {
    crossFade: true,
  }
  })  
  function prowindow(){
	
		if($(window).width()<767){
			$(".prolist .item").click(function(){
					 	 $(".proitem-window2 .h1").html($(this).find(".h1").html())
		 $(".proitem-window2 .h2").html($(this).find("p").html())
		 $(".proitem-window2 img").attr("src",$(this).find("img").attr("src"))
		 		if($(this).hasClass("on")){
			$(this).removeClasss("on")
			$(".proitem-window2").fadeOut()
		}else{
			$(this).addClass("on")
			$(".proitem-window2").fadeIn()
		}
		})
			$(".proitem-window2 .close2").click(function(){
			$(".proitem-window2").fadeOut()
			$(".prolist .item").removeClass("on")
		})
		}else{
			  	$(".prolist .item").click(function(){
		$(".prolist .item").removeClass("on")
		 $(".proitem-window .h1").html($(this).find(".h1").html())
		 $(".proitem-window .h2").html($(this).find("p").html())
		 $(".proitem-window img").attr("src",$(this).find("img").attr("src"))

		if($(this).hasClass("on")){
			$(this).removeClasss("on")
			$(".proitem-window").fadeOut()
		}else{
			$(this).addClass("on")
			$(".proitem-window").fadeIn()
		}
		
		
		 
		})
		}
		
  }
  prowindow()
		$('.btn01').click(function(){
		    $('.btn01').removeClass("on")
			$(this).addClass("on")
			$(".prolist .item").removeClass("on")
			$(".proitem-window").fadeOut()
			var class_id = $(this).attr('data-id');
			var item_id = $(this).attr('data-class');
			var item_index=$(this).attr('data-index');
			guidemap.slideTo(item_index,600)
			
			$.ajax({
                    type: 'POST',
                    url: "/g/ajax",
                    data:{class_id:class_id,item_id:item_id},
                    dataType: 'json',
                    success: function(data){
                        console.log(data);
						if(data.data.length>0){
						    var result = '';
                        for(var i = 0; i < data.data.length; i++){
							result+='<div class="item" data-txt="'+data.data[i].content+'" data-title="'+data.data[i].title+'" data-pic="'+data.data[i].pic+'"><img src="'+data.data[i].pic+'" alt="'+data.data[i].title+'"><div class="content"><div class="h1">'+data.data[i].title+'</div><p>'+data.data[i].short_title+'</p></div><div class="more">查看</div></div>';
                        }
							$('.prolist').html(result);
							prowindow()
						}else{
						console.log(1)
						$('.prolist').html("无");
						}
					
                        
                    }
		});
		
		})
		   var gwidth=$(".guidetab1 .tabbox").width()/4
    $(".guidetab1 .item").eq(0).addClass("on")
	$(".guideline1 .right>div").eq(0).show()
    $(".guidetab1 .busimg").css("left",gwidth/2-$(".guidetab1 .busimg").width()/2+"px")
    $(".guidetab1 .item").click(function(){
		guidemap.slideTo(0,600)
    	$(".guidetab1 .item").removeClass("on")
    	$(this).addClass("on")
    	var idx=$(this).index()
    	$(".guidetab1 .busimg").css("left",gwidth/2-$(".guidetab1 .busimg").width()/2+gwidth*idx+"px")
		$(".guideline1 .right>div").hide()
		$(".guideline1 .right>div").eq(idx).show()
    })
	
		$(".banner .video-item").height($(".banner .video-item").width()*220/390)
		$(".tournews .one .item .imgbox").height($(".tournews .one .item .imgbox").width()*165/318)
		$(".facility .item").height($(".facility .item").width())
		$(".ticket-box").css("margin-top",-$(".ticket-box").height()/2+"px")
		$(".idx1left1 .colorbox").height($(".idx1left1 .colorbox").width()*456/648)
		        $(".att-window").css("margin-top",-$(".att-window").height()/2+"px")
        $(".flow-window").css("margin-top",-$(".flow-window").height()/2+"px")
		   /* $(".video-window").css("margin-top",-$(".video-window").height()/2+"px") */
      /*   $(".video-window").css("margin-left",-$(".video-window").width()/2+"px") */

	}
	
	
	
    $("header .time").hover(function(){
        $(this).find(".time-box").stop().fadeIn()
    },function(){
    	$(this).find(".time-box").stop().fadeOut()
    })

    $("header .nav-icon").click(function(){
    	$(this).toggleClass("on")
    	$("header .navs").toggleClass("on")
    })
    
 
  /*   首页 */
     var bannerswiper = new Swiper ('.banner .bannerswiper', {
    // 如果需要分页器
	effect : 'fade',
	    speed:1000,
            autoplay: {
                delay: 4000,
            },
    pagination: {
      el: '.bannerswiper .swiper-pagination',
	  clickable:true
    },
  })
       var index1left = new Swiper ('.index1 .swiper-container', {
    // 如果需要分页器
	effect : 'fade',
			 fadeEffect: {
    crossFade: true,
  }
  })
     $(".index1 .righttab .item").eq(0).addClass("on")
	 $(".idx1box .righttitle>div").eq(0).show()
    $(".index1 .righttab .item").click(function(){
		var idx=$(this).index()
    	$(".index1 .righttab .item").removeClass("on")
    	$(this).addClass("on")
		index1left.slideTo(idx,800)
		$(".idx1box .righttitle>div").hide()
		$(".idx1box .righttitle>div").eq(idx).show()
		if($(window).width()>767){
			var scrolltop=$(".idx1box .righttab").offset().top
		$("html,body").stop().animate({scrollTop: scrolltop-30},800)
		}else{
			var scrolltop=$(".idx1box .left").offset().top
		$("html,body").stop().animate({scrollTop: scrolltop-30},800)
		}
		
    })
	
	 

})