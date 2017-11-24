/*代言人明细页*/
'use strict';

app.controller('spokesmanDetailCtrl', ['$scope','$http','Signature','$stateParams',function($scope,$http,Signature,$stateParams) {
  document.title="货蛮好网-代言人明细页";
  $scope.spokesmanUrl=Signature.login("/wealth/spokesman");
                   $http.get($scope.spokesmanUrl).success(function(response){
                          $scope.spokesmanData=response.data;
                   });
  /*转为时间戳*/
  $scope.dateFunction=function(date){
   return Signature.DateFuc(date);
  };
  $('.spokesmanDetailTabs').Tabs({
     					event: 'click'
     				});
  /*首单奖励*/
  $scope.first=function(){
    $(".one_fans").addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.deal_type=1;
    $scope.invite_level=1;//    1一级粉丝 2二级粉丝
    $scope.award_type=1;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.getRestaurants()
  };
  /*首单奖励一级粉丝*/
  $scope.firstOneFans=function(obj){
    $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.deal_type=1;
    $scope.invite_level=1;//    1一级粉丝 2二级粉丝
    $scope.award_type=1;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.price=7.00;
    $scope.getRestaurants()
  };
  /*首单奖励二级粉丝*/
  $scope.firstTwoFans=function(obj){
    $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.deal_type=1;
    $scope.invite_level=2;//    1一级粉丝 2二级粉丝
    $scope.award_type=1;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.price=3.00;
    $scope.getRestaurants()
  };
  /*金币奖励*/
  $scope.coin=function(){
    $(".one_fans").addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.invite_level=1;//    1一级粉丝 2二级粉丝
    $scope.award_type=2;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.getRestaurants()
  };
  /*金币奖励一级粉丝*/
  $scope.coinOneFans=function(obj){
    $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.invite_level=1;//    1一级粉丝 2二级粉丝
    $scope.award_type=2;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.getRestaurants()
  };
  /*金币奖励二级粉丝*/
  $scope.coinTwoFans=function(obj){
    $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.invite_level=2;//    1一级粉丝 2二级粉丝
    $scope.award_type=2;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.getRestaurants()
  };
  /*返现奖励*/
  $scope.backPrice=function(){
    $(".one_fans").addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
    $scope.invite_level=1;//    1一级粉丝 2二级粉丝
    $scope.award_type=3;//奖励分类    1首单奖励 2金币奖励 3返现奖励
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    $scope.getRestaurants()
  };
  /*返现奖励 一级粉丝*/
    $scope.backPriceOneFans=function(obj){
      $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
      $scope.invite_level=1;//    1一级粉丝 2二级粉丝
      $scope.award_type=3;//奖励分类    1首单奖励 2金币奖励 3返现奖励
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.goodList = [];
      $scope.getRestaurants()
    };
    /*返现奖励 二级粉丝*/
    $scope.backPriceTwoFans=function(obj){
      $(obj.target).addClass("fans_tabs_active").siblings().removeClass("fans_tabs_active");
      $scope.invite_level=2;//    1一级粉丝 2二级粉丝
      $scope.award_type=3;//奖励分类    1首单奖励 2金币奖励 3返现奖励
      $scope.page = 0;        // 用来保存当前请求的页码
      $scope.goodList = [];
      $scope.getRestaurants()
    };
  $scope.price=7.00;
  $scope.deal_type=1;
  $scope.invite_level=1;//    1一级粉丝 2二级粉丝
  $scope.award_type=1;//奖励分类    1首单奖励 2金币奖励 3返现奖励
  // 创建一些scope变量
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    // 加载的方法
  $scope.stopAgin=true;
    $scope.getRestaurants = function () {
      if($scope.stopAgin==true){
        $scope.stopAgin=false;
        $scope.page++;  // 页数++
              $scope.url = Signature.login("/wealth/spokesman/detail?invite_level=" + $scope.invite_level + "&current_page="+$scope.page+"&page_size=20&award_type="+$scope.award_type);
              $http.get($scope.url)
                .success(function (response) {
                  // angualr的工具方法
                  //angular.forEach(response.restaurants, function (restaurant) {
                  //    $scope.restaurants.push(restaurant);    // 将新数据追加到数组中
                  //});
                  var result = response.data.data;
                  //console.log(result)
                  //console.log("result.length:" + result.length);
                  Array.prototype.push.apply($scope.goodList, response.data.data);
                   //console.log($scope.goodList)

                  // 更新总页面数，基于API发送的值
                 $scope.total = response.data.total_page; // 示例数据中为30页
                  $scope.stopAgin=true;
                })
                //.error(function (err) {
                //    //console.log(err);
                //})
                .finally(function () {
                  // 广播事件，告诉无限滚动组件everything is done
                  $scope.$broadcast("scroll.infiniteScrollComplete");
                });
      }

    };


  if($stateParams.step==1){

      $scope.first();
      return false
    }else if($stateParams.step==2){
    $(".Newbie").removeClass("hide").siblings().addClass("hide");
    $(".process").addClass("current").siblings().removeClass("current");
      $scope.coin();
      return false;
    }else if($stateParams.step==3){
    $(".application_regulation").removeClass("hide").siblings().addClass("hide");
    $(".rule").addClass("current").siblings().removeClass("current");
      $scope.backPrice();
      return false;
    }




}]);
