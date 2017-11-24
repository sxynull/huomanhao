/*淘宝账号绑定成功*/
'use strict';
app.controller('taobaoaccountSuccessCtrl',['$scope','$ionicModal','Signature','$http','$timeout',function($scope,$ionicModal,Signature,$http,$timeout){
  /*已绑定淘宝账号*/
    document.title="货蛮好网-淘宝账号绑定成功"
    $http.get(Signature.login("/user/taobao")).success(function(response){
           if(response.code=="10000"){
                $scope.taobao_name=response.data.taobao_name
             $timeout(function(){
                   location.href="#/tabs/personalCenter"
             },3000)
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
