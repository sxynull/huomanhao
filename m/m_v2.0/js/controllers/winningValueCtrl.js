/**
 * 意见反馈
 */
'use strict';
app.controller('winningValueCtrl',['$scope','$http','Signature','$timeout',function($scope,$http,Signature,$timeout){
  document.title="货蛮好网-我的中奖值";
    $http.get(Signature.login("/user/detail/data")).success(function(response){
      if(response.code==10000){
console.log(response.data)
        $scope.apply=response.data.apply_count;
        $scope.apply1=response.data.apply_percent;
        $scope.coins=response.data.coin_count;
        $scope.coins1=response.data.coin_percent;
        $scope.continue=response.data.con_count;
        $scope.continue1=response.data.con_percent;
        $scope.fans=response.data.fans_count;
        $scope.fans1=response.data.fans_percent;
        $scope.level=response.data.level;
        $scope.level1=response.data.level_percent;
        $scope.user=response.data.user_compare;
        $scope.user1=response.data.user_percent;
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
    });

}]);

