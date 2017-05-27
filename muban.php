<?php
    function httpPost($data,$url){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)');
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $tmpInfo = curl_exec($ch);
        if (curl_errno($ch)) {
            return curl_error($ch);
        }
        curl_close($ch);
        return $tmpInfo;
    }

       function httpGet($url) {  
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


       $openId = $_GET["openid"];
       $formId = $_GET["formId"];
       $site = $_GET["site"];
       $date = $_GET["date"];
       $name = $_GET["name"];
       $seats = "232345";
       $templateId = "L19pLolsJxW0wwhuiRIpumg2KD86xw4IUIo7NZkpkzc";
       $data= <<<END
       {
  "touser": "{$openId}",  
  "template_id": "{$templateId}", 
  "page": "index",          
  "form_id": "{$formId}",         
  "data": {
      "keyword1": {
          "value": "{$site}"
      }, 
      "keyword2": {
          "value": "{$date}"
      }, 
      "keyword3": {
          "value": "{$name}"
      } , 
      "keyword4": {
          "value": "{$seats}"
      } 
  },
  "emphasis_keyword": "keyword3.DATA" 
}
END;


    
      $appid="wxeee40eab34985e4b";
      $secret="3eb473cf96700ac9c404fea081e12639";
      $getTokenApi="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";               
      
      $resultStr =httpGet($getTokenApi);
      $arr = json_decode($resultStr,true);
      $token = $arr["access_token"];
     
      $templateApi="https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token={$token}";
      $res = httpPost($data,$templateApi);
      

?>  