/**
 * 意见反馈
 */
'use strict';
app.controller('feedBackCtrl',['$scope','$http','Signature','$timeout',function($scope,$http,Signature,$timeout){
  document.title="货蛮好网-意见反馈";
  $scope.level=1;
  $scope.next=function(type,content,phone){
    $http.get(Signature.login("/user/feedback/insert?type="+type+"&content="+content+"&phone="+phone)).success(function(response){
              if(response.code==10000){
                alert("提交成功！")
                $timeout(function(){
                  location.href="#/tabs/personalCenter"
                },1000)
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
  }

}]);
app.directive('ngFocus', function () {
  var FOCUS_CLASS = "ng-focused";
  return{
    restrict:'AE',
    require:'ngModel',
    link: function (scope, element, attrs,ctrl) {
      ctrl.$focused = false;
      element.bind('focus', function (evt) {
        element.addClass(FOCUS_CLASS);
        scope.$apply(function () {
          ctrl.$focused = true;
        });
      }).bind('blur', function () {
        element.removeClass(FOCUS_CLASS);
        scope.$apply(function(){
          ctrl.$focused = false;
        })
      })
    }
  }
});
