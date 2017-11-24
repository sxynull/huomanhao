/**
 * 提现绑定提交
 */
'use strict';
app.controller('withdrawBindsubmitCtrl',['$scope','$http','Signature',function($scope,$http,Signature){
  document.title="货蛮好网-提现绑定提交";
  $("input").click(function () {
    var s = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
    $(this).blur(function () {
      $(this).attr("placeholder", s);
    })
  });
  $(".loginpass").bind("input", function () {
    $scope.flog1=false;
  })
  $(".paycode").bind("input", function () {
    $scope.flog1=false;
  })
  $(".secondpass").bind("input", function () {
    $scope.flog1=false;
  })
  $scope.sendpaypassword=function () {
    var pay_account_nick=localStorage.getItem("pay_account_nick");
    var pay_account=localStorage.getItem("pay_account");
    var login_password=$(".loginpass").val();
    var pay_password=$(".paycode").val();
    var pay_password_confirm=$(".secondpass").val();
    var txt1 = /^(?!(?:\d*$))[A-Za-z0-9]{6,16}$/;
    var txt2 = /^(?!(?:\d*$))[A-Za-z0-9]{6,8}$/;
    if(login_password==''||txt1.test(login_password)==false){
      $scope.flog1=true;
      $scope.flog3=true;
      $scope.flog2=false;
      $scope.flog4=false;
      $scope.flog5=false;
      return;
    }
    if(pay_password==''||txt2.test(pay_password)==false){
      $scope.flog1=true;
      $scope.flog4=true;
      $scope.flog3=false;
      $scope.flog2=false;
      $scope.flog5=false;
      return;
    }
    if(pay_password!=pay_password_confirm){
      $scope.flog1=true;
      $scope.flog5=true;
      $scope.flog3=false;
      $scope.flog4=false;
      $scope.flog2=false;
      return;
    }
    if((pay_password==login_password)&&pay_password!=''&&login_password!=''){
      $scope.flog1=true;
      $scope.flog2=true;
      $scope.flog3=false;
      $scope.flog4=false;
      $scope.flog5=false;
      return;
    }
    $scope.pullUrl=Signature.login("/wealth/bind/account/second?pay_account_nick="+pay_account_nick+"&pay_account="+pay_account+"&login_password="+login_password+"&pay_password="+pay_password+"&pay_password_confirm="+pay_password_confirm+"");
    $http.get($scope.pullUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        location.href="#/withdrawDeposit";
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
        alert(response.data.msg)
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });
  }



}]);
//获得焦点判断
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
//两次输入密码是否一样
app.directive('equals',function(){
  return{
    require:'ngModel',
    link:function(scope,elm,attrs,ngModelCtrl){
      function validateEqual(myValue){
        var valid = (myValue === scope.$eval(attrs.equals));
        ngModelCtrl.$setValidity('equal',valid);
        return valid ? myValue : undefined;
      }
      ngModelCtrl.$parsers.push(validateEqual);
      ngModelCtrl.$formatters.push(validateEqual);
      scope.$watch(attrs.equals,function(){
        ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
      })
    }
  }
});
