/**
 * 暂时不用了，列表页全文搜索
 */

var lunrIndex, $results, pagesIndex;
function initLunr() {
    $.getJSON("lunr.json")
        .done(function(index) {
            pagesIndex = index;
            lunrIndex = lunr(function() {
                this.field("title", {
                    boost: 10
                });
                this.field("content");
                this.ref("href");
            });
            pagesIndex.forEach(function(page) {
                lunrIndex.add(page);
            });
        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting Hugo index flie:", err);
        });
}

function initUI() {
    $results = $("#docs-content");
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#search2").trigger("click");
        }
    });
    $("#search2").click(function() {
        var query = $("#docs-search-input").val();
        if(!query.length){
            window.location.reload();
            return
        }
        $("#doc-panel").css("display", "none")
        $("#docs-content h2").css("display", "none")
        $(".doc-panel").remove()

        if (query.length < 2) {
            $("#docs-content h2").css("display", "none")
            $(".doc-panel").remove()
            $("#docs-content").append("<h2>关键字太短，至少为2个字符！</h2>")
            return;
        }

        var results = search(query);
        if(results.length===0){
            $("#docs-content h2").css("display", "none")
            $(".doc-panel").remove()
            $("#docs-content").append("<h2>无搜索结果！</h2>")
        }
        else{
            renderResults(results);
        }
    });
}

function initUI2() {
   
}

function search(query) {
    return lunrIndex.search(query).map(function(result) {
        return pagesIndex.filter(function(page) {
            return page.href === result.ref;
        })[0];
    });
}

function renderResults(results) {
    if (!results.length) {
        return;
    }
    var parentTitle = "";
    results.slice(0, 6).forEach(function(result,index) {
        if(result.menu.hdpp.parent!=undefined&&parentTitle.indexOf(result.menu.hdpp.parent)<0){
            parentTitle = parentTitle+result.menu.hdpp.parent;
            var $contentDiv = $("<div class='col-lg-12 doc-panel'>")
            $contentDiv.append("<h3><i class='fa fa-circle' aria-hidden='true'></i>"+result.menu.hdpp.parent+"("+result.menu.hdpp.parent+"详情介绍)</h3>")
            results.slice(0, 6).forEach(function(result2,_index) {
                if(result2.menu.hdpp.parent==result.menu.hdpp.parent){
                    //debugger
                    $contentDiv.append("<div class='col-lg-6'><h4><a href="+result2.href+" style='font-size:14px; color:#000;'>"+result2.title+"</a></h4></div>")
                    //delete results[_index];
                }
            })
            $contentDiv.append("</div>")
            $results.append($contentDiv);
        }else if(result.menu.hdpp.parent==undefined){
            var $contentDiv = $("<div class='col-lg-12 doc-panel'>")
            $contentDiv.append("<h3><i class='fa fa-circle' aria-hidden='true'></i><a href="+result.href+" '>"+result.title+"("+result.title+"详情介绍)</a></h3></div>")
            $results.append($contentDiv);
        }
    })
}
$(document).ready(function() {

     $(".doc-panel").each(function(index,item){
         var htest1 = $(this).find("h3").text();
     });

    initLunr();
    if($(window).width()<768){
        initUI2();
    }else{
        initUI();
    }
});


