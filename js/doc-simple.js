
/**
 * 页面滑动时左右侧菜单样式
 */
$(document).ready(function() {
    var right_list_height = $("#rightlist").height()<$(window).height()?$("#rightlist").height():$(window).height();
    var left_list_height = $("#leftlist").height()<$(window).height()?$("#leftlist").height():$(window).height();
    $(window).scroll(function() {
        var scrollPos=$(window).scrollTop();
        var wHeight = $(window).height();
        var appear = $("#bottom-info").offset().top;
        if(scrollPos>=appear-left_list_height){
            $("#left-list-top").removeClass("leftlist");
            $("#left-list-top").addClass("leftlist2");
            $("#left-list-top").css("cssText","height:"+(appear-scrollPos-60)+"px !important;");
        }else{
            $("#left-list-top").removeClass("leftlist2");
            $("#left-list-top").addClass("leftlist");
            $("#left-list-top").css("cssText","height:90% !important;");
        }
        if(scrollPos>=appear-right_list_height){
            $("#rightdiv").removeClass("rightlist");
            $("#rightdiv").addClass("rightlist2");
            $("#rightdiv").css("bottom",(wHeight-appear+scrollPos)+"px");
            $("#rightdiv").css("height",(appear-scrollPos-60)+"px");
        }else{
            $("#rightdiv").removeClass("rightlist2");
            $("#rightdiv").addClass("rightlist");
        }
    })
});
