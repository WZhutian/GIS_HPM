<?php 
date_default_timezone_set('prc');
include('DBconn.php');
@$PlaceInfo=$_POST['PlaceInfo'];
@$EventInfo=$_POST['EventInfo'];

$data=array();
$date=date('Y-m-d H:i:s');
$result = mysql_query("INSERT INTO Building (PlaceInfo, EventInfo,upTime,Done) VALUES (".$PlaceInfo.", ".$EventInfo.",".$date.","0")");
// while($row = mysql_fetch_array($result))
//   {
//       $New_arr=array();

//       $data[$row["ID"]]=$New_arr;
//   }
echo $date;
mysql_close($conn);
 ?>