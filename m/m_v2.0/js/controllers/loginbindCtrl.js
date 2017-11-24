
app.controller('loginbindCtrl', function ($scope, $http, Signature, $rootScope, $timeout) {
  document.title="货蛮好网-手机号绑定";
  $rootScope.open_id=window.localStorage.open_id;
  $("input").click(function () {
    var s = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
    $(this).blur(function () {
      $(this).attr("placeholder", s);
    })
  });
  $(".bind_phoneinput2").bind("input", function () {
    $scope.flog1=false;
  })
  $scope.sendcode1=function () {
    var txt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
    if($(".bind_phoneinput2").val()==''){
      $scope.flog1=true;
      $scope.flog2=true;
      return;
    }else if(txt.test($(".bind_phoneinput2").val())==false){
      $scope.flog1=true;
      $scope.flog2=false;
      return;
    }
    $scope.gettokenUrl=Signature.h5("/token/get");
    $http.get($scope.gettokenUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        var token=response.data.data;
        console.log(response.data.data)
        var phone=$(".bind_phoneinput2").val();
        $scope.pullUrl=Signature.h5("/sms/register/send?token="+token+"&phone="+phone+"");
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

  $scope.loginbind=function (phone,code) {

    $scope.bindUrl=Signature.h5("/member/bind?phone="+phone+"&open_id="+$rootScope.open_id+"&code="+code);
    $http.get($scope.bindUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        window.localStorage.access_token = "access_token=" + response.data.data.access_token;
        window.localStorage.session_token = "session_token=" + response.data.data.session_token;
        $rootScope.open_id=0;
         window.localStorage.open_id=$rootScope.open_id;
        // 一个精心制作的自定义弹窗
        // var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin-top: 40px;"><p style="line-height: 50px;">账户绑定成功<br>现在可以免费去申请宝贝啦！</p></div>';
        // $scope.showAlert = function () {
        //   var alertPopup = $ionicPopup.alert({
        //     title: '',
        //     template: alertHtml,
        //     okText: ""
        //   });
        //   alertPopup.then(function (res) {
        //     console.log('Thank you for not eating my delicious ice cream cone');
        //   });
        //   alertPopup.close()
        //   window.location.href = "#/tabs/home";
        // };
        window.location.href = "#/tabs/home";

      }else if(response.data.code==30010){
        $rootScope.phone=phone;
        location.href="#/loginregister"
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
});
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
