<?php 
/**
 * 短网址 API
 * 编写：mengkun(https://mkblog.cn)
 */
if(isset($_GET['url']) && $_GET['url']) {
    $result = array(
        'code'   => 200,
        'msg'    => 'success',
        'result' => shortUrl($_GET['url'])
    );
} else {
    $result = array(
        'code'   => -1,
        'msg'    => 'url is empty',
        'result' => null
    );
}
die(json_encode($result));
/**
 * 短网址生成函数
 * @param $longUrl 原始网址
 * @return 缩短后的网址
 */
function shortUrl($longUrl) {
    $result = json_decode(@file_get_contents('http://api.uomg.com/api/long2dwz?dwzapi=tcn&url='.urlencode($longUrl)),true)["ae_url"];
    return $result? $result: $longUrl;
}