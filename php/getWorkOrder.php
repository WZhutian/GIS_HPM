<?php 
include('DBconn.php');
$data=array();
$result = mysql_query("SELECT * FROM workorder");
while($row = mysql_fetch_array($result))
  {
      $New_arr=array();
      $New_arr["PlaceInfo"]=$row["PlaceInfo"];
      $New_arr["EventInfo"]=$row["EventInfo"];
      $New_arr["upTime"]=$row["upTime"];
      $New_arr["Done"]=$row["Done"];
      $data[$row["W_ID"]]=$New_arr;
  }
  $json_data=json_encode($data);
  echo $json_data;
mysql_close($conn);
 ?>