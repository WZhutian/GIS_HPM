<?php 
include("DBconn.php");
@$B_ID=$_POST["B_ID"];
@$B_Name=$_POST["B_Name"];
@$Attribute=$_POST["Attribute"];
@$B_Type=$_POST["B_Type"];
$result=mysql_query("UPDATE building SET B_Name=$B_Name,Attribute=$Attribute,B_Type=$B_Type WHERE B_ID=$B_ID");
if ($result) {
         echo("成功修改信息！")
}else{
	echo("修改信息失败!");
}

mysql_close($conn);
 ?>