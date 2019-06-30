/**
 * Created by bangbang on 14/10/10.
 * Revised by mengkun on 17/03/16.
 * Updated by Moedog on 19/06/17.
 */
 
function urlEncode(String){
    return encodeURIComponent(String).replace(/'/g,"%27").replace(/"/g,"%22");    
}
 
$(document).ready(function(){
    var copy = new Clipboard('#copy');
    $('#search').on('click',function(){
        var link = window.location.origin + window.location.pathname + '?' + urlEncode($('#kw').val());
        $.ajax({ 
            url: 'get.php?longUrl='+link,  
            type: "GET",
            dataType: "jsonp",
            cache: false,
            success: function (data) {
                if (data){
                    if(!(typeof data.urls === undefined || typeof data.urls == "undefined"))   //防止短网址失败
                    {
                        link = data.urls[0].url_short;
                    }
                }
                $('#go').attr("href",link);
                $('#link').show();
                $('#instructions').text('复制下面的地址,然后发给伸手党吧！');
                $('#lmgtfyLink').val(link).focus().select();
            }
        })
    });
    $('#search2').on('click',function(){
        if($(".search-text").attr("data-site")=="google"){window.location = 'https://www.google.com.hk/search?q=' + urlEncode($('#kw').val());}else{window.location = 'https://www.loli.cab/search?q=' + urlEncode($('#kw').val());}
    });
    var $container = $('.container');
    $container.on('click','#go',function(){
        var link = $('#lmgtfyLink').val();
        if (!!link){
            window.open(link);
            //window.location = link;
        }
    });
    var $kw = $('#kw');
    $kw.on('keydown', function (e) {
        if (e.keyCode == 13){
            $('#search').trigger('click');
        }
    });
    if (!!window.location.search){
        var kw = decodeURIComponent(window.location.search.substr(1));
        var $instructions = $('#instructions');
        var $arrow = $('#arrow');
        setTimeout(function (){
            $instructions.text('1、找到输入框并选中');
            $arrow.show().animate({
                left: $kw.offset().left + 10 + 'px',
                top: ($kw.offset().top + $kw.height()/2) + 'px'
            }, 2000, function (){
                $instructions.text('2、输入你的问题');
                $arrow.hide();
                var $kw = $('#kw');
                $kw.focus();
                var i = 0;
                var interval = setInterval(function (){
                    $kw.val(kw.substr(0,i));
                    i++;
                    if (i > kw.length){
                        clearInterval(interval);
                        $instructions.text('3、按下“Google 搜索”按钮');
                        $arrow.show();
                        var $search = $('#search');
                        $arrow.animate({
                            left: $search.offset().left + $search.width()/2 + 'px',
                            top: $search.offset().top + $search.height()/2 + 'px'
                        }, 1000, function () {
                            $instructions.html('<strong>这对你而言就是那么困难么？</strong>');
                            setTimeout(function (){
                                if($(".search-text").attr("data-site")=="google"){window.location = 'https://www.google.com.hk/search?q=' + encodeURIComponent(kw);}else{window.location = 'https://www.loli.cab/search?q=' + encodeURIComponent(kw);}
                            }, 2000);
                        })
                    }
                }, 200);
            });
        }, 1000);
    }
});

function showAbout(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var popupHeight = $("#msgbox").height();       
    var popupWidth = $("#msgbox").width(); 
    $("#mask").width(windowWidth).height(windowHeight).click(function(){hideAbout();}).fadeIn(200); 
    $("#msgbox").css({"position": "absolute","left":windowWidth/2-popupWidth/2,"top":windowHeight/2-popupHeight/2}).fadeIn(200); 
}

function hideAbout(){
    $("#mask").fadeOut(200);
    $("#msgbox").fadeOut(200); 
}

function gtest(){
    var img = new Image();
    var timeout = setTimeout(function(){
        img.onerror = img.onload = null;
        $(".search-text").attr("data-site","google2");
    },3000);
    img.onerror = function(){
        clearTimeout(timeout);
        $(".search-text").attr("data-site","google2");
    };
    img.onload = function () {
        clearTimeout(timeout);
        $(".search-text").attr("data-site","google");
    };
    img.src = "https://www.google.com.hk/favicon.ico?"+ +new Date();
}

window.onload = function(){gtest();window.setInterval("gtest()",10000);}