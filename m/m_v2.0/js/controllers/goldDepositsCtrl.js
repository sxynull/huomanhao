/**
 * Created by Administrator on 2017/6/1 0001.
 */
'use strict';
app.controller('goldDepositsCtrl',['$scope', '$http','Signature', function ($scope, $http,Signature) {
  document.title="货蛮好网-金币充值";
  $http.get(Signature.login("/member/profile")).then(function successCallback(response) {
    if (response.data.code == 10000) {
      $scope.dataList=response.data.data;
      if($scope.dataList.avatar!=undefined&&$scope.dataList.avatar!=null&&$scope.dataList.avatar!=''){
        if($scope.dataList.avatar.indexOf('http://m.huomanhao.com/')==-1){
          $scope.dataList.avatar='http://m.huomanhao.com/'+$scope.dataList.avatar;
        }else {
          $scope.dataList.avatar=$scope.dataList.avatar;
        }
      }else {
        $scope.dataList.avatar='';
      }

    } else if(response.data.code==50002){
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
      alert(response.data.msg);
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });
}]);
