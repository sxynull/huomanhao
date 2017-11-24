/*商品详情页*/
'use strict';

app.controller('detailsCtrl', function($scope,$ionicPopup,$ionicBackdrop,$http,Signature,$location,$ionicScrollDelegate,$timeout,$interval,$filter,$rootScope) {
  document.title = '货蛮好网-商品详情页';
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  $rootScope.isCode=window.localStorage.isCode;
  if($location.$$search.inviteCode!=undefined){
    window.localStorage.invite_code=$location.$$search.inviteCode;
  }
  // console.log($location);
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }

  /*分享弹窗*/
    $scope.action = function() {
            $ionicBackdrop.retain();
             $(".backdrop").html("<div class='retainText' ><svg t='1499854625975' class='icon' style='margin-top: -350px;margin-left: 300px' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='7965' xmlns:xlink='http://www.w3.org/1999/xlink' width='200' height='250' ><defs><style type='text/css'></style></defs><path d='M960 64c6.4 6.4 6.4 12.8 6.4 19.2-12.8 134.4-64 268.8-140.8 364.8-51.2 64-102.4 115.2-160 147.2-19.2 57.6-51.2 108.8-89.6 160C384 972.8 38.4 972.8 19.2 972.8c-12.8 6.4-19.2-6.4-19.2-12.8 0-12.8 6.4-19.2 19.2-19.2 6.4 0 345.6-6.4 524.8-204.8 25.6-32 51.2-64 64-96-38.4 19.2-76.8 25.6-108.8 25.6-57.6 0-108.8-25.6-147.2-76.8-57.6-70.4-57.6-153.6-6.4-217.6 57.6-70.4 147.2-102.4 224-70.4 57.6 25.6 96 76.8 115.2 140.8 6.4 32 6.4 57.6 0 89.6 38.4-32 76.8-70.4 108.8-115.2 70.4-89.6 121.6-217.6 134.4-345.6 0-12.8 12.8-19.2 25.6-19.2 0 12.8 0 12.8 6.4 12.8zM416 588.8c25.6 19.2 57.6 32 89.6 32 38.4 0 83.2-19.2 134.4-44.8 12.8-38.4 12.8-83.2 6.4-121.6-19.2-51.2-51.2-96-96-115.2-51.2-25.6-128 0-172.8 57.6-19.2 25.6-51.2 89.6 6.4 160 6.4 12.8 19.2 25.6 32 32z' fill='#ff99b6' p-id='7966'></path><path d='M960 51.2s0-6.4 0 0c-12.8-6.4-19.2-6.4-19.2 0l-108.8 51.2c-12.8 6.4-12.8 19.2-6.4 25.6 6.4 12.8 19.2 12.8 25.6 6.4l89.6-44.8 44.8 96c6.4 12.8 19.2 12.8 25.6 12.8 12.8-6.4 12.8-19.2 12.8-25.6L966.4 57.6c0-6.4 0-6.4-6.4-6.4z' fill='#ff99b6' p-id='7967'></path></svg><p>1.请点击右上角 <span >[•••]</span> </p><p>2.单击  <i class='icon ion-share' style='color: #ff99b6'></i>  或<svg t='1496979181307' class='icon' style='vertical-align: middle;color: #ff99b6' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2428' xmlns:xlink='http://www.w3.org/1999/xlink' width='50' height='50'><defs><style type='text/css'></style></defs><path d='M397.575436 115.76356l234.391355 287.816125 6.144954-272.446066c-43.393299-18.876929-91.258447-29.433356-141.602042-29.433356C462.14094 101.700263 428.96126 106.696044 397.575436 115.76356' p-id='2429' fill='#ff99b6'></path><path d='M184.537412 285.949614l369.263112 37.752836L365.48353 126.730333c-44.017516 17.33583-85.356017 43.724851-120.911814 79.322603C220.255914 230.327806 200.352609 257.30318 184.537412 285.949614' p-id='2430' fill='#ff99b6'></path><path d='M154.259828 556.904723l287.796682-234.43024-272.446066-6.104021c-18.896372 43.392276-29.411867 91.257423-29.411867 141.621485C140.197554 492.339218 145.133983 525.478989 154.259828 556.904723' p-id='2431' fill='#ff99b6'></path><path d='M324.427462 769.892605l37.752836-369.254925L165.23888 588.977185c17.304108 44.018539 43.674709 85.336574 79.331813 120.930233C268.805654 734.202755 295.780005 754.126526 324.427462 769.892605' p-id='2432' fill='#ff99b6'></path><path d='M595.363128 800.199864 360.97075 512.385786l-6.14393 272.462438c43.433208 18.876929 91.278913 29.434379 141.68186 29.434379C530.7966 814.282604 563.975257 809.305243 595.363128 800.199864' p-id='2433' fill='#ff99b6'></path><path d='M808.379663 630.010741l-369.244692-37.730323 188.339506 196.950627c43.99705-17.33583 85.336574-43.706431 120.93228-79.32465C772.680603 685.653015 792.623817 658.677641 808.379663 630.010741' p-id='2434' fill='#ff99b6'></path><path d='M838.677713 359.078145 550.882054 593.487919l272.425599 6.123464c18.895349-43.412742 29.451776-91.246167 29.451776-141.640927C852.759429 423.664116 847.762625 390.463969 838.677713 359.078145' p-id='2435' fill='#ff99b6'></path><path d='M668.509055 146.06161l-37.732369 369.264135 196.961884-188.320063c-17.324574-44.047192-43.716664-85.336574-79.331813-120.951723C724.151329 181.777043 697.176978 161.834852 668.509055 146.06161' p-id='2436' fill='#ff99b6'></path></svg>分享</p></br></br><p>好友注册下单即可获<span style='color: #ff99b6'>13元</span>奖励</p></div>");
      $(".backdrop").on("click",function(){
        $ionicBackdrop.release()
      })
    };
  $location.$$search.share==1&&$scope.action();      //分享弹窗
  $scope.go=function(url){
    location.href=url;
    location.reload()
  };
  /*增加权重*/
    $scope.addWinning=function(){
      $http.get(Signature.login("/weight/share/raise?activityId="+$location.$$search.activityId)).success(function(response){
                                     if(response.code==10000){

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

    };
  /*返回顶部*/
  $scope.top = function () {
     $ionicScrollDelegate.scrollTop()
   };
  // 当前窗口滚动的高度

     $scope.getHeight = function(){
            $scope.height=$ionicScrollDelegate.getScrollPosition().top;
                            $scope.height==undefined ? $scope.height=1 : $scope.height=$ionicScrollDelegate.getScrollPosition().top;
       return   $scope.height;
     };
  $interval( function(){
    if($scope.getHeight()>1140){
      $scope.flog=true;
    }else {
      $scope.flog=false;
    }
  },100)
  function timer(intDiff) {
           //var intDiff = parseInt(60); //倒计时总秒数量
     // var oldTime = new Date(GoldTimedom.attr("datayear"),GoldTimedom.attr("datamonth"),GoldTimedom.attr("dataday"),13,00,00)
                window.setInterval(function () {
                    var day = 0,
                        hour = 0,
                        minute = 0,
                        second = 0; //时间默认值
                    if (intDiff > 0) {
                        day = Math.floor(intDiff / (60 * 60 * 24));
                        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    }
                    if (hour <= 9){ hour = '0' + hour;}
                    if (minute <= 9){ minute = '0' + minute;}
                    if (second <= 9) {second = '0' + second;}
                    $('.end_time .hour').html( hour );
                    $('.end_time .minute').html( minute );
                    $('.end_time .second').html( second );
                    intDiff--;
                    if(intDiff==0){
                       location.reload()
                    }
                }, 1000);
            }
   /*请求商品详情数据*/
  if($location.$$search.sekill_channel==3){
    $scope.sekill_channel=3;
    $scope.detailsUrl=Signature.login("/item/get?activity_id="+$location.$$search.activityId+"&sekill_channel="+$location.$$search.sekill_channel);
  }else{
    $scope.detailsUrl=Signature.login("/item/get?activity_id="+$location.$$search.activityId);
  }
  $http.get($scope.detailsUrl).success(function(response){
    if(response.code==10000) {
      $scope.detailsData = response.data;
      if($location.$$search.sekill_channel==3) {
        $scope.sys_time = response.data.sys_time;
        var activityTime = $filter('date')($scope.sys_time, 'yyyy/MM/dd') + " 13:00:00";
        var time = (new Date(activityTime).getTime() - $scope.sys_time) / 1000;
        if (time > 0) {
          timer(time);
        }
      }
      //规格分割
      if($scope.detailsData.specifications!=null&&$scope.detailsData.specifications!=undefined){
        if($scope.detailsData.specifications.indexOf("@@")>0){
          var strs= []; //定义一数组
          strs=$scope.detailsData.specifications.split("@@"); //字符分割
          $scope.sku1=strs[0];
          $scope.sku2=strs[1];
        }else if($scope.detailsData.specifications=='@@'||$scope.detailsData.specifications==''){
          $scope.sku1="无";
          $scope.sku2="";
        }
      }
      $scope.item_url = response.data.item_detail_url;
      $scope.item_url.indexOf("#") != -1 && $scope.item_url.substr(0,response.data.item_detail_url.indexOf("#"))
      if($rootScope.open_id==0 || $rootScope.open_id==undefined){
        /*监听微信分享接口*/
        var   sharelink="";
        var url=BASE64.encoder(location.href.split("#")[0]);
            $http.get(Signature.login("/jsapi/signature?url="+url)).success(function(response){
              if(response.code==10000){
                // console.log(response.data);
                var ua = navigator.userAgent.toLowerCase();
                	if (/iphone|ipad|ipod/.test(ua)) {
                		 //  sharelink='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19e44e0012d992ef&redirect_uri=http%3A%2F%2Fm.laqu.com%2Fm%2F&response_type=code&scope=snsapi_base&state='+BASE64.encoder('/details?activityId='+$location.$$search.activityId+'&inviteCode='+localStorage.invited_code)+'&connect_redirect=1#wechat_redirect';
                   sharelink='http://huomanhao.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId;
                	} else if (/android/.test(ua)) {
                   sharelink='http://huomanhao.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId;
                	}

                    $scope.appConfig=response.data;
                wx.config({
                     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                     appId: "wx19e44e0012d992ef", // 必填，公众号的唯一标识
                    // appId: "wxd8ffa2eb1e66e44c", // 必填，公众号的唯一标识  测试 c
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
                        console.log(22);
                    }
                });
                 wx.ready(function(){
                  console.log(11);
                         // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                     //分享到朋友圈
                   wx.onMenuShareTimeline({
                                  title: '我领取了:'+$scope.detailsData.item_name, // 分享标题
                                  desc: '好东西要分享给最好的朋友，快来跟我一起领大牌好货吧', // 分享描述
                                 // link: 'http://laqu.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                // link: 'http://laqu.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                             link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                  imgUrl: $scope.detailsData.item_pic+'!50x50', // 分享图标
                                  type: '', // 分享类型,music、video或link，不填默认为link
                                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                  success: function () {
                                    $ionicBackdrop.release();
                                    $scope.addWinning();
                                      // 用户确认分享后执行的回调函数
                                  },
                                  cancel: function () {
                                      // 用户取消分享后执行的回调函数
                                  }
                              });
                          //分享到朋友
                         wx.onMenuShareAppMessage({
                           title: '我领取了:'+$scope.detailsData.item_name, // 分享标题
                                  desc: '好东西要分享给最好的朋友，快来跟我一起领大牌好货吧', // 分享描述
                             //     link: 'http://laqu.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                          // link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19e44e0012d992ef&redirect_uri=http%3A%2F%2Flaqu.com%2Fm%2F&response_type=code&scope=snsapi_base&state='+BASE64.encoder('/details?activityId='+$location.$$search.activityId+'&inviteCode='+localStorage.invited_code)+'&connect_redirect=1#wechat_redirect', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                           link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                           imgUrl: $scope.detailsData.item_pic+'!50x50', // 分享图标
                                  type: '', // 分享类型,music、video或link，不填默认为link
                                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                  success: function () {
                                    $ionicBackdrop.release();
                                    $scope.addWinning();
                                      // 用户确认分享后执行的回调函数
                                  },
                                  cancel: function () {
                                      // 用户取消分享后执行的回调函数
                                  }
                              });
                         //分享到QQ
                         wx.onMenuShareQQ({
                           title: '我领取了:'+$scope.detailsData.item_name, // 分享标题
                                                    desc: '好东西要分享给最好的朋友，快来跟我一起领大牌好货吧', // 分享描述
                                                //    link: 'http://laqu.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                                    imgUrl: $scope.detailsData.item_pic+'!50x50', // 分享图标
                           //link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19e44e0012d992ef&redirect_uri=http%3A%2F%2Flaqu.com%2Fm%2F&response_type=code&scope=snsapi_base&state='+BASE64.encoder('/details?activityId='+$location.$$search.activityId+'&inviteCode='+localStorage.invited_code)+'&connect_redirect=1#wechat_redirect', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                           link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                                    type: '', // 分享类型,music、video或link，不填默认为link
                                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                    success: function () {
                                                      $ionicBackdrop.release();
                                                      $scope.addWinning();
                                                        // 用户确认分享后执行的回调函数
                                                    },
                                                    cancel: function () {
                                                        // 用户取消分享后执行的回调函数
                                                    }
                              });
                         //分享到QQ空间
                         wx.onMenuShareQZone({
                           title: '我领取了:'+$scope.detailsData.item_name, // 分享标题
                                                    desc: '好东西要分享给最好的朋友，快来跟我一起领大牌好货吧', // 分享描述
                                        //            link: 'http://laqu.com/wap/user/share/activity?userId='+$rootScope.userId+'&activityId='+$location.$$search.activityId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

                           //link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx19e44e0012d992ef&redirect_uri=http%3A%2F%2Flaqu.com%2Fm%2F&response_type=code&scope=snsapi_base&state='+BASE64.encoder('/details?activityId='+$location.$$search.activityId+'&inviteCode='+localStorage.invited_code)+'&connect_redirect=1#wechat_redirect', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                           link: sharelink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                                    imgUrl: $scope.detailsData.item_pic+'!50x50', // 分享图标
                                                    type: '', // 分享类型,music、video或link，不填默认为link
                                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                                    success: function () {
                                                      $ionicBackdrop.release();
                                                      $scope.addWinning();
                                                        // 用户确认分享后执行的回调函数
                                                    },
                                                    cancel: function () {
                                                        // 用户取消分享后执行的回调函数
                                                    }
                              });

                     });
                 wx.error(function(res){
                     console.log(res)
                 })
              }else if(response.code==50002){
                $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
                          $http.get($scope.refUrl).then(function successCallback(response) {
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

      $scope.taobaoImg=Signature.login("/item/detail/get?item_url=" + $scope.item_url);
      $http.get($scope.taobaoImg).success(function (response) {
        $scope.detailsPic = response.data;
        $(".commoditydDetails").html($scope.detailsPic);
        $(".commoditydDetails a").attr("href", "javascript:void(0)");
        $(".commoditydDetails area").attr("href", "javascript:void(0)");
      });
    }else {
      alert(response.msg)
    }
                 })
                   .error(function(response){
                     alert(response.msg)
                   })
                   .finally(function(){

                   });



  /*好货推荐*/

  $scope.getGoods=function(){
    $scope.url = Signature.login("/items?sort_type=" + 2 + "&sort_enum=DESC"  + "&current_page=1"+"&page_size=6&item_category_id="+$scope.detailsData.category_id);
     $scope.goodList=[];
    $http.get($scope.url)
           .success(function (response) {
             if(response.code==10000) {
               // angualr的工具方法
               //angular.forEach(response.restaurants, function (restaurant) {
               //    $scope.restaurants.push(restaurant);    // 将新数据追加到数组中
               //});
               var result = response.data.data;
               //console.log("result.length:" + result.length);
               Array.prototype.push.apply($scope.goodList, response.data.data);
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
               alert(response.msg)
             }
           });
  };

  /*新人流程规则等切换*/
  // $('.particulars').Tabs({
  //   					event: 'click'
  //   				});
  $(".tab_menu li").click(function() {
    $(".tab_menu:eq(0) li").eq($(this).index()).addClass("current").siblings().removeClass('current');
    $(".tab_menu:eq(1) li").eq($(this).index()).addClass("current").siblings().removeClass('current');
    $(".hide1").eq($(this).index()).removeClass('hide').siblings().addClass("hide");
  });

/*金币兑换弹窗*/
  $scope.showConfirm = function() {
    $(".backdrop .retainText").hide();
     var confirmPopup = $ionicPopup.confirm({
       title: '', // String. 弹窗标题。
       subTitle: '', // String (可选)。弹窗的副标题。
       template: '<p class="coin_popup_text" style="margin-top: 0px;"> 请确认使用<em style="color: #FF366F">'+$scope.detailsData.need_coin+'</em>金币兑换该商品,<br>申请兑换之后需要在<em class="color_FF366F">24</em>点之前提交任务，若中途放弃则金币不予返还!</p>', // String (可选)。放在弹窗body内的html模板。
       templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
       cancelText: '放弃宝贝', // String (默认: 'Cancel')。一个取消按钮的文字。
       cancelType: 'details_btn', // String (默认: 'button-default')。取消按钮的类型。
       okText: '兑换', // String (默认: 'OK')。OK按钮的文字。
       okType: 'details_btn', // String (默认: 'button-positive')。OK按钮的类型。
       cssClass: ''
     });
     confirmPopup.then(function(res) {
       if(res) {
         //console.log('You are sure');
         $scope.apply1()
       } else {
        // $(".backdrop .retainText").show();
         //console.log('You are not sure');
       }
     });
     var htmlEl = angular.element(document.querySelector('html'));
     htmlEl.on('click', function (event) {
       if (event.target.nodeName === 'HTML') {
         if (confirmPopup) {//myPopup即为popup
           return false;
           //confirmPopup.close();
         }
       }
     });
   };
  /*用户申请*/
  $scope.ifShow=true;
  $scope.apply=function(){
    if($scope.ifShow==true){
      $scope.ifShow=false;
      if($location.$$search.sekill_channel==3){
        var applyUrl=Signature.login("/user/progress/apply?activityId="+$location.$$search.activityId+"&activityType=3&newType="+$location.$$search.newType+"&sekill_channel=3");

      }else{
        var applyUrl=Signature.login("/user/progress/apply?activityId="+$location.$$search.activityId+"&activityType=1&newType="+$location.$$search.newType);

      }
      $http.get(applyUrl)
                    .success(function(response){

                      if(response.code==10000){
                           $scope.acyivityId=response.data.item_b_o.activity_id;
                        $scope.urlSkip(response.data.next_current_steps);
                                   localStorage.setItem("Scopeitems", JSON.stringify(response.data))
                        $scope.ifShow=true;
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
                      }else if(response.code==600024){     //没有抢购资格
                        var noPosition = $ionicPopup.alert({
                          title: "", // String. 弹窗标题。
                          subTitle: '', // String (可选)。弹窗的副标题。
                          template: '<p class="newShowPopText">您今日的秒杀次数已用完！</p><p class="newShowPopText">去好货精选<span>完成5次申请可额外增加秒杀次数</span></p>', // String (可选)。放在弹窗body内的html模板。
                          templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。

                          okText: '去增加秒杀次数', // String (默认: 'OK')。OK按钮的文字。
                          okType: 'details_btn', // String (默认: 'button-positive')。OK按钮的类型。
                          cssClass: ''
                        });
                        noPosition.then(function(res) {
                          if(res) {
                            location.href="#/tabs/goodList";
                            $scope.ifShow=true;
                          } else {


                            //console.log('You are not sure');
                          }
                        });
                        var htmlEl = angular.element(document.querySelector('html'));
                                                   htmlEl.on('click', function (event) {
                                                     if (event.target.nodeName === 'HTML') {
                                                       if (noPosition) {//myPopup即为popup
                                                         noPosition.close();
                                                       }
                                                     }
                                                   });
                      }else if(response.code==600025){     //在好货精选列表页已申请
                            var already= $ionicPopup.alert({
                              title: "", // String. 弹窗标题。
                              subTitle: '', // String (可选)。弹窗的副标题。
                              template: '<p class="newShowPopText">您已在其他列表页申请过该商品，请选择其他商品申请</p>', // String (可选)。放在弹窗body内的html模板。
                              templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。

                              okText: '去秒杀', // String (默认: 'OK')。OK按钮的文字。
                              okType: 'details_btn', // String (默认: 'button-positive')。OK按钮的类型。
                              cssClass: ''
                            });
                            already.then(function(res) {
                              if(res) {
                                location.href="#/coinSecondsKillIndex";
                                $scope.ifShow=true;
                              } else {
                                //console.log('You are not sure');
                              }
                            });
                            var htmlEl = angular.element(document.querySelector('html'));
                            htmlEl.on('click', function (event) {
                              if (event.target.nodeName === 'HTML') {
                                if (already) {//myPopup即为popup
                                  already.close();
                                }
                              }
                            });
                      }else if(response.code==600026){     //活动库存不足
                            var nogoods= $ionicPopup.alert({
                              title: "", // String. 弹窗标题。
                              subTitle: '', // String (可选)。弹窗的副标题。
                              template: '<p class="newShowPopText">来晚了，改商品份数被抢光啦！</p><p class="newShowPopText">您还可以申请参与明天的抽奖哦</p>', // String (可选)。放在弹窗body内的html模板。
                              templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。

                              okText: '去申请', // String (默认: 'OK')。OK按钮的文字。
                              okType: 'details_btn', // String (默认: 'button-positive')。OK按钮的类型。
                              cssClass: ''
                            });
                            nogoods.then(function(res) {
                              if(res) {
                                location.href="#/coinSecondsKillIndex";
                                $scope.ifShow=true;
                              } else {
                                //console.log('You are not sure');
                              }
                            });
                            var htmlEl = angular.element(document.querySelector('html'));
                            htmlEl.on('click', function (event) {
                              if (event.target.nodeName === 'HTML') {
                                if (nogoods) {//myPopup即为popup
                                  nogoods.close();
                                }
                              }
                            });
                      }else if(response.code==600027){     //金币不足
                            var nocoin= $ionicPopup.alert({
                              title: "", // String. 弹窗标题。
                              subTitle: '', // String (可选)。弹窗的副标题。
                              template: '<p class="newShowPopText">金币不足！</p>', // String (可选)。放在弹窗body内的html模板。
                              templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。

                              okText: '确定', // String (默认: 'OK')。OK按钮的文字。
                              okType: 'details_btn', // String (默认: 'button-positive')。OK按钮的类型。
                              cssClass: ''
                            });
                            nocoin.then(function(res) {
                              if(res) {

                                $scope.ifShow=true;
                              } else {


                                //console.log('You are not sure');
                              }
                            });
                            var htmlEl = angular.element(document.querySelector('html'));
                            htmlEl.on('click', function (event) {
                              if (event.target.nodeName === 'HTML') {
                                if (nocoin) {//myPopup即为popup
                                  nocoin.close();
                                }
                              }
                            });
                      }else if(response.code==60005){
                        $scope.acyivityId=response.data.activity_id;
                              $scope.newList=response.data;
                              if($scope.newList.lottery_status==1){
                                    if($scope.newList.lottery_date_countdown>0){
                                      var confirmPopup = $ionicPopup.confirm({
                                         // title: "", // String. 弹窗标题。
                                         // subTitle: '', // String (可选)。弹窗的副标题。
                                         template: '<p class="newShowPopText pop_head">您还有新人任务未完成</p><p class="newShowPopText">商品名称：<span>'+$scope.newList.item_name+'</span></p><p class="newShowPopText">价格：<span>'+$filter("number")($scope.newList.item_price/100,2)+'</span>  </p>', // String (可选)。放在弹窗body内的html模板。
                                         templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                                         cancelText: '放弃宝贝', // String (默认: 'Cancel')。一个取消按钮的文字。
                                         cancelType: 'details_btn1', // String (默认: 'button-default')。取消按钮的类型。
                                         okText: '继续任务', // String (默认: 'OK')。OK按钮的文字。
                                         okType: 'details_btn2', // String (默认: 'button-positive')。OK按钮的类型。
                                         cssClass: ''
                                       });
                                    }else{
                                      var confirmPopupGiveUp = $ionicPopup.confirm({
                                        // title: "", // String. 弹窗标题。
                                        // subTitle: '', // String (可选)。弹窗的副标题。
                                        template: '<p class="newShowPopText pop_head">您还有新人任务未完成</p><p class="newShowPopText">商品名称：<span>'+$scope.newList.item_name+'</span></p><p class="newShowPopText">价格：<span>'+$filter("number")($scope.newList.item_price/100,2)+'</span>  </p>', // String (可选)。放在弹窗body内的html模板。
                                        templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                                        cancelText: '放弃宝贝', // String (默认: 'Cancel')。一个取消按钮的文字。
                                        cancelType: 'details_btn1', // String (默认: 'button-default')。取消按钮的类型。
                                        okText: '关闭', // String (默认: 'OK')。OK按钮的文字。
                                        okType: 'details_btn2', // String (默认: 'button-positive')。OK按钮的类型。
                                        cssClass: ''
                                      });
                                      confirmPopupGiveUp.then(function(res) {
                                          if(res) {

                                          } else {
                                            $http.get(Signature.login("/user/giveup/newtask")).success(function(response){
                                              if(response.code==10000){

                                              }else{
                                                alert(response.msg);
                                                $scope.ifShow=true;
                                              }
                                            });
                                            //console.log('You are not sure');
                                          }
                                        });
                                    }
                              }else{
                                var confirmPopup = $ionicPopup.confirm({
                                   // title: "", // String. 弹窗标题。
                                   // subTitle: '', // String (可选)。弹窗的副标题。
                                   template: '<p class="newShowPopText pop_head">您还有新人任务未完成</p><p class="newShowPopText">商品名称：<span>'+$scope.newList.item_name+'</span></p><p class="newShowPopText">价格：<span>'+$filter("number")($scope.newList.item_price/100,2)+'</span>  </p>', // String (可选)。放在弹窗body内的html模板。
                                   templateUrl: '', // String (可选)。放在弹窗body内的一个html模板的URL。
                                   cancelText: '放弃宝贝', // String (默认: 'Cancel')。一个取消按钮的文字。
                                   cancelType: 'details_btn1', // String (默认: 'button-default')。取消按钮的类型。
                                   okText: '继续任务', // String (默认: 'OK')。OK按钮的文字。
                                   okType: 'details_btn2', // String (默认: 'button-positive')。OK按钮的类型。
                                   cssClass: ''
                                 });
                              }


                              confirmPopup.then(function(res) {
                               if(res) {
                                 //console.log('You are sure');
                                 $scope.newGoOn();
                                 $scope.ifShow=true;
                               } else {
                                 $http.get(Signature.login("/user/giveup/newtask")).success(function(response){
                                   if(response.code==10000){
                                     $scope.ifShow=true;
                                   }else{
                                     alert(response.msg);
                                     $scope.ifShow=true;
                                   }
                                 });
                                 //console.log('You are not sure');
                               }
                             });
                             var htmlEl = angular.element(document.querySelector('html'));
                             htmlEl.on('click', function (event) {
                               if (event.target.nodeName === 'HTML') {
                                 if (confirmPopup) {//myPopup即为popup
                                   return false;
                                   //confirmPopup.close();
                                 }
                               }
                             })

                      }else if(response.code==80002){
                           location.href="#/taobaoaccountBind"
                      }else{
                        alert(response.msg)
                      }
                  })
                    .error(function(){

                                       })
    }else{

    }

  };
  /*继续任务*/
  $scope.ifGo=true;
  $scope.goOn=function(){
    if($scope.ifGo==true){
      $scope.ifGo=false;
      $http.get(Signature.login("/user/progress/continue?activityId="+$location.$$search.activityId))
              .success(function(response){
                if(response.code==10000) {
                  $scope.acyivityId=response.data.item_b_o.activity_id;
                  $scope.urlSkip(response.data.next_current_steps);
                  localStorage.setItem("Scopeitems", JSON.stringify(response.data))
                  $scope.ifGo=true;
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
                  alert(response.msg);
                  $scope.ifGo=true;
                }
                })
    }

  };
  /*新人继续任务*/
  $scope.ifNew=true;
  $scope.newGoOn=function(){
    if($scope.ifNew==true){
      $scope.ifNew=false;
      $http.get(Signature.login("/user/progress/continue?activityId="+$scope.newList.activity_id))
                 .success(function(response){
                   if(response.code==10000) {
                     $scope.acyivityId=response.data.item_b_o.activity_id;
                     $scope.urlSkip(response.data.next_current_steps);
                     localStorage.setItem("Scopeitems", JSON.stringify(response.data))
                     $scope.ifNew=true;
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
                     alert(response.msg);
                     $scope.ifNew=true;
                   }
                   })
    }

  };
  /*金币兑换*/
  $scope.ifCoin=true;
  $scope.apply1=function(){
    if($scope.ifCoin==true){
      $scope.ifCoin=false;
      $http.get(Signature.login("/user/progress/apply?activityId="+$location.$$search.activityId+"&activityType=2&newType="+$location.$$search.newType))
            .success(function(response){
              if(response.code==10000) {
                $scope.ifCoin=true;
                $scope.acyivityId=response.data.item_b_o.activity_id;
                $scope.urlSkip(response.data.next_current_steps);
                localStorage.setItem("Scopeitems", JSON.stringify(response.data))
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
              }else if(response.code==80002){
                                         location.href="#/taobaoaccountBind"
                                    }else{
                alert(response.msg);
                $scope.ifCoin=true;
              }
              })
    }

  };



  $scope.urlSkip=function (x) {
      switch (x)
      {
        case -2:
          location.href="#/applyEvaluationfinish?activityId="+$scope.acyivityId;
          break;
        case -1:
          location.href="#/tabs/applyIndex?activityStatus=4";
          break;
        case 1:
          location.href="#/applyPc?activityId="+$scope.acyivityId;
          break;
        case 2:
          location.href="#/applyCommand?activityId="+$scope.acyivityId;
          break;
        case 3:
          location.href="#/applyQrcode?activityId="+$scope.acyivityId;
          break;
        case 5:
          location.href="#/applyCollect?activityId="+$scope.acyivityId;
          break;
        case 6:
          location.href="#/applySameshop?activityId="+$scope.acyivityId;
          break;
        case 7:
          location.href="#/applyCompare?activityId="+$scope.acyivityId;
          break;
        case 8:
          location.href="#/applyWangwangchat?activityId="+$scope.acyivityId;
          break;
        case 10:
          location.href="#/applyShoutao?activityId="+$scope.acyivityId;
          break;
        case 11:
          location.href="#/applyRelevance?activityId="+$scope.acyivityId;
          break;
        case 12:
          location.href="#/applyPay?activityId="+$scope.acyivityId;
          break;
        case 14:
          location.href="#/addvalueservicesShowtext?activityId="+$scope.acyivityId;
          break;
        case 15:
          location.href="#/addvalueservicesShowpic?activityId="+$scope.acyivityId;
          break;
        case 16:
          location.href="#/addvalueservicesGoodopinion?activityId="+$scope.acyivityId;
          break;
        case 17:
          location.href="#/addvalueservicesAddgoodopinion?activityId="+$scope.acyivityId;
          break;
        case 18:
          location.href="#/addvalueservicesShare?activityId="+$scope.acyivityId;
          break;
        case 20:
          location.href="#/addvalueservicesAddshowtext?activityId="+$scope.acyivityId;
          break;
        case 21:
          location.href="#/addvalueservicesAddshowpic?activityId="+$scope.acyivityId;
          break;
        case 23:
          location.href="#/notWinning?activityId="+$scope.acyivityId;
          break;
        case 24:
          location.href="#/applyAlreadyfull?activityId="+$scope.acyivityId;
          break;
        case 27:
          location.href="#/applyComplete?activityId="+$scope.acyivityId;
          break;
        case 28:
          location.href="#/applyTomorrow?activityId="+$scope.acyivityId;
          break;
        case 29:
          location.href="#/applyFinish?activityId="+$scope.acyivityId;
          break;
        case 30:
          location.href="#/coinSecondsKillSuccess";
          break;
        case 31:
          location.href="#/coinSecondsKillDefeated";
          break;

      }
    };
  function Request(name)
     {
       var  url=window.location.href;
      var str=url.substr(url.indexOf("?")+1);
        var arr=str.split("&");
       var value=null;
        //console.log(arr)
       for(var i=0;i < arr.length;i++){
                 //console.log(arr[i].indexOf("="))
               var   num=arr[i].indexOf("=");
                  if(num>0){
                   name=arr[i].substring(0,num);
                  value=arr[i].substr(num+1);
                   this[name]=value;
                   }
                  }
                  return arr;
     }





});
