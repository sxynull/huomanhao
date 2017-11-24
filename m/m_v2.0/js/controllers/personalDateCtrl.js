
/**
 * 个人资料
 */
app.controller('personalDateCtrl', ['$scope', '$http','Signature','$filter','$ionicPopup', '$timeout', '$ionicPlatform', '$rootScope', function ($scope, $http ,Signature,$filter, $ionicPopup, $timeout, $ionicPlatform, $rootScope, $viewHistory) {
  document.title="货蛮好网-个人资料";

  /*转为时间�?*/
  $scope.dateFunction=function(date){
    return Signature.DateFuc(date);
  };
  //先请求加载数�?
     $scope.personsinfo = {};
     $scope.cty="";
    $scope.getmemberUrl=Signature.login("/member/get");
    $http.get($scope.getmemberUrl).then(function successCallback(response) {
      if(response.data.code==10000){
        $("input").click(function () {
          var s = $(this).attr("placeholder");
          $(this).attr("placeholder", "");
          $(this).blur(function () {
            $(this).attr("placeholder", s);
          })
        });
          var personsresult = response.data.data;
          $scope.city=personsresult.province_code;
          $scope.citys=personsresult.city_code;
          $scope.cty=personsresult.province_code+"-"+personsresult.city_code;
          $scope.personsinfo = personsresult;
          $scope.avatar=personsresult.avatar;
          var addressurl="/../../m/m_v2.0/js/address.json";
        $http.get(addressurl).then(function successCallback(response) {
          var citydata='';
          if($scope.city==""||$scope.city==undefined||$scope.city==null||$scope.citys==""||$scope.citys==undefined||$scope.citys==null){
            citydata='请选择';
            $("#area").val(citydata);
          }else {
            var pro=response.data.data[ $scope.city-1].name
            var city_code=response.data.data[ $scope.city-1].cities[$scope.citys-1].name;
            citydata=pro+" "+city_code;
            $("#area").val(citydata);
          }


        }, function errorCallback(response) {
          // 请求失败执行代码
        });
        $scope.gender= [
          {
            value:2,
            text:'请选择'
          },
          {
            value:1,
            text:'男'
          },{
            value:2,
            text:'女'
          }
        ];
        if($scope.personsinfo.gender!=null&&$scope.personsinfo.gender!=undefined&&$scope.personsinfo.gender!=''){
          $scope.selectedgender=$scope.gender[$scope.personsinfo.gender];
        }else {
          $scope.selectedgender=$scope.gender[0];
        }


        $scope.marriage= [
          {
            value:1,
            text:'请选择'
          },{
            value:1,
            text:'未婚'
          },{
            value:2,
            text:'已婚'
          }
        ]
        if($scope.personsinfo.marriage_status!=null&&$scope.personsinfo.marriage_status!=undefined&&$scope.personsinfo.marriage_status!=''){
          $scope.selectedmarriage=$scope.marriage[$scope.personsinfo.marriage_status];
        }else {
          $scope.selectedmarriage=$scope.marriage[0];
        }


        $scope.income= [
          {
            value:0,
            text:'请选择'
          },{
            value:1,
            text:'2000元以下'
          },{
            value:2,
            text:'2000-3999元'
          },{
            value:3,
            text:'4000-5999元'
          },{
            value:4,
            text:'6000-7999元'
          },{
            value:5,
            text:'8000以上'
          }
        ]
        if($scope.personsinfo.income!=null&&$scope.personsinfo.income!=undefined&&$scope.personsinfo.income!=''){
          $scope.selectedincome=$scope.income[$scope.personsinfo.income];
        }else {
          $scope.selectedincome=$scope.income[0];
        }


        $scope.culture= [
          {
            value:0,
            text:'请选择'
          },{
            value:1,
            text:'初中'
          },{
            value:2,
            text:'高中'
          },{
            value:3,
            text:'中专'
          },{
            value:4,
            text:'大专'
          },{
            value:5,
            text:'本科'
          },{
            value:6,
            text:'硕士'
          },{
            value:7,
            text:'博士'
          }
        ]
        if($scope.personsinfo.culture!=null&&$scope.personsinfo.culture!=undefined&&$scope.personsinfo.culture!=''){
          $scope.selectedSite=$scope.culture[$scope.personsinfo.culture];
        }else {
          $scope.selectedSite=$scope.culture[0];
        }



        $scope.industry= [
          {
            value:0,
            text:'请选择'
          },{
            value:1,
            text:'宝妈'
          },{
            value:2,
            text:'全职太太'
          },{
            value:3,
            text:'学生党'
          },{
            value:4,
            text:'上班族'
          },{
            value:5,
            text:'房地产'
          },{
            value:6,
            text:'事业单位'
          },{
            value:7,
            text:'医疗单位'
          },{
            value:8,
            text:'白领'
          },{
            value:9,
            text:'自主经营'
          }
        ]
        if($scope.personsinfo.industry!=null&&$scope.personsinfo.industry!=undefined&&$scope.personsinfo.industry!=''){
          $scope.selectedindustry=$scope.industry[$scope.personsinfo.industry];
        }else {
          $scope.selectedindustry=$scope.industry[0];
        }



          if ($scope.avatar != undefined && $scope.avatar != null && $scope.avatar != "") {
            if($scope.avatar.indexOf("http://m.huomanhao.com")<0){
              $scope.avatar="http://m.huomanhao.com/"+$scope.avatar;
            }
            $("#item_associated_previewa").attr("src", $scope.avatar);
          } else {
            $("#item_associated_previewa").attr("src", "../../m/m_v2.0/img/apply/business_index_user.png");
          }
          //日期选择
          var mydate=new Date();
          var nowyear=mydate.getFullYear()-12;
          var nowmonth=mydate.getMonth()+1;
          var nowdate=mydate.getDate();
          var maxdate=nowyear+"-"+nowmonth+'-'+nowdate;
          console.log(maxdate)
          var calendar = new datePicker();
          calendar.init({
            'trigger': '#demo1', /*按钮选择器，用于触发弹出插件*/
            'type': 'date',/*模式：date日期；datetime日期时间；time时间；ym年月�?*/
            'minDate': '1950-1-1',/*�?小日�?*/
            'maxDate': maxdate,/*�?大日�?*/
            'onSubmit': function () {/*确认时触发事�?*/
              var theSelectData = calendar.value;
              $(".demo1").text(theSelectData)
            },
            'onClose': function () {/*取消时触发事�?*/
            }
          });
          //页面加载的时候加载兴趣的选择（之前没选择的话就为空�?�）
          var loveInter = personsresult.interests;
          if(loveInter.indexOf(',')<0&&loveInter==''){
          }else if(loveInter.indexOf(',')<0&&loveInter!=''){
            $(".love_ck").children("li").eq(loveInter-1).addClass("love_ckeckeded");
          }else {
            var Loves = loveInter.split(",");
            var loveLength = Loves.length;
            for(var i = 0; i < loveLength;i++){
              $(".love_ck").children("li").eq(parseFloat(Loves[i])-1).addClass("love_ckeckeded");
            }
          }
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
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });

  $scope.imgurlheade="";
  //失去焦点后向后台保存数据
  $scope.flog1=false;
  $scope.saveSend1 = function () {
    var avatar="";
    if($("#item_associated_previewa").attr("src")=="../../m/m_v2.0/img/apply/business_index_user.png"){
      avatar="";
    }else if($scope.imgurlheade!=''){
      avatar=localStorage.getItem("imgurlheade")
    }else  if($scope.imgurlheade==''){
      avatar=$scope.avatar;
    }

    var gender = $(".selectedgender").val();
    (gender==undefined || gender==null) &&  (gender="");
    var birthday = $(".demo1").text()=="请设置"?"":$(".demo1").text();
    $scope.getmemberUrl = Signature.login("/user/update/first?avatar=" + avatar + "&gender=" + gender + "&birthday=" + birthday + "");
    $http.get($scope.getmemberUrl).then(function successCallback(response) {
      if (response.data.code == 10000) {
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
  }


  $scope.saveSend2 = function () {
    var stature=$(".tall").val();
    var weight=$(".kg").val();
    var shoe_size=$(".shoe_size").val();
    var interests="";
    for (var i=0;i<$(".love_ckeckeded").length;i++){
      interests+=$(".love_ckeckeded").eq(i).attr("names")+",";
    }
    if(interests.length>0){
      interests = interests.substr(0, interests.length-1);
    }
    $scope.getmemberUrl=Signature.login("/user/update/second?stature="+stature+"&weight="+weight+"&shoe_size="+shoe_size+"&interests="+interests+"");
    $http.get($scope.getmemberUrl).then(function successCallback(response) {
      if(response.data.code==10000){
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
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });
  }
  $scope.province_code='';
  $scope.city_code='';
  $rootScope.saveSend3 = function () {
    var marriage_status=$(".selectedmarriage").val();
    var income=$(".income").val();
    var culture=$(".culture").val();
    var industry=$(".industry").val();
    $scope.getmemberUrl=Signature.login("/user/update/third?marriage_status="+marriage_status+"&income="+income+"&culture="+culture+"&industry="+industry+"&province_code="+$scope.province_code+"&city_code="+$scope.city_code+"");
    $http.get($scope.getmemberUrl).then(function successCallback(response) {
      if(response.data.code==10000){
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
      }
    }, function errorCallback(response) {
      // 请求失败执行代码
    });
  }

  // �?个精心制作的自定义弹�?
  // �?个提示对话框
  $scope.showAlert = function () {
    $(".backdrop").html("")
    var alertHtml='';
    alertHtml = '<div class="" style="color: #666666;font-size: 26px;text-align: center;margin-top: 40px;">亲，购物偏好最多只能选择6个！</div>';
    var alertPopup = $ionicPopup.alert({
      title: '',
      template: alertHtml,
      okText: "确定"
    });
    alertPopup.then(function (res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });
  };
  //标签添加移动（以及大�?6的时候进行提示）
  var len = $('.love_ck li').length;
  var arr = new Array(len);
  $('.love_ck li').each(function (i) {
    var count = 1;
    $('.love_ck li').eq(i).on('click',
      function () {
        for (var l = 0; l < arr.length; l++) {
          if (arr[l] != null) {
            count++;
          }
        }
        if ($('.love_ck li').eq(i).is('.love_ckeckeded')) {
          $('.love_checked li').eq(i).hide();
          $('.love_ck li').eq(i).removeClass('love_ckeckeded');
          arr[i] = null;
          count--;
        } else {
          if ($(".love_ckeckeded").length > 5) {
            $scope.showAlert();
            //选择喜欢的标签不能大�?6，大于的话给�?个弹窗提示�??
            return false
          } else {
            $('.love_checked li').eq(i).show();
            $('.love_ck li').eq(i).addClass('love_ckeckeded');
            arr[i] = i + 1;

          }
        }
      });
  });

  $("#area").mobileAreaSelect();

  // $scope.mobileAreaSelect =function(obj){
  //   $(obj.target).mobileAreaSelect();
  //   $timeout(function () {
  //         $(".js-submit").click(function () {
  //                 var povce=$("#hd_area").val();
  //                 var povceArr=[];
  //                 povceArr=povce.split(",");
  //                 $scope.province_code=povceArr[0];
  //                 $scope.city_code=povceArr[1]-1;
  //                 if($scope.province_code!=0&&$scope.city_code>=0){
  //                   $rootScope.saveSend3();
  //                 }
  //                 if($scope.province_code==0||$scope.city_code<0) {
  //                   alert("地址保存失败,请输入完整地区！")
  //                 }
  //         })
  //   },300)
  // }
  $scope.sendcity=function(){
    $timeout(function(){
      var povce=$("#hd_area").val();
      var povceArr=[];
      povceArr=povce.split(",");
      $scope.province_code=povceArr[0];
      $scope.city_code=povceArr[1];
      if(localStorage.getItem("submitfalse")==undefined&&localStorage.getItem("submitflog")==1){
        $rootScope.saveSend3();
      }
    },300)
  }



//初始化体重，身高，鞋�?
  $scope.account_text = function (obj) {
    //console.log(obj);
    obj = "." + obj;
    // console.log($(obj))
    $(obj).css("opacity", 1).next().next().next().hide();
  };

  if($scope.city!=undefined){
    console.log(11)

  }
  $("#imgUrlheade").on("change",function(fileDom){
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
             //读取完成
             reader.onload = function(e) {
                 //获取图片dom
                 var img = document.getElementById("item_associated_previewa");
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


       		if(!file) {
                   console.log('no file is selected');
                   return;
               }

         var index1=file.name.lastIndexOf(".");
         var index2=file.name.length;
         var suffix=file.name.substring(index1+1,index2);//后缀�?
              	// 计算 policy �? signature �?�?的参�?
              	// 详情见： http://docs.upyun.com/api/form_api/#表单API接口�?�?
               var options = {
       			bucket: config.bucket,
       			expiration: Math.floor(new Date().getTime() / 1000) + 86400,
       			'save-key': $filter('date')(new Date(),'yyyyMMdd')+"/"+Math.random()*10000000000000000+"."+suffix
       		};
       		var policy = window.btoa(JSON.stringify(options));
       		var signature = md5(policy + '&' + config.form_api);
               var data = new FormData();
               data.append('policy', policy);
               data.append('signature', signature);
               data.append('file', file);
               var request = new XMLHttpRequest();
               request.open('POST', config.api + options.bucket);
               request.onload = function(e) {
                 $scope.imgurlheade="http://m.huomanhao.com/"+JSON.parse(request.response).url;
                 localStorage.setItem("imgurlheade",$scope.imgurlheade);
                 $scope.saveSend1();
                 $scope.flog1=true;
               };
               request.send(data);
   })
}]);
