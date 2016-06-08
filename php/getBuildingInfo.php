<?php 
include('DBconn.php');
@$B_ID=$_POST["B_ID"];
$result1=mysql_query("SELECT * FROM building WHERE B_ID=$B_ID");
$building_data=array();
#获得某栋楼的基本信息
while ($row=mysql_fetch_array($result1)) {  
	$building_data["B_Name"]=$row["B_Name"];
	$building_data["Floors"]=$row["Floors"];
	$building_data["Attribute"]=$row["Attribute"];
	$building_data["B_Type"]=$row["B_Type"];
}
$result2=mysql_query("SELECT * FROM room WHERE B_ID=$B_ID");
$room_data=array();
$R_ID=array();
#获得该楼所有房间的信息
while ($row=mysql_fetch_array($result2)) {
	$New_arr=array();
	$New_arr["Floor"]=$row["Floor"];
	$New_arr["L_ID"]=$row["L_ID"];
	$New_arr["X"]=$row["X"];
	$New_arr["Y"]=$row["Y"];
	$New_arr["R_Name"]=$row["R_Name"];
	$New_arr["R_Area"]=$row["R_Area"];
	$room_data[$row["R_ID"]]=$New_arr;
           $i=0;
           $R_ID[$i]=$row["R_ID"];
           $i++;
}
#获得所有房间里的设施信息
$room_facility_data=array();
foreach ($R_ID as $value) {
	$result3=mysql_query("SELECT * FROM facility WHERE R_ID=$value");
	$facility_data=array();
	while ($row=mysql_fetch_array($result3)) {
		$New_arr=array();
		$New_arr["F_Name"]=$row["F_Name"];
		$New_arr["F_Num"]=$row["F_Num"];
		$facility_data[$row["F_ID"]]=$New_arr;                                                                   
	}
	$room_facility_data[$value]=$facility_data;

}
$data=array();
$data["building"]=$building_data;
$data["room"]=$room_data;
$data["facility"]=$room_facility_data;
#var_dump($data);
$json_data=json_encode($data);

echo( $json_data);
mysql_close($conn);
 ?>
