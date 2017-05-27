<?php
  $s=new SaeStorage();
  ob_start();
  readfile($_FILES['fileup']['tmp_name']);
  $img=ob_get_contents();
  ob_end_clean();

  //$size=strlen($img);
  file_put_contents(SAE_TMP_PATH."/bg.png", $img);
  if($s->upload("test","test.png",SAE_TMP_PATH."/bg.png")){
   
    echo "上传成功";
  }else{
    echo "上传失败";
  }
?>