/*淘宝账号绑定*/
'use strict';
app.controller('taobaoaccountBindCtrl',['$scope','$ionicModal','$interval','Signature','$http',function($scope,$ionicModal,$interval,Signature,$http){
  document.title="货蛮好网-绑定淘宝账号";
  //ionicModal弹窗，由下往上;
  $ionicModal.fromTemplateUrl('templates/modaltaobaobind.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.createContact = function(u) {
    $scope.modal.hide();
  };
  //等级选择的相关设置。
  $scope.myVar=false;
  $scope.checkgrand=function(event) {
    if($(event.target)[0].nodeName=="IMG"){
      $("#taobao_name").val($(event.target).parent(".activated")[0].getAttribute('data'));
      $(".taobaoBind_grades").text("");
      $(".taobaoBind_grades").append($(event.target).parent(".activated")[0].innerHTML);
      $(".taobaoBind_grades").css("text-align","center")
      $scope.myVar=true;
    }else {
    if($(event.target)[0].getAttribute('data')==0){
      $("#taobao_name").val(0);
      $(".taobaoBind_grades").text("请选择等级")
      $(".taobaoBind_grades").css("text-align","right")
      $scope.myVar=false;
    }else{
      $("#taobao_name").val($(event.target)[0].getAttribute('data'));
      $(".taobaoBind_grades").text("");
      $(".taobaoBind_grades").append($(event.target)[0].innerHTML);
      $(".taobaoBind_grades").css("text-align","center")
      $scope.myVar=true;
    }
    }
  };
  /*防重复*/
  $http.get(Signature.login("/user/taobao/token")).success(function(response){
            if(response.code=="10000"){
                 $scope.token=response.data
            }else if(response.code==50002){
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
            }else{
               alert(response.msg)
            }
       });
  /*绑定淘宝账号*/
  var txt3=/^-?[1-9]\d*$/;
  var txt4=/@/;
  $interval(function () {
    if($(".bindtaobao_name").val()!=undefined&&$(".bindtaobao_name").val()!=null){
    if($(".bindtaobao_name").val()!=''&&txt3.test($(".bindtaobao_name").val())==false&&txt4.test($(".bindtaobao_name").val())==false&& $(".bindtaobao_name").val().length<=25){
      $scope.boobind=false;
    }
    }
  }, 300)
  $scope.next=function(taobao_name){
    if($("#taobao_name").val()==0){
          alert("请选择淘宝等级！")
    }else if($(".bindtaobao_name").val()==''||txt3.test($(".bindtaobao_name").val())==true||txt4.test($(".bindtaobao_name").val())==true|| $(".bindtaobao_name").val().length>25){
          $scope.boobind=true;
    }else{
      $http.get(Signature.login("/user/taobao/insert?taobao_name="+taobao_name+"&taobao_level="+$("#taobao_name").val()+"&token="+$scope.token)).success(function(response){
                if(response.code=="10000"){
                    location.href="#/taobaoaccoutSucceed"
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
