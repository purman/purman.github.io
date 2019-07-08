/**
 * 上下翻页
 */
$(document).ready(function() {
    var str=[];
    $(".firstul a").each(function(index,item){
        if($(this).attr("href")!="javascript:void(0)"){
            str.push($(this))
        }
    });
    $.each(str, function(index, item) {
        if(str.length==1){
            return
        }
        if($(this).attr("href")==window.location.href.substr(5)||window.location.pathname==$(this).attr("href")){
            if(index==0){
                $("#idid").css("padding-bottom","60px");
                $(".turnbtn2").css("display","block");
                $(".turnbtn2").attr("href",str[index+1].attr("href"));
            }else if(index==str.length-1){
                $("#idid").css("padding-bottom","60px");
                $(".turnbtn1").css("display","block");
                $(".turnbtn1").attr("href",str[index-1].attr("href"));
            }else{
                $("#idid").css("padding-bottom","60px");
                $(".turnbtn1").css("display","block");
                $(".turnbtn2").css("display","block");
                $(".turnbtn1").attr("href",str[index-1].attr("href"));
                $(".turnbtn2").attr("href",str[index+1].attr("href"));
            }
        }
    })

});

/**
 * 文档详情上下翻页 old version
 */
//$(document).ready(function() {
//    var protocol = window.location.protocol+"//";
//    var hostUrl = window.location.host;
//    if($(".turnbtn1").length>0){
//        var turnUrl1 = $(".turnbtn1").attr("href");
//        var _index1 = turnUrl1.indexOf("///");
//        if(_index1!=0){
//            $(".turnbtn1").attr("href", protocol+hostUrl+turnUrl1);
//        }
//    }
//    if($(".turnbtn2").length>0) {
//        var turnUrl2 = $(".turnbtn2").attr("href");
//        var _index2 = turnUrl2.indexOf("///");
//        if (_index2 != 0) {
//            $(".turnbtn2").attr("href", protocol + hostUrl + turnUrl2);
//        }
//    }
//})


/**
 * 防止外层滚动
 */
$(document).ready(function() {
    $(function () {
        var scrollTop = -1; // 鼠标进入到区域后，则存储当前window滚动条的高度
        $('#left-list-top').hover(function(){
            scrollTop = $(window).scrollTop();
        }, function(){
            scrollTop = -1;
        });
        // 鼠标进入到区域后，则强制window滚动条的高度
        $(window).scroll(function(){
            scrollTop!==-1 && $(this).scrollTop(scrollTop);
        })
    })
})

$(document).ready(function() {
    var minHeight = $(window).height()-60;
    $("#idid").css("min-height",minHeight+"px");
});