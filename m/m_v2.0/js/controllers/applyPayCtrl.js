/**
 * 鎻愪氦鏀粯
 */
'use strict';
app.controller('applyPayCtrl',['$scope','$rootScope','$location','$ionicPopup','$http','$ionicModal','$interval','Signature','$filter',function($scope,$rootScope,$location,$ionicPopup,$http,$ionicModal,$interval,Signature,$filter){
  document.title="货蛮好网-订单提交";
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
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android缁堢
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios缁堢
  if(isAndroid){
    $("input").on('click',function () {
      var target = this;
      setTimeout(function () {
        target.scrollIntoView(true);
      },300)
    })
  }
  //ionicModal寮圭獥锛岀敱涓嬪線涓�;
  $ionicModal.fromTemplateUrl('templates/modalpay.html', {
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

  $scope.boo5=true;
  $(".goods_num").bind("input", function () {
    $scope.boo1=false;
  })
  $(".goods_pricetrue").bind("input", function () {
    $scope.boo2=false;
    $scope.boo5=false;
  })
  var txt3=/^-?[1-9]\d*$/;
  var txt4=/@/
 $interval(function () {
   if($(".taobao_name").val()!=undefined&&$(".taobao_name").val()!=null){
    if($(".taobao_name").val()!=''&&txt3.test($(".taobao_name").val())==false&&txt4.test($(".taobao_name").val())==false&& $(".taobao_name").val().length<=25){
      $scope.boo3=false;
    }
   }
  }, 300)
  $scope.noRepeata=0;
  $scope.toLink=function () {
    var activityId=$location.$$search.activityId;
    $rootScope.items=JSON.parse(localStorage.getItem("Scopeitems"));
    var txt1=/^\d{6,20}$/;
    var txt2=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    var point=$(".goods_pricetrue").val();
    var number1=Math.round(point*10000)/100;
    var orderNo=$(".goods_num").val();
    if(orderNo==''||txt1.test(orderNo)==false){
      $scope.boo1=true;
      $scope.boo2=false;
      $scope.boo3=false;
      $scope.boo4=false;
      return;
    }
    if(point==''||txt2.test(point)==false){
      $scope.boo1=false;
      $scope.boo2=true;
      $scope.boo3=false;
      $scope.boo4=false;
      return;
    }
    if($rootScope.items.member_tao_bao_is_found==0){
      if($(".taobao_name").val()==''||txt3.test($(".taobao_name").val())==true||txt4.test($(".taobao_name").val())==true|| $(".taobao_name").val().length>25){
        $scope.boo1=false;
        $scope.boo2=false;
        $scope.boo3=true;
        $scope.boo4=false;
        return;
      }
      if($("#taobao_name").val()==''||$("#taobao_name").val()==0){
        $scope.boo1=false;
        $scope.boo2=false;
        $scope.boo3=false;
        $scope.boo4=true;
        return;
      }
    }
    if ($rootScope.items.audit_status==2&&$rootScope.items.member_tao_bao_is_found!=0){
      $scope.pullUrl=Signature.login("/user/progress/update?activityId="+activityId+"&stepType=12&number1="+number1+"&orderNo="+orderNo+"&imgUrl1="+$scope.imgurl1+"");
    }else if($rootScope.items.audit_status!=2&&$rootScope.items.member_tao_bao_is_found!=0){
      $scope.pullUrl=Signature.login("/user/progress/submitProgress?activityId="+activityId+"&stepType=12&number1="+number1+"&orderNo="+orderNo+"&imgUrl1="+$scope.imgurl1+"");
    }
    if($rootScope.items.audit_status==2&&$rootScope.items.member_tao_bao_is_found==0){
      var taobao_name=$(".taobao_name").val();
      $scope.pullUrl=Signature.login("/user/progress/update?activityId="+activityId+"&stepType=12&number1="+number1+"&orderNo="+orderNo+"&imgUrl1="+$scope.imgurl1+"&taobaoName="+taobao_name+"&taobaoLevel="+$("#taobao_name").val().trim()+"");
    }else if($rootScope.items.audit_status!=2&&$rootScope.items.member_tao_bao_is_found==0){
      var taobao_name=$(".taobao_name").val();
      $scope.pullUrl=Signature.login("/user/progress/submitProgress?activityId="+activityId+"&stepType=12&number1="+number1+"&orderNo="+orderNo+"&imgUrl1="+$scope.imgurl1+"&taobaoName="+taobao_name+"&taobaoLevel="+$("#taobao_name").val().trim()+"");
    }
    $scope.noRepeata+=1;
    console.log($scope.noRepeata);
    if($scope.noRepeata>1){
      alert("正在提交")
    }else{
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if(response.data.code==10000){
          $scope.noRepeata=1;
          var  itemresult=response.data.data;
          $rootScope.items=localStorage.setItem("Scopeitems",JSON.stringify(itemresult));
          var next_current_steps=response.data.data.next_current_steps;
          $scope.urlSkip(next_current_steps);
        }else if(response.data.code==50002){
          $scope.noRepeata=0;
          $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
          $http.get($scope.pullUrl).then(function successCallback(response) {
            if(response.data.code==10000){
              window.localStorage.access_token = "access_token=" + response.data.data.access_token;
              window.localStorage.session_token = "session_token=" + response.data.data.session_token;
              $scope.noRepeata=0;
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
    if ($("#preview31").attr("src") === '../../m/m_v2.0/img/apply/upload_photo.png') {
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

  $("#imgUrl031").on("change", function (fileDom) {
    imgFileUp(fileDom,$location.$$search.activityId,"preview31","imgurl1");
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


  //ionicModal寮圭獥锛岀敱涓嬪線涓�;
  $ionicModal.fromTemplateUrl('templates/modaltaobaobind.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
  $scope.createContact = function(u) {
    $scope.modal1.hide();
  };
  //绛夌骇閫夋嫨鐨勭浉鍏宠缃��
  $scope.myVar=false;
  $scope.checkgrand=function(event) {
    if($(event.target)[0].nodeName=="IMG"){
      $("#taobao_name").val($(event.target).parent(".activated")[0].getAttribute('data'));
      $(".taobaoBind_grades").text("");
      $(".taobaoBind_grades").append($(event.target).parent(".activated")[0].innerHTML);
      $scope.myVar=true;
    }else {
      if($(event.target)[0].getAttribute('data')==0){
        $("#taobao_name").val(0);
        $(".taobaoBind_grades").text("请选择等级")
        $scope.myVar=false;
      }else{
        $("#taobao_name").val($(event.target)[0].getAttribute('data'));
        $(".taobaoBind_grades").text("");
        $(".taobaoBind_grades").append($(event.target)[0].innerHTML);
        $scope.myVar=true;
      }
    }
  };
}]);
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
