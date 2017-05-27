<?php
   $code=$_GET["code"];
   $appid="wxeee40eab34985e4b";
   $secret="3eb473cf96700ac9c404fea081e12639";
   $api="https://api.weixin.qq.com/sns/jscode2session?appid={$appid}&secret={$secret}&js_code={$code}&grant_type=authorization_code";
  
     function  httpGet($url) {  
        $curl = curl_init();  
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);  
        curl_setopt($curl, CURLOPT_TIMEOUT, 500);  
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);  
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);  
        curl_setopt($curl, CURLOPT_URL, $url);  

        $res = curl_exec($curl);  
        curl_close($curl);  

        return $res;  
      } 
  
  $str= httpGet($api);
  echo $str;

?>