/**
 * 详情页左侧菜单
 * Created by SuperDragon on 2017/8/12.
 */
var toggleBtns = document.getElementsByClassName('js-toggle');
for (var i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener('click', toggleClass, false)
}

function toggleClass() {
    var content = this.dataset.target.split(' ');
    var firstNotDn =  $(".firstli>ul:not(.dn)");
    var secondNotDn =  $(".secondli>ul:not(.dn)");
    var thirdNotDn =  $(".thirdli>ul:not(.dn)");
    var fourNotDn =  $(".fourli>ul:not(.dn)");
    for (var i = 0; i < content.length; i++) {
        $(content[i]).each(function(index,item){
            $(item).hasClass("dn") ? $(item).removeClass("dn") : $(item).addClass("dn");
            if($(item).parent().find("a:first").hasClass("firsta")){
                firstNotDn.addClass("dn")&&secondNotDn.addClass("dn")&&thirdNotDn.addClass("dn")&&fourNotDn.addClass("dn")
            }else if($(item).parent().find("a:first").hasClass("seconda")){
                secondNotDn.addClass("dn")&&thirdNotDn.addClass("dn")&&fourNotDn.addClass("dn")
            }else if($(item).parent().find("a:first").hasClass("thirda")){
                thirdNotDn.addClass("dn")&&fourNotDn.addClass("dn")
            }else if($(item).parent().find("a:first").hasClass("foura")){
                fourNotDn.addClass("dn")
            }else{
                secondNotDn.addClass("dn");
            }


        })
    }
}

/**
 *
 */
$(document).ready(function() {
    var currentUrl = window.location.href.split("#")[0];
    //$("#mune_name").attr("href",currentUrl)
    var currentPath = window.location.pathname.split("#")[0];
    $(".firstul a").each(function(){
        var aUrl = $(this).attr("href").replace(".md",".html");
        if(aUrl==currentUrl.substr(5)||aUrl==currentPath){
            var fisrtParent = $(this).parent().parent();
            var secondParent = fisrtParent.parent().parent();
            var thirdParent = secondParent.parent().parent();
            var fourParent = thirdParent.parent().parent();
            fisrtParent.removeClass("dn");
            secondParent.removeClass("dn");
            thirdParent.removeClass("dn");
            fourParent.removeClass("dn");
            fisrtParent.parent().find("a:first").addClass("primary-color1");
            fisrtParent.parent().find("a:first").removeClass("black");
            secondParent.parent().find("a:first").addClass("primary-color1");
            secondParent.parent().find("a:first").removeClass("black");
            thirdParent.parent().find("a:first").addClass("primary-color1");
            thirdParent.parent().find("a:first").removeClass("black");
            fourParent.parent().find("a:first").addClass("primary-color1");
            fourParent.parent().find("a:first").removeClass("black");
            $(this).removeClass("black");
            $(this).hasClass("firsta")?$(this).addClass("primary-color1"):$(this).addClass("primary-color2");
        }
        $(this).attr("href",$(this).attr("href").replace(".md",".html"))


    });
})


/**
 * 标题中格式转换
 */
$(document).ready(function() {
    $(".firstul a").each(function(){
        $(this).attr("href",$(this).attr("href").replace(".md",".html"));
    });
    $(".js-toggle").each(function(){
        var dataTarget =$(this).attr("data-target");
        $(this).parent().find("ul").removeClass(dataTarget.substr(1));
        dataTarget = dataTarget.substring(1, dataTarget.length).replace(new RegExp("\\.","g"),"-");
        dataTarget = dataTarget.substring(0, dataTarget.length).replace(new RegExp("\\@","g"),"-");
        dataTarget = dataTarget.substring(0, dataTarget.length).replace(new RegExp("\\#","g"),"-");
        dataTarget = dataTarget.substring(0, dataTarget.length).replace(new RegExp("\\&","g"),"-");
        $(this).attr("data-target","."+dataTarget);
        $(this).parent().find("ul:first").addClass(dataTarget);
    });
    //$(".secondul").each(function(){
    //    var oldClass = this.classList.toString().split(" ")[0];
    //    $(this).removeClass(oldClass)
    //    $(this).addClass(oldClass.replace(new RegExp("\\.","g"), "-"));
    //    $(this).addClass(oldClass.replace(new RegExp("\\@","g"), "-"));
    //    $(this).addClass(oldClass.replace(new RegExp("\\#","g"), "-"));
    //    $(this).addClass(oldClass.replace(new RegExp("\\&","g"), "-"));
    //})
})
