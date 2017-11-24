/*好货精选列表页*/
'use strict';

app.controller('goodListCtrl',  function ($scope, $http,$ionicScrollDelegate,Signature,$location,$rootScope) {
  document.title="货蛮好网-好货精选";

  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  $rootScope.isCode=window.localStorage.isCode;
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }

  $rootScope.$on('$stateChangeSuccess',function (event,toState,toParams,fromSate,fromParams) {
    if(fromSate.url=="/home"){
      $scope.item_category_id=$location.$$search.item_category_id;
         if($scope.item_category_id==undefined||$scope.item_category_id==null){
           $scope.item_category_id='';
         }
         $(".classifyul1 li").eq($scope.item_category_id).addClass("current1").siblings().removeClass('current1');
         if($scope.item_category_id==7||$scope.item_category_id==8||$scope.item_category_id==9){
           $(".scrollxli").animate({'scrollLeft': '350px'},{easing: "swing"}, '400')
         }
       if($scope.item_category_id==10||$scope.item_category_id==11||$scope.item_category_id==12){
         $(".scrollxli").animate({'scrollLeft': '850px'},{easing: "swing"}, '200')
       }
       if($scope.item_category_id==13){
         $(".scrollxli").animate({'scrollLeft': '1000px'},{easing: "swing"}, '200')
       }
       if($scope.item_category_id==6){
         $(".scrollxli").animate({'scrollLeft': '120px'},{easing: "swing"}, '600')
       }
    }


  });
  /*类目筛选*/
  // $scope.item_category_id='';
    $scope.item_category_id=$location.$$search.item_category_id;
    if($scope.item_category_id==undefined||$scope.item_category_id==null){
      $scope.item_category_id='';
    }
    $(".classifyul1 li").eq($scope.item_category_id).addClass("current1").siblings().removeClass('current1');
    if($scope.item_category_id==7||$scope.item_category_id==8||$scope.item_category_id==9){
      $(".scrollxli").animate({'scrollLeft': '350px'},{easing: "swing"}, '400')
    }
  if($scope.item_category_id==10||$scope.item_category_id==11||$scope.item_category_id==12){
    $(".scrollxli").animate({'scrollLeft': '850px'},{easing: "swing"}, '200')
  }
  if($scope.item_category_id==13){
    $(".scrollxli").animate({'scrollLeft': '1000px'},{easing: "swing"}, '200')
  }
  if($scope.item_category_id==6){
    $(".scrollxli").animate({'scrollLeft': '120px'},{easing: "swing"}, '600')
  }

  $(".classifyul1 li").click(function() {
    $(".classifyul1 li").eq($(this).index()).addClass("current1").siblings().removeClass('current1');
    $scope.item_category_id=$(this).index();
    if($(this).index()==0){
      $scope.item_category_id='';
    }
    $scope.page=0;
    $scope.goodList=[];
    $scope.getRestaurants();
  })



  /*类目筛选*/
  $rootScope.$on('$stateChangeSuccess',function (event,toState,toParams,fromSate,fromParams) {
    if(fromSate.url=="/home") {
      $scope.item_type = $location.$$search.item_type;
      if ($scope.item_type == undefined || $scope.item_type == null) {
        $scope.item_type = '';
      } else {
        $(".classify_bottomul li").eq($scope.item_type).addClass("cur").siblings().removeClass('cur');
      }
      $scope.page=0;
      $scope.goodList=[];
      $scope.getRestaurants();
    }});

  $scope.item_type=$location.$$search.item_type;
  if($scope.item_type==undefined||$scope.item_type==null){
    $scope.item_type='';
  }else {
    $(".classify_bottomul li").eq($scope.item_type).addClass("cur").siblings().removeClass('cur');
  }


  $(".classify_bottomul li").click(function() {
    $(".classify_bottomul li").eq($(this).index()).addClass("cur").siblings().removeClass('cur');
    $scope.item_type=$(this).index();
    if($(this).index()==0){
      $scope.item_type='';
    }
    $scope.page=0;
    $scope.goodList=[];
    $scope.getRestaurants();
  })

  $scope.sort_type = 1;      //排序方式
      $scope.sort_enum = "DESC";    //升序
   $scope.top = function () {
     $ionicScrollDelegate.scrollTop()
   };

   $scope.sortALL = function () {                //综合排序
     $(".sort").eq(0).find("span").addClass("sortActive").parent().siblings().find("span").removeClass("sortActive").parent().siblings().children(".down,.up").css("color", "");
     $scope.sort_type = 1;      //排序方式
     $scope.sort_enum = "DESC";    //升序
     $scope.page = 0;        // 用来保存当前请求的页码
     $scope.total = 1;       // 用来保存总页数
     $scope.goodList = [];
     $scope.getRestaurants();

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

   // 创建一些scope变量
   $scope.page = 0;        // 用来保存当前请求的页码
   $scope.total = 10;       // 用来保存总页数
   $scope.goodList = [];
   // 加载的方法
   $scope.getRestaurants = function () {
     $scope.page++;  // 页数++
     $scope.url = Signature.login("/items?sort_type=" + $scope.sort_type + "&sort_enum=" + $scope.sort_enum + "&item_category_id=" + $scope.item_category_id +"&item_type=" + $scope.item_type +"&current_page="+$scope.page+"&page_size=10");

     $http.get($scope.url)
       .success(function (response) {
         if(response.code==10000){
         // angualr的工具方法
         //angular.forEach(response.restaurants, function (restaurant) {
         //    $scope.restaurants.push(restaurant);    // 将新数据追加到数组中
         //});
         var result = response.data.data;
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
