/*代言人专题页*/
'use strict';

app.controller('spokesmanPageCtrl', function($scope,$location,$http,$timeout,$ionicBackdrop,Signature,$ionicSlideBoxDelegate,$rootScope) {
  document.title="货蛮好网-代言人专题页";
  $rootScope.open_id=window.localStorage.open_id;
  $rootScope.isCode=window.localStorage.isCode;
  /*解决当轮播图只有两张的时候重复轮播*/
  $scope.slideChange= function(index) {
          $scope.slideIndex = index;
          ($ionicSlideBoxDelegate.count() -1 ) == index && $timeout(function(){$ionicSlideBoxDelegate.slide(0);},3000);
      };
  $scope.repeatDone = function() {
        $ionicSlideBoxDelegate.update();
        //$ionicSlideBoxDelegate.slide($scope.week.length - 1, 1);
      };

  $scope.action = function() {
         $ionicBackdrop.retain();
    $(".backdrop").html("<div class='retainText' ><svg t='1499854625975' class='icon' style='margin-top: -350px;margin-left: 300px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7965' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='250' ><defs><style type='text/css'></style></defs><path d='M960 64c6.4 6.4 6.4 12.8 6.4 19.2-12.8 134.4-64 268.8-140.8 364.8-51.2 64-102.4 115.2-160 147.2-19.2 57.6-51.2 108.8-89.6 160C384 972.8 38.4 972.8 19.2 972.8c-12.8 6.4-19.2-6.4-19.2-12.8 0-12.8 6.4-19.2 19.2-19.2 6.4 0 345.6-6.4 524.8-204.8 25.6-32 51.2-64 64-96-38.4 19.2-76.8 25.6-108.8 25.6-57.6 0-108.8-25.6-147.2-76.8-57.6-70.4-57.6-153.6-6.4-217.6 57.6-70.4 147.2-102.4 224-70.4 57.6 25.6 96 76.8 115.2 140.8 6.4 32 6.4 57.6 0 89.6 38.4-32 76.8-70.4 108.8-115.2 70.4-89.6 121.6-217.6 134.4-345.6 0-12.8 12.8-19.2 25.6-19.2 0 12.8 0 12.8 6.4 12.8zM416 588.8c25.6 19.2 57.6 32 89.6 32 38.4 0 83.2-19.2 134.4-44.8 12.8-38.4 12.8-83.2 6.4-121.6-19.2-51.2-51.2-96-96-115.2-51.2-25.6-128 0-172.8 57.6-19.2 25.6-51.2 89.6 6.4 160 6.4 12.8 19.2 25.6 32 32z' fill='#ff99b6' p-id='7966'></path><path d='M960 51.2s0-6.4 0 0c-12.8-6.4-19.2-6.4-19.2 0l-108.8 51.2c-12.8 6.4-12.8 19.2-6.4 25.6 6.4 12.8 19.2 12.8 25.6 6.4l89.6-44.8 44.8 96c6.4 12.8 19.2 12.8 25.6 12.8 12.8-6.4 12.8-19.2 12.8-25.6L966.4 57.6c0-6.4 0-6.4-6.4-6.4z' fill='#ff99b6' p-id='7967'></path></svg><p>1.请点击右上角 <span style='color:#ff99b6 '>[•••</span> </p><p>2.单击  <i class='icon ion-share' style='color: #ff99b6'></i>  或<svg t='1496979181307' class='icon' style='vertical-align: middle;' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2428' xmlns:xlink='http://www.w3.org/1999/xlink' width='50' height='50'><defs><style type='text/css'></style></defs><path d='M397.575436 115.76356l234.391355 287.816125 6.144954-272.446066c-43.393299-18.876929-91.258447-29.433356-141.602042-29.433356C462.14094 101.700263 428.96126 106.696044 397.575436 115.76356' p-id='2429' fill='#ff99b6'></path><path d='M184.537412 285.949614l369.263112 37.752836L365.48353 126.730333c-44.017516 17.33583-85.356017 43.724851-120.911814 79.322603C220.255914 230.327806 200.352609 257.30318 184.537412 285.949614' p-id='2430' fill='#ff99b6'></path><path d='M154.259828 556.904723l287.796682-234.43024-272.446066-6.104021c-18.896372 43.392276-29.411867 91.257423-29.411867 141.621485C140.197554 492.339218 145.133983 525.478989 154.259828 556.904723' p-id='2431' fill='#ff99b6'></path><path d='M324.427462 769.892605l37.752836-369.254925L165.23888 588.977185c17.304108 44.018539 43.674709 85.336574 79.331813 120.930233C268.805654 734.202755 295.780005 754.126526 324.427462 769.892605' p-id='2432' fill='#ff99b6'></path><path d='M595.363128 800.199864 360.97075 512.385786l-6.14393 272.462438c43.433208 18.876929 91.278913 29.434379 141.68186 29.434379C530.7966 814.282604 563.975257 809.305243 595.363128 800.199864' p-id='2433' fill='#ff99b6'></path><path d='M808.379663 630.010741l-369.244692-37.730323 188.339506 196.950627c43.99705-17.33583 85.336574-43.706431 120.93228-79.32465C772.680603 685.653015 792.623817 658.677641 808.379663 630.010741' p-id='2434' fill='#ff99b6'></path><path d='M838.677713 359.078145 550.882054 593.487919l272.425599 6.123464c18.895349-43.412742 29.451776-91.246167 29.451776-141.640927C852.759429 423.664116 847.762625 390.463969 838.677713 359.078145' p-id='2435' fill='#ff99b6'></path><path d='M668.509055 146.06161l-37.732369 369.264135 196.961884-188.320063c-17.324574-44.047192-43.716664-85.336574-79.331813-120.951723C724.151329 181.777043 697.176978 161.834852 668.509055 146.06161' p-id='2436' fill='#ff99b6'></path></svg>分享</p></br></br><p>好友注册下单即可获<span style='color: #ff99b6'>13元</span>奖励</p></div>");
    $(".backdrop").on("click",function(){
          $ionicBackdrop.release()
        })
  };
  if($rootScope.open_id==0 || $rootScope.open_id==undefined){
    $http.get(Signature.login("/member/get")).success(function(response){
         if(response.code==10000){
               $scope.invite_code=response.data.invite_code;
               if($rootScope.open_id==0 || $rootScope.open_id!=undefined){
                 /*监听微信分享接口*/
                             var url=BASE64.encoder(location.href.split('#')[0]);
                                 $http.get(Signature.login("/jsapi/signature?url="+url)).success(function(response){
                                   if(response.code==10000){
                                         $scope.appConfig=response.data;
                                     wx.config({
                                          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                         appId: "wx19e44e0012d992ef", // 必填，公众号的唯一标识线上 x
                                          //appId: "wxd8ffa2eb1e66e44c", // 必填，公众号的唯一标识测试 x

                                          timestamp: $scope.appConfig.timestamp, // 必填，生成签名的时间戳
                                          nonceStr: $scope.appConfig.noncestr, // 必填，生成签名的随机串
                                          signature: $scope.appConfig.signature,// 必填，签名，见附录1
                                          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                                      });
                                     wx.checkJsApi({
                                         jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                         success: function(res) {
                                             // 以键值对的形式返回，可用的api值true，不可用为false
                                             // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                         }
                                     });
                                      wx.ready(function(){
                                              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                                          //分享到朋友圈
                                        wx.onMenuShareTimeline({
                                                       title: '亲测真实，人品担保，无需任何费用，每月免费领取百件好货！', // 分享标题
                                                       desc: '每天只需花1分钟帮商家做任务即可！', // 分享描述

                                                       link: 'http://huomanhao.com/wealth/user/spokesman/inviteUrl?inviteCode='+$scope.invite_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                                       imgUrl: 'http://m.huomanhao.com/huomanhao/images/img1511254419083_291.png', // 分享图标
                                                       type: '', // 分享类型,music、video或link，不填默认为link
                                                       dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                       success: function () {

                                                         $ionicBackdrop.release();
                                                           // 用户确认分享后执行的回调函数
                                                       },
                                                       cancel: function () {
                                                           // 用户取消分享后执行的回调函数
                                                       }
                                                   });
                                               //分享到朋友
                                              wx.onMenuShareAppMessage({
                                                title: '亲测真实，人品担保，无需任何费用，每月免费领取百件好货！', // 分享标题
                                                desc: '每天只需花1分钟帮商家做任务即可！', // 分享描述

                                                link: 'http://huomanhao.com/wealth/user/spokesman/inviteUrl?inviteCode='+$scope.invite_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                                                imgUrl: 'http://m.huomanhao.com/huomanhao/images/img1511254419083_291.png', // 分享图标
                                                type: '', // 分享类型,music、video或link，不填默认为link
                                                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                success: function () {
                                                  $ionicBackdrop.release();
                                                  // 用户确认分享后执行的回调函数
                                                },
                                                cancel: function () {
                                                  // 用户取消分享后执行的回调函数
                                                }
                                                   });
                                              //分享到QQ
                                              wx.onMenuShareQQ({
                                                title: '亲测真实，人品担保，无需任何费用，每月免费领取百件好货！', // 分享标题
                                                                           desc: '每天只需花1分钟帮商家做任务即可！', // 分享描述

                                                                           link: 'http://huomanhao.com/wealth/user/spokesman/inviteUrl?inviteCode='+$scope.invite_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                                                                           imgUrl: 'http://m.huomanhao.com/huomanhao/images/img1511254419083_291.png', // 分享图标
                                                                           type: '', // 分享类型,music、video或link，不填默认为link
                                                                           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                                           success: function () {

                                                                             $ionicBackdrop.release();
                                                                               // 用户确认分享后执行的回调函数
                                                                           },
                                                                           cancel: function () {
                                                                               // 用户取消分享后执行的回调函数
                                                                           }
                                                   });
                                              //分享到QQ空间
                                              wx.onMenuShareQZone({
                                                title: '亲测真实，人品担保，无需任何费用，每月免费领取百件好货！', // 分享标题
                                                                           desc: '每天只需花1分钟帮商家做任务即可！', // 分享描述

                                                                           link: 'http://huomanhao.com/wealth/user/spokesman/inviteUrl?inviteCode='+$scope.invite_code, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                                                                           imgUrl: 'http://m.huomanhao.com/huomanhao/images/img1511254419083_291.png', // 分享图标
                                                                           type: '', // 分享类型,music、video或link，不填默认为link
                                                                           dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                                           success: function () {

                                                                             $ionicBackdrop.release();
                                                                               // 用户确认分享后执行的回调函数
                                                                           },
                                                                           cancel: function () {
                                                                               // 用户取消分享后执行的回调函数
                                                                           }
                                                   });

                                          });
                                   }else if(response.code==50002){
                                     $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
                                               $http.get($scope.pullUrl).then(function successCallback(response) {
                                                 if (response.data.code == 10000) {
                                                   window.localStorage.access_token = "access_token=" + response.data.data.access_token;
                                                   window.localStorage.session_token = "session_token=" + response.data.data.session_token;
                                                 } else {
                                                   alert(response.data.msg);
                                                 }
                                               })
                                   }else{
                                     alert(response.msg)
                                   }
                                 });
               }


         }else if(response.code==50002){
           $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
           $http.get($scope.pullUrl).then(function successCallback(response) {
             if (response.data.code == 10000) {
               window.localStorage.access_token = "access_token=" + response.data.data.access_token;
               window.localStorage.session_token = "session_token=" + response.data.data.session_token;
             } else {
               alert(response.data.msg);
             }
           })
         }else{
           alert(response.msg)
         }
      });
    $scope.spokesmanUrl=Signature.login("/wealth/spokesman/info");
                  $http.get($scope.spokesmanUrl).success(function(response){
                         $scope.spokesmanData=response.data;
                  })
                    .error(function(){

                    })
                    .finally(function(){

                    });
                  $scope.adsUrl=Signature.login("/advertisement?model_code=mobile_distribution_code");
                  $http.get($scope.adsUrl).success(function(response){
                         $scope.adsList=response.data;
                  })
                    .error(function(){

                    })
                    .finally(function(){

                    });
  }

  /*增加权重*/
    $scope.addWinning=function(){
      $http.get(Signature.login("/weight/share/raise?activityId="+$location.$$search.activityId)).success(function(response){
                                     if(response.code==10000){

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

    };



});
