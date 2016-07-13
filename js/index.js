/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-07-11 11:02:38
 * @version $Id$
 */

 Zepto(function($){
 	   //动态设置html的基准font-size值，根据不同屏幕尺寸设计
 	   var html=document.getElementsByTagName('html')[0];
 	   var std= window.innerWidth / 10 ;
      if(std>54){
      	std=54;
      }
       html.style.fontSize = std + 'px';
       
       //轮播图
       var Carousel={
       	 play:function(selector){
       	 	var container=document.querySelector(selector);
    		var ul=container.querySelector("ul");    		
            var imgnum=ul.children.length;
    		var imgwidth=parseInt($(container).css("width"));
    		var len=ul.children.length;
    		var cloneli=ul.children[0].cloneNode(true);
            var cloneli1=ul.children[len-1].cloneNode(true);
    		var span=container.querySelectorAll("span");          
    		$(ul).append(cloneli);
            $(cloneli1).insertBefore(ul.children[0]);
    		var timer;
            var autoplay=function(){
    	        clearInterval(timer);
    	        timer=setInterval(function(){
    			     animateright();},3000);
            }
            var count=1;
            var animateright=function(){
                 count++;
                if(count==imgnum+1){
                	count=1;
                	$(ul).css("transform","translateX(0)");
                }
                $(ul).animate({translateX:-1*count*10+"rem"},500)
                for(var i=0;i<span.length;i++){
                	span[i].className="";
                }
                if(count>imgnum){
                	span[0].className="carousel-on";
                }else{
                span[count-1].className="carousel-on";}
            }
            var animateleft=function(){
               count--;
                if(count==0){
                	count=imgnum;               	
                	$(ul).css("transform","translateX("+-1*(count+1)*10+"rem"+")");
                }                
                 $(ul).animate({translateX:-1*count*10+"rem"},500);
                 for(var i=0;i<span.length;i++){
                	span[i].className="";
                }
                if(count<1){
                	span[imgnum-1].className="carousel-on";
                }else{
                span[count-1].className="carousel-on";}
            }
            var img=ul.querySelectorAll("li img");
            for(var i=0;i<img.length;i++){
                 img[i].index=i;
                 var pagex,pagex1,x,y;          
                 img[i].ontouchstart=function(e){
                 	clearInterval(timer);
                 	var touch=e.touches[0];
                 	 pagex=touch.pageX;
                 	//console.log(pagex);                     	
            	  }
            	  var ulleft;
                  
                 img[i].ontouchmove=function(e){
                 	var touch=e.touches[0];
                 	 pagex1=touch.pageX;
                     y=pagex1-pagex;
                     x=(pagex1-pagex)/37.5+ulleft;
                 	 ulleft=-1*this.index*10;                    
                 	 if(ulleft==-50&&y<0){
                 	 	ulleft=0;
                        
                        
                 	 }if(ulleft==-50&&y>0){
                        ulleft=-50;
                        
                     }
                     if(ulleft==-10&&y<0){
                        ulleft=-10;
                        
                     }
                     $(".carousel ul").css("transform","translateX("+x+"rem"+")");
                     if(ulleft==-10&&y>0){
                        ulleft=-60;
                        // $(".carousel ul").css("transform","translateX("+ulleft+"rem"+")");
                        // x=(pagex1-pagex)/37.5+ulleft;
                        // // $(".carousel ul").css("transform","translateX("+x+"rem"+")");
                     }                 	 
                 	 $(".carousel ul").css("transform","translateX("+x+"rem"+")");
                 }
                 img[i].ontouchend=function(e){
                 	count=this.index;
                 	if(y<0){
                 	if(ulleft==0){
                 		$(ul).animate({translateX:-1*count*10+"rem"},500);
                 	}                 	
                    animateright();}
                    else{
                        if(ulleft==-60){
                            $(ul).animate({translateX:"-50rem"},500);
                        }
                        animateleft();}                    
                     autoplay();
                  }
                 }           
                      autoplay();       	 
           }
       }
       Carousel.play(".carousel");
})
