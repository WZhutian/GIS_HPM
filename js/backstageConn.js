 /*
         用途：两种用户登录
         参数：JSON，包含用户名，密码
         {
     UserData:
     PassWord:
         }
         返回:
         0（未找到用户）
         1（管理员登录成功）
         2（管理员密码错误）
         3（修理工登录成功）
         4（修理工密码错误）
    */
 function login(data) {
     var url = './php/login.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    用途：获取工单信息
    无参数
    返回：
    {
        ID:{
            "PlaceInfo":
            "EventInfo":
            "Time":
            "Done":
        }       
    }
 */
 function getWorkOrder() {
     var url = './php/getWorkOrder.php';
     jQuery.ajax({
         url: url,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             var data1 = eval('data');
             console.log(data1);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }


 /*
    用途：添加工单信息
    参数：
    {
        "PlaceInfo":
        "EventInfo":
    }
    返回
    {
        "ID":
    }
 */
 function addWorkOrder(data) {
     var url = './php/addWorkOrder.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    用途：完成工单
    参数：
    {
        "ID":
    }
 */
 function finishWorkOrder(data) {
     var url = './php/finishWorkOrder.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }
 /*
    获取所有建筑的信息，在Page1中使用，在打开页面的时候就运行，
    返回json，二维结构
    {
        B_ID:{
            "B_Name":
            "Floors":
            "Attribute":
            "B_Type":
        }
    }
 */
 function getBuildingInfo_All(data) {
     var url = './php/getBuildingInfo_All.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             var data1 = eval('data');
             console.log(data1);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    获取单个建筑的所有相关信息，Page2中使用，打开页面时就运行
    参数要求：输入B_ID

    返回json，多维结构
    {
        "building":{
            "B_Name":
            "BaseMap":
            "Floor":
            "Attribute":{
                自定义数据
            }
            "B_Type":
        }
        "room":{
            R_ID:{
                "Floor":
                "L_Name":
                "Path":
                "X":
                "Y":
                "R_Name":
                "R_Area":
                "R_Type":
                Type:{
                    不同房间类型包含的内容见石墨文档    
                }
                 "facility"{
                    F_ID:{
                        "F_Num":
                        "F_Name":
                    }
                }
            }
        }
    }
 */
 function getBuildingInfo(data) {
     var url = './php/getBuildingInfo.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             var data1 = eval('data');
             console.log(data1);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    修改楼栋信息
    参数
    {
        "B_ID":
        "B_Name":
        "Attribute":{
            自定义数据
        }
        "B_Type":
    }
 */
 function modBuildingInfo(data) {
     var url = './php/modBuildingInfo.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }
 //
 /*
    添加房间信息
    参数
    {
        "B_ID":
        "Floor":
        "L_ID":
        "X":
        "Y":
        "R_Name":
        "R_Area":
        "R_Type":
        Type:{
            不同房间类型包含的内容见石墨文档    
        }
    }
    返回
    {
        "R_ID":
    }
 */
 function addRoom(data) {
     var url = './php/addRoom.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    修改房间信息
    参数
    {
        "B_ID":
        "Floor":
        "L_ID":
        "X":
        "Y":
        "R_Name":
        "R_Area":
        "R_Type":
        Type:{
            不同房间类型包含的内容见石墨文档    
        }
    }
 */
 function modRoom(data) {
     var url = './php/modRoom.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }
 /*
    删除房间信息
    参数
    {
        "R_ID":
    }
 */
 function deRoom(data) {
     var url = './php/deRoom.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }


 /*
    添加设备信息
    参数
    {
        "F_Name":
        "F_Num":
        "R_ID":
    }
    返回：
    {
        "F_ID":
    }
 */
 function addFacility(data) {
     var url = './php/addFacility.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    修改设备信息
    参数
    {
        "F_ID":
        "F_Name":
        "F_Num":
    }
 */
 function modFacility(data) {
     var url = './php/modFacility.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }

 /*
    删除设备信息
    参数
    {
        "F_ID":
    }
 */
 function deFacility(data) {
     var url = './php/deFacility.php';
     jQuery.ajax({
         url: url,
         data: data,
         type: 'POST',
         // dataType: 'json',
         complete: function(xhr, textStatus) {
             //called when complete
         },
         success: function(data, textStatus, xhr) {
             //called when successful
             console.log(data);
         },
         error: function(xhr, textStatus, errorThrown) {
             //called when there is an error
         }
     });
 }
