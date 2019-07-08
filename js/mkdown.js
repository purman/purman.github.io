/**
 * 功能暂时被yedward去掉了
 * 同时 mkdown.css：113，mkdown.css：236 margin-top 无效
 */

//$(document).ready(function() {
//        if ($(window).width() >= 768) {
//            $("pre code").before("<a>复制代码</a>")
//            $(function () {
//                $('pre a').zclip({
//                    path: './jquery-v3.3.1/ZeroClipboard.swf',
//                    copy: function () {
//                        return $(this).parent().find("code").text();
//                    },
//                    afterCopy: function () {
//                        alert('复制成功');
//                    }
//                });
//            })
//        }
//})


/**
 * 站内跳转
 */

$(document).ready(function(){
   $("#content a").each(function(){
       var href = $(this).attr("href");
       if(href!=undefined&&href.indexOf(".md")!=-1&&href.indexOf("://")==-1){
           $(this).attr("href",$(this).attr("href").replace(".md",".html"));
       }
   })
})


/**
 * 图片放大    暂时去掉
 */
$(document).ready(function() {
    $(function () {
        //$("#content img").click(function () {
        //    var _this = $(this);//将当前的pimg元素作为_this传入函数
        //    imgShow("#outerdiv", "#innerdiv", "#bigimg", _this);
        //});
    });
    function imgShow(outerdiv, innerdiv, bigimg, _this){
        var src = _this.attr("src");//获取当前点击的pimg元素中的src属性
        $(bigimg).attr("src", src);//设置#bigimg元素的src属性
        /*获取当前点击图片的真实大小，并显示弹出层及大图*/
        $("<img/>").attr("src", src).on('load',function(){
            var windowW = $(window).width();//获取当前窗口宽度
            var windowH = $(window).height();//获取当前窗口高度
            var realWidth = this.width;//获取图片真实宽度
            var realHeight = this.height;//获取图片真实高度
            var imgWidth, imgHeight;
            var scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

            if(realHeight>windowH*scale) {//判断图片高度
                imgHeight = windowH*scale;//如大于窗口高度，图片高度进行缩放
                imgWidth = imgHeight/realHeight*realWidth;//等比例缩放宽度
                if(imgWidth>windowW*scale) {//如宽度扔大于窗口宽度
                    imgWidth = windowW*scale;//再对宽度进行缩放
                }
            } else if(realWidth>windowW*scale) {//如图片高度合适，判断图片宽度
                imgWidth = windowW*scale;//如大于窗口宽度，图片宽度进行缩放
                imgHeight = imgWidth/realWidth*realHeight;//等比例缩放高度
            } else {//如果图片真实高度和宽度都符合要求，高宽不变
                imgWidth = realWidth;
                imgHeight = realHeight;
            }
            $(bigimg).css("width",imgWidth);//以最终的宽度对图片缩放

            var w = (windowW-imgWidth)/2;//计算图片与窗口左边距
            var h = (windowH-imgHeight)/2;//计算图片与窗口上边距
            $(innerdiv).css({"top":h, "left":w});//设置#innerdiv的top和left属性
            $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg
        });

        $(window).keyup(function(e){
            if(e.keyCode==27){
                $(outerdiv).trigger("click");
            }
        });

        $(outerdiv).click(function(){//再次点击淡出消失弹出层
            $(this).fadeOut("fast");
        });
    }
})