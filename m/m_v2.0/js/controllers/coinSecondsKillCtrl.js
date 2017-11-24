/*高价值列表页*/
'use strict';

app.controller('coinSecondsKillCtrl', function ($scope, $http, $ionicScrollDelegate, Signature,$rootScope,$ionicModal,$filter) {
   document.title="货蛮好网-金币秒杀";
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }

  $scope.isSort=1;
  $scope.item_category_id="";
  $scope.sort_type = 4;      //排序方式
  $scope.sort_enum = "DESC";    //升序
  $scope.top = function () {
    $ionicScrollDelegate.scrollTop()
  };
  //ionicModal弹窗，由下往上;
    $ionicModal.fromTemplateUrl('templates/coinSecondsKillRules.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
  $scope.createContact = function(u) {
     $scope.modal.hide();
   };
  $scope.numberDirection=0;
  $scope.sort=function(){
    $scope.numberDirection++;
    if($scope.numberDirection % 2){
      $scope.isSort=2;  //升序
      $(".sort").eq(1).addClass("sortActive");
      $(".sort").eq(0).removeClass("sortActive");
      $(".down").css("color", "");
      $(".up").css("color", "#ff6893");
      $scope.sort_type = 1;      //排序方式升序
      $scope.sort_enum = "ASC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants();
    }else{
      $(".sort").eq(1).addClass("sortActive");
      $(".sort").eq(0).removeClass("sortActive");
      $(".up").css("color", "");
      $(".down").css("color", "#ff6893");
      $scope.sort_type = 2;      //排序方式降序  j
      $scope.sort_enum = "DESC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants();
    }

  };
  /*类目筛选*/
  $(".classifyul1 li").click(function() {
      $(".classifyul1 li").eq($(this).index()).addClass("current1").siblings().removeClass('current1');
      $scope.item_category_id=$(this).index();
      if($(this).index()==0){
        $scope.item_category_id='';
      }
      $scope.page=0;
      $scope.goodList=[];
      $scope.getRestaurants();
    });
  $scope.sortALL = function () {                //默认排序
     $(".sort").eq(0).addClass("sortActive");
    $(".sort").eq(1).removeClass("sortActive");
    $(".down,.up").css("color", "");
    //$(".sort").eq(0).addClass("sortActive").parent().siblings().find("span").removeClass("sortActive").parent().siblings().children(".down,.up").css("color", "");

    $scope.sort_type = 4;
  };
  $scope.SentimentDirection = 0;         //人气排序方向
  $scope.sortSentiment = function () {               //人气排序
    $scope.SentimentDirection++;
    if ($scope.SentimentDirection % 2) {
      //console.log("up" + $scope.SentimentDirection)
      $(".sort").eq(1).find("span").addClass("sortActive").parent().siblings().find("span").removeClass("sortActive");
      $(".sort").eq(1).children(".up").css("color", "#ff6893").next().css("color", "").parent().siblings().children(".down,.up").css("color", "");
      $scope.sort_type = 2;      //排序方式
      $scope.sort_enum = "ASC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants();
    } else {

      //console.log("down" + $scope.SentimentDirection)
      $(".sort").eq(1).find("span").addClass("sortActive").parent().siblings().find("span").removeClass("sortActive");
      $(".sort").eq(1).children(".down").css("color", "#ff6893").prev().css("color", "").parent().siblings().children(".down,.up").css("color", "");
      $scope.sort_type = 2;      //排序方式
      $scope.sort_enum = "DESC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants()
    }
  };
  $scope.PriceDirection = 0;         //人气排序方向
  $scope.sortPrice = function () {                  //价格排序
    $scope.PriceDirection++;
    if ($scope.PriceDirection % 2) {
      //console.log("up" + $scope.PriceDirection)
      $(".sort").eq(2).find("span").addClass("sortActive").parent().siblings().find("span").removeClass("sortActive");
      $(".sort").eq(2).children(".up").css("color", "#ff6893").next().css("color", "").parent().siblings().children(".down,.up").css("color", "");
      $scope.sort_type = 3;      //排序方式
      $scope.sort_enum = "ASC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants()
    } else {
      //console.log("down" + $scope.PriceDirection)
      $(".sort").eq(2).find("span").addClass("sortActive").parent().siblings().find("span").removeClass("sortActive");
      $(".sort").eq(2).children(".down").css("color", "#ff6893").prev().css("color", "").parent().siblings().children(".down,.up").css("color", "");
      $scope.sort_type = 3;      //排序方式
      $scope.sort_enum = "DESC";    //升序
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.total = 1;       // 用来保存总页数
      $scope.goodList = [];
      $scope.getRestaurants()
    }

  };
  function timer(intDiff) {
         //var intDiff = parseInt(60); //倒计时总秒数量
   // var oldTime = new Date(GoldTimedom.attr("datayear"),GoldTimedom.attr("datamonth"),GoldTimedom.attr("dataday"),13,00,00)
              window.setInterval(function () {
                  var day = 0,
                      hour = 0,
                      minute = 0,
                      second = 0; //时间默认值
                  if (intDiff > 0) {
                      day = Math.floor(intDiff / (60 * 60 * 24));
                      hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                      minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                      second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                  }
                  if (hour <= 9){ hour = '0' + hour;}
                  if (minute <= 9){ minute = '0' + minute;}
                  if (second <= 9) {second = '0' + second;}
                  $('.end_time .hour').html( hour );
                  $('.end_time .minute').html( minute );
                  $('.end_time .second').html( second );
                  intDiff--;
                  if(intDiff==0){
                     location.reload()
                  }
              }, 1000);
          }
  // 创建一些scope变量
  $scope.page = 0;        // 用来保存当前请求的页码
  $scope.total = 10;       // 用来保存总页数
  $scope.goodList = [];
  // 加载的方法
  $scope.getRestaurants = function () {
    $scope.page++;  // 页数++
    $scope.url = Signature.login("/coin/index?sort_type=" + $scope.sort_type + "&current_page="+$scope.page+"&sort_enum="+$scope.sort_enum+"&page_size=10&item_category_id="+$scope.item_category_id+"&sekill_channel=3");

    $http.get($scope.url)
      .success(function (response) {
        if(response.code==10000) {
          // angualr的工具方法
          //angular.forEach(response.restaurants, function (restaurant) {
          //    $scope.restaurants.push(restaurant);    // 将新数据追加到数组中
          //});
          $scope.extra_business = response.extra_business;
          var activityTime=$filter('date')($scope.extra_business.now_time,'yyyy/MM/dd')+" 13:00:00";
          var time=(new Date(activityTime).getTime()-$scope.extra_business.now_time)/1000;
          if(new Date($scope.extra_business.now_time).getHours()<12){
            $scope.extra_business.sekill_status=4;
          }
          if(time>0){
            timer(time);
          }
          //console.log("result.length:" + result.length);
          Array.prototype.push.apply($scope.goodList, response.data.data);


          // 更新总页面数，基于API发送的值
          $scope.total = response.data.total_page; // 示例数据中为30页
        }else if(response.code==50002){
          $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
          $http.get($scope.pullUrl).then(function successCallback(response) {
            if(response.data.code==10000){
              window.localStorage.access_token = "access_token=" + response.data.data.access_token;
              window.localStorage.session_token = "session_token=" + response.data.data.session_token;
            }else {
              alert(response.data.msg);
            }
          }, function errorCallback(response) {
            // 请求失败执行代码
          });
        }else{
          alert(response.msg)
        }
      })
      //.error(function (err) {
      //    //console.log(err);
      //})
      .finally(function () {
        // 广播事件，告诉无限滚动组件everything is done
        $scope.$broadcast("scroll.infiniteScrollComplete");
      });
  };

  $scope.getRestaurants();    // 加载时，从API加载第一页数据
});
