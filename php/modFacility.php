<?php 
include("DBconn.php");
@$F_ID=$_POST["F_ID"];
@$F_Name=$_POST["F_Name"];
@$F_Num=$_POST["F_Num"];
$result=mysql_query("UPDATE facility SET F_Name='$F_Name',F_Num=$F_Num WHERE F_ID=$F_ID");

         echo("成功修改信息！");



mysql_close($conn);
 ?>