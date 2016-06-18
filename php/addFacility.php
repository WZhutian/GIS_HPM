<?php 
include("DBconn.php");
@$F_Name=$_POST["F_Name"];
@$F_Num=$_POST["F_Num"];
@$R_ID=$_POST["R_ID"];
//var_dump($_POST);
$result=mysql_query("INSERT INTO facility(F_Name,F_Num,R_ID) VALUES('$F_Name',$F_Num,$R_ID)");
$result1=mysql_query("SELECT * FROM facility WHERE F_Name='$F_Name' AND F_Num=$F_Num AND R_ID=$R_ID");
$F_ID=0;
while ($row=mysql_fetch_array($result1)) {
	$F_ID=$row["F_ID"];
}
echo($F_ID);
mysql_close($conn);
 ?>
