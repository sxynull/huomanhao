/**
 * 濂借瘎缃《
 */
'use strict';
app.controller('addvalueservicesGoodopinionCtrl',['$scope','$rootScope','$http','$ionicModal','$location','$interval','Signature','$filter',function($scope,$rootScope,$http,$ionicModal,$location,$interval,Signature,$filter){
  document.title="货蛮好网-好评置顶";
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }
  //ionicModal寮圭獥锛岀敱涓嬪線涓�;
  $ionicModal.fromTemplateUrl('templates/modalgoodopinion.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.createContact = function(u) {
    $scope.modal.hide();
  };

  $rootScope.items=JSON.parse(localStorage.getItem("Scopeitems"));
  //瑙勬牸鍒嗗壊
  if($rootScope.items.item_b_o.sku!=null&&$rootScope.items.item_b_o.sku!=undefined&&$rootScope.items.item_b_o.sku1!=""){
    if($rootScope.items.item_b_o.sku.indexOf("@@")>0){
      var strs= []; //瀹氫箟涓�鏁扮粍
      strs=$rootScope.items.item_b_o.sku.split("@@"); //瀛楃鍒嗗壊
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
  var showPics=$rootScope.items.praise_text1_url;
  $scope.showPicArr=[];
  $scope.showPicArr=showPics.split('@@');
  if($scope.showPicArr.length==4){
    $(".lineheight").css("height","1780px");
  }else if($scope.showPicArr.length==3){
    $(".lineheight").css("height","1468px");
  }else if($scope.showPicArr.length==2){
    $(".lineheight").css("height","1156px");
  }else if($scope.showPicArr.length==1){
    $(".lineheight").css("height","844px");
  }

  $scope.noRepeata=0;
  $scope.toLink=function () {
    var activityId=$location.$$search.activityId;
    $rootScope.items=JSON.parse(localStorage.getItem("Scopeitems"));
    if ($rootScope.items.audit_status==2) {
      $scope.pullUrl = Signature.login("/user/progress/update?activityId=" + activityId + "&stepType=16&imgUrl1="+$scope.imgurl1+"");
    }else {
      $scope.pullUrl = Signature.login("/user/progress/submitProgress?activityId=" + activityId + "&stepType=16&imgUrl1="+$scope.imgurl1+"");
    }
    $scope.noRepeata+=1;
    console.log($scope.noRepeata);
    if($scope.noRepeata>1){
      alert("正在提交")
    }else {
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.noRepeata=1;
          var  itemresult=response.data.data;
          $rootScope.items=localStorage.setItem("Scopeitems",JSON.stringify(itemresult));
          $scope.urlSkip(-1);
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
            // 璇锋眰澶辫触鎵ц浠ｇ爜
          });
        }else {
          alert(response.data.msg);
        }
      }, function errorCallback(response) {
        // 璇锋眰澶辫触鎵ц浠ｇ爜
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

    }
  }

  //搴楅摵鎵撻┈璧涘厠
  function Mosaic(value) {
    var str1=value;
    var arr = str1.split("");
    for (var i = 2; i < arr.length; i = i + 2) {
      arr[i] = "*";
    }
    var str2 = arr.join("");
    return str2;
  }






  $scope.flog3=false;
  $scope.flog1 = true;
  $scope.checkimg1=function () {
    if ($("#preview101").attr("src") === '../../m/m_v2.0/img/apply/upload_photo.png') {
      $scope.flog1 = true;
      $scope.flog2 = false;
    } else {
      $scope.flog1 = false;
      $scope.flog2 = true;
    }
    if (($scope.imgurl1 != "" && $scope.imgurl1 != undefined && $scope.imgurl1 != null)&& $scope.ifurl==true) {
      $scope.flog2 = false;
      $scope.flog3 = true;
      $interval.cancel($scope.timer1);
    }
  }

  $scope.setbackgroundColor=function(flog3){
    var p = "";
    if (flog3==false){
      p = '#666666';
    }else {
      p = '#ff366f';
    }
    return {"background": p};
  }

  $("#imgUrl0101").on("change", function (fileDom) {
    imgFileUp(fileDom,$location.$$search.activityId,"preview101","imgurl1");
  });

  function imgFileUp(fileDom,activiId,imgId,imgUrl){

    //鍒ゆ柇鏄惁鏀寔FileReader
    if (window.FileReader) {
      var reader = new FileReader();
    } else {
      alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
    console.log(fileDom)
    //鑾峰彇鏂囦欢
    var file = fileDom.target.files[0];
    var imageType = /^image\//;
    //鏄惁鏄浘鐗�
    if (!imageType.test(file.type)) {
      alert("请选择图片,图片不超过4M！");
      return;
    }
    if (file.size > 4194304) {
      alert("上传图片过大超过4M，请使用手机设置拍照尺寸降低图片大小！")
    } else {
      $scope.flog3=false;
      $scope.timer1=$interval(function () {
        $scope.checkimg1();
      }, 300)
      $scope.ifurl=false;
      //璇诲彇瀹屾垚
      reader.onload = function (e) {
        //鑾峰彇鍥剧墖dom
        var img = document.getElementById(imgId);
        //鍥剧墖璺緞璁剧疆涓鸿鍙栫殑鍥剧墖
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      var config = {
        api: 'http://v0.api.upyun.com/',
        bucket: 'huomanhaoimage',

        // 绌洪棿鐨勮〃鍗� API
        form_api: 'g75u3RSExKH88c2d2dcKxA9K1Ig='
      };
      if (!file) {
        console.log('no file is selected');
        return;
      }

      var index1 = file.name.lastIndexOf(".");
      var index2 = file.name.length;
      var suffix = file.name.substring(index1 + 1, index2);//鍚庣紑鍚�
      // 璁＄畻 policy 鍜� signature 鎵�闇�鐨勫弬鏁�
      // 璇︽儏瑙侊細 http://docs.upyun.com/api/form_api/#琛ㄥ崟API鎺ュ彛绠�浠�
      var options = {
        bucket: config.bucket,
        expiration: Math.floor(new Date().getTime() / 1000) + 86400,
        'save-key': $filter('date')(new Date(), 'yyyyMMdd') + "/a_" + activiId + "/" + Math.random() * 10000000000000000 + "." + suffix
      };
      var policy = window.btoa(JSON.stringify(options));
      var signature = md5(policy + '&' + config.form_api);
      var data = new FormData();
      data.append('policy', policy);
      data.append('signature', signature);
      data.append('file', file);
      var request = new XMLHttpRequest();
      request.open('POST', config.api + options.bucket);
      request.send(data);
      request.onreadystatechange = function () {
        if (request.readyState == 4 && (request.status == 200 || request.status == 304)) {  // 304鏈慨鏀�
          $scope[imgUrl] = "http://m.huomanhao.com/" + JSON.parse(request.response).url;
          $scope.ifurl=true;
        }
      };

      /* request.onload = function () {
       $rootScope.imgId = "http://laquimage.b0.upaiyun.com/" + JSON.parse(request.response).url;
       return  $rootScope.imgId || ""
       };*/

    }

  }
}]);
