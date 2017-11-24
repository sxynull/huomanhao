app.controller('tabsCtrl',function($scope,$ionicScrollDelegate,$timeout,$http,Signature,$rootScope){
      $scope.top=function(){
        $ionicScrollDelegate.scrollTop()
      };
  $rootScope.open_id=window.localStorage.open_id;
  $rootScope.isCode=window.localStorage.isCode;
  // 褰撳墠绐楀彛婊氬姩鐨勯珮搴�
    $scope.getHeight = function(){

      if($ionicScrollDelegate._instances[1]!=undefined){
        $scope.height=$ionicScrollDelegate._instances[1].getScrollPosition();
                     $scope.height==undefined ? $scope.height=1 : $scope.height=$ionicScrollDelegate._instances[1].getScrollPosition().top;

           return   $scope.height;
      }

    };
    $scope.goLogin=function(){
      location.href="#/login?state=1"
    }
  /*鑾峰彇褰撳墠涓鏁�*/
  if($rootScope.open_id==0 || $rootScope.open_id==undefined){
    $http.get(Signature.login("/user/apply/count")).success(function(response){
        if(response.code==10000){
          $scope.winng_cont=response.data.winng_cont
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
            // 璇锋眰澶辫触鎵ц浠ｇ爜
          });
        }
      });
  }





});

