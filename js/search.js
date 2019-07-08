var $results,INDEX_DATA={};
/*var MAX_DESCRIPTION_SIZE = 500;*/
function initLunr() {
    var random = Math.random();
    $.getJSON($('#bottom-info').attr('baseUrl')+"/search_plus_index.json?"+random)
        .done(function(data) {
            INDEX_DATA = data;


        })
        .fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.error("Error getting index flie:", err);
        });
}

function initUI() {
    $results = $("#idid");
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#search").trigger("click");
        }
    });
    $("#search").click(function() {
        var query = $("#search-input").val();
        if(!query.length){
            window.location.reload();
            return
        }
        $("#content").css("display", "none")
        $(".turnbtn").css("display", "none")
        $("#idid h2").css("display", "none")
        $("#idid h4").css("display", "none")
        $(".no-result").css("display", "none")
        $(".content").remove()
        $("#rightdiv").css("display", "none")

        if (query.length < 2) {
            $("#idid h2").css("display", "none")
            $("#idid h4").css("display", "none")
            $(".no-result").css("display", "none")
            $(".content").remove()
            $("#idid").append("<h2>关键字太短，至少为2个字符！</h2>")
            return;
        }

        var results = search(query,500);
        if(results.length===0){
            $("#idid h2").css("display", "none")
            $("#idid h4").css("display", "none")
            $(".no-result").css("display", "none")
            $(".content").remove()
            $results.append("<h4>搜到“"+query+"”相关的结果</h4>")
            $results.append("<div class='no-result' style='text-align: center;'><h3 style='text-align: center; font-size: 24px; color: #4F5D6C; letter-spacing: 0.48px;'>很抱歉，我们没有找到与“"+query+"“相关的文档</h3><img src='"+$('#bottom-info').attr('baseUrl')+"img/noresult.png'/></div>")
        }
        else{
            $results.append("<h2 style='border-bottom:1px solid #D6D6D6;padding-bottom: 10px;'>搜到“"+query+"”相关的结果</h2>")
            renderResults(results);
        }
    });
}

function initUI2() {
    $results = $("#idid");
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            var query = $("#search-input2").val();
            if(!query.length){
                window.location.reload();
                return
            }

            $("#content").css("display", "none")
            $(".turnbtn").css("display", "none")
            $("#idid h2").css("display", "none")
            $("#idid h4").css("display", "none")
            $(".no-result").css("display", "none")
            $(".content").remove()

            if (query.length < 2) {
                $("#idid h2").css("display", "none")
                $("#idid h4").css("display", "none")
                $(".no-result").css("display", "none")
                $(".content").remove()
                $("#idid").append("<h2>关键字太短，至少为2个字符！</h2>")
                return;
            }

            var results = search(query,100);
            if(results.length===0){
                $("#idid h2").css("display", "none")
                $("#idid h4").css("display", "none")
                $(".no-result").css("display", "none")
                $(".content").remove()
                $results.append("<h4>搜到“"+query+"”相关的结果</h4>")
                $results.append("<div class='no-result'><h3>很抱歉，我们没有找到与“"+query+"“相关的产品文档</h3><img src='"+$('#bottom-info').attr('baseUrl')+"/img/noresult.png'/></div>")
            }
            else{
                renderResults(results);
            }
        }
    });
}


function escapeReg(keyword) {
    //escape regexp prevserve word
    return String(keyword).replace(/([\*\.\?\+\$\^\[\]\(\)\{\}\|\/\\])/g, '\\$1');
}

function search(keyword,MAX_DESCRIPTION_SIZE) {
    if (keyword == null || keyword.trim() === '') return;

    var results = [],
        index = -1;
    for (var page in INDEX_DATA) {
        if ((index = INDEX_DATA[page].body.toLowerCase().indexOf(keyword.toLowerCase())) !== -1) {
            results.push({
                url: INDEX_DATA[page].url,
                title: INDEX_DATA[page].title,
                body: INDEX_DATA[page].body.substr(Math.max(0, index - 50), MAX_DESCRIPTION_SIZE).replace(new RegExp('(' + escapeReg(keyword) + ')', 'gi'), '<span style="background:#ff0;">$1</span>')
            });
        }
    }
    return results;
}

function renderResults(results) {
    if (!results.length) {
        return;
    }
    $(".firstli").each(function(index,itemul){
        var article = "";
        var isFirstTitle = 0;
        $(this).find("a").each(function(index,itema){
            if($(itema).hasClass("firsta")){
                results.slice(0, 25).forEach(function(result,index) {
                    if($(itema).attr("href").indexOf(result.url)!=-1) {
                        article = article + "<h3><a href='"+$('#bottom-info').attr('baseUrl')+result.url+"'>" +
                                                        "<i class='fa fa-circle' aria-hidden='true'></i>&nbsp;&nbsp;"+result.title+"</a></h3>"+
                                                        "<p class='col-lg-12'style='line-height:1.5;margin-top:10px;color:rgba(0, 0, 0, 0.647058823529412);'>"+result.body+"</p>"+
                                                        "</div>";
                        isFirstTitle = 1;
                    }
                })
            }else{
                results.slice(0, 25).forEach(function(result,index) {
                    if($(itema).attr("href").indexOf(result.url)!=-1) {
                        article = article + "<div class='col-lg-12'><h4 style='border-bottom: 1px solid rgba(0,0,0,0.38);padding-bottom: 5px;'>"+
                        "<a href='"+$('#bottom-info').attr('baseUrl')+result.url+"' style='font-size:15px; color:#000;'>"+result.title+"</a></h4>"+
                        "<p style='line-height:1.5;color:rgba(0, 0, 0, 0.647058823529412);'>"+result.body+"<p>"+
                        "</div>"
                    }
                })
            }
        });
        if(article!=""){

            if(isFirstTitle==1){
                var $contentDiv = $("<div class='col-lg-12 content /*content2*/'>")
                $contentDiv.append(article);
            }else{
                var $contentDiv = $("<div class='col-lg-12 content'>")
                $contentDiv.append("<h3><i class='fa fa-circle' aria-hidden='true'></i>&nbsp;"+$(itemul).find('a:first').text()+"</h3></div>")
                $contentDiv.append(article)
            }
            $results.append($contentDiv);
        }
    })

}
$(document).ready(function() {
    initLunr();
    if($(window).width()<768){
        initUI2();
    }else{
        initUI();
    }

});

