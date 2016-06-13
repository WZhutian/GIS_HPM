<?php 
include("DBconn.php");
@$F_ID=$_POST["F_ID"];
$result=mysql_query("DELETE FROM facility WHERE F_ID=$F_ID");
echo("成功删除记录");
mysql_close($conn);
 ?>}
