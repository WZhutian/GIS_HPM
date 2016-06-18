<?php 
include("DBconn.php");
@$data=$_POST;
$F_ID=$data[0]["F_ID"];
#首先根据F_ID获取到R_ID
$result=mysql_query("SELECT * FROM facility WHERE F_ID=$F_ID");
$R_ID=0;
while ($row=mysql_fetch_array($result)) {
	$R_ID=$row["R_ID"];
}
#删除room里面所有的facility
$result1=mysql_query("DELETE FROM facility WHERE R_ID=$R_ID");
#将前台数据全部添加到数据库
foreach ($data as $key => $value) {
         
	$result2=mysql_query("INSERT INTO facility(F_ID,F_Name,F_Num,R_ID) VALUES($value[F_ID],'$value[F_Name]',$value[F_Num],$R_ID)");
}

//var_dump($data);
echo("更新成功");
mysql_close($conn);
 ?>}
