/**
 * Created by Administrator on 2017/8/24 0024.
 */
'use strict';
app.controller('gradeRankCtrl',['$scope','$rootScope','$location','$ionicPopup','$http','$interval','Signature','$filter',function($scope,$rootScope,$location,$ionicPopup,$http,$interval,Signature,$filter){
  document.title="货蛮好网-个人成就";
  var ranktype=$location.$$search.ranktype;
  for(var i=0;i<$(".rank").length;i++){
      if(ranktype-1==i){
        $(".rank").eq(i).css("display","block").siblings().css("display","none");
      }
  }
  /*个人成长等级*/
  $http.get(Signature.login("/user/grow/relate")).then(function successCallback(response) {
    if (response.data.code == 10000) {
      $scope.graderank=response.data.data;
    } else if(response.data.code==50002){
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
  }, function errorCallback(response) {
    // 请求失败执行代码
  });


}]);
