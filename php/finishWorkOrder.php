<?php 
include('DBconn.php');
@$W_ID=$_POST['W_ID'];
$sql="UPDATE workorder SET Done=1 WHERE W_ID=$W_ID";
$result=mysql_query($sql);
$data="已完成'$W_ID'号任务";
echo($data);
mysql_close($conn);
 ?>