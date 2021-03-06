jQuery(document).ready(function($) {
    //初始化变量区域————————————————————————————————
    var WZT = {};
    WZT.edit_Floor = 0;
    WZT.Data = {}; //用来保存后台回去的所有数据
    WZT.AllRecored = {}; //用来暂存临时变量
    WZT.Data.Floors = 6; //总楼层数
    /*
    第一部分：后台数据获取
    1、获取图例，初始化图例板，
    2、获取楼层数据：
*/
    WZT.getData = function() {

    }
    WZT.initPannel = function() {
        //初始化图例板

        //初始化1号展示板

        //初始化楼层平台大小
        var img = $(".cd-start")[0]; // Get my img elem
        var pic_real_width, pic_real_height;
        var urlPath = $(img).css("background-image");
        $("<img/>").attr("src", urlPath.substring(13, urlPath.length - 2)).load(function() {
            pic_real_width = this.width; // Note: $(this).width() will not
            pic_real_height = this.height; // work for in memory images.

            console.log(pic_real_height, pic_real_width)
            var widthNew = pic_real_width / (750 / 1334 * pic_real_height) * 100 + "%";
            console.log(widthNew)
            $(".cd-start").css('width', widthNew);
            $(".cd-3d-bottom-side").css('width', widthNew);
        });
        //初始化每层楼的展示板
    }
    WZT.initPannel();


    //载入初始化函数——————————————————————————————
    WZT.initBuilding = function() {
        //调用ajax 获取关于该楼的所有数据，
        //根据楼层数量，动态添加三维显示的楼层
        WZT.AllRecored.zeroTop = 200 - WZT.Data.Floors * 8 + 50 * WZT.Data.Floors;
        WZT.AllRecored.heightEvery = 930 - WZT.Data.Floors * 6;
        $("#cd-floor-0").css("top", WZT.AllRecored.zeroTop);
        for (var i = 1; i < WZT.Data.Floors; i++) {
            var addFloorDom = "<div id='cd-floor-" + i + "' class='cd-product-mockup container' style=top:" + (WZT.AllRecored.zeroTop - i * WZT.AllRecored.heightEvery) + "px;><div class='cd-start'></div><ul></ul><div class='cd-3d-right-side'></div><div class='cd-3d-bottom-side'></div></div>";
            $('.cd-product').append(addFloorDom);
        }
    }
    WZT.initBuilding();
    //楼层选择动画————————————————————————————————————————————————————————————————————————————————————————————————————————
    WZT.buildingChooseAni = function(event) {
        //获取点击的楼层号
        var idName = $(this).parent().attr("id");
        WZT.edit_Floor = idName[idName.length - 1];
        WZT.hideBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        //修改事件绑定
        $('.cd-start').unbind('click', WZT.buildingChooseAni);
        event.preventDefault();
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
                    $('.cd-close-product-tour').addClass('is-visible');
                    // $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                    //     $(this).addClass('points-pulsing');
                    // });
                    $('#legend-pannel').show(300);
                    $('#roomInfo-pannel').show(300);
                });
            }
        });

    }
    $('.cd-start').on('click', WZT.buildingChooseAni); //绑定点击事件
    //返回楼层选择
    $('.cd-close-product-tour').on('click', function() {
        $('.cd-product').removeClass('is-product-tour');
        $('.cd-close-product-tour').removeClass('is-visible');
        // $('.cd-points-container').removeClass('points-enlarged points-pulsing');
        $('.cd-product-mockup').css('visibility', 'visible');
        WZT.showBuildingIcon(WZT.edit_Floor, WZT.Data.Floors);
        $('.cd-start').bind('click', WZT.buildingChooseAni);
        $('#legend-pannel').hide(400);
        $('#roomInfo-pannel').hide(400);
        $(WZT.Area.lastDrag).css({ 'top': 0, "left": 0 });
        $(".cd-start").removeClass("showInArea");
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
            // console.log(this)
            // console.log("dragStart")
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
                $(".cd-start").addClass("showInArea");
                WZT.Area.status = 2;
            } else {
                $(".cd-start").removeClass("showInArea");
                WZT.Area.status = 1;
            }
            // console.log(X, Y);
        })
        $(domName).on('dragEnd', function(event, pointer) {
            // console.log("dragEnd")
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
            $(".cd-start").removeClass("showInArea");
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
        var domName = '<li class="room-legend" style="top:' + (y1 - Y1) + 'px;left:' + (x1 - X1) + 'px;"></li>'
       
        $("#cd-floor-" + WZT.edit_Floor + " ul").append(domName);

        //后台添加，返回ID， TODO
        $("#cd-floor-" + WZT.edit_Floor + " ul li:last-child")[0].setAttribute('data-r_id', 1);
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
    //























































    //室内定位————————————————————————————————————————————————————————————
    // WZT.Location.addLine = function(top, left, length) {
    //         var domName = '<div class="Floor_line" style="top:' + top + 'px;left:' + left + 'px;height:' + length + 'px;"></div>'
    //         $('body').append(domName)
    //     }
    // WZT.Location.addLine(1, 15, 20);

































});
