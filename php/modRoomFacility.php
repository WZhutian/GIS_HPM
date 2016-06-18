<?php 
include("DBconn.php");
@$data=$_POST;
//var_dump($data);
$F_ID=$data["Facility"][0]["F_ID"];
#首先根据F_ID获取到R_ID
$R_ID=$data["R_ID"];
echo($R_ID);
#删除room里面所有的facility
$result1=mysql_query("DELETE FROM facility WHERE R_ID=$R_ID");
#将前台数据全部添加到数据库
foreach ($data as $key => $value) {
         foreach ($value as $key => $value1) {
         	$result2=mysql_query("INSERT INTO facility(F_ID,F_Name,F_Num,R_ID) VALUES($value1[F_ID],'$value1[F_Name]',$value1[F_Num],$R_ID)");
}
         }
	

//var_dump($data);
echo("更新成功");
mysql_close($conn);
 ?>}
