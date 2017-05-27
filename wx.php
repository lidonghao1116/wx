<?php
/**
  * wechat php test
  */

//define your token
define("TOKEN", "weixin");
$wechatObj = new wechatCallbackapiTest();
//$wechatObj->valid();
$wechatObj->responseMsg();

class wechatCallbackapiTest
{
  public function valid()
    {
        $echoStr = $_GET["echostr"];

        //valid signature , option
        if($this->checkSignature()){
          echo $echoStr;
          exit;
        }
    }

    public function responseMsg()
    {
    //get post data, May be due to the different environments
    $postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

        //extract post data
    if (!empty($postStr)){
                /* libxml_disable_entity_loader is to prevent XML eXternal Entity Injection,
                   the best way is to check the validity of xml by yourself */
                libxml_disable_entity_loader(true);
                $postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
                $openid = trim($postObj->FromUserName);
                $content = trim($postObj->Content);
                $appid="wxeee40eab34985e4b";
                $secret="3eb473cf96700ac9c404fea081e12639";
                $getTokenApi="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={$appid}&secret={$secret}";               
                
                $resultStr = $this->httpGet($getTokenApi);
                $arr = json_decode($resultStr,true);
                $token = $arr["access_token"];
                $postMsgApi = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token={$token}";

                if($content=="这是什么"){
                    $data=array("touser" =>$openid ,"msgtype" =>"text","text"=>array("content"=>"这是微信课堂")  );
                }else if($content=="mongo"){
                      $data=array("touser" =>$openid ,"msgtype" =>"text","text"=>array("content"=>"她很棒，是她开发了我")  );
                }else if($content=="你是谁"){
                      $data=array("touser" =>$openid ,"msgtype" =>"text","text"=>array("content"=>"我是mongo的客服")  );
                }else{
                      $data=array("touser" =>$openid ,"msgtype" =>"text","text"=>array("content"=>"听不懂哎 ")  );
                }

                 foreach ($data as $key => $value) {
                     if($key=="text"){$data["text"]["content"]=urlencode($value["content"]);}
                  } 


                $json= urldecode(json_encode($data)) ;
                $str=$this->httpPost($json,$postMsgApi);
                echo $str;
            

        }else {
          echo "";
          exit;
        }
    }


    public function httpGet($url) {  
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

    
      public function httpPost($data,$url){
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

    
  private function checkSignature()
  {
        // you must define TOKEN by yourself
        if (!defined("TOKEN")) {
            throw new Exception('TOKEN is not defined!');
        }
        
        $signature = $_GET["signature"];
        $timestamp = $_GET["timestamp"];
        $nonce = $_GET["nonce"];
            
    $token = TOKEN;
    $tmpArr = array($token, $timestamp, $nonce);
        // use SORT_STRING rule
    sort($tmpArr, SORT_STRING);
    $tmpStr = implode( $tmpArr );
    $tmpStr = sha1( $tmpStr );
    
    if( $tmpStr == $signature ){
      return true;
    }else{
      return false;
    }
  }
}

?>