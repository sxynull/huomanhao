/**
 * 货比三家
 */
'use strict';
app.controller('applyCompareCtrl', ['$scope', '$rootScope', '$http', '$ionicModal', '$location', '$interval', 'Signature', '$filter', function ($scope, $rootScope, $http, $ionicModal, $location, $interval, Signature, $filter) {
  document.title = "货蛮好网-货比三家";
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }
  //ionicModal弹窗，由下往�?;
  $ionicModal.fromTemplateUrl('templates/modalcompare.html', {
    scope: $scope
  }).then(function (modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function (u) {
    $scope.modal.hide();
  };

  var now = new Date();
  var hour = now.getHours()
  if (hour >= 21) {
    $scope.boo = false;
  } else {
    $scope.boo = true;
  }


  $rootScope.items = JSON.parse(localStorage.getItem("Scopeitems"));
  //规格分割
  if ($rootScope.items.item_b_o.sku != null && $rootScope.items.item_b_o.sku != undefined && $rootScope.items.item_b_o.sku1 != "") {
    if ($rootScope.items.item_b_o.sku.indexOf("@@") > 0) {
      var strs = []; //定义�?数组
      strs = $rootScope.items.item_b_o.sku.split("@@"); //字符分割
      $scope.sku1 = strs[0];
      $scope.sku2 = strs[1];
    } else if ($rootScope.items.item_b_o.sku == '@@' || $rootScope.items.item_b_o.sku == '') {
      $scope.sku1 = "无";
      $scope.sku2 = "";
    }
  }

  $scope.shop_name = Mosaic($rootScope.items.item_b_o.shop_name);
  if ($rootScope.items.item_b_o.taobao_nick != null && $rootScope.items.item_b_o.taobao_nick != undefined && $rootScope.items.item_b_o.taobao_nick != '') {
    $scope.wangwang_name = Mosaic($rootScope.items.item_b_o.taobao_nick);
  }

  //点击切换数组元素
  var itemresult = $rootScope.items.activity_search_b_o;
  var goodsArr1 = $rootScope.items.activity_search_b_o.keyword;
  var goodsArr = $rootScope.items.activity_search_b_o.qrkey_words;
  console.log(goodsArr1)
  var i = 1;
  var j = 1;
  if (goodsArr1 == null || goodsArr1 == undefined || goodsArr1 == '') {
    if (goodsArr != null && goodsArr != undefined && goodsArr != '') {
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
    } else {
      $scope.keyword = '';
    }
  } else {
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


  //选中框�?�中与不选中
  var servicesArr = $rootScope.items.activity_search_b_o.discount_service;
  if (servicesArr == null || servicesArr == undefined || servicesArr == '') {
  } else {
    var serviceArr = JSON.parse(servicesArr);
    if (serviceArr.free_delivery == 1) {
      $scope.check1 = true;
    } else {
      $scope.check1 = false;
    }
    if (serviceArr.present_back_insurance == 1) {
      $scope.check2 = true;
    } else {
      $scope.check2 = false;
    }
    if (serviceArr.item_off_pay == 1) {
      $scope.check3 = true;
    } else {
      $scope.check3 = false;
    }
    if (serviceArr.tmall == 1) {
      $scope.check4 = true;
    } else {
      $scope.check4 = false;
    }
    if (serviceArr.real_item == 1) {
      $scope.check5 = true;
    } else {
      $scope.check5 = false;
    }
    if (serviceArr.seven_back == 1) {
      $scope.check6 = true;
    } else {
      $scope.check6 = false;
    }
  }

  //排序方式选择
  if (itemresult.sort == 1) {
    $scope.sort = "综合排序";
  } else if (itemresult.sort == 2) {
    $scope.sort = "销量排序";
  } else if (itemresult.sort == 3) {
    $scope.sort = "信用排序";
  } else if (itemresult.sort == 4) {
    $scope.sort = "价钱高到低";
  } else if (itemresult.sort == 5) {
    $scope.sort = "价钱低到高";
  }
  //价格区间选择
  if (itemresult.priceLow == null || itemresult.priceLow == undefined || itemresult.priceHeight == null || itemresult.priceHeight == undefined) {
    $(".goods_pricerange").val("无需选择")
    $scope.showstriping = false;
  } else {
    $scope.showstriping = true;
  }
  $scope.noRepeata=0;
  $scope.toLink = function () {
    $scope.noRepeata+=1;
    if($scope.noRepeata>1){
      alert("正在提交")
    }else{
      var activityId = $location.$$search.activityId;
      $scope.pullUrl = Signature.login("/user/progress/submitProgress?activityId=" + activityId + "&stepType=7&imgUrl1=" + $scope.imgurl1 + "&imgUrl2=" + $scope.imgurl2 + "&imgUrl3=" + $scope.imgurl3 + "");
      $http.get($scope.pullUrl).then(function successCallback(response) {
        if (response.data.code == 10000) {
          $scope.noRepeata=1;
          var itemresult = response.data.data;
          $rootScope.items = localStorage.setItem("Scopeitems", JSON.stringify(itemresult));
          var next_current_steps = response.data.data.next_current_steps;
          $scope.urlSkip(next_current_steps);
        } else if (response.data.code == 50002) {
          $scope.refUrl = Signature.h5("/token/refresh?" + localStorage.getItem('session_token') + "");
          $http.get($scope.pullUrl).then(function successCallback(response) {
            if (response.data.code == 10000) {
              window.localStorage.access_token = "access_token=" + response.data.data.access_token;
              window.localStorage.session_token = "session_token=" + response.data.data.session_token;
            } else {
              alert(response.data.msg);
            }
          }, function errorCallback(response) {
            // 请求失败执行代码
          });
        } else {
          alert(response.data.msg);
          $scope.noRepeata=0;
        }
      }, function errorCallback(response) {
        // 请求失败执行代码
      });
    }

  }
  $scope.urlSkip = function (x) {
    var activityId = $location.$$search.activityId;
    switch (x) {
      case -2:
        location.href = "#/applyEvaluationfinish?activityId=" + activityId + "";
        break;
      case -1:
        location.href = "#/tabs/applyIndex";
        break;
      case 1:
        location.href = "#/applyPc?activityId=" + activityId + "";
        break;
      case 2:
        location.href = "#/applyCommand?activityId=" + activityId + "";
        break;
      case 3:
        location.href = "#/applyQrcode?activityId=" + activityId + "";
        break;
      case 5:
        location.href = "#/applyCollect?activityId=" + activityId + "";
        break;
      case 6:
        location.href = "#/applySameshop?activityId=" + activityId + "";
        break;
      case 7:
        location.href = "#/applyCompare?activityId=" + activityId + "";
        break;
      case 8:
        location.href = "#/applyWangwangchat?activityId=" + activityId + "";
        break;
      case 10:
        location.href = "#/applyShoutao?activityId=" + activityId + "";
        break;
      case 11:
        location.href = "#/applyRelevance";
        break;
      case 12:
        location.href = "#/applyPay?activityId=" + activityId + "";
        break;
      case 14:
        location.href = "#/addvalueservicesShowtext?activityId=" + activityId + "";
        break;
      case 15:
        location.href = "#/addvalueservicesShowpic?activityId=" + activityId + "";
        break;
      case 16:
        location.href = "#/addvalueservicesGoodopinion?activityId=" + activityId + "";
        break;
      case 17:
        location.href = "#/addvalueservicesAddgoodopinion?activityId=" + activityId + "";
        break;
      case 18:
        location.href = "#/addvalueservicesShare?activityId=" + activityId + "";
        break;
      case 20:
        location.href = "#/addvalueservicesAddshowtext?activityId=" + activityId + "";
        break;
      case 21:
        location.href = "#/addvalueservicesAddshowpic?activityId=" + activityId + "";
        break;
      case 23:
        location.href = "#/notWinning?activityId=" + activityId + "";
        break;
      case 24:
        location.href = "#/applyAlreadyfull";
        break;
      case 25:
        location.href = "#/applyovertime";
        break;
      case 27:
        location.href = "#/applyComplete";
        break;
      case 28:
        location.href = "#/applyTomorrow";
        break;
      case 29:
        location.href = "#/applyFinish";
        break;
    }
  }


  //店铺打马赛克
  function Mosaic(value) {
    var str1 = value;
    var arr = str1.split("");
    for (var i = 2; i < arr.length; i = i + 2) {
      arr[i] = "*";
    }
    var str2 = arr.join("");
    return str2;
  }

  function compare(property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value2 - value1;
    }
  }
  $scope.flog3 = false;
  $scope.flog6 = false;
  $scope.flog9 = false;
  $scope.flog1 = true;
  $scope.flog4 = true;
  $scope.flog7 = true;
  $scope.checkimg1 = function () {
    if ($("#preview21").attr("src") === '../../m/m_v2.0/img/apply/upload_photo.png') {
      $scope.flog1 = true;
      $scope.flog2 = false;
    } else {
      $scope.flog1 = false;
      $scope.flog2 = true;
    }
    if (($scope.imgurl1 != "" && $scope.imgurl1 != undefined && $scope.imgurl1 != null) && $scope.ifurl == true) {
      $scope.flog2 = false;
      $scope.flog3 = true;
      $interval.cancel($scope.timer1);
    }
  }
  $scope.checkimg2 = function () {
    if ($("#preview22").attr("src") === '../../m/m_v2.0/img/apply/upload_photo.png') {
      $scope.flog4 = true;
      $scope.flog5 = false;
    } else {
      $scope.flog4 = false;
      $scope.flog5 = true;
    }
    if (($scope.imgurl2 != "" && $scope.imgurl2 != undefined && $scope.imgurl2 != null) && $scope.ifurl == true) {
      $scope.flog5 = false;
      $scope.flog6 = true;
      $interval.cancel($scope.timer2);
    }
  }
  $scope.checkimg3 = function () {
    if ($("#preview23").attr("src") === '../../m/m_v2.0/img/apply/upload_photo.png') {
      $scope.flog7 = true;
      $scope.flog8 = false;
    } else {
      $scope.flog7 = false;
      $scope.flog8 = true;
    }
    if (($scope.imgurl3 != "" && $scope.imgurl3 != undefined && $scope.imgurl3 != null) && $scope.ifurl == true) {
      $scope.flog8 = false;
      $scope.flog9 = true;
      $interval.cancel($scope.timer3);
    }
  }
  $scope.setbackgroundColor = function (flog3, flog6, flog9) {
    var p = "";
    if (flog3 == false || flog6 == false || flog9 == false) {
      p = '#666666';
    } else {
      p = '#ff366f';
    }
    return { "background": p };
  }
  $("#imgUrl021").on("change", function (fileDom) {
    imgFileUp(fileDom, $location.$$search.activityId, "preview21", "imgurl1");
  });
  $("#imgUrl022").on("change", function (fileDom) {
    imgFileUp(fileDom, $location.$$search.activityId, "preview22", "imgurl2");
  });
  $("#imgUrl023").on("change", function (fileDom) {
    imgFileUp(fileDom, $location.$$search.activityId, "preview23", "imgurl3");
  });

  function imgFileUp(fileDom, activiId, imgId, imgUrl) {

    //判断是否支持FileReader
    if (window.FileReader) {
      var reader = new FileReader();
    } else {
      alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
    }
    console.log(fileDom)
    //获取文件
    var file = fileDom.target.files[0];
    var imageType = /^image\//;
    //是否是图�?
    if (!imageType.test(file.type)) {
      alert("请选择图片,图片不超过4M！");
      return;
    }
    if (file.size > 4194304) {
      alert("上传图片过大超过4M，请使用手机设置拍照尺寸降低图片大小！")
    } else {
      if (imgUrl == 'imgurl1') {
        $scope.flog3 = false;
        $scope.timer1 = $interval(function () {
          $scope.checkimg1();
        }, 300)
      } else if (imgUrl == 'imgurl2') {
        $scope.flog6 = false;
        $scope.timer2 = $interval(function () {
          $scope.checkimg2();
        }, 300)
      } else if (imgUrl == 'imgurl3') {
        $scope.flog9 = false;
        $scope.timer3 = $interval(function () {
          $scope.checkimg3();
        }, 300)
      }
      $scope.ifurl = false;
      //读取完成
      reader.onload = function (e) {
        //获取图片dom
        var img = document.getElementById(imgId);
        //图片路径设置为读取的图片
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      var config = {
        api: 'http://v0.api.upyun.com/',
        bucket: 'huomanhaoimage',

        // 空间的表�? API
        form_api: 'g75u3RSExKH88c2d2dcKxA9K1Ig='
      };
      if (!file) {
        console.log('no file is selected');
        return;
      }

      var index1 = file.name.lastIndexOf(".");
      var index2 = file.name.length;
      var suffix = file.name.substring(index1 + 1, index2);//后缀�?
      // 计算 policy �? signature �?�?的参�?
      // 详情见： http://docs.upyun.com/api/form_api/#表单API接口�?�?
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
        if (request.readyState == 4 && (request.status == 200 || request.status == 304)) {  // 304未修�?
          $scope[imgUrl] = "http://m.huomanhao.com/" + JSON.parse(request.response).url;
          $scope.ifurl = true;
        }
      };

      /* request.onload = function () {
       $rootScope.imgId = "http://laquimage.b0.upaiyun.com/" + JSON.parse(request.response).url;
       return  $rootScope.imgId || ""
       };*/

    }

  }


}]);
