/**
 * 淘口令加购
 */
'use strict';
app.controller('applyCommandCtrl',['$scope','$rootScope','$http','$location','Signature',function($scope,$rootScope,$http,$location,Signature){
  document.title="货蛮好网-淘口令加购";
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  $scope.flogshow=true;
  if(isAndroid){
    $("input").on('click',function () {
      var target = this;
      setTimeout(function () {
        target.scrollIntoView(true);
      },300)
    })
  }
  if(isiOS){
    $scope.flogshow=false;
  }


  $rootScope.Ctrltitle={title:""};
  $scope.flog1=false;
  $scope.flog2=false;
  $scope.flog3=false;
  $scope.setbackgroundColor=function(flog1){
    var p = "";
    if (flog1==false){
      p = '#666666';
    }else {
      p = '#ff366f';
    }
    return {"background": p};
  }


  $scope.Changein=function(){
    if($scope.flog1==true){
      $scope.flog1=false;
      $scope.flog2=true;
    }
  }
  $rootScope.items=JSON.parse(localStorage.getItem("Scopeitems"));
  if($rootScope.items.item_b_o.sku!=null&&$rootScope.items.item_b_o.sku!=undefined&&$rootScope.items.item_b_o.sku1!=""){
    if($rootScope.items.item_b_o.sku.indexOf("@@")>0){
      var strs= []; //定义一数组
      strs=$rootScope.items.item_b_o.sku.split("@@"); //字符分割
      $scope.sku1=strs[0];
      $scope.sku2=strs[1];
    }else if($rootScope.items.item_b_o.sku=='@@'||$rootScope.items.item_b_o.sku==''){
      $scope.sku1="无";
      $scope.sku2="";
    }
  }
  $scope.shop_name=Mosaic($rootScope.items.item_b_o.shop_name);
  if($rootScope.items.item_b_o.taobao_nick!=null&&$rootScope.items.item_b_o.taobao_nick!=undefined&&$rootScope.items.item_b_o.taobao_nick!=''){
    $scope.wangwang_name=Mosaic($rootScope.items.item_b_o.taobao_nick);
  }
  $scope.Checktital=function () {
    var activityId=$location.$$search.activityId;
    $scope.titleUrl=Signature.login("/user/progress/getItemTitle?activityId="+activityId+"");
    $http.get($scope.titleUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        var goodstitle=response.data.data;
        var goodtitle =rtrim(goodstitle.substring(0, 3));
        if($scope.Ctrltitle.title==""){
          $scope.flog1=false;
          $scope.flog2=false;
          $scope.flog3=true;
        }else {
          if(goodtitle==$scope.Ctrltitle.title){
            $scope.flog1=true;
            $scope.flog2=false;
            $scope.flog3=false;
          }else{
            $scope.flog1=false;
            $scope.flog2=true;
            $scope.flog3=false;
          }
        }
      }else {
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });
  }
  function rtrim(str){ //删除右边的空格
    return str.replace(/(\s*$)/g,"");
  }
  $scope.noRepeata=0;
  $scope.toLink=function () {
    $scope.noRepeata+=1;
    if($scope.noRepeata>1){
      alert("正在提交")
    }else {
      var activityId=$location.$$search.activityId;
      $scope.pullUrl=Signature.login("/user/progress/submitProgress?activityId="+activityId+"&stepType=2");
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.noRepeata=1;
          var  itemresult=response.data.data;
          $rootScope.items=localStorage.setItem("Scopeitems",JSON.stringify(itemresult));
          var next_current_steps=response.data.data.next_current_steps;
          $scope.urlSkip(next_current_steps);
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
          $scope.noRepeata=0;
        }
      }, function errorCallback(response) {
        // 请求失败执行代码
      });
    }

  }

  $scope.urlSkip=function (x) {
    var activityId=$location.$$search.activityId;
    switch (x)
    {
      case -2:
        location.href="#/applyEvaluationfinish?activityId="+activityId+"";
        break;
      case -1:
        location.href="#/tabs/applyIndex";
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

  var targetText=$("#copydialog").text();
  var clipboard = new Clipboard('#copybtn');

  // clipboard.on('success', function(e) {
  //   console.info('Action:', e.action);
  //   console.info('Text:', e.text);
  //   console.info('Trigger:', e.trigger);
  //   alert("复制成功");
  //   e.clearSelection();
  // });
  clipboard.on("success",function (element) {//复制成功的回调
    alert("复制成功")
  });
  clipboard.on("error",function (element) {//复制失败的回调
    alert("复制失败，请长按淘口令复制")
  })
}]);
