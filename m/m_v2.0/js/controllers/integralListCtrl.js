/**
 * Created by Administrator on 2017/6/2 0002.
 */
'use strict';
app.controller('integralListCtrl',['$scope','$http','Signature',function($scope,$http,Signature){
  /*转为时间戳*/
  $scope.dateFunction=function(date){
    return Signature.DateFuc(date);
  };
  var deal_type="";
  // 创建一些scope变量
  $scope.current_page = 0;        // 用来保存当前请求的页码
  $scope.total = 1;       // 用来保存总页数
  $scope.coindata = [];
  $scope.lotteryDate =[];
  // 加载的方法
  $scope.pulldowngetdatafund1=function(){
    $scope.current_page++;  // 页数++
    $scope.dataUrl=Signature.login("/wealth/bill/record/point?deal_type="+deal_type+"&current_page="+$scope.current_page+"&page_size=10");
    //console.log($scope.dataUrl)
    $http.get($scope.dataUrl).success(function (response) {
          $scope.total = response.data.total_page; // 示例数据中为30页
          var result = response.data.data;
          Array.prototype.push.apply($scope.coindata,result);
      }).finally(function(){
      // 广播事件，告诉无限滚动组件everything is done
      $scope.$broadcast("scroll.infiniteScrollComplete");
    });
  }
  $scope.pulldowngetdatafund1();

// 加载金额
  $scope.pulldowngetdatafund2=function(){
    $scope.dataUrl=Signature.login("/wealth/bill/record/point/data");
    //console.log($scope.dataUrl)
    $http.get($scope.dataUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.historycoin=response.data.data.point_total;
          $scope.nowcoin=response.data.data.accumulated_points;
        }else if(response.data.code==50002){
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
        }else {
        }
      }
      , function errorCallback(response) {
        // 请求失败执行代码
      });
  }
  $scope.pulldowngetdatafund2();



}]);

