/**
 * 淘口令加购
 */
'use strict';
app.controller('applyPcCtrl',['$scope','$rootScope','$http','$location','Signature',function($scope,$rootScope,$http,$location,Signature){
  document.title="货蛮好网-关键词加购";
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
  if(isAndroid){
    $("input").on('click',function () {
      var target = this;
      setTimeout(function () {
        target.scrollIntoView(true);
      },300)
    })
  }
$scope.chooseindex=0;
  // 用户中心/商家中心的切换
  $(".check_choose li").click(function(){
    $(this).addClass("yes_checked");
    $(this).siblings().removeClass("yes_checked");
    var id = $(this).index();
    if(id==0){
      $scope.chooseindex=0;
      chooseindex()
      $(".check_command").show();
      $(".check_titel").hide();
    }else{
      $scope.chooseindex=1;
      chooseindex()
      $(".check_command").hide();
      $(".check_titel").show();
    }
  })

  $rootScope.Ctrltitle={title:""};
  $rootScope.Ctrlcommand={command:""};
  $scope.flog1=false;
  $scope.flog2=false;
  $scope.flog3=false;
  $scope.flog4=false;
  $scope.flog5=false;
  $scope.flog6=false;
  function chooseindex() {
    if($scope.chooseindex==1){
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
    }else{
      $scope.setbackgroundColor=function(flog4){
        var p = "";
        if (flog4==false){
          p = '#666666';
        }else {
          p = '#ff366f';
        }
        return {"background": p};
      }
      $scope.Changein1=function(){
        if($scope.flog4==true){
          $scope.flog4=false;
          $scope.flog5=true;
        }
      }
    }
  }
  chooseindex()



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
  //点击切换数组元素
  var itemresult=$rootScope.items.activity_search_b_o;
  var goodsArr1=$rootScope.items.activity_search_b_o.keyword;
  var goodsArr=$rootScope.items.activity_search_b_o.qrkey_words;
  console.log(goodsArr1)
  var i=1;
  var j=1;
  if(goodsArr1==null||goodsArr1==undefined||goodsArr1==''){
    if(goodsArr!=null&&goodsArr!=undefined&&goodsArr!=''){
      var goodArr = JSON.parse(goodsArr);
      // var goodArr=goodsArr;
      goodArr.sort(compare('ratio'));
      var tt = goodArr[0].keyword;
      $scope.keyword = tt;
      if (goodArr.length >= 2) {
        $scope.Changebtn = function () {
          $scope.keyword = goodArr[i].keyword;
          i++;
          if (i > goodArr.length - 1) {
            i = 0;
          }
        }
      }
    }else {
      $scope.keyword ='';
    }
  }else {
    var goodArr = JSON.parse(goodsArr1);
    // var goodArr=goodsArr;
    goodArr.sort(compare('ratio'));
    var tt = goodArr[0].keyword;
    $scope.keyword = tt;
    if (goodArr.length >= 2) {
      $scope.Changebtn = function () {
        $scope.keyword = goodArr[i].keyword;
        i++;
        if (i > goodArr.length - 1) {
          i = 0;
        }
      }
    }
  }


  //选中框选中与不选中
  var servicesArr=$rootScope.items.activity_search_b_o.discount_service;
  if(servicesArr==null||servicesArr==undefined||servicesArr==''){
  }else {
    var serviceArr=JSON.parse(servicesArr);
    if(serviceArr.free_delivery==1){
      $scope.check1=true;
    }else{
      $scope.check1=false;
    }
    if(serviceArr.present_back_insurance==1){
      $scope.check2=true;
    }else{
      $scope.check2=false;
    }
    if(serviceArr.item_off_pay==1){
      $scope.check3=true;
    }else{
      $scope.check3=false;
    }
    if(serviceArr.tmall==1){
      $scope.check4=true;
    }else{
      $scope.check4=false;
    }
    if(serviceArr.real_item==1){
      $scope.check5=true;
    }else{
      $scope.check5=false;
    }
    if(serviceArr.seven_back==1){
      $scope.check6=true;
    }else{
      $scope.check6=false;
    }
  }

  //排序方式选择
  if(itemresult.sort==1){
    $scope.sort="综合排序";
  }else if(itemresult.sort==2){
    $scope.sort="销量排序";
  }else if(itemresult.sort==3){
    $scope.sort="信用排序";
  }else if(itemresult.sort==4){
    $scope.sort="价钱高到低";
  }else if(itemresult.sort==5){
    $scope.sort="价钱低到高";
  }
  //价格区间选择
  if(itemresult.priceLow==''||itemresult.priceLow==null||itemresult.priceLow==undefined||itemresult.priceHeight==''||itemresult.priceHeight==null||itemresult.priceHeight==undefined){
    $scope.pricerange="无需选择";
    $scope.showstriping=false;
  }else {
    $scope.showstriping=true;
  }


  $scope.Checktital=function () {
    var activityId=$location.$$search.activityId;
    $scope.titleUrl=Signature.login("/user/progress/getItemTitle?activityId="+activityId+"");
    $http.get($scope.titleUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        var goodstitle=response.data.data;
        if(goodstitle.length>5){
          var goodstitlesub=goodstitle.substring(0,5);
        }else {
          goodstitlesub=goodstitle;
        }
        if($scope.chooseindex==1){
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
          if($scope.Ctrlcommand.command==""){
            $scope.flog4=false;
            $scope.flog5=false;
            $scope.flog6=true;
          }else {
            if($scope.Ctrlcommand.command.indexOf(goodstitlesub)!=-1){
              $scope.flog4=true;
              $scope.flog5=false;
              $scope.flog6=false;
            }else{
              $scope.flog4=false;
              $scope.flog5=true;
              $scope.flog6=false;
            }
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
    }else{
      var activityId=$location.$$search.activityId;
      $scope.pullUrl=Signature.login("/user/progress/submitProgress?activityId="+activityId+"&stepType=2");
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.noRepeata=1;
          var  itemresult=response.data.data;
          // $rootScope.items=localStorage.setItem("Scopeitems",JSON.stringify(itemresult));
          var next_current_steps=response.data.data.next_current_steps;
          $scope.urlSkip(next_current_steps);
        }else if(response.data.code==50002){
          $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
          $http.get($scope.pullUrl).then(function successCallback(response) {
            if(response.data.code==10000){

              window.localStorage.access_token = "access_token=" + response.data.data.access_token;
              window.localStorage.session_token = "session_token=" + response.data.data.session_token;
              $scope.noRepeata=0;
            }else {
              alert(response.data.msg);
              $scope.noRepeata=0;
            }
          }, function errorCallback(response) {
            $scope.noRepeata=0;
            // 请求失败执行代码
          });
        }else {
          $scope.noRepeata=0;
          alert(response.data.msg);
        }
      }, function errorCallback(response) {
        $scope.noRepeata=0;
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
  function compare(property){
    return function(a,b){
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
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
