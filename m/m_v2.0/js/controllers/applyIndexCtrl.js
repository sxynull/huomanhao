/**
 * 活动管理
 */
'use strict';
app.controller('applyIndexCtrl',['$scope','$rootScope','$http','$ionicModal','$location','$timeout','$interval','Signature',function($scope,$rootScope,$http,$ionicModal,$location,$timeout,$interval,Signature){
  document.title="货蛮好网-活动管理";
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }
  //ionicModal弹窗，由下往上;
  $ionicModal.fromTemplateUrl('templates/modalindexapply.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(u) {
    $scope.modal.hide();
  };
  // 创建一些scope变量
   $scope.current_page = 1;        // 用来保存当前请求的页码
   $scope.total = 1;       // 用来保存总页数
   $scope.coindata = [];
   $scope.lotteryDate =[];
   // 加载的方法
   $scope.noRepeata=0;
   $scope.pulldowngetdata = function () {
     $scope.current_page = 1;
     $scope.timedata=[];
     // $scope.current_page++;  // 页数++
     $scope.dataUrl=Signature.login("/user/apply/list?activityStatus="+deal_type+"&currentPage=1&page_size=10");
     $scope.noRepeata+=1;
     if($scope.noRepeata>1){
     }else {
       $scope.noRepeata=1;
     $http.get($scope.dataUrl)
       .success(function (response) {
         if(response.code==10000) {
           $scope.noRepeata = 0;
           var result = response.data.data;
           if (response.data.data.length > 0 && deal_type == 1) {
             $('.top_hintindex').css('display', 'block').text("完成任务的同时，您还将获得相应的积分奖励。")
           }
           var result1 = result;
           for (var h = 0; h < result1.length; h++) {
             var item_skuArr = []
             if (result1[h].item_sku.indexOf("@@") > 0) {
               item_skuArr = result1[h].item_sku.split("@@")
               result1[h].item_sku = item_skuArr[0] + "       " + item_skuArr[1]
             } else if (result1[h].item_sku == '@@' || result1[h].item_sku == "" || result1[h].item_sku == null) {
               result1[h].item_sku = '规格：无';
             } else {
               result1[h].item_sku = result1[h].item_sku;
             }
           }


            for (var j = 0; j < result1.length; j++) {
              result1[j].comment_countdown = result1[j].comment_countdown * 60;
            }
            $interval(function () {
              var i
              for (i = 0; i < result1.length; i++) {
                if (result1[i].comment_countdown >= 1) {
                  result1[i].comment_countdown -= 1;
                }
                if (result1[i].comment_countdown == 0) {
                  result1[i].comment_countdown == 0
                }
              }
            }, 1000)

            $interval(function () {
              var i
              for (i = 0; i < result1.length; i++) {
                if (result1[i].countdown >= 1) {
                  result1[i].countdown -= 1;
                }
                if (result1[i].countdown == 0) {
                  result1[i].countdown == 0
                }
              }
            }, 1000)
            for (var j = 0; j < result1.length; j++) {
              result1[j].shop_name = Mosaic(result1[j].shop_name);
              ;
            }

            for (var h = 0; h < result1.length; h++) {
              if (isNaN(result1[h].comment_countdown) == true || result1[h].comment_countdown == undefined) {
                result1[h].comment_countdown = 0;
              }
            }
            $scope.gooddata = result1;
            // 更新总页面数，基于API发送的值
            $scope.total = response.data.total_page; // 示例数据中为30页
          }else {
            alert(response.msg);
          }
        })
        //.error(function (err) {
        //    console.log(err);
        //})
        .finally(function(){
          // 广播事件，告诉无限滚动组件everything is done
          $scope.$broadcast("scroll.infiniteScrollComplete");
        });

    }
  }


  var deal_type=1;
  $(".activityManage_nav li").click(function() {
    if($(this).index()==0||$(this).index()==1){
      if($(this).index()==0){
        deal_type=1;
        if($(".commodity_show").length>0){
          $('.top_hintindex').css('display','block').text("完成任务的同时，您还将获得相应的积分奖励。")
        }else {
          $('.top_hintindex').css('display','none')
        }
      }else if($(this).index()==1){
        deal_type=3;
        if($(".commodity_show").length>0){
          $('.top_hintindex').css('display','block').text("中奖后请务必在规定的时间内领取奖励，否则将视为放弃。")
        }else {
          $('.top_hintindex').css('display','none')
        }
      }
      $(".scrollxli").animate({'scrollLeft': '0px'},{easing: "swing"}, '600')
    }else if($(this).index()==2){
      deal_type=5;
      if($(".commodity_show").length>0){
        $('.top_hintindex').css('display','block').text(" 中奖后请务必在规定的时间内领取奖励，否则将视为放弃！")
      }else {
        $('.top_hintindex').css('display','none')
      }
      $(".scrollxli").animate({'scrollLeft': '200px'},{easing: "swing"}, '600')
    }else if($(this).index()==3){
      deal_type=2;
      $('.top_hintindex').css('display','none')
      $(".scrollxli").animate({'scrollLeft': '380px'},{easing: "swing"}, '600')
    }else if($(this).index()==4){
      deal_type=8;
      $('.top_hintindex').css('display','none')
      $(".scrollxli").animate({'scrollLeft': '580px'},{easing: "swing"}, '600')
    }else if($(this).index()==5){
      deal_type=99;
      $('.top_hintindex').css('display','none')
      $(".scrollxli").animate({'scrollLeft': '750px'},{easing: "swing"}, '600')
    }
    $(".activityManage_nav li").eq($(this).index()).addClass("current").siblings().removeClass('current');
    $scope.pulldowngetdata()
  });
  $scope.applyacount=function () {
    $scope.applyUrl=Signature.login("/user/apply/count");
    $http.get($scope.applyUrl).then(function successCallback(response) {
      if (response.data.code == 10000) {
        $scope.applyAcount=response.data.data;
      } else {
        alert(response.data.msg);
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });
  }
  $scope.applyacount();
  $rootScope.$on('$stateChangeSuccess',function (event,toState,toParams,fromSate,fromParams) {
    if(fromSate.url=="/personalCenter"){
      var urlnum=$location.$$search.activityStatus;
      if(urlnum==1){
        deal_type=1;
        $(".activityManage_nav li").eq(0).addClass("current").siblings().removeClass('current');
        $(".scrollxli").animate({'scrollLeft': '0px'},{easing: "swing"}, '600')
        $scope.pulldowngetdata()
      }else if(urlnum==2){
        deal_type=3;
        $(".activityManage_nav li").eq(1).addClass("current").siblings().removeClass('current');
        $(".scrollxli").animate({'scrollLeft': '0px'},{easing: "swing"}, '600')
        $scope.pulldowngetdata()
      }else if(urlnum==3){
        deal_type=5;
        $(".activityManage_nav li").eq(2).addClass("current").siblings().removeClass('current');
        $(".scrollxli").animate({'scrollLeft': '200px'},{easing: "swing"}, '600')
        $scope.pulldowngetdata()
      }else if(urlnum==4){
        deal_type=2;
        $(".activityManage_nav li").eq(3).addClass("current").siblings().removeClass('current');
        $(".scrollxli").animate({'scrollLeft': '380px'},{easing: "swing"}, '600')
        $scope.pulldowngetdata()
      }else if(urlnum==5){
        deal_type=8;
        $(".activityManage_nav li").eq(4).addClass("current").siblings().removeClass('current');
        $(".scrollxli").animate({'scrollLeft': '580px'},{easing: "swing"}, '600')
        $scope.pulldowngetdata()
      }
    }


    });

  var urlnum=$location.$$search.activityStatus;
  if(urlnum==1){
    deal_type=1;
    $(".activityManage_nav li").eq(0).addClass("current").siblings().removeClass('current');
    $(".scrollxli").animate({'scrollLeft': '0px'},{easing: "swing"}, '600')

  }else if(urlnum==2){
    deal_type=3;
    $(".activityManage_nav li").eq(1).addClass("current").siblings().removeClass('current');
    $(".scrollxli").animate({'scrollLeft': '0px'},{easing: "swing"}, '600');

  }else if(urlnum==3){
    deal_type=5;
    $(".activityManage_nav li").eq(2).addClass("current").siblings().removeClass('current');
    $(".scrollxli").animate({'scrollLeft': '200px'},{easing: "swing"}, '600');

  }else if(urlnum==4){
    deal_type=2;
    $(".activityManage_nav li").eq(3).addClass("current").siblings().removeClass('current');
    $(".scrollxli").animate({'scrollLeft': '380px'},{easing: "swing"}, '600');

  }else if(urlnum==5){
    deal_type=8;
    $(".activityManage_nav li").eq(4).addClass("current").siblings().removeClass('current');
    $(".scrollxli").animate({'scrollLeft': '580px'},{easing: "swing"}, '600');

  }


  $scope.pulldowngetdata();    // 加载时，从API加载第一页数据
// 加载的方法
  $scope.pulldowngetdata1 = function () {
    $scope.timedata=[];
    $scope.current_page++;  // 页数++
    console.log("$scope.page:" + $scope.page);
    $scope.dataUrl=Signature.login("/user/apply/list?activityStatus="+deal_type+"&currentPage="+$scope.current_page+"&page_size=10");
    $http.get($scope.dataUrl)
      .success(function (response) {
        if(response.code==10000) {
          var result = response.data.data;
          var result1 = result;
          if (result1 != undefined && result1 != null && result1 != '') {
            for (var h = 0; h < result1.length; h++) {
              var item_skuArr = []
              if (result1[h].item_sku.indexOf("@@") != -1 && result1[h].item_sku != '@@') {
                item_skuArr = result1[h].item_sku.split("@@")
                result1[h].item_sku = item_skuArr[0] + "       " + item_skuArr[1]
              } else if (result1[h].item_sku == '@@' || result1[h].item_sku == "" || result1[h].item_sku == null || result1[h].item_sku == undefined) {
                result1[h].item_sku = '规格：无';
              } else {
                result1[h].item_sku = result1[h].item_sku;
              }
            }
          }

          for (var j = 0; j < result1.length; j++) {
            result1[j].comment_countdown = result1[j].comment_countdown * 60;
          }
          $interval(function () {
            var i
            for (i = 0; i < result1.length; i++) {
              if (result1[i].comment_countdown >= 1) {
                result1[i].comment_countdown -= 1;
              }
              if (result1[i].comment_countdown == 0) {
                result1[i].comment_countdown == 0
              }
            }
          }, 1000)

          $interval(function () {
            var i
            for (i = 0; i < result1.length; i++) {
              if (result1[i].countdown >= 1) {
                result1[i].countdown -= 1;
              }
              if (result1[i].countdown == 0) {
                result1[i].countdown == 0
              }
            }
          }, 1000)
          for (var j = 0; j < result1.length; j++) {
            if (result1[j].shop_name == null || result1[j].shop_name == undefined || result1[j].shop_name == '') {
              result1[j].shop_name == '';
            } else {
              result1[j].shop_name = Mosaic(result1[j].shop_name);
            }
          }

          Array.prototype.push.apply($scope.gooddata, result1);
          // 更新总页面数，基于API发送的值
          $scope.total = response.data.total_page; // 示例数据中为30页
        }else {
          alert(response.msg);
        }
      })
      // .error(function (err) {
      //    console.log(err);
      // })
      .finally(function(){
        // 广播事件，告诉无限滚动组件everything is done
        $scope.$broadcast("scroll.infiniteScrollComplete");
      });

  };

  $scope.applyIndexRefresh = function () {
    $scope.current_page = 1;
    $scope.timedata=[];
    // $scope.current_page++;  // 页数++
    $scope.dataUrl=Signature.login("/user/apply/list?activityStatus="+deal_type+"&currentPage=1&page_size=10");
    $http.get($scope.dataUrl)
      .success(function (response) {
        if(response.code==10000) {
          var result = response.data.data;
          if (response.data.data.length > 0 && deal_type == 1) {
            $('.top_hintindex').css('display', 'block').text("完成任务的同时，您还将获得相应的积分奖励。")
          }
          var result1 = result;
          for (var h = 0; h < result1.length; h++) {
            var item_skuArr = []
            if (result1[h].item_sku.indexOf("@@") > 0) {
              item_skuArr = result1[h].item_sku.split("@@")
              result1[h].item_sku = item_skuArr[0] + "       " + item_skuArr[1]
            } else if (result1[h].item_sku == '@@' || result1[h].item_sku == "" || result1[h].item_sku == null) {
              result1[h].item_sku = '规格：无';
            } else {
              result1[h].item_sku = result1[h].item_sku;
            }
          }


          for (var j = 0; j < result1.length; j++) {
            result1[j].comment_countdown = result1[j].comment_countdown * 60;
          }
          $interval(function () {
            var i
            for (i = 0; i < result1.length; i++) {
              if (result1[i].comment_countdown >= 1) {
                result1[i].comment_countdown -= 1;
              }
              if (result1[i].comment_countdown == 0) {
                result1[i].comment_countdown == 0
              }
            }
          }, 1000)

          $interval(function () {
            var i
            for (i = 0; i < result1.length; i++) {
              if (result1[i].countdown >= 1) {
                result1[i].countdown -= 1;
              }
              if (result1[i].countdown == 0) {
                result1[i].countdown == 0
              }
            }
          }, 1000)
          for (var j = 0; j < result1.length; j++) {
            result1[j].shop_name = Mosaic(result1[j].shop_name);
            ;
          }

          for (var h = 0; h < result1.length; h++) {
            if (isNaN(result1[h].comment_countdown) == true || result1[h].comment_countdown == undefined) {
              result1[h].comment_countdown = 0;
            }
          }
          $scope.gooddata = result1;
          // 更新总页面数，基于API发送的值
          $scope.total = response.data.total_page; // 示例数据中为30页
        }else {
          alert(response.data.msg);
        }
      })
      //.error(function (err) {
      //    console.log(err);
      //})
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete');
      });

  };

//店铺打马赛克
  function Mosaic(value) {
    var str1=value;
    var arr = str1.split("");
    for (var i = 2; i < arr.length; i = i + 2) {
      arr[i] = "*";
    }
    var str2 = arr.join("");
    return str2;
  }


  $scope.noRepeatb=0;
  $scope.gotodata=function (activityId) {
    if(activityId==null||activityId==''||activityId==undefined){
      alert("活动ID异常")
    }else {
      $scope.noRepeatb+=1;
      console.log($scope.noRepeatb);
      if($scope.noRepeatb>1){
        alert("请勿重复点击")
      }else {
        $scope.noRepeatb=1;
        $scope.dataUrl=Signature.login("/user/progress/continue?activityId="+activityId+"");
        console.log($scope.dataUrl)
        $http.get($scope.dataUrl).then(function successCallback(response) {
            if (response.data.code == 10000) {

              var itemresult = response.data.data;
              $rootScope.items = localStorage.setItem("Scopeitems", JSON.stringify(itemresult));
              var next_current_steps = response.data.data.next_current_steps;
              $scope.noRepeatb=0;
              $scope.urlSkip(next_current_steps,activityId);

            } else if(response.data.code==50002){
              $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
              $http.get($scope.refUrl).then(function successCallback(response) {
                if(response.data.code==10000){
                  window.localStorage.access_token = "access_token=" + response.data.data.access_token;
                  window.localStorage.session_token = "session_token=" + response.data.data.session_token;
                  $scope.noRepeatb=0;
                }else {
                  alert(response.data.msg);
                  $scope.noRepeatb=0;
                }
              }, function errorCallback(response) {
                alert("请求失败！")
                $scope.noRepeatb=0;
                // 请求失败执行代码
              });
            }else {
              alert(response.data.msg);
              $scope.noRepeatb=0;
            }
          }
          , function errorCallback(response) {
            alert("请求失败！")
            // 请求失败执行代码
          });
      }
    }

  }
  $scope.urlSkip=function (x,activityId) {
    switch (x)
    {
      case -2:
        location.href="#/applyEvaluationfinish?activityId="+activityId+"";
        break;
      case -1:
        break;
      case 1:
        location.href="#/applyPc?activityId="+activityId+"";
        break;
      case 2:
        location.href="#/applyCommand?activityId="+activityId+"";
        break;
      case 3:
        location.href="#/applyQrcode?activityId="+activityId+"";
        break;
      case 5:
        location.href="#/applyCollect?activityId="+activityId+"";
        break;
      case 6:
        location.href="#/applySameshop?activityId="+activityId+"";
        break;
      case 7:
        location.href="#/applyCompare?activityId="+activityId+"";
        break;
      case 8:
        location.href="#/applyWangwangchat?activityId="+activityId+"";
        break;
      case 10:
        location.href="#/applyShoutao?activityId="+activityId+"";
        break;
      case 11:
        location.href="#/applyRelevance";
        break;
      case 12:
        location.href="#/applyPay?activityId="+activityId+"";
        break;
      case 14:
        location.href="#/addvalueservicesShowtext?activityId="+activityId+"";
        break;
      case 15:
        location.href="#/addvalueservicesShowpic?activityId="+activityId+"";
        break;
      case 16:
        location.href="#/addvalueservicesGoodopinion?activityId="+activityId+"";
        break;
      case 17:
        location.href="#/addvalueservicesAddgoodopinion?activityId="+activityId+"";
        break;
      case 18:
        location.href="#/addvalueservicesShare?activityId="+activityId+"";
        break;
      case 20:
        location.href="#/addvalueservicesAddshowtext?activityId="+activityId+"";
        break;
      case 21:
        location.href="#/addvalueservicesAddshowpic?activityId="+activityId+"";
        break;
      case 23:
        location.href="#/notWinning?activityId="+activityId+"";
        break;
      case 24:
        location.href="#/applyAlreadyfull";
        break;
      case 25:
        location.href="#/applyovertime";
        break;
      case 27:
        location.href="#/applyComplete";
        break;
      case 28:
        location.href="#/applyTomorrow";
        break;
      case 29:
        location.href="#/applyFinish";
        break;
      case 30:
        location.href="#/coinSecondsKillSuccess";
        break;
      case 31:
        location.href="#/coinSecondsKillDefeated";
        break;

    }
  }


  $scope.assignment=function (text) {
    $scope.refuseText=text;
  }

}]);

