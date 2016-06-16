<?php
@$data=$_POST;
$json_string=json_encode($data,JSON_UNESCAPED_UNICODE);
//写入文件
file_put_contents("text.json", $json_string);
echo("成功存入文件");
 ?>