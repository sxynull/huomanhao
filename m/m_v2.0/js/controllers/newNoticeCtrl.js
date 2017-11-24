/**
 * Created by Administrator on 2017/6/2 0002.
 */
app.controller('newNoticeCtrl', ['$scope', '$http','Signature', function ($scope, $http,Signature) {
  document.title="货蛮好网-通知";
  $scope.toggleFunc=function(obj){
          console.log($(obj.target))
          if($(obj.target).next().is(".read")){
            $(obj.target).next().removeClass("read")
          }else{
            $(obj.target).removeClass("newscontent_top_read ");
            $(obj.target).next().addClass("read");
            $http.get(Signature.login("/user/notification/read?notificationId="+$(obj.target).prev().val()))
              .success(function(response){
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
              })
          }
      };
  // 创建一些scope变量
    $scope.page = 0;        // 用来保存当前请求的页码
    $scope.goodList = [];
    // 加载的方法
    $scope.getRestaurants = function () {
      $scope.page++;  // 页数++
      $scope.url = Signature.login("/user/notification/list?currentPage="+$scope.page+"&pageSize=10");

      $http.get($scope.url)
        .success(function (response) {
          if(response.code==10000) {
            // angualr的工具方法
            //angular.forEach(response.restaurants, function (restaurant) {
            //    $scope.restaurants.push(restaurant);    // 将新数据追加到数组中
            //});
            var result = response.data.data;
            // console.log(result);
            if(result.length==0){
              $scope.goodList = [{status:2,title:'暂时没有新消息'}];
              // console.log($scope.goodList);
            }
            //console.log("result.length:" + result.length);
            Array.prototype.push.apply($scope.goodList, response.data.data);


            // 更新总页面数，基于API发送的值
            $scope.total = response.data.total_page; // 示例数据中为30页
          }else{
            alert(response.msg)
          }
        })
        //.error(function (err) {
        //    //console.log(err);
        //})
        .finally(function () {
          // 广播事件，告诉无限滚动组件everything is done
          $scope.$broadcast("scroll.infiniteScrollComplete");
        });
    };

    $scope.getRestaurants();    // 加载时，从API加载第一页数据
}]);
