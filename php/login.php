<?php 
include('DBconn.php');
@$UserName=$_POST['UserName'];
@$PassWord=$_POST['PassWord'];
$success=0;
$result = mysql_query("SELECT * FROM admin");
while($row = mysql_fetch_array($result))
  {
  	if($row['UserName']==$UserName){
  		if($row['PassWord']==$PassWord){
			$success=1;
  		}else{
			$success=2;
  		}
  	}
  	
  }
$result = mysql_query("SELECT * FROM repairman");
while($row = mysql_fetch_array($result))
  {
  	if($row['UserName']==$UserName){
  		if($row['PassWord']==$PassWord){
  			$success=3;
  		}else{
  			$success=4;
  		}
  	}
  }
echo $success;
mysql_close($conn);
 ?>