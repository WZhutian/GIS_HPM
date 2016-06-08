<?php   
$conn = mysql_connect('qdm132270520.my3w.com:3306','qdm132270520','22446688');
if(!$conn){echo "数据库连接失败！";}
mysql_select_db('qdm132270520_db',$conn);
mysql_query("set names utf8");  
 mysql_query("set character_set_client=utf8");  
   mysql_query("set character_set_results=utf8"); 
?>