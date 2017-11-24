/*首页*/
app.controller('homeCtrl', function($scope,$http,$rootScope,Signature) {
  document.title = '货蛮好网-首页';
  $rootScope.userId=window.localStorage.user_id;
  $rootScope.open_id=window.localStorage.open_id;
  $rootScope.isCode=window.localStorage.isCode;
  console.log($rootScope.isCode)
  $scope.item_category_id='';
  /*统计*/
  $scope.statistic=function (name1,name2,user_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+''])
  }
  $scope.statistic1=function (name1,name2,user_Id,activity_Id) {
    _czc.push(['_trackEvent', name1, name2, '用户ID='+user_Id+'活动ID='+activity_Id+''])
  }

  /*类目筛选*/
  $(".itemDiv1").css("display","block");
  $(".itemDiv2").css("display","none");
  $(".itemDiv3").css("display","none");
  $(".buttom_classify li").click(function() {
    $(".buttom_classify li").eq($(this).index()).addClass("lichecke").siblings().removeClass('lichecke');
    if($(this).index()==0){
      $(".itemDiv1").css("display","block");
      $(".itemDiv2").css("display","none");
      $(".itemDiv3").css("display","none");
    }else if($(this).index()==1){
      $(".itemDiv2").css("display","block");
      $(".itemDiv1").css("display","none");
      $(".itemDiv3").css("display","none");
    }else if($(this).index()==2){

      $(".itemDiv3").css("display","block");
      $(".itemDiv2").css("display","none");
      $(".itemDiv1").css("display","none");
    }
  })
  /*老客新人判断*/
  if($rootScope.open_id==0 || $rootScope.open_id==undefined) {
    $scope.newoldUrl = Signature.login("/user/growth/system/date/index");
    $http.get($scope.newoldUrl).success(function (response) {
      if (response.code == 10000) {
        $scope.neworold = response.data.is_new_people;
        $scope.user_Id = response.data.user_id;
      } else if (response.code == 50002) {
        $scope.refUrl = Signature.h5("/token/refresh?" + localStorage.getItem('session_token') + "");
        $http.get($scope.refUrl).then(function successCallback(response) {
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
        alert(response.msg)
      }
    })

      .error(function () {

      })
      .finally(function () {

      });
  }

  /*首页分类接口*/
  $scope.classifyUrl = Signature.login("/query/home/page/data");
  $http.get($scope.classifyUrl).success(function (response) {
    if (response.code == 10000) {
      $scope.classifyList = response.data.h5_commodity_classification_data_b_o;
      $scope.digitalList=$scope.classifyList.digital_home_appliance_activity_b_o_list;
      $scope.fashionList=$scope.classifyList.fashion_menswear_activity_b_o_list;
      $scope.gourmetList=$scope.classifyList.gourmet_specialties_activity_b_o_list;
      $scope.homedailyList=$scope.classifyList.home_daily_activity_b_o_list;
      $scope.homeimprovementList=$scope.classifyList.home_improvement_activity_b_o_list;
      $scope.recreationalList=$scope.classifyList.recreational_sports_activity_b_o_list;
      $scope.shoesList=$scope.classifyList.shoes_bags_activity_b_o_list;
      $scope.skinList=$scope.classifyList.skin_make_up_activity_b_o_list;
      $scope.trendList=$scope.classifyList.trend_women_activity_b_o_list;
      $scope.advertisList = response.data.h5_advertisement_b_o.classified_advertising_list;
      for(var i=0;i<$scope.advertisList.length;i++){
        if($scope.advertisList[i].name==="潮流女装"){
          $scope.trendurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="时尚男装"){
          $scope.fashionurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="鞋子箱包"){
          $scope.shoesurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="居家日用"){
          $scope.homedailyurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="文娱运动"){
          $scope.recreationalurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="护肤彩妆"){
          $scope.skinurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="家纺家装"){
          $scope.homeimprovementurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="数码家电"){
          $scope.digitalurl=$scope.advertisList[i];
        }else if($scope.advertisList[i].name==="美食特产"){
          $scope.gourmeturl=$scope.advertisList[i];
        }
      }


      $scope.advertistodayList = response.data.h5_advertisement_b_o.channel_advertising_list;
      $scope.adsList = response.data.h5_advertisement_b_o.index_advertising_list;
      $scope.platformList=response.data.h5_commodity_recommend_b_o.platform_recommend_activity_b_o_list;
      for (var k = 0; k < $scope.platformList.length; k++) {
        if (isNaN($scope.platformList[k].activity_stock_b_o.apply_member_count) == true || $scope.platformList[k].activity_stock_b_o.apply_member_count == undefined) {
          $scope.platformList[k].activity_stock_b_o.apply_member_count = 0;
        }
      }

      $scope.highvalueList=response.data.h5_commodity_recommend_b_o.high_value_recommend_activity_b_o_list;
      for (var h = 0; h < $scope.highvalueList.length; h++) {
        if (isNaN($scope.highvalueList[h].activity_stock_b_o.apply_member_count) == true || $scope.highvalueList[h].activity_stock_b_o.apply_member_count == undefined) {
          $scope.highvalueList[h].activity_stock_b_o.apply_member_count = 0;
        }
      }
      $scope.highawardList=response.data.h5_commodity_recommend_b_o.high_award_rate_activity_b_o_list;
      for (var j = 0; j < $scope.highawardList.length; j++) {
        if (isNaN($scope.highawardList[j].activity_stock_b_o.apply_member_count) == true || $scope.highawardList[j].activity_stock_b_o.apply_member_count == undefined) {
          $scope.highawardList[j].activity_stock_b_o.apply_member_count = 0;
        }
      }
      $scope.newmenList=response.data.h5_commodity_recommend_b_o.new_exclusive_activity_b_o_list;


      // Array.prototype.push.apply($scope.adsList, response.data);
    } else if(response.code==50002){
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
    }else {
      alert(response.msg)
    }

  })
    .error(function () {

    })
    .finally(function () {

    });

  /*首页公告*/
       // $scope.adsUrl = Signature.login("/advertisement?model_code=mobile_index_ads");
       // $http.get($scope.adsUrl).success(function (response) {
       //   if (response.code == 10000) {
       //     $scope.adsList = response.data;
       //     // Array.prototype.push.apply($scope.adsList, response.data);
       //   } else if(response.code==50002){
       //     $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
       //     $http.get($scope.refUrl).then(function successCallback(response) {
       //       if(response.data.code==10000){
       //         window.localStorage.access_token = "access_token=" + response.data.data.access_token;
       //         window.localStorage.session_token = "session_token=" + response.data.data.session_token;
       //       }else {
       //         alert(response.data.msg);
       //       }
       //     }, function errorCallback(response) {
       //       // 请求失败执行代码
       //     });
       //   }else {
       //     alert(response.msg)
       //   }
       //
       // })
       //   .error(function () {
       //
       //   })
       //   .finally(function () {
       //
       //   });
   $scope.isShow=0;
           /*新人必中与高价值*/
           // $scope.newUrl = Signature.login("/homepage/data/get");
           // $http.get($scope.newUrl).success(function (response) {
           //   if (response.code == 10000) {
           //     $scope.homeDate = response.data;
           //   }else if(response.code==50002){
           //     $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
           //     $http.get($scope.refUrl).then(function successCallback(response) {
           //       if(response.data.code==10000){
           //         window.localStorage.access_token = "access_token=" + response.data.data.access_token;
           //         window.localStorage.session_token = "session_token=" + response.data.data.session_token;
           //       }else {
           //         alert(response.data.msg);
           //       }
           //     }, function errorCallback(response) {
           //       // 请求失败执行代码
           //     });
           //   } else {
           //     alert(response.msg)
           //   }
           //
           // })
           //   .error(function () {
           //
           //   })
           //   .finally(function () {
           //
           //   });
  $scope.isShowFunction=function(){
    $scope.isShow=1;
    $scope.$broadcast("scroll.infiniteScrollComplete");
  };

  $scope.adsList=[];    /*首页banner广告位*/
   $scope.notice=[];//公告

   // 创建一些scope变量
   //     $scope.page = 0;        // 用来保存当前请求的页码
   //     $scope.total_page = 10;       // 用来保存总页数
   //     $scope.goodList = [];


      //  $scope.getGoodLists = function () {
      //      $scope.page++;  // 页数++
      //    $scope.goodUrl =Signature.login("/items?current_page="+$scope.page+"&total_page="+$scope.total_page+"&item_category_id="+$scope.item_category_id+"&page_size=10");
      //       //console.log("$scope.page:" + $scope.page);
      //      //console.log($scope.page)
      //
      //       $http.get($scope.goodUrl).success(function (response) {
      //         if(response.code==10000) {
      //           var result = response.data.data;
      //           //console.log("result.length:" + result.length);
      //           Array.prototype.push.apply($scope.goodList, response.data.data);
      //           // 更新总页面数，基于API发送的值
      //           $scope.total=response.data.total_page;
      //           if($scope.total>10){
      //             $scope.total = 10;
      //           }
      //           // 示例数据中为30页
      //         }else if(response.code==50002){
      //           $scope.refUrl = Signature.h5("/token/refresh?"+ localStorage.getItem('session_token') +"");
      //           $http.get($scope.refUrl).then(function successCallback(response) {
      //             if(response.data.code==10000){
      //               window.localStorage.access_token = "access_token=" + response.data.data.access_token;
      //               window.localStorage.session_token = "session_token=" + response.data.data.session_token;
      //             }else {
      //               alert(response.data.msg);
      //             }
      //           }, function errorCallback(response) {
      //             // 请求失败执行代码
      //           });
      //         }else{
      //           alert(response.msg)
      //         }
      //           }).finally(function(){
      //               // 广播事件，告诉无限滚动组件everything is done
      //               $scope.$broadcast("scroll.infiniteScrollComplete");
      //           });
      //  };
      // $scope.getGoodLists();    // 加载时，从API加载第一页餐馆数据


  /*解决当轮播图只有两张的时候重复轮播*/
         /*$scope.slideChange= function(index) {
                 $scope.slideIndex = index;
                 ($ionicSlideBoxDelegate.count() -1 ) == index && $timeout(function(){$ionicSlideBoxDelegate.slide(0);},3000);
             };*/
         $scope.repeatDone = function() {
               $ionicSlideBoxDelegate.update();
               //$ionicSlideBoxDelegate.slide($scope.week.length - 1, 1);
             };

    $scope.noticeList=[
      {time:"30分钟前",name:"f215259098",type:"中奖了",content:"低领蕾丝打底衫女长袖网纱小衫"},
      {time:"刚刚",name:"多拉三萌",type:"中奖了",content:"净颜纤体酵素果冻"},
      {time:"刚刚",name:"腐草为萤",type:"申请了",content:"太阳能车载蓝牙耳机超小迷你耳塞式开车专用"},
      {time:"刚刚",name:"champion",type:"申请了",content:"真皮保暖厚底雪地靴女"},
      {time:"刚刚",name:"chengshuneng",type:"申请了",content:"大衣质量很好也很贵,先到先得,错过无期"},
      {time:"刚刚",name:"zzy6854",type:"申请了",content:"万能小板凳"},
      {time:"30分钟前",name:"飘散与云",type:"中奖了",content:"家万能精致小凳子"},
      {time:"30分钟前",name:"霞光万丈228",type:"中奖了",content:"显瘦修身飘逸沙滩裙泰国海边度假长裙"},
      {time:"30分钟前",name:"lq123",type:"中奖了",content:"40*40CM抱枕一个"},
      {time:"30分钟前",name:"shanshan7349",type:"申请了",content:"太阳能蓝牙耳机，超长待机，迷你隐形超小"},
      {time:"30分钟前",name:"wo314280578",type:"申请了",content:"七彩龙】搓澡清洁神器4块装"},
      {time:"30分钟前",name:"于轩455785194",type:"申请了",content:"【儿童款】亲子泳衣"},
      {time:"30分钟前",name:"zmq15906195517",type:"申请了",content:"【维尔美】 原木软加厚3层6包"},
      {time:"30分钟前",name:"huomanhao1008",type:"申请了",content:"只拍高30cm的花瓶"},
      {time:"30分钟前",name:"蓝丝绒89",type:"申请了",content:"千鸟格拼色毛衣打底衫"},
      {time:"刚刚",name:"ly521",type:"申请了",content:"中青年加绒加厚打底毛衣"},
      {time:"10分钟前",name:"潞潞宝贝你好",type:"中奖了",content:"毛呢半身裙高腰条纹A字裙内衬裤短裙"},
      {time:"10分钟前",name:"823059236",type:"中奖了",content:"方扣高跟单鞋"},
      {time:"30分钟前",name:"阳光还在",type:"中奖了",content:"【白框吊灯-单头白光"},
      {time:"10分钟前",name:"1421565829",type:"申请了",content:"新款韩版时尚羽绒服女中长款"},
      {time:"10分钟前",name:"wxhn125",type:"申请了",content:"四季通用欧式沙发垫防滑坐垫椅垫"},
      {time:"10分钟前",name:"lemly",type:"申请了",content:"中老年棉服兔毛内胆尼克服女妈妈羽绒服"},
      {time:"10分钟前",name:"不扛霍霍",type:"申请了",content:"品牌YAYA运动健身bra聚拢运动内衣"},
      {time:"刚刚",name:"xiaoyoulong",type:"中奖了",content:"得力笔筒多功能组合办公学生创意笔筒"},
      {time:"10分钟前",name:"tony",type:"中奖了",content:"超厚保暖毛绒绒长筒袜子家居地板袜"},
      {time:"10分钟前",name:"微凉倾雅",type:"中奖了",content:"冬季女袜子纯棉女袜中筒袜棉袜长袜男潮秋冬款长筒袜鳄鱼男士女士"},
      {time:"30分钟前",name:"shuan91",type:"申请了",content:"泰国兰纳足贴祛湿排毒睡眠"},
      {time:"10分钟前",name:"绿叶臻臻",type:"申请了",content:" 妈妈再也不问我可冷了"},
      {time:"10分钟前",name:"更黑和更白",type:"申请了",content:"拍单独镜柜款"},
      {time:"10分钟前",name:"123056",type:"申请了",content:"2017秋冬新款加绒打底衫"},
      {time:"10分钟前",name:"1152465362",type:"中奖了",content:"千鸟格拼色毛衣打底衫"},
      {time:"刚刚",name:"绿色的羊驼驼",type:"中奖了",content:"海滩长裙连衣裙海边度假沙滩裙"},
      {time:"10分钟前",name:"琛含宝贝",type:"中奖了",content:"美妆工具透明硅胶果冻气垫粉扑不吃粉易清洗"},
      {time:"20分钟前",name:"天天富翁",type:"申请了",content:"垃圾袋黑色加厚彩色酒店宾馆厨房中小号"},
      {time:"10分钟前",name:"912982224",type:"申请了",content:"纯手工3D浓密纤长款假睫毛新娘妆"},
      {time:"30分钟前",name:"sun824927098",type:"申请了",content:"高弹力修身百搭高领毛衣男"},
      {time:"30分钟前",name:"熬炼人生",type:"申请了",content:"按摩精油30ml肩颈刮痧精油通经络"},
      {time:"30分钟前",name:"爱哭的毛毛虫",type:"中奖了",content:"薄款全罩杯文胸透气舒适大胸显小"},
      {time:"30分钟前",name:"私人订制",type:"中奖了",content:"苹果6/6s/6p浮雕个性手机壳"},
      {time:"30分钟前",name:"x330282386",type:"中奖了",content:"低领蕾丝打底衫女长袖网纱小衫"},
      {time:"30分钟前",name:"dxd9394",type:"申请了",content:"净颜纤体酵素果冻"},
      {time:"10分钟前",name:"weiwei00",type:"申请了",content:"太阳能车载蓝牙耳机超小迷你耳塞式开车专用"},
      {time:"30分钟前",name:"梵天碧海",type:"申请了",content:"【净颜纤体酵素果冻"},
      {time:"10分钟前",name:"vsmen1999",type:"申请了",content:"净颜纤体酵素果冻"},
      {time:"刚刚",name:"MeHe",type:"中奖了",content:"真皮保暖厚底雪地靴女"},
      {time:"10分钟前",name:"xiaojiao",type:"中奖了",content:"大衣质量很好也很贵,先到先得,错过无期"},
      {time:"10分钟前",name:"zxcvbnmqw",type:"中奖了",content:"万能小板凳"},
      {time:"10分钟前",name:"euig",type:"申请了",content:"显瘦修身飘逸沙滩裙泰国海边度假长裙"},
      {time:"10分钟前",name:"盈盈一水",type:"申请了",content:"40*40CM抱枕一个"},
      {time:"刚刚",name:"语希2016",type:"申请了",content:"太阳能蓝牙耳机，超长待机，迷你隐形超小"},
      {time:"10分钟前",name:"宋丹yy",type:"申请了",content:"搓澡清洁神器4块装"},
      {time:"10分钟前",name:"任可青55",type:"中奖了",content:"亲子泳衣"},
      {time:"10分钟前",name:"wurenxiangwo",type:"中奖了",content:"原木软加厚3层6包"},
      {time:"10分钟前",name:"15030788406",type:"中奖了",content:"只拍高30cm的花瓶"},
      {time:"10分钟前",name:"Karen",type:"申请了",content:"千鸟格拼色毛衣打底衫"},
      {time:"10分钟前",name:"13603985345",type:"申请了",content:"中青年加绒加厚打底毛衣"},
      {time:"10分钟前",name:"宝宝贝呀",type:"申请了",content:"毛呢半身裙高腰条纹A字裙内衬裤短裙"},
      {time:"10分钟前",name:"么么达啦",type:"申请了",content:"联系客服补5元差价（颜色随便选择）方扣高跟单鞋"},
      {time:"10分钟前",name:"995913703",type:"中奖了",content:"白框吊灯-单头白光"},
      {time:"10分钟前",name:"张张先生",type:"中奖了",content:"新款韩版时尚羽绒服女中长款"},
      {time:"10分钟前",name:"相遇有时",type:"申请了",content:"四季通用欧式沙发垫防滑坐垫椅垫"},
      {time:"10分钟前",name:"745829073",type:"申请了",content:"中老年棉服兔毛内胆尼克服女妈妈羽绒服"},
      {time:"10分钟前",name:"xl1936",type:"申请了",content:"发40x40cm随机款式抱枕一个，快递随机"},
      {time:"刚刚",name:"luhan123",type:"申请了",content:"品牌YAYA运动健身bra聚拢运动内衣"},
      {time:"10分钟前",name:"漓上白雪飘",type:"中奖了",content:"超厚保暖毛绒绒长筒袜子家居地板袜"},
      {time:"10分钟前",name:"yuan0000",type:"中奖了",content:"仅限拍不加绒款"},
      {time:"10分钟前",name:"mmheyz",type:"申请了",content:"冬季女袜子纯棉女袜中筒袜棉袜长袜男潮秋冬款长筒袜鳄鱼男士女士"},
      {time:"10分钟前",name:"jiangyuan",type:"申请了",content:"泰国兰纳足贴祛湿排毒睡眠"},
      {time:"10分钟前",name:"感性与理性",type:"申请了",content:"自从穿了它 妈妈再也不问我可冷了"},
      {time:"10分钟前",name:"zhu908360865",type:"申请了",content:"单独镜柜"},
      {time:"10分钟前",name:"1500309208",type:"中奖了",content:"2017秋冬新款加绒打底衫"},
      {time:"30分钟前",name:"798603971",type:"中奖了",content:"30cm的六角花瓶"},
      {time:"刚刚",name:"家家平安乐",type:"中奖了",content:"海滩长裙连衣裙海边度假沙滩裙"},
      {time:"30分钟前",name:"fenfei",type:"申请了",content:"美妆工具透明硅胶果冻气垫粉扑不吃粉易清洗"},
      {time:"30分钟前",name:"15919425785",type:"申请了",content:"纯手工3D浓密纤长款假睫毛新娘妆"},
      {time:"10分钟前",name:"大唐胖子",type:"申请了",content:"高弹力修身百搭高领毛衣男"},
      {time:"30分钟前",name:"liqinhong201",type:"申请了",content:"薄款全罩杯文胸透气舒适大胸显小"},
      {time:"30分钟前",name:"f215259098",type:"中奖了",content:"低领蕾丝打底衫女长袖网纱小衫"},
      {time:"刚刚",name:"多拉三萌",type:"中奖了",content:"净颜纤体酵素果冻"},
      {time:"刚刚",name:"腐草为萤",type:"申请了",content:"太阳能车载蓝牙耳机超小迷你耳塞式开车专用"},
      {time:"刚刚",name:"champion",type:"申请了",content:"真皮保暖厚底雪地靴女"},
      {time:"刚刚",name:"chengshuneng",type:"申请了",content:"大衣质量很好也很贵,先到先得,错过无期"},
      {time:"刚刚",name:"zzy6854",type:"申请了",content:"万能小板凳"},
      {time:"30分钟前",name:"飘散与云",type:"中奖了",content:"家万能精致小凳子"},
      {time:"30分钟前",name:"霞光万丈228",type:"中奖了",content:"显瘦修身飘逸沙滩裙泰国海边度假长裙"},
      {time:"30分钟前",name:"lq123",type:"中奖了",content:"40*40CM抱枕一个"},
      {time:"30分钟前",name:"shanshan7349",type:"申请了",content:"太阳能蓝牙耳机，超长待机，迷你隐形超小"},
      {time:"30分钟前",name:"wo314280578",type:"申请了",content:"七彩龙】搓澡清洁神器4块装"},
      {time:"30分钟前",name:"于轩455785194",type:"申请了",content:"【儿童款】亲子泳衣"},
      {time:"30分钟前",name:"zmq15906195517",type:"申请了",content:"【维尔美】 原木软加厚3层6包"},
      {time:"30分钟前",name:"huomanhao1008",type:"申请了",content:"只拍高30cm的花瓶"},
      {time:"30分钟前",name:"蓝丝绒89",type:"申请了",content:"千鸟格拼色毛衣打底衫"},
      {time:"刚刚",name:"ly521",type:"申请了",content:"中青年加绒加厚打底毛衣"},
      {time:"10分钟前",name:"潞潞宝贝你好",type:"中奖了",content:"毛呢半身裙高腰条纹A字裙内衬裤短裙"},
      {time:"10分钟前",name:"823059236",type:"中奖了",content:"方扣高跟单鞋"},
      {time:"30分钟前",name:"阳光还在",type:"中奖了",content:"【白框吊灯-单头白光"},
      {time:"10分钟前",name:"1421565829",type:"申请了",content:"新款韩版时尚羽绒服女中长款"},
      {time:"10分钟前",name:"wxhn125",type:"申请了",content:"四季通用欧式沙发垫防滑坐垫椅垫"},
      {time:"10分钟前",name:"lemly",type:"申请了",content:"中老年棉服兔毛内胆尼克服女妈妈羽绒服"},
      {time:"10分钟前",name:"不扛霍霍",type:"申请了",content:"品牌YAYA运动健身bra聚拢运动内衣"},
      {time:"刚刚",name:"xiaoyoulong",type:"中奖了",content:"得力笔筒多功能组合办公学生创意笔筒"},
      {time:"10分钟前",name:"tony",type:"中奖了",content:"超厚保暖毛绒绒长筒袜子家居地板袜"},
      {time:"10分钟前",name:"微凉倾雅",type:"中奖了",content:"冬季女袜子纯棉女袜中筒袜棉袜长袜男潮秋冬款长筒袜鳄鱼男士女士"},
      {time:"30分钟前",name:"shuan91",type:"申请了",content:"泰国兰纳足贴祛湿排毒睡眠"},
      {time:"10分钟前",name:"绿叶臻臻",type:"申请了",content:" 妈妈再也不问我可冷了"},
      {time:"10分钟前",name:"更黑和更白",type:"申请了",content:"拍单独镜柜款"},
      {time:"10分钟前",name:"123056",type:"申请了",content:"2017秋冬新款加绒打底衫"},
      {time:"10分钟前",name:"1152465362",type:"中奖了",content:"千鸟格拼色毛衣打底衫"},
      {time:"刚刚",name:"绿色的羊驼驼",type:"中奖了",content:"海滩长裙连衣裙海边度假沙滩裙"},
      {time:"10分钟前",name:"琛含宝贝",type:"中奖了",content:"美妆工具透明硅胶果冻气垫粉扑不吃粉易清洗"},
      {time:"20分钟前",name:"天天富翁",type:"申请了",content:"垃圾袋黑色加厚彩色酒店宾馆厨房中小号"},
      
    ];


  window.onload=function(){
    function handleTouchEvent(event) {
      //只跟踪一次触摸
      if (event.touches.length == 1) {
        switch (event.type) {
          case "touchstart":
            // console.log(event.touches[0].clientX , event.touches[0].clientY);
            break;
          case "touchend":
            var mydrag=document.getElementsByClassName("my-drag")[0];
            if(event.changedTouches[0].clientX>=690){
              mydrag.style.left="632px"
            }else if(event.changedTouches[0].clientX<=78){
              mydrag.style.left="0px";
            }else {
              mydrag.style.left = event.changedTouches[0].clientX -58 + "px";
            }
            if(event.changedTouches[0].clientY<=78){
              mydrag.style.top="0px";
            }else {
              mydrag.style.top = event.changedTouches[0].clientY -78 + "px";
            }


            // console.log(event.changedTouches[0].clientX ,event.changeTouches[0].clientY) ;
            break;
          case "touchmove":
            event.preventDefault(); //阻止滚动
            var mydrag=document.getElementsByClassName("my-drag")[0];
            if(event.changedTouches[0].clientX>=690){
              mydrag.style.left="632px"
            }else if(event.changedTouches[0].clientX<=78){
              mydrag.style.left="0px";
            }else {
              mydrag.style.left = event.changedTouches[0].clientX -58 + "px";
            }
            if(event.changedTouches[0].clientY<=78){
              mydrag.style.top="0px";
            }else {
              mydrag.style.top = event.changedTouches[0].clientY -78 + "px";
            }
            // console.log(event.changedTouches[0].clientX ,event.changedTouches[0].clientY);
            break;
        }
      }
    }
    var mydrag=document.getElementsByClassName("my-drag")[0];
    mydrag.addEventListener("touchstart", handleTouchEvent, false);
    mydrag.addEventListener("touchend", handleTouchEvent, false);
    mydrag.addEventListener("touchmove", handleTouchEvent, false);
  };

});

