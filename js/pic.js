//fancybox
$(function(){
        $('img').each(function() {      
        $(this).attr({
        'data-fancybox' : 'group',
        'data-type'     : 'image',
        'data-src'      : $(this).attr('src') 
        });  
  });        
});
// 记1个坑 (fancybox3) 用别人的轮子最好用最新的 旧的奇奇怪怪一堆bug 
