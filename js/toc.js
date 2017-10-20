function change(){
	var $a = $('.contents');

	if( $a.hasClass( "icon-open" )){
	//open
	$('.toc-list').hide();
	$a.removeClass("icon-open");
	$a.addClass("icon-close");
	}else{ 
	//hide
	$('.toc-list').show();
	$a.removeClass("icon-close");
	$a.addClass("icon-open");
	}
}

$(function(){
	//toc 容器
	var $toc =  $('.toc-list');
	//获取第一级目录	
	var $level  =  $('h1');	

	$level.each(function( i ) {		
		//第一级目录添加id
		var id = "content-item"+i;
		$(this).attr("id",id);

		//添加第一级目录	
		var html = $(this).text();
		
		var li = "<li id=\"toc-item-"+ i +"\"   class=\"toc-item\" >" + html +"</li>";
		$toc.append(li);

		//获取到下一个第一级目录中的所有元素
		var $sub = $(this).nextUntil('h1');
		//遍历判断添加
			$sub.each(function (j){
			var $holder =  $(this);		
			//判断是 h2 h3 的元素则添加
			if( $holder.length != 0 &&　(　$holder[0].tagName =='H2' || 　$holder[0].tagName =='H3' ) ){
				//添加第二级目录的id
				var sub_id = "content-subitem" + i + j ;
				$(this).attr("id",sub_id);
				//创建html语句						
				var sub_html = $holder.text();
				var sub_li = "<li id=\"toc-subitem-"+ i +j + "\" class =\"toc-subitem\">" + sub_html + " </li>" ;
				$toc.append(sub_li);

				//绑定第二级点击跳转事件				
				$('#toc-subitem-'+i+j).click(function(){			
					scrollToId(sub_id);
				});
			}
		
		})	

		//绑定第一级点击跳转事件
		$('#toc-item-'+i).click(function(){
			scrollToId(id);
		})
	})

})


//toc 被隐藏时候 固定布局
$(function(){

   if(isPC()){
   $(window).scroll(function () {
   				//获取 toc 容器 到 document 的 距离
                var a = $(".toc-container").offset().top;      
                          
                if ( a < $(window).scrollTop()) {
                    fixlayout($(".toc-container"));                    
                }
            		
            	if($(window).scrollTop() < 90){
               		removelayout($(".toc-container"));
				}                

				//判断滚动条是否到底部 是的话则隐藏toc
				var document_h = $(document).height(); //整个文档的高度

				var scrollTop_h =$(window).scrollTop(); //滚动条距离最上部分的长度

				var hide_h = $(window).height(); //上方被隐藏的文档的高度

				if(document_h -( hide_h + scrollTop_h) <= 40 ){
					//'已经到了底部'				
					removelayout($(".toc-container"));
				}

            });
   }
})


// 更换到绝对布局
function fixlayout( $obj){	
	$obj.addClass('toc-fixed');
}
// 清空之前的绝对布局
function removelayout( $obj ){	
	$obj.removeClass('toc-fixed');
}


// 浏览器跳转到 指定id的元素
function scrollToId(id) {  

  $("html,body").animate({
  		scrollTop:$("#" + id).offset().top}, 400);   
}


