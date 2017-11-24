/**
 * 账户提现
 */
'use strict';
app.controller('withdrawDepositCtrl',['$scope','$http','Signature','$timeout','$ionicPopup',function($scope,$http,Signature,$timeout,$ionicPopup){
  document.title="货蛮好网-账户提现";
  $("input").click(function () {
    var s = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
    $(this).blur(function () {
      $(this).attr("placeholder", s);
    })
  });
  $scope.pullUrl1=Signature.login("/wealth/account");
  $http.get($scope.pullUrl1).then(function successCallback(response) {
    if(response.data.code==10000){
      $scope.disposableAmount=response.data.data.disposable_amount;
      $scope.payAccount=response.data.data.pay_account;
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
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });
  $scope.flogE=true;
 $scope.bindcheck=function () {
    if(parseInt(Math.round($(".bind_withdrawmoneyinput4").val()*10000/100))>$scope.disposableAmount){
      $scope.flogA=false;
      $scope.flogD=false;
      $scope.flogC=false;
      $scope.flogB=true;
      $scope.flogE=false;
    }else if($(".bind_withdrawmoneyinput4").val()*100>1000000){
      $scope.flogB=false;
      $scope.flogA=false;
      $scope.flogD=true;
      $scope.flogC=false;
      $scope.flogE=false;
    }else if($(".bind_withdrawmoneyinput4").val()*100<=100) {
      $scope.flogA=false;
      $scope.flogD=false;
      $scope.flogB=false;
      $scope.flogC=true;
      $scope.flogE=false;
    } else {
      $scope.flogA=true;
      $scope.flogE=false
    }
    if($(".bind_withdrawmoneyinput4").val()==''){
      $scope.flogE=true;
    }
  }

  $scope.hint_withdrawtextshow=function () {
    $(".hint_withdrawtext").css('display','block')
    $(".arrows").css('display','block')
  }

  $(document).on("click",function(e){
    if(e.target!=$(".hint_withdraw").get(0)){
      $(".hint_withdrawtext").css('display','none')
      $(".arrows").css('display','none')
    }
  });
  // var htmlEl = angular.element(document.querySelector('html'));
  // htmlEl.on('click', function (event) {
  //   if (event.target != $(".hint_withdraw").get(0)) {
  //     $scope.hintshow=false;
  //   }
  // })
  // $scope.hint_withdrawtexthide=function () {
  //   $timeout( function(){
  //     $scope.hintshow=false;
  //   },2000)
  // }

  $scope.noRepeatb=0;
  $scope.withdrawsubmit=function () {
    var amount = parseInt(Math.round($(".bind_withdrawmoneyinput4").val()*10000/100))
    var pay_password = $(".pay_passwordinput4").val();
    $scope.noRepeatb += 1;
    console.log($scope.noRepeatb);
    if ($scope.noRepeatb > 1) {
      alert("请勿重复提交")
    } else {
      $scope.pullUrl = Signature.login("/wealth/withdrawal/make?amount=" + amount + "&pay_password=" + pay_password + "");
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if (response.data.code == 10000) {
          // ui-sref="withdrawIntoaccount"
          $scope.noRepeatb=1;
          location.href = "#/fundall";
        } else if (response.data.code == 50002) {
          $scope.noRepeatb=0;
          $scope.refUrl = Signature.h5("/token/refresh?" + localStorage.getItem('session_token') + "");
          $http.get($scope.refUrl).then(function successCallback(response) {
            if (response.data.code == 10000) {
              window.localStorage.access_token = "access_token=" + response.data.data.access_token;
              window.localStorage.session_token = "session_token=" + response.data.data.session_token;
            } else {
              $scope.noRepeatb=0;
              alert(response.data.msg);
            }
          }, function errorCallback(response) {
            // 请求失败执行代码
          });
        } else {
          $scope.noRepeatb=0;
          // alert(response.data.msg);
          // 一个提示对话框
                      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin-top: 40px;"><p style="line-height: 50px;">提现失败<br>' + response.data.msg + '</p></div>';
                      $scope.showAlert = function () {
                        var alertPopup = $ionicPopup.alert({
                          title: '',
                          template: alertHtml,
                          okText: "确定"
                        });
                        alertPopup.then(function (res) {
              console.log('Thank you for not eating my delicious ice cream cone');
            });
          };
          $scope.showAlert();
        }
      }, function errorCallback(response) {
        // 请求失败执行代码
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
