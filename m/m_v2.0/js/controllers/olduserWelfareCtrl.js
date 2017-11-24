/**
 * 提交支付
 */
'use strict';
app.controller('olduserWelfareCtrl',['$scope','$rootScope','$location','$ionicPopup','$http','$interval','Signature','$filter',function($scope,$rootScope,$location,$ionicPopup,$http,$interval,Signature,$filter){
  document.title="货蛮好网-老客福利";
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.pay=false;
  $scope.pullUrl = Signature.login("/user/growth/system/date/detail?is_index=0");
  $http.get($scope.pullUrl).then(function successCallback(response) {
    if (response.data.code == 10000) {
      console.log(response.data.data)
      $scope.data=response.data.data;
      $scope.ranklists=response.data.data.user_day_week_cart_query_by_ten_b_o_list;
      if($scope.data.user_add_cart_count_day>=10&&$scope.data.is_lottery_day==0){
         $scope.pay=true;
      }else {
         $scope.pay=false;
      }
      $(".barin").css('width',$scope.data.user_add_cart_count_day*10+"%")
    } else if(response.data.code==50002){
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




  function callbackA(ind){
    if(ind==2){
      // var text="";
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px 0;">恭喜您获得1金币!</div>';
    }else if(ind==10){
      // alert("恭喜您获得2金币!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px 0;">恭喜您获得2金币!</div>';
    }else if(ind==9){
      // alert("恭喜您获得3金币!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px 0;">恭喜您获得3金币!</div>';

    }else if(ind==5){
      // alert("恭喜您获得100积分!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px;" 0>恭喜您获得100积分!</div>';

    }else if(ind==7){
      // alert("恭喜您获得50积分!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px; 0">恭喜您获得50积分!</div>';

    }else if(ind==8){
      // alert("恭喜您获得月度会员!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px; 0">恭喜您获得月度会员!</div>';

    }else if(ind==6){
      // alert("恭喜您获得4金币!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px 0;">恭喜您获得4金币!</div>';

    }else if(ind==4){
      // alert("恭喜您获得季度会员!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px; 0">恭喜您获得季度会员!</div>';

    }else if(ind==1){
      // alert("恭喜您获得30积分!");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px; 0">恭喜您获得30积分!</div>';

    }else if(ind==3){
      // alert("");
      var alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin: 40px; 0">恭喜您获得10积分!</div>';
    }

    // 一个提示对话框
    var alertPopup = $ionicPopup.alert({
      title: '',
      template: alertHtml,
      okText: "确定"
    });
    alertPopup.then(function (res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
    $scope.pay=false;
  };
  var newdraw =new turntableDraw('#rotate',{
    share:10,
    speed:"9s",
    velocityCurve:"ease",
    weeks:6,
    callback:function(num)
    {
      callbackA(num);
      $scope.pay=false;
      $scope.data.continuity_luck_draw_days+=1;
    },
  });
  $scope.rundial=0;
  $scope.paynum=1;
  $scope.pointer=function (){
  //ajax
    if($scope.data.user_add_cart_count_day>=10&&$scope.data.is_lottery_day==0){
      $scope.paynum-=1;
      if($scope.paynum==0){
      $scope.pullUrl1 = Signature.login("/user/turntable/draw");
      $http.get($scope.pullUrl1).then(function successCallback(response){
        if(response.data.code == 10000){
          if(response.data.data.winning_result==1){
            $scope.rundial=2;
          }else if(response.data.data.winning_result==2){
            $scope.rundial=10;
          }else if(response.data.data.winning_result==3){
            $scope.rundial=9;
          }else if(response.data.data.winning_result==4){
            $scope.rundial=5;
          }else if(response.data.data.winning_result==5){
            $scope.rundial=7;
          }else if(response.data.data.winning_result==6){
            $scope.rundial=8;
          }else if(response.data.data.winning_result==7){
            $scope.rundial=6;
          }else if(response.data.data.winning_result==8){
            $scope.rundial=4;
          }else if(response.data.data.winning_result==9){
            $scope.rundial=1;
          }else if(response.data.data.winning_result==10){
            $scope.rundial=3;
          }
          newdraw.goto($scope.rundial);
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
        }else{
          $scope.paynum=1;
          alert(response.data.msg);
        }
      }, function errorCallback(response) {
        // 请求失败执行代码
      });
      }
    }
  }
}]);

