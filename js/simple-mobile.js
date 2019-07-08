/**
 * 自适应
 * Created by SuperDragon on 2017/8/12.
 */
/*
 * 移动端特殊样式
 */
$(document).ready(function() {
    if($(window).width()<768){
        var test = $("#left-list-top").html();
        $("#nav").html(test);
        $("ul").removeClass("dn");

        $('.nav__trigger').on('click', function(e){
            e.preventDefault();
            $(".style-3 nav").show();
            $(this).parent().toggleClass('nav--active');
        });
    }
});

/**
 * 点击菜单以外自动收回菜单
 */
$(document).ready(function() {
    if($(window).width()<768) {
        $(document).on("touchstart", function (e) {
            var target = $(e.target);
            if (target.closest(".style-3").length == 0) {
                //$(".nav--active .nav__trigger").trigger("click");
                $("#nav").parent().removeClass("nav--active");
                $("#nav").hide();
            }
        })
    }
})
/**
 * 防止外层滚动
 */
$(document).ready(function() {
    $(function () {
        var scrollTop = -1; // 鼠标进入到区域后，则存储当前window滚动条的高度
        $('#nav').on("touchstart",function () {
            scrollTop = $(window).scrollTop();
        })
        $('#nav').on("touchend",function () {
            scrollTop = -1;
        });
        // 鼠标进入到区域后，则强制window滚动条的高度
        $(window).scroll(function () {
            scrollTop !== -1 && $(this).scrollTop(scrollTop);
        })
    })
})