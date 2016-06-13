<?php 
include("DBconn.php");
@$R_ID=$_POST["R_ID"];
$result=mysql_query("DELETE FROM room WHERE R_ID=$R_ID");
echo("成功删除记录！");
mysql_close($conn);
 ?>