/**
 * 即将到账
 */
'use strict';
app.controller('withdrawIntoaccountCtrl',function($scope,$http,Signature){
  document.title="货蛮好网-即将到账";
  /*转为时间戳*/
  $scope.dateFunction=function(date){
    return Signature.DateFuc(date);
  };
  // 创建一些scope变量
  $scope.current_page = 1;        // 用来保存当前请求的页码
  $scope.total = 1;       // 用来保存总页数
  $scope.coindata = [];
  $scope.lotteryDate =[];
  // 加载的方法
  $scope.pulldowngetdatafund1=function(){
    $scope.current_page++;  // 页数++
    $scope.dataUrl=Signature.login("/wealth/bill/refund?current_page="+$scope.current_page+"&page_size=10");
    console.log($scope.dataUrl)
    $http.get($scope.dataUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.total = response.data.data.total_page; // 示例数据中为30页
          var result = response.data.data.data;
          Array.prototype.push.apply($scope.coindata,result);
        }else {
        }
      }
      , function errorCallback(response) {
        // 请求失败执行代码
      });
  }
  $scope.pulldowngetdatafund=function(){
    $scope.dataUrl=Signature.login("/wealth/bill/refund?current_page=1&page_size=10");
    console.log($scope.dataUrl)
    $http.get($scope.dataUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.coindata=response.data.data.data;
          $scope.total = response.data.data.total_page; // 示例数据中为30页
          $scope.setColor=function(sta){
            var p = "";
            if (sta==5){
              p = '#ff9710';
            }else {
              p='#333333';
            }
            return {"color": p};
          }
          $scope.setColor1=function(sta){
            var p = "";
            if (sta==1){
              p = '#ff9710';
            }else if(sta==2){
              p = '#27ac2b';
            }else {
              p='#333333';
            }
            return {"color": p};
          }
        }else if(response.data.code==50002){
          $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
          $http.get($scope.refUrl).then(function successCallback(response) {
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
          alert(response.data.msg);
        }
      }
      , function errorCallback(response) {
        // 请求失败执行代码
      });
  }
  $scope.pulldowngetdatafund();    // 加载时，从API加载第一页数据


// 加载金额
  $scope.pulldowngetdatafund2=function(){
    $scope.dataUrl=Signature.login("/wealth/account");
    console.log($scope.dataUrl)
    $http.get($scope.dataUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.intoaccount=response.data.data.frozen_amount;
        }else {
        }
      }
      , function errorCallback(response) {
        // 请求失败执行代码
      });
  }
  $scope.pulldowngetdatafund2();

  // //判断跳转页面
  // $scope.jumpUrl=function(){
  //   $scope.dataUrl=Signature.login("/wealth/withdrawal/info");
  //   console.log($scope.dataUrl)
  //   $http.get($scope.dataUrl).then(function successCallback(response) {
  //       if(response.data.code==10000){
  //         if(response.data.data==0){
  //           location.href="#/withdrawDeposit";
  //         }else {
  //           location.href="#/withdrawBind";
  //         }
  //       }else {
  //       }
  //     }
  //     , function errorCallback(response) {
  //       // 请求失败执行代码
  //     });
  // }



});
