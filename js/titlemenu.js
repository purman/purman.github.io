/*文档右侧文章标题导航*/
/*导航菜单生成*/
var ahtml = "";
$(document).ready(function() {
    if ($(window).width() >= 768) {
        $("#content h1,#content h2,#content h3").each(function () {
            if ($(this).is("h1")) {
                ahtml = ahtml + "<li><a class='fir rightaaa' id='id-" + $(this).attr("id") + "' href='#" + $(this).attr("id") + "'>" + $(this).text() + "</a></li>";
            } else if ($(this).is("h2")){
                ahtml = ahtml + "<li><a class='sec rightaaa' id='id-" + $(this).attr("id") + "' href='#" + $(this).attr("id") + "'>" + $(this).text() + "</a></li>";
            }else{
                ahtml = ahtml + "<li><a class='thi rightaaa' id='id-" + $(this).attr("id") + "' href='#" + $(this).attr("id") + "'>" + $(this).text() + "</a></li>";
            }
        })
        document.getElementById("rightlist").innerHTML= ahtml;
    }
})

/**
 * 标题上那个小东西
 */
$(document).ready(function() {
    if ($(window).width() >= 768) {
        var currentURL1 = document.location.href;
        var innerContext = "<a class='icc'> <i class='fa fa-link' style='font-size: 17px;color: #2980B9' aria-hidden='true'></i></a>";
        $("#docsimple h1,#docsimple h2,#docsimple h3").append(innerContext);
        $(".icc").css({
            "visibility": "hidden"
        });
        $("#docsimple h1,#docsimple h2,#docsimple h3").hover(
            function () {
                $(".icc").attr("href", "#" + this.id)
                $(this).find(".icc").css({
                    "visibility": "visible"
                })
            }, function () {
                $(this).find(".icc").css({
                    "visibility": "hidden"
                })
            }
        );
    }
})

/**
 * 滚动效果
 */
$(document).ready(function() {
    $("#rightlist a,#content a").click(function(){
        $('html, body').animate({
            scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top-80
        }, 500);
    });
})

/*导航菜单选中效果*/
//$(document).ready(function() {
//    var rightas = document.getElementsByClassName('rightaaa');
//    for (var i = 0; i < rightas.length; i++) {
//        rightas[i].addEventListener('click', righta, false)
//    }
//    function righta() {
//        for (var i = 0; i < rightas.length; i++) {
//            rightas[i].classList.remove("rightlight");
//            rightas[i].classList.remove("a2");
//        }
//        var fdfsd = document.getElementById(this.id);
//        fdfsd.classList.add("rightlight")
//        fdfsd.classList.add("a2")
//    }
//})

/**
 * 右侧菜单跟随滚动
 */
$(document).ready(function() {
    if($(window).width()>=768) {
        var rightas = document.getElementsByClassName('rightaaa');
        $(window).scroll(function () {
            $("h1,h2,h3").each(function () {
                var dis = $(this).offset().top - $(window).scrollTop();
                if (dis < 100 &&  dis > -150) {
                    for (var i = 0; i < rightas.length; i++) {
                        rightas[i].classList.remove("rightlight");
                    }
                    var currentId = $(this)[0].id;
                    $("#id-" + currentId).addClass("rightlight");
                }
            })
        });
    }
})

