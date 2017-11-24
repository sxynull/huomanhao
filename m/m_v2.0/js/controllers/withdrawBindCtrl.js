/**
 * 提现绑定
 */
'use strict';
app.controller('withdrawBindCtrl',['$scope','$http','Signature',function($scope,$http,Signature){
  document.title="货蛮好网-提现绑定";
  $("input").click(function () {
      var s = $(this).attr("placeholder");
      $(this).attr("placeholder", "");
      $(this).blur(function () {
        $(this).attr("placeholder", s);
      })
    });
  $scope.pullUrl=Signature.login("/member/get");
  $http.get($scope.pullUrl).then(function successCallback(response) {
    if(response.data.code==10000){
      $scope.phonenum=response.data.data.phone;
    }else {
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });

    $scope.sendcode=function () {
      $scope.gettokenUrl=Signature.login("/token/get");
      $http.get($scope.gettokenUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          var token=response.data.data;
          console.log(response.data.data)
          $scope.pullUrl=Signature.login("/sms/withdraw/send?token="+token+"");
          $http.get($scope.pullUrl).then(function successCallback(response) {
            if(response.data.code==10000){
            }else {
              alert(response.data.msg)
            }
          }, function errorCallback(response) {
            // 请求失败执行代码
          });
        }else {
        }
      }, function errorCallback(response) {
        // 请求失败执行代码
      });

      var time;
      $("#note_time").css({"display": "block"});
      $(".note_time1").css({"display": "block"});
      $(".note_click").css("display", "none");
      time = setInterval(function () {
        $("#note_time").text(parseInt($("#note_time").text()) - 1);
        if ($("#note_time").text() < 1) {
          $("#note_time").css({"display": "none"});
          $(".note_time1").css({"display": "none"});
          $(".note_click").css("display", "block");
          $("#note_time").text("60");
          clearInterval(time);
        }
      }, 1000);
    }

  $scope.sendpaycount=function () {
    var pay_account_nick=$(".bind_nameinput2").val();
    var pay_account=$(".bind_payaccountinput2").val();
    localStorage.setItem("pay_account_nick", pay_account_nick);
    localStorage.setItem("pay_account", pay_account);
    var phone=$(".bind_phoneinput2").val();
    var auth_code=$(".bind_codeinput2").val();
    $scope.pullUrl=Signature.login("/wealth/bind/account/first?pay_account_nick="+pay_account_nick+"&pay_account="+pay_account+"&phone="+phone+"&auth_code="+auth_code+"");
    $http.get($scope.pullUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        location.href="#/withdrawBindsubmit";
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
        alert(response.data.msg);
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
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
