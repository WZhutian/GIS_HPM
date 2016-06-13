<?php 
date_default_timezone_set('prc');
include('DBconn.php');
@$PlaceInfo=$_POST['PlaceInfo'];
@$EventInfo=$_POST['EventInfo'];
$data=array();
$date=date('Y-m-d H:i:s');
$result = mysql_query("INSERT INTO workorder(PlaceInfo, EventInfo,upTime,Done) VALUES ('$PlaceInfo', '$EventInfo','$date',0)");

 $ID=array();
  $set=mysql_query("SELECT  * FROM workorder WHERE PlaceInfo='$PlaceInfo' AND EventInfo='$EventInfo'");
  while($row = mysql_fetch_array($set))
  {
      $ID["W_ID"]=$row["W_ID"];
}
echo $ID["W_ID"];
mysql_close($conn);
 ?>