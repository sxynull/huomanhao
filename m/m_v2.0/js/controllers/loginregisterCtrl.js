/**
 * Created by Administrator on 2017/6/13 0013.
 */
app.controller('loginregisterCtrl', function ($scope, $http, Signature, $rootScope, $timeout) {
  document.title="填写账号信息";
  $rootScope.open_id=localStorage.open_id;
  $("input").click(function () {
    var s = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
    $(this).blur(function () {
      $(this).attr("placeholder", s);
    })
  });

  // $(".bind_nameinput2").bind("input", function () {
  //     if($(this).val().indexOf(" ") == -1){
  //       $scope.flog3=false;
  //     }else {
  //       $scope.flog3=true;
  //     }
  // });
  $scope.flog1false1=function () {
    if($(".bind_nameinput2").val().indexOf(" ") == -1){
      $scope.flog3=false;
    }else {
      $scope.flog3=true;
    }
  }
  $scope.flog1false=function () {
    $scope.flog1=false;
  }
  // $(".bind_phoneinput2").click(function () {
  //   $scope.flog1=false;
  // });
  // $(".bind_nameinput2").bind("input", function () {
  //   $scope.flog1=false;
  // })
  // $(".onepass").bind("input", function () {
  //   $scope.flog1=false;
  // })
  // $(".secondpass").bind("input", function () {
  //   $scope.flog1=false;
  // })
  // $(".bind_codeinput2").bind("input", function () {
  //   $scope.flog1=false;
  // })

  $scope.sendcode1=function () {
    var txt = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
    if($(".bind_phoneinput2").val()==''){
      $scope.flog1=true;
      $scope.flog2=true;
      $scope.flog4=false;
      $scope.flog5=false;
      $scope.flog6=false;
      $scope.flog7=false;
      $scope.flog8=false;
      $scope.flog9=false;
      return;
    }else if(txt.test($(".bind_phoneinput2").val())==false){
      $scope.flog1=true;
      $scope.flog2=false;
      $scope.flog4=true;
      $scope.flog5=false;
      $scope.flog6=false;
      $scope.flog7=false;
      $scope.flog8=false;
      $scope.flog9=false;
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

  $scope.loginregister=function () {
    var nick=$(".bind_nameinput2").val();
    var password=$(".onepass").val();
    var confirm=$(".secondpass").val();
    var phone=$(".bind_phoneinput2").val();
    var code=$(".bind_codeinput2").val();
    var txt1 = /^[0-9a-zA-Z-_ \u4e00-\u9fa5]*$/;
    var txt2 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8]|18[0|1|2|3|4|5|6|7|8|9])\d{8}$/;
    var txt3 = /^(?!(?:\d*$))[A-Za-z0-9]{6,16}$/;
    if(nick==''||txt1.test(nick)==false||nick.length<4||nick.length>21){
      $scope.flog5=true;
      $scope.flog1=true;
      $scope.flog2=false;
      $scope.flog4=false;
      $scope.flog6=false;
      $scope.flog7=false;
      $scope.flog8=false;
      $scope.flog9=false;
      return;
    }
    if($rootScope.phone==undefined){

      if(phone==''||txt2.test(phone)==false){
           $scope.flog6=true;
           $scope.flog1=true;
           $scope.flog2=false;
           $scope.flog4=false;
           $scope.flog5=false;
           $scope.flog7=false;
           $scope.flog8=false;
           $scope.flog9=false;
           return;
         }

    }

    if(code==''){
      $scope.flog7=true;
      $scope.flog1=true;
      $scope.flog2=false;
      $scope.flog4=false;
      $scope.flog6=false;
      $scope.flog5=false;
      $scope.flog8=false;
      $scope.flog9=false;
      return;
    }
    if(password==''||txt3.test(password)==false){
      $scope.flog8=true;
      $scope.flog1=true;
      $scope.flog2=false;
      $scope.flog4=false;
      $scope.flog6=false;
      $scope.flog7=false;
      $scope.flog5=false;
      $scope.flog9=false;
      return;
    }
    if(password!=confirm){
      $scope.flog9=true;
      $scope.flog1=true;
      $scope.flog2=false;
      $scope.flog4=false;
      $scope.flog6=false;
      $scope.flog7=false;
      $scope.flog8=false;
      $scope.flog5=false;
      return;
    }
    if(window.localStorage.invited_code!=undefined&&window.localStorage.invited_code.length>7){
      if($rootScope.phone!=undefined){
        phone=$rootScope.phone;
        $scope.bindUrl=Signature.h5("/member/register?phone="+phone+"&open_id="+$rootScope.open_id+"&nick="+nick+"&password="+password+"&confirm="+confirm+"&invited_code="+localStorage.invited_code+"&bind_type=0");

      }else{
        $scope.bindUrl=Signature.h5("/member/register?phone="+phone+"&open_id="+$rootScope.open_id+"&code="+code+"&nick="+nick+"&password="+password+"&confirm="+confirm+"&invited_code="+localStorage.invited_code+"&bind_type=1");

      }
    }else{
      if($rootScope.phone!=undefined){
        phone=$rootScope.phone;
        $scope.bindUrl=Signature.h5("/member/register?phone="+phone+"&open_id="+$rootScope.open_id+"&nick="+nick+"&password="+password+"&confirm="+confirm+"&bind_type=0");

      }else{
        $scope.bindUrl=Signature.h5("/member/register?phone="+phone+"&open_id="+$rootScope.open_id+"&code="+code+"&nick="+nick+"&password="+password+"&confirm="+confirm+"&bind_type=1");

      }
    }
    $http.get($scope.bindUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        window.localStorage.access_token = "access_token=" + response.data.data.access_token;
        window.localStorage.session_token = "session_token=" + response.data.data.session_token;
        $rootScope.open_id=0;
        window.localStorage.open_id=$rootScope.open_id;
        window.location.href = "#/tabs/home";
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
