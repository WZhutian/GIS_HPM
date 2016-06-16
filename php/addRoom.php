<?php 
include("DBconn.php");
@$B_ID=$_POST["B_ID"];
@$Floor=$_POST["Floor"];
@$L_ID=$_POST["L_ID"];
@$X=$_POST["X"];
@$Y=$_POST["Y"];
@$R_Name=$_POST["R_Name"];
@$R_Area=$_POST["R_Area"];
$result=mysql_query("INSERT INTO room(B_ID,Floor,L_ID,X,Y,R_Name,R_Area) VALUES($B_ID,$Floor,'$L_ID',$X,$Y,'$R_Name','$R_Area')");
$result1=mysql_query("SELECT * FROM room WHERE R_Name='$R_Name' AND X=$X AND Y=$Y AND Floor=$Floor");
$R_ID=0;
while ($row=mysql_fetch_array($result1) ){
	$R_ID=$row["R_ID"];
}
echo($R_ID);
mysql_close($conn);
 ?>
