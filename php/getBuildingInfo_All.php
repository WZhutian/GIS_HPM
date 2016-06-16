<?php 
include('DBconn.php');
$sql="SELECT * FROM building";
$result=mysql_query($sql);
$date=array();
while ($row=mysql_fetch_array($result)) {
	$New_arr=array();
	 $New_arr["B_Name"]=$row["B_Name"];
	 $New_arr["Floors"]=$row["Floors"];
	 $New_arr["B_Type"]=$row["B_Type"];
	 $data[$row["B_ID"]]=$New_arr;
}
$json_data=json_encode($data,JSON_UNESCAPED_UNICODE);
echo($json_data);
mysql_close($conn);
 ?>