<?php 
include('DBconn.php');
@$B_ID=$_POST["B_ID"];
$result1=mysql_query("SELECT * FROM building WHERE B_ID=$B_ID");
$building_data=array();
#获得某栋楼的基本信息
while ($row=mysql_fetch_array($result1)) {  
	$building_data["B_Name"]=$row["B_Name"];
	$building_data["Floors"]=$row["Floors"];
	//$building_data["Attribute"]=$row["Attribute"];
	$building_data["B_Type"]=$row["B_Type"];
}
#从Floor中获取BaseMap信息
$basemap=array();
$result4=mysql_query("SELECT * FROM Floor WHERE B_ID=$B_ID");
while ($row=mysql_fetch_array($result4)) {
	$New_arr=array();
	$New_arr["BaseMap"]=$row["BaseMap"];
	$basemap[$row['Floor']]=$New_arr;
}
$building_data["BaseMap"]=$basemap;
$result2=mysql_query("SELECT * FROM room WHERE B_ID=$B_ID");
$room_data=array();
$facility_data=array();
#获得该楼所有房间的信息
while ($row=mysql_fetch_array($result2)) {
	$New_arr=array();
	$New_arr["Floor"]=$row["Floor"];
	$New_arr["L_ID"]=$row["L_ID"];
	$New_arr["X"]=$row["X"];
	$New_arr["Y"]=$row["Y"];
	$New_arr["R_Name"]=$row["R_Name"];
	$New_arr["R_Area"]=$row["R_Area"];
	$R_ID=$row["R_ID"];
	$result5=mysql_query("SELECT * FROM facility WHERE R_ID=$R_ID");
          while ($row1=mysql_fetch_array($result5)) {
          	         $New_arr1=array();
          	         $New_arr1["F_Name"]=$row1["F_Name"];
          	         $New_arr1["F_Num"]=$row1["F_Num"];
                   $facility_data[$row1['F_ID']]=$New_arr1;
          }
          $New_arr["facility"]=$facility_data;
	$room_data[$row["R_ID"]]=$New_arr;
}

$data=array();
$data["building"]=$building_data;
$data["room"]=$room_data;
$json_data=json_encode($data);

echo( $json_data);
mysql_close($conn);
 ?>
