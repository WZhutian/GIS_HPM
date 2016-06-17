jQuery(document).ready(function($) {
    //初始化变量区域————————————————————————————————
    var WZT = {};
    //用户选择的部分
    WZT.edit_Floor = 0;
    WZT.edit_Room = 0;
    WZT.edit_Legend = 0;
    WZT.Data = {}; //用来保存后台回去的所有数据
    WZT.AllRecored = {}; //用来暂存临时变量
    WZT.Data.Floors = 0; //总楼层数
    WZT.Data.Facilitys = new Array(); //保存所有设备的数组
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
                $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': 50 * WZT.topChange + 'px', 'width': 50 * WZT.widthChange + 'px' });
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
        WZT.edit_Floor = parseInt(idName[idName.length - 1]);
        WZT.hideBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        //修改事件绑定
        $('.cd-start').unbind();
        // event.preventDefault();
        $('#stair-from').val(WZT.edit_Floor + 1)
        $("#stair-to").val(WZT.edit_Floor + 1)
            //
        var landuo = [151, 135, 124, 119, 120, 127, 140, 159, 184, 215];
        var domName = "#cd-floor-";
        WZT.AllRecored.BuildingSelectTop = parseInt($(this).parent().css('top'));
        var calculate = WZT.AllRecored.BuildingSelectTop - ((WZT.Data.Floors - 1) / 2 - WZT.edit_Floor) * (WZT.AllRecored.heightEvery - 800) - landuo[WZT.Data.Floors - 1];
        $(domName + WZT.edit_Floor).animate({ top: calculate + "px" }, 400, function() {
            //这段代码不要去动,转动
            var mq = window.getComputedStyle(document.querySelector('.cd-product-intro'), '::before').getPropertyValue('content');
            if (mq == 'mobile') {
                $('body,html').animate({ 'scrollTop': $($(this).attr('href')).offset().top }, 200);
            } else {
                $('.cd-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
                    if (WZT.Status == 0) {
                        $('.cd-close-product-tour').addClass('is-visible');
                        // $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                        //     $(this).addClass('points-pulsing');
                        // });
                        $('#legend-pannel').show(300);
                        $('#roomInfo-pannel').show(300);
                        $(domName + WZT.edit_Floor + ' div:first').animate({ 'width': '440px', 'height': WZT.heightNew })
                        $(".cd-product-mockup").css({
                            'overflow-y': 'scroll',
                            'overflow-x': 'hidden'
                        });
                        //点位置变化函数
                        $(".room-legend").each(function() {
                            $(this).animate({ 'top': parseFloat($(this).css('top')) / WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) / WZT.widthChange + 'px', 'height': '50px', 'width': '50px' })
                        });
                        $(".Floor_line").each(function() {
                            $(this).animate({ 'top': parseFloat($(this).css('top')) / WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) / WZT.widthChange + 'px', 'height': parseFloat($(this).css('height')) / WZT.topChange + 'px', 'width': parseFloat($(this).css('width')) / WZT.widthChange + 'px' });
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
            var data = { "B_ID": WZT.Data.B_ID };
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
                        WZT.Data.BaseMap = data1['building']['BaseMap'];
                        WZT.Data.B_Type = data1['building']["B_Type"];
                        //初始化
                        WZT.initBuilding();
                        initLoc();

                        $('.cd-start').on('click', WZT.buildingChooseAni); //绑定点击事件

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
        $('.cd-start').animate({ 'width': WZT.widthNew, 'height': '800px' }, 100)
        $('.cd-product').removeClass('is-product-tour');
        $('.cd-close-product-tour').removeClass('is-visible');
        // $('.cd-points-container').removeClass('points-enlarged points-pulsing');
        $('.cd-product-mockup').css('visibility', 'visible');
        WZT.showBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        $('#legend-pannel').hide(400);
        $('#roomInfo-pannel').hide(400);
        $(WZT.Area.lastDrag).css({ 'top': 0, "left": 0 });
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
            $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': 50 * WZT.topChange + 'px', 'width': 50 * WZT.widthChange + 'px' });
        });
        $(".Floor_line").each(function() {
            $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': parseFloat($(this).css('height')) * WZT.topChange + 'px', 'width': parseFloat($(this).css('width')) * WZT.widthChange + 'px' });
        });
    });
    //其他楼层动画
    WZT.showBuildingIcon = function(num, sum) {
        var domName = "#cd-floor-";
        for (var i = 0; i < sum; i++) {
            if (i == num) {
                setTimeout(function() {
                    $(domName + num).animate({ top: WZT.AllRecored.BuildingSelectTop }, 200);
                }, 600)
                continue;
            }
            $(domName + i).animate({ opacity: 1 }, 900, function() {});
        }
    }
    WZT.hideBuildingIcon = function(num, sum) {
        var domName = "#cd-floor-";
        for (var i = 0; i < sum; i++) {
            if (i == num) {
                continue;
            }
            $(domName + i).animate({ opacity: 0 }, 300, function() {
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
                $(WZT.Area.lastDrag).css({ 'top': 0, "left": 0 });
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
                $(WZT.Area.lastDrag).css({ 'top': 0, "left": 0 });
            } else if (WZT.Area.status == 2) {
                addNewLegend(this); //在楼层图片上添加新的图例
                $(this).css({ 'top': 0, "left": 0 });
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
        var style = $(dom).attr('data-id');

        //添加到json
        addPoint(x1 - X1, y1 - Y1, style, $(dom).html());
        console.log(JSON.stringify(WZT.Loc.Json));
    }

    WZT.Loc = {};
    WZT.Loc.countPoint = 0;
    WZT.Loc.countEdge = 0;
    WZT.Loc.Json = {
        "points": {},
        "edges": {},
        "floorPoints": {},
        "enter": []
    };
    WZT.Loc.LinePointLast = null; //保存上一个选择的点
    function initLoc() {
        $.getJSON("./loc/" + WZT.Data.B_ID + ".json", function(result) {
            console.log(result)
            result['']
            for (var i = 0; i < result['floorPoints'].length; i++) {
                for (var j = 0; j < result['floorPoints'][i].length; j++) {
                    var pointid = result['floorPoints'][i][j];
                    var domName = '<li class="room-legend location-legend" style="top:' + result['points'][pointid]['Y'] + 'px;left:' + result['points'][pointid]['X'] + 'px;"></li>';
                    $("#cd-floor-" + i + " ul").append(domName);
                    $("#cd-floor-" + i + " ul li:last-child")[0].setAttribute('data-id', pointid);
                }
            }
            for (var k = 0; k < result['edges'].length; k++) {
                var A = result['edges'][k]['A'];
                var B = result['edges'][k]['B'];
                var floor = result['edges'][k]['Floor'];
                console.log(A, B, floor)
                var domName = $('#loc-' + floor)
                drawLine(parseFloat(result['points'][A]['X']), parseFloat(result['points'][A]['Y']), parseFloat(result['points'][B]['X']), parseFloat(result['points'][B]['Y']), domName)
            }
            //
            $(".room-legend").each(function() {
                $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': 50 * WZT.topChange + 'px', 'width': 50 * WZT.widthChange + 'px' });
            });
            $(".Floor_line").each(function() {
                $(this).animate({ 'top': parseFloat($(this).css('top')) * WZT.topChange + 'px', 'left': parseFloat($(this).css('left')) * WZT.widthChange + 'px', 'height': parseFloat($(this).css('height')) * WZT.topChange + 'px', 'width': parseFloat($(this).css('width')) * WZT.widthChange + 'px' });
            });
        });

        for (var i = 0; i < WZT.Data.Floors; i++)
            WZT.Loc.Json['floorPoints'][i] = new Array()
    }

    function drawLine(A_X, A_Y, B_X, B_Y, dom) {
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
    /*
     添加点，添加到POINTS中
     */
    function addPoint(X, Y, Type, ht) {
        var From = parseInt($('#stair-from').val()) - 1;
        var To = parseInt($('#stair-to').val()) - 1;
        if (Type == 4) {
            From = To = 0;
        }
        console.log(X, Y, Type, From, To)
            //前台处理
        var x1 = parseFloat(X);
        var y1 = parseFloat(Y);
        for (var i = From; i <= To; i++) {
            var domName = '<li class="room-legend location-legend" style="top:' + y1 + 'px;left:' + x1 + 'px;">' + ht + '</li>';
            $("#cd-floor-" + i + " ul").append(domName);
            $("#cd-floor-" + i + " ul li:last-child")[0].setAttribute('data-id', WZT.Loc.countPoint);
            //后台添加
            if (Type == 4) {
                WZT.Loc.Json['enter'].push(WZT.Loc.countPoint);
            }
            WZT.Loc.Json['points'][WZT.Loc.countPoint] = { "X": x1, "Y": y1 };
            WZT.Loc.Json['floorPoints'][i].push(WZT.Loc.countPoint);

            if (Type == 2 && (i + 1) <= To) {
                WZT.Loc.Json['edges'][WZT.Loc.countEdge] = { "A": WZT.Loc.countPoint, "B": WZT.Loc.countPoint + 1, "Weight": 500, 'Floor': i };
                WZT.Loc.countEdge++;
            } else if (Type == 3 && (i + 1) <= To) {
                WZT.Loc.Json['edges'][WZT.Loc.countEdge] = { "A": WZT.Loc.countPoint, "B": WZT.Loc.countPoint + 1, "Weight": 400, 'Floor': i };
                WZT.Loc.countEdge++;
            }
            WZT.Loc.countPoint++;
        }
    }
    $('#createLine').click(function() {
        $('.location-legend').unbind();
        $('.location-legend').bind('click', clickPoint);
    })
    $('#stopCreate').click(function() {
        $('.location-legend').unbind();
    })
    $('#jsonSave').click(function() {
        var data = {
            'fName': WZT.Data.B_ID + '.json',
            'data': WZT.Loc.Json
        }
        console.log(JSON.stringify(data));
        Locfile(data);
    })

    function clickPoint() {
        if (WZT.Loc.LinePointLast == null) {
            WZT.Loc.LinePointLast = this;
            $(this).addClass('showInPoint');
        } else {
            var First = $(WZT.Loc.LinePointLast);
            var Second = $(this);
            var A = First.data('id');
            var B = Second.data('id');
            var AX = parseFloat(First.css('left'));
            var AY = parseFloat(First.css('top'));
            var BX = parseFloat(Second.css('left'));
            var BY = parseFloat(Second.css('top'));
            var Weight = Math.sqrt((AX - BX) * (AX - BX) + (AY - BY) * (AY - BY));
            addLine(A, B, Weight);
            drawLine(AX, AY, BX, BY, $('#loc-' + WZT.edit_Floor));
            $(WZT.Loc.LinePointLast).removeClass('showInPoint')
            WZT.Loc.LinePointLast = null;
        }
        console.log(JSON.stringify(WZT.Loc.Json))
    }
    /*

    */
    function addLine(A, B, Weight) {
        WZT.Loc.Json['edges'][WZT.Loc.countEdge] = { 'A': A, 'B': B, 'Weight': Weight, 'Floor': WZT.edit_Floor }
        WZT.Loc.countEdge++;
    }

    function Locfile(data) {
        var url = './php/Locfile.php';
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
});
