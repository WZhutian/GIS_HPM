<?php
include("DBconn.php");
@$R_ID=$_POST["R_ID"];
@$B_ID=$_POST["B_ID"];
@$Floor=$_POST["Floor"];
@$L_ID=$_POST["L_ID"];
@$X=$_POST["X"];
@$Y=$_POST["Y"];
@$R_Name=$_POST["R_Name"];
@$R_Area=$_POST["R_Area"]; 
$result=mysql_query("UPDATE room SET B_ID=$B_ID,Floor=$Floor,L_ID=$L_ID,X=$X,Y=$Y,R_Name='$R_Name',R_Area='$R_Area' WHERE R_ID=$R_ID");
if ($result) {
         echo("成功修改信息！")
}else{
	echo("修改信息失败!");
}
mysql_close($conn);
 ?>
