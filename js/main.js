jQuery(document).ready(function($) {
    //图标初始化
    $('.box-legend').each(function() {
            $(this).css('background-image', 'url(./legend/' + $(this).data('id') + '.png)')
            $(this).css('background-size', '100%')
        })
        //初始化变量区域————————————————————————————————
    var WZT = {};
    //用户选择的部分
    WZT.edit_Floor = 0;
    WZT.edit_Room = 0;
    WZT.Data = {}; //用来保存后台回去的所有数据
    WZT.AllRecored = {}; //用来暂存临时变量
    WZT.Data.Floors = 0; //总楼层数
    WZT.Data.Facilitys = new Array(); //保存所有设备的数组
    WZT.Data.AllFloors = new Array();
    WZT.Status = 0; //0为初始页面,1为进入界面
    /*
    第一部分：后台数据获取
    1、获取图例，初始化图例板，
    2、获取楼层数据：
*/
    //载入初始化函数——————————————————————————————
    WZT.initBuilding = function() {
        //调用ajax 获取关于该楼的所有数据，
        //根据楼层数量，动态添加三维显示的楼层
        WZT.AllRecored.zeroTop = 200 - WZT.Data.Floors * 8 + 50 * WZT.Data.Floors;
        WZT.AllRecored.heightEvery = 930 - WZT.Data.Floors * 6;
        $("#cd-floor-0").css("top", WZT.AllRecored.zeroTop);
        $("#cd-floor-0 div:first").css("background-image", 'url(./map/' + WZT.Data.B_ID + '_1.png)');


        for (var i = 1; i < WZT.Data.Floors; i++) {
            var addFloorDom = "<div id='cd-floor-" + i + "' class='cd-product-mockup' style='top:" + (WZT.AllRecored.zeroTop - i * WZT.AllRecored.heightEvery) + "px;'><div class='cd-start container' style='background-image:url(./map/" + WZT.Data.BaseMap[i + 1]['BaseMap'] + ".png)'></div><ul></ul><div id='loc-" + i + "'></div><div class='cd-3d-right-side'></div><div class='cd-3d-bottom-side'></div></div>";
            $('.cd-product').append(addFloorDom);
        }
        //初始化楼层平台大小
        var pic_real_width, pic_real_height;
        $("<img/>").attr("src", './map/' + WZT.Data.B_ID + '_1.png').load(function() {
            pic_real_width = this.width; // Note: $(this).width() will not
            pic_real_height = this.height; // work for in memory images.

            console.log(pic_real_height, pic_real_width)
            WZT.widthNew = pic_real_width / (750 / 1334 * pic_real_height) * 100 + "%";
            WZT.heightNew = pic_real_height / pic_real_width * 440 + "px";
            $(".cd-start").css('width', WZT.widthNew);
            $(".cd-3d-bottom-side").css('width', WZT.widthNew);
            WZT.topChange = 800 / parseFloat(WZT.heightNew);
            WZT.widthChange = parseFloat(WZT.widthNew) / (440 / 450) / 100;

            //
            $(".room-legend").each(function() {
                $(this).animate({
                    'top': parseFloat($(this).css('top')) * WZT.topChange + 'px',
                    'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px',
                    'height': 50 * WZT.topChange + 'px',
                    'width': 50 * WZT.widthChange + 'px'
                });
            });
        });



        // var image = new Image()
        // image.src = './map/' + WZT.Data.B_ID + '_1.png';
        // pic_real_width = image.naturalWidth; // Note: $(this).width() will not
        // pic_real_height = image.naturalHeight; // work for in memory images.
        // console.log(pic_real_height, pic_real_width)
        // WZT.widthNew = pic_real_width / (750 / 1334 * pic_real_height) * 100 + "%";
        // WZT.heightNew = pic_real_height / pic_real_width * 440 + "px";
        // $(".cd-start").css('width', WZT.widthNew);
        // $(".cd-3d-bottom-side").css('width', WZT.widthNew);
        // WZT.topChange = 800 / parseInt(WZT.heightNew);
        // WZT.widthChange = parseInt(WZT.widthNew) / (440 / 450) / 100;

    };

    //楼层选择动画————————————————————————————————————————————————
    WZT.buildingChooseAni = function(event) {

        //获取点击的楼层号
        var idName = $(this).parent().attr("id");
        WZT.edit_Floor = idName[idName.length - 1];
        WZT.hideBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        showEchart();
        //修改事件绑定
        $('.cd-start').unbind();
        // event.preventDefault();
        //
        var landuo = [151, 135, 124, 119, 120, 127, 140, 159, 184, 215];
        var domName = "#cd-floor-";
        WZT.AllRecored.BuildingSelectTop = parseInt($(this).parent().css('top'));
        var calculate = WZT.AllRecored.BuildingSelectTop - ((WZT.Data.Floors - 1) / 2 - WZT.edit_Floor) * (WZT.AllRecored.heightEvery - 800) - landuo[WZT.Data.Floors - 1];
        $(domName + WZT.edit_Floor).animate({
            top: calculate + "px"
        }, 400, function() {
            //这段代码不要去动,转动
            var mq = window.getComputedStyle(document.querySelector('.cd-product-intro'), '::before').getPropertyValue('content');
            if (mq == 'mobile') {
                $('body,html').animate({
                    'scrollTop': $($(this).attr('href')).offset().top
                }, 200);
            } else {
                $('.cd-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    if (WZT.Status == 0) {
                        $('.cd-close-product-tour').addClass('is-visible');
                        // $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                        //     $(this).addClass('points-pulsing');
                        // });
                        $('#legend-pannel').show(300);
                        $('#roomInfo-pannel').show(300);
                        $(domName + WZT.edit_Floor + ' div:first').animate({
                            'width': '440px',
                            'height': WZT.heightNew
                        })
                        $(".cd-product-mockup").css({
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });
                        //点位置变化函数
                        $(".room-legend").each(function() {
                            $(this).animate({
                                'top': parseFloat($(this).css('top')) / WZT.topChange + 'px',
                                'left': parseFloat($(this).css('left')) / WZT.widthChange + 'px',
                                'height': '50px',
                                'width': '50px'
                            })
                        });
                        $(".Floor_line").each(function() {
                            $(this).animate({
                                'top': parseFloat($(this).css('top')) / WZT.topChange + 'px',
                                'left': parseFloat($(this).css('left')) / WZT.widthChange + 'px',
                                'height': parseFloat($(this).css('height')) / WZT.topChange + 'px',
                                'width': parseFloat($(this).css('width')) / WZT.widthChange + 'px'
                            });
                        });
                    }
                });
            }
        });
    };
    //从后台获取数据
    WZT.getData = function() {
        //从url中获取楼ID
        (function() {
            var r = window.location.search.substr(1); //获取url中"?"符后的字符串
            var context = r.split('&');
            WZT.Data.B_ID = context[0].split('=')[1];
            WZT.Data.B_ID = 52;
            console.log("ULR中的楼ID:", WZT.Data.B_ID);
            //从后台获取数据，
            var data = {
                "B_ID": WZT.Data.B_ID
            };
            (function(data) {
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
                        var data1 = JSON.parse(data);
                        console.log("getbuildinginfo获取的json：", data);
                        //处理building信息
                        WZT.Data.B_Name = data1['building']['B_Name'];
                        WZT.Data.Floors = data1['building']['Floors'];
                        WZT.Data.Floors = 7;
                        WZT.Data.BaseMap = data1['building']['BaseMap'];
                        WZT.Data.B_Type = data1['building']["B_Type"];
                        for (var i = 0; i < WZT.Data.Floors; i++) {
                            WZT.Data.AllFloors[i] = new Array();
                        }
                        //初始化
                        WZT.initBuilding();
                        $('.cd-start').on('click', WZT.buildingChooseAni); //绑定点击事件
                        //处理room节点
                        $.each(data1['room'], function(name, value) {
                            addNewLegendFromDB(value['X'], value['Y'], value['Floor'], name, value['L_ID']);
                            WZT.Data.Facilitys[name] = value;
                            //TODO
                            WZT.Data.AllFloors[value['Floor']].push(value['facility'])
                        });
                        $('.mask').css('display', 'none')
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        //called when there is an error
                    }
                });
            })(data);
        })();
    }
    WZT.getData();

    //返回楼层选择
    $('.cd-close-product-tour').on('click', function() {
        $('.cd-start').animate({
            'width': WZT.widthNew,
            'height': '800px'
        }, 100)
        $('.cd-product').removeClass('is-product-tour');
        $('.cd-close-product-tour').removeClass('is-visible');
        // $('.cd-points-container').removeClass('points-enlarged points-pulsing');
        $('.cd-product-mockup').css('visibility', 'visible');
        WZT.showBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        $('#legend-pannel').hide(400);
        $('#roomInfo-pannel').hide(400);
        $(WZT.Area.lastDrag).css({
            'top': 0,
            "left": 0
        });
        $(".cd-start").parent().removeClass("showInArea");
        $(".cd-product-mockup").css({
            'overflow-y': '',
            'overflow-x': ''
        });
        //点位置变化函数
        WZT.Status = 0;
        setTimeout(function() {
            $('.cd-start').bind('click', WZT.buildingChooseAni);
        }, 800)
        $(".room-legend").each(function() {
            $(this).animate({
                'top': parseFloat($(this).css('top')) * WZT.topChange + 'px',
                'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px',
                'height': 50 * WZT.topChange + 'px',
                'width': 50 * WZT.widthChange + 'px'
            });
        });
        $(".Floor_line").each(function() {
            $(this).animate({
                'top': parseFloat($(this).css('top')) * WZT.topChange + 'px',
                'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px',
                'height': parseFloat($(this).css('height')) * WZT.topChange + 'px',
                'width': parseFloat($(this).css('width')) * WZT.widthChange + 'px'
            });
        });
    });
    //其他楼层动画
    WZT.showBuildingIcon = function(num, sum) {
        var domName = "#cd-floor-";
        for (var i = 0; i < sum; i++) {
            if (i == num) {
                setTimeout(function() {
                    $(domName + num).animate({
                        top: WZT.AllRecored.BuildingSelectTop
                    }, 200);
                }, 600)
                continue;
            }
            $(domName + i).animate({
                opacity: 1
            }, 900, function() {});
        }
    }
    WZT.hideBuildingIcon = function(num, sum) {
        var domName = "#cd-floor-";
        for (var i = 0; i < sum; i++) {
            if (i == num) {
                continue;
            }
            $(domName + i).animate({
                opacity: 0
            }, 300, function() {
                $(this).css('visibility', 'hidden');
            });
        }
    }

    //——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
    /*第二部分

    数据分为
     展示区域：跳转到页面后就进行后台获取，

    图例区域：从后台获取

    图例添加的逻辑关系：
        
     */
    //拖拽————————————————————————————————————————————————————————————————————————————————————————————
    //变量初始化——————————————————————————————
    WZT.Area = {};
    WZT.Area.top = 0;
    WZT.Area.right = 0;
    WZT.Area.bottom = 0;
    WZT.Area.left = 0;
    WZT.Area.status = 0; //拖拽状态，
    WZT.Area.lastDrag = null; //保存最后被拖拽的图例
    /*0：初始状态
    1：开始拖拽，若没有找到归宿则弹回
    2：被拖拽到了地图区域中
    3：图例安置完成
    */
    //拖拽绑定————————————
    WZT.Area.bindInit = function() {
        $('.box-legend').draggabilly();
        WZT.Area.bindMethod('.box-legend')
    }

    //获取
    WZT.Area.getArea = function() {
        var domName = "#cd-floor-" + WZT.edit_Floor + " .cd-start";
        var dom = $(domName);
        var X = dom.offset().left + parseInt(dom.css("border-width"));
        var Y = dom.offset().top + parseInt(dom.css("border-width"));
        WZT.Area.X1 = X;
        WZT.Area.Y1 = Y;
        WZT.Area.Y2 = Y + dom[0].clientHeight;
        WZT.Area.X2 = X + dom[0].clientWidth;
    }

    //四大操作，开始拖拽，移动监听，结束汇报，原地单击
    WZT.Area.bindMethod = function(domName) {
        $(domName).on('dragStart', function(event, pointer) {
            if (WZT.Area.status == 2 && WZT.Area.lastDrag != this) {
                $(WZT.Area.lastDrag).css({
                    'top': 0,
                    "left": 0
                });
            }
            WZT.Area.lastDrag = this;
            WZT.Area.status = 1;
            WZT.Area.getArea();
        })
        $(domName).on('dragMove', function(event, pointer, moveVector) {
            // console.log("dragMove")
            // var draggie = $(this).data('draggabilly');
            // console.log('eventName happened', draggie.position.x, draggie.position.y);
            var X1 = $(this).offset().left;
            var Y1 = $(this).offset().top;
            var Y2 = Y1 + $(this)[0].clientHeight;
            var X2 = X1 + $(this)[0].clientWidth;
            if (X1 > WZT.Area.X1 && X2 < WZT.Area.X2 && Y1 > WZT.Area.Y1 && Y2 < WZT.Area.Y2) {
                $(".cd-start").parent().addClass("showInArea");
                WZT.Area.status = 2;
            } else {
                $(".cd-start").parent().removeClass("showInArea");
                WZT.Area.status = 1;
            }
            // console.log(X, Y);
        })
        $(domName).on('dragEnd', function(event, pointer) {
            // var draggie = $(this).data('draggabilly');
            // console.log('eventName happened', draggie.position.x, draggie.position.y);
            if (WZT.Area.status == 1) {
                $(this).animate({
                    top: 0,
                    left: 0
                }, 300);
            }
        })
        $(domName).on('staticClick', function(event, pointer) {
            var dom = this;
            $(".cd-start").parent().removeClass("showInArea");
            if (WZT.Area.lastDrag != this) {
                $(WZT.Area.lastDrag).css({
                    'top': 0,
                    "left": 0
                });
            } else if (WZT.Area.status == 2) {
                addNewLegend(this); //在楼层图片上添加新的图例
                $(this).css({
                    'top': 0,
                    "left": 0
                });
                WZT.Area.status = 3;
            }
        })
    }

    WZT.Area.bindInit();

    function addNewLegend(dom) {
        //前台处理
        var container = $("#cd-floor-" + WZT.edit_Floor + " .cd-start");
        var X1 = container.offset().left;
        var Y1 = container.offset().top;
        var x1 = $(dom).offset().left;
        var y1 = $(dom).offset().top;
        var id = $(dom).data('id');
        var domName = '<li class="room-legend" style="top:' + (y1 - Y1) + 'px;left:' + (x1 - X1) + 'px;background-image:url(./legend/' + id + '.png);background-size:100%;"></li>'
        $("#cd-floor-" + WZT.edit_Floor + " ul").append(domName);

        //后台添加，返回ID， TODO
        var data = {
            "B_ID": WZT.Data.B_ID,
            "Floor": WZT.edit_Floor,
            "L_ID": id,
            "X": (x1 - X1),
            "Y": (y1 - Y1),
            "R_Name": '',
            "R_Area": ''
        }
        console.log(data)

        function addRoom(data, edit_Floor, dom) {
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
                    console.log(data)
                    $('.room-legend').unbind();
                    $('.room-legend').bind('click', legendClick)
                    if (data == 0)
                        alert('添加失败，网络问题')
                    dom[0].setAttribute('data-r_id', data);
                    WZT.Data.Facilitys[data]['facility'] = new Array();
                },
                error: function(xhr, textStatus, errorThrown) {
                    //called when there is an error
                }
            });
        }
        var dom = $("#cd-floor-" + WZT.edit_Floor + " ul li:last-child");
        dom[0].setAttribute('data-r_id', 0);
        addRoom(data, WZT.edit_Floor, dom);
    }

    function addNewLegendFromDB(X, Y, Floor, B_ID, id) {
        //前台处理
        var container = $("#cd-floor-" + Floor + " .cd-start");
        var x1 = parseFloat(X);
        var y1 = parseFloat(Y);
        var domName = '<li class="room-legend" style="top:' + y1 + 'px;left:' + x1 + 'px;background-image:url(./legend/' + id + '.png);background-size:100%;"></li>';
        $("#cd-floor-" + Floor + " ul").append(domName);
        $("#cd-floor-" + Floor + " ul li:last-child")[0].setAttribute('data-r_id', B_ID);
        $('.room-legend').unbind();
        $('.room-legend').bind('click', legendClick)
    }



    //房间点选择，弹框
    $('.cd-single-point').children('a').on('click', function() {
        var selectedPoint = $(this).parent('li');
        if (selectedPoint.hasClass('is-open')) {
            selectedPoint.removeClass('is-open').addClass('visited');
        } else {
            selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
        }
    });
    //定位——————————————————————————————————————————————

    function drawLine(A_X, A_Y, B_X, B_Y, dom, d3) {
        if (d3) {
            var height = 250
            var domName = '<div class="Floor_line" style="top:' + (A_Y + 25 - height) + 'px;left:' + (A_X + 25) + 'px;height:' + height + 'px;transform:rotateX(90deg);transform-origin:bottom"></div>'
            $(dom).append(domName);
            return;
        }
        var add = 0;
        var sub = 1;
        if (A_Y > B_Y) {
            [A_X, B_X] = [B_X, A_X];
            [A_Y, B_Y] = [B_Y, A_Y];
        }
        if (A_X > B_X) {
            sub = -1;
        }
        var D_X = Math.abs(A_X - B_X);
        var D_Y = Math.abs(A_Y - B_Y);
        var midpoint = {}
        midpoint.left = (B_X + A_X) / 2;
        var rotate = -1 * sub * Math.atan(D_X / D_Y) * 180 / Math.PI;
        var length = Math.sqrt(D_X * D_X + D_Y * D_Y);
        midpoint.top = (A_Y + B_Y) / 2 - length / 2;
        var domName = '<div class="Floor_line" style="top:' + (midpoint.top + 25) + 'px;left:' + (midpoint.left + 25) + 'px;height:' + length + 'px;transform:rotate(' + rotate + 'deg);"></div>'
        $(dom).append(domName);
    }


    function drawLoc(array) {
        $.each(array, function(name, value) {
            console.log(value)
        });
        for (var i = 0; i < array.length - 1; i++) {
            //楼梯情况
            var domName = $('#loc-' + array[i]['floor'])
            console.log(domName)
            if (array[i]['floor'] != array[i + 1]['floor']) {
                if (array[i]['floor'] > array[i + 1]['floor']) {
                    domName = $('#loc-' + array[i + 1]['floor'])
                    drawLine(parseFloat(array[i]['X']), parseFloat(array[i]['Y']), 0, 0, domName, 1);
                } else if (array[i]['floor'] < array[i + 1]['floor']) {
                    drawLine(parseFloat(array[i]['X']), parseFloat(array[i]['Y']), 0, 0, domName, 1);
                }
            } else {
                var domName = $('#loc-' + array[i]['floor'])
                drawLine(parseFloat(array[i]['X']), parseFloat(array[i]['Y']), parseFloat(array[i + 1]['X']), parseFloat(array[i + 1]['Y']), domName);
            }
            // $(".Floor_line").each(function() {
            //     $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': parseFloat($(this).css('height')) * WZT.topChange + 'px', 'width': parseFloat($(this).css('width')) * WZT.widthChange + 'px' });
            // });
            //普通情况
        }


        $('.cd-start').animate({ 'opacity': '0.6' })
    }


    function locFun(x, y, f) {
        x=parseFloat(x)
        y=parseFloat(y)
        console.log(x,y)
        var FilePath = './loc/' + WZT.Data.B_ID + '.json';
        // var FilePath = '52.json'
        //初始化部分----------------------
        var all = new Array();
        var arc_lines = new Array(); //保存弧段 from,to,Weight
        var arc_nodes = new Array(); //保存节点 X,Y,f值,父节点
        var node_arcs = new Array(); //每个节点对应的弧段编号 
        var dist = new Array(); //最短距离以及初始化
        var openList = new Array(); //打开列表
        var closeList = new Array(); //关闭列表

        $.getJSON(FilePath, function(result) {
            //数据读取与储存部分-------------------------------------------------------节点
            for (var i = 0; i < result['points'].length; i++) {
                node_arcs[i] = new Array(); //预先创建节点对应弧段列表的第二维
                var tempArray = new Array();
                tempArray.push(parseFloat(result['points'][i]['X'], 10)); //X
                tempArray.push(parseFloat(result['points'][i]['Y'], 10)); //Y
                tempArray.push(0); //保存每个点的g值
                tempArray.push(-1); //保存父节点
                tempArray.push(0); //暂存每个节点的f值
                arc_nodes.push(tempArray);
            }
            //边数据读取
            for (var i = 0; i < result['edges'].length; i++) {
                var tempArray = new Array();
                tempArray.push(parseInt(result['edges'][i]["A"], 10));
                tempArray.push(parseInt(result['edges'][i]["B"], 10));
                tempArray.push(parseFloat(result['edges'][i]["Weight"], 10));
                arc_lines.push(tempArray);
                node_arcs[tempArray[0]].push(i);
                node_arcs[tempArray[1]].push(i);
            }
            console.log(result)
                //获取最近的一个点
            var judge = 99999999;
            var pt;
            for (var i = 0; i < result['floorPoints'][f].length; i++) {
                var number = result['floorPoints'][f][i];
                var point = result['points'][number];
                var length = Math.sqrt((point['X'] - x) * (point['X'] - x) + (point['Y'] - y) * (point['Y'] - y));
                console.log(number,point,length)
                if (length < judge) {
                    judge = length;
                    pt = number;
                }
            }
            b = parseInt(pt);
            //---------------
            var a = parseInt(result['enter'][0])
            console.log(a,b)
            Astar(a, b);
            var array = new Array();
            var path = b;
            for (var i = 0; i < arc_nodes.length; i++) {
                console.log(path)
                var floor;
                $.each(result['floorPoints'], function(name, value) {
                    $.each(value, function(name2, value) {
                        if (value == path) {
                            floor = name;
                        }
                    })
                })
                var newp = {
                    'X': result['points'][path]['X'],
                    'Y': result['points'][path]['Y'],
                    'path': path,
                    'floor': floor
                }
                array.push(newp)
                path = arc_nodes[path][3]
                if (path == a) {
                    var newp = {
                        'X': result['points'][path]['X'],
                        'Y': result['points'][path]['Y'],
                        'path': path,
                        'floor': floor
                    }
                    console.log(path)
                    array.push(newp)
                    break;
                }
            }
            drawLoc(array);
        });

        //算法部分---------------------------------------------------------
        // var f = new Array; //f=g+h
        function Astar(start, end) {
            //计算起始点和终止点的位置
            // var startPoint = {
            //     x: arc_nodes[start][0],
            //     y: arc_nodes[start][1]
            // }
            // var endPoint = {
            //     x: arc_nodes[end][0],
            //     y: arc_nodes[end][1]
            // }
            openList.push(start); //第一步先将起始点加入open表中
            while (openList.length > 0) {
                //取出与该点连接的所有线
                var father = openList.shift(); //取出OPEN列表中的第一个，open列表一直保持有序
                closeList.push(father); //添加到关闭列表中
                outerloop:
                    for (var i = 0; i < node_arcs[father].length; i++) {
                        var toNode = 0;
                        //找到相邻的对面的点id
                        if (father == arc_lines[node_arcs[father][i]][0]) {
                            toNode = arc_lines[node_arcs[father][i]][1];
                        } else {
                            toNode = arc_lines[node_arcs[father][i]][0];
                        }
                        //判断相邻的点不是在close列表中，若是则略过
                        for (var j = 0; j < closeList.length; j++) {
                            if (closeList[j] == toNode) continue outerloop; //跳出 TODO
                        }
                        //计算估计函数部分
                        // var h = Math.abs(parseFloat(endPoint.x) - parseFloat(arc_nodes[toNode][0])) + Math.abs(parseFloat(endPoint.y) - parseFloat(arc_nodes[toNode][1]));
                        var g = parseFloat(arc_nodes[father][2]) + parseFloat(arc_lines[node_arcs[father][i]][2]); //求出从起始点到该点的g值
                        var f = g;
                        //替换与更新
                        if (arc_nodes[toNode][4] > f) { //已经被访问过，且新的路线比原来更短
                            arc_nodes[toNode][2] = g; //更新g值
                            arc_nodes[toNode][4] = f;
                            arc_nodes[toNode][3] = father; //更新父节点
                        } else if (arc_nodes[toNode][2] == 0) { //没有被访问过，则添加到open列表中
                            arc_nodes[toNode][2] = g; //更新g值
                            arc_nodes[toNode][4] = f;
                            arc_nodes[toNode][3] = father; //更新父节点
                            openList.push(toNode);
                        }
                    }
                openList.sort(function(a, b) {
                    return arc_nodes[a][4] - arc_nodes[b][4];
                }); //排序

                if (father == end) break;
            }
        }
    }










    $("#wm_close").click(function() {
        $("#floorInfo-pannel").hide();
    });



    //室内定位————————————————————————————————————————————————————————————
    // WZT.Location.addLine = function(top, left, length) {
    //         var domName = '<div class="Floor_line" style="top:' + top + 'px;left:' + left + 'px;height:' + length + 'px;"></div>'
    //         $('body').append(domName)
    //     }
    // WZT.Location.addLine(1, 15, 20);
    // WZT.edit_Floor = 0;
    function legendClick() {
        $('#content').html('')

        var R_ID = $(this).data('r_id');
        console.log(R_ID)
        console.log(WZT.Data.Facilitys)
        var data = {
            "Facility": []
        }
        $.each(WZT.Data.Facilitys[R_ID]['facility'], function(name, value) {
            var jsonData = { "F_ID": name, "F_Name": value['F_Name'], "F_Num": value['F_Num'] };
            data['Facility'].push(jsonData);
            // console.log(value['F_Name'])
            // console.log(name)
        })
        // console.log(data)
        $("#floorInfo-pannel").show();
        // console.log(WZT.Data.Facilitys[R_ID]['X'], WZT.Data.Facilitys[R_ID]['Y'], WZT.edit_Floor)
        locFun(WZT.Data.Facilitys[R_ID]['X'], WZT.Data.Facilitys[R_ID]['Y'], WZT.edit_Floor)
        wm_json(data, '123123')
            // wm_json()
    }
    // Data.Facilitys 
    // WZT.Data.Facilitys

    //   $( WZT.Data.Facilitys).each(function(){
    // if(WZT.Data.Facilitys==WZT.edit_Floor){
    // console.log(WZT.Data.Facilitys)
    // }
    //   });


    function showEchart() {
        var data = {
            'categories': [],
            'data': []
        };
        $.each(WZT.Data.AllFloors[WZT.edit_Floor], function(name, value) {
            var F_ID = name;
            for (var k in value) {
                data['categories'].push(value[k]['F_Name'])
                data['data'].push(value[k]['F_Num'])
            }
        })
        wm_change(data, 'aa');
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#roomInfo-pannel').css('display', '')


var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
var data = {
    categories: ["投影仪", "电脑", "办公桌", "消防栓", "空调", "风扇"],
    data: [5, 20, 36, 10, 10, 20]
}



// 初始 option
option = {
    title: {
        text: '设施数量直方图'
    },
    tooltip: {},
    legend: {
        data: ['设施数量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '设施数量',
        type: 'bar',
        data: []
    }]
};
//json数据格式如下  上下呈一一对应关系 上面表示设施名字下面是数量
// var data ={
//     categories: ["投影仪","电脑","办公桌","消防栓","空调","风扇"],
//     data: [5, 20, 36, 10, 10, 20]
// }
//使用wm_change()函数来动态修改图标的值 只需将以上格式的json数据带入即可
// info是显示楼层信息是个字符串
myChart.setOption(option, true);
var aa = "haha";
wm_change(data, aa);

function wm_change(data, info) {
    document.getElementById("wm_inp").value = info;
    console.log(data)
    myChart.setOption({
        xAxis: {
            data: data.categories
        },
        series: [{
            // 根据名字对应到相应的系列
            name: '设施数量',
            data: data.data
        }]
    });
};
$('#roomInfo-pannel').css('display', 'none')


var currentStep = 0;
var max_line_num = 0;
//添加新记录
function add_line() {
    max_line_num = $("#content tr:last-child").children("td").html();
    if (max_line_num == null) {
        max_line_num = 1;
    } else {
        max_line_num = parseInt(max_line_num);
        max_line_num += 1;
    }
    $('#content').append(
        "<tr id='line" + max_line_num + "'>" +
        "<td class='td_Num'>" + max_line_num + "</td>" +
        "<td class='td_Item'><input type='text'  style='width:70px' class='stepName' value='设备名称 " + max_line_num + "'></input></td>" +
        "<td class='td_Item'><input type='text' style='width:70px'  class='stepDescription' value='设备数量" + max_line_num + "'></td>" +
        "<td class='td_Oper'>" +
        "<span onclick='remove_line(this);'>删除</span> " +
        "</td>" +
        "</tr>");
}
//删除选择记录


// 使用 wm_json()函数来动能动态修改表格内容 
// wm_test是JSON格式数据 格式如下 inf是用来显示房间名信息是个字符串

//  var wm_test= { "Facility": [

// { "F_Name": "电脑", "F_Num":"20"},

// { "F_Name": "投影仪", "F_Num":"10"},

// { "F_Name": "桌子", "F_Num":"50"}

// ]}

function wm_json(wm_test, inf) {

    for (var i = 0; i < wm_test['Facility'].length; i++) {
        max_line_num = $("#content tr:last-child").children("td").html();
        if (max_line_num == null) {
            max_line_num = 1;
        } else {
            max_line_num = parseInt(max_line_num);
            max_line_num += 1;
        }
        $('#content').append(
            "<tr id='line" + max_line_num + "'>" +
            "<td class='td_Num'>" + wm_test['Facility'][i]['F_ID'] + "</td>" +
            "<td class='td_Item'><input type='text'  style='width:70px' class='stepName' value=" + wm_test['Facility'][i]['F_Name'] + "></input></td>" +
            "<td class='td_Item'><input type='text' style='width:70px'  class='stepDescription' value=" + wm_test['Facility'][i]['F_Num'] + "></td>" +
            "<td class='td_Oper'>" +
            "<span onclick='remove_line(this);'>删除</span> " +
            "</td>" +
            "</tr>");
    }

    document.getElementById("wm_inp2").value = inf;


}

function remove_line(index) {
    if (index != null) {
        currentStep = $(index).parent().parent().find("td:first-child").html();
    }
    if (currentStep == 0) {
        alert('请选择一项!');
        return false;
    }
    if (confirm("确定要删除改记录吗？")) {
        $("#content tr").each(function() {
            var seq = parseInt($(this).children("td").html());
            if (seq == currentStep) {
                $(this).remove();
            }
            if (seq > currentStep) {
                $(this).children("td").each(function(i) {
                    if (i == 0) $(this).html(seq - 1);
                });
            }
        });
    }
}
//上移
function up_exchange_line(index) {
    if (index != null) {
        currentStep = $(index).parent().parent().find("td:first-child").html();
    }
    if (currentStep == 0) {
        alert('请选择一项!');
        return false;
    }
    if (currentStep <= 1) {
        alert('已经是最顶项了!');
        return false;
    }
    var upStep = currentStep - 1;
    //修改序号
    $('#line' + upStep + " td:first-child").html(currentStep);
    $('#line' + currentStep + " td:first-child").html(upStep);
    //取得两行的内容
    var upContent = $('#line' + upStep).html();
    var currentContent = $('#line' + currentStep).html();
    $('#line' + upStep).html(currentContent);
    //交换当前行与上一行内容
    $('#line' + currentStep).html(upContent);
    $('#content tr').each(function() {
        $(this).css("background-color", "#ffffff");
    });
    $('#line' + upStep).css("background-color", "yellow");
    event.stopPropagation(); //阻止事件冒泡
}
//下移
function down_exchange_line(index) {
    if (index != null) {
        currentStep = $(index).parent().parent().find("td:first-child").html();
    }
    if (currentStep == 0) {
        alert('请选择一项!');
        return false;
    }
    if (currentStep >= max_line_num) {
        alert('已经是最后一项了!');
        return false;
    }
    var nextStep = parseInt(currentStep) + 1;
    //修改序号
    $('#line' + nextStep + " td:first-child").html(currentStep);
    $('#line' + currentStep + " td:first-child").html(nextStep);
    //取得两行的内容
    var nextContent = $('#line' + nextStep).html();
    var currentContent = $('#line' + currentStep).html();
    //交换当前行与上一行内容
    $('#line' + nextStep).html(currentContent);
    $('#line' + currentStep).html(nextContent);
    $('#content tr').each(function() {
        $(this).css("background-color", "#ffffff");
    });
    $('#line' + nextStep).css("background-color", "yellow");
    event.stopPropagation(); //阻止事件冒泡
}
//保存数据
// 这里会以一下格式发送到后台
//  var wm_test= { "Facility": [

// { "F_Name": "电脑", "F_Num":"20"},

// { "F_Name": "投影仪", "F_Num":"10"},

// { "F_Name": "桌子", "F_Num":"50"}

// ]}
function SaveData() {
    var data = {}
    data['Facility'] = new Array()
    $('#content tr').each(function() {
        var F_ID = $(this).find("td:eq(0)").html();
        var stepName = $(this).find("td:eq(1)").find("input").val();
        var stepDescription = $(this).find("td:eq(2)").find("input").val();
        data['Facility'].push({
                'F_ID': F_ID,
                'F_Name': stepName,
                'F_Num': stepDescription
            })
            // data += stepDescription;
    });
    console.log(data)
        // addFacility(data);
        // console.log(data);
}
