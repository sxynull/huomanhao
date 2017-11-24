/**
 * 个人主页
 */
'use strict';

app.controller('personalCenterCtrl', ['$scope', '$http','$ionicBackdrop','Signature', function ($scope, $http,$ionicBackdrop,Signature) {
  document.title="货蛮好网-个人主页";
  // $scope.personUrl=Signature.login("/member/profile/");
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
      alert(response.data.msg);
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });
  $http.get(Signature.login("/user/apply/number")).then(function successCallback(response) {
    if (response.data.code == 10000) {
      $scope.applyratio=response.data.data;
    } else if(response.data.code==50002){
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
      alert(response.data.msg);
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });

  /*个人成长等级*/
  $http.get(Signature.login("/user/grow/relate")).then(function successCallback(response) {
    if (response.data.code == 10000) {
      $scope.rankgrade=response.data.data;
    } else if(response.data.code==50002){
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
      alert(response.data.msg);
    }
  }, function errorCallback(response) {
    // 请求失败执行代码
  });


  /*活动统计*/
  $http.get(Signature.login("/user/apply/count")).success(function(response){
       if(response.code=="10000"){
            $scope.countList=response.data
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
  /*账户明细*/
  $http.get(Signature.login("/wealth/account")).success(function(response){
         if(response.code==10000){
              $scope.userList=response.data
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

  $scope.noRepeata=0;
  $scope.signin=function () {
    $scope.noRepeata+=1;
    if($scope.noRepeata>1){
      return;
    }
    $http.get(Signature.login("/user/sign")).success(function(response){
      if(response.code==10000){
        $scope.noRepeata=0;
        $scope.userList.accumulated_points+=response.data;
        $ionicBackdrop.retain();
        $scope.dataList.checked_today=1;
        $(".backdrop").html("<div class='retainText' ><img src='/../../m/m_v2.0/img/apply/singinpic.png' style='margin-left: 24%!important;margin-top:100px; '><p style='text-align:center;font-size:48px; margin-top:80px; '>+<span style='    font-size: 120px;vertical-align: bottom;margin-left: 24px;margin-right: 24px;'>"+response.data+"</span>积分</p></div>");
        $(".backdrop").on("click",function(){
          $ionicBackdrop.release()
        })


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
  }
}]);
