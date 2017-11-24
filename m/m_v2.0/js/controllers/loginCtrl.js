/**
 * Created by Administrator on 2017/6/13 0013.
 */
app.controller('loginCtrl', function ($scope,$http,Signature,$rootScope,$timeout,$location) {


  if($rootScope.isCode==true){
    $rootScope.code=Signature.getUrlParameter($location.$$absUrl).param.code;
    $scope.state=Signature.getUrlParameter($location.$$absUrl).param.state;
         if($rootScope.code==window.sessionStorage.code){
           if($scope.state==1){
             if($rootScope.open_id!=0&&$rootScope.open_id!=undefined){
                         $rootScope.userId=window.localStorage.user_id;
                              /*获取当前中奖数*/
                                $http.get(Signature.login("/user/apply/count")).success(function(response){
                                     if(response.code==10000){
                                       $scope.winng_cont=response.data.winng_cont
                                     }
                                });
                              location.href="#/tabs/home";
                       }else{
                         location.href="#/tabs/home";
                       }
           }else if($scope.state!=1){
                      var unicode=BASE64.decoder(decodeURIComponent($scope.state));
                                  var str = '';
                                  for(var i = 0 , len =  unicode.length ; i < len ;++i){
                                        str += String.fromCharCode(unicode[i]);
                      }
             window.localStorage.invited_code=Signature.getUrlParameter(str).param.inviteCode;
             location.href="#"+str;

                    }

         }else{
           if($scope.state==1){
             $http.get(Signature.h5("/login/token/get?code="+$rootScope.code)).success(function(response){

                   if(response.code==10000){
                     if(response.data.session_token.length>0&&response.data.access_token.length>0) {
                       window.sessionStorage.code = $rootScope.code;
                       window.localStorage.access_token = "access_token=" + response.data.access_token;
                       window.localStorage.session_token = "session_token=" + response.data.session_token;
                       window.localStorage.invited_code=response.data.invited_code;
                       $rootScope.open_id=0;
                       window.localStorage.open_id=$rootScope.open_id;
                       $rootScope.userId = response.data.user_id;
                       window.localStorage.user_id = $rootScope.userId;
                       location.href="#/tabs/home"

                     }
                     }else if(response.code==30010){
                     window.sessionStorage.code = $rootScope.code;
                       $rootScope.open_id=response.data;
                     window.localStorage.open_id=$rootScope.open_id;
                       location.href="#/tabs/home";
                     }else{
                        console.log(response.code);
                       alert(response.msg)
                     }



               })

           }else if($scope.state!=1){
                                 var unicode=BASE64.decoder(decodeURIComponent($scope.state));
                                             var str = '';
                                             for(var i = 0 , len =  unicode.length ; i < len ;++i){
                                                   str += String.fromCharCode(unicode[i]);
                                 }
                                 $http.get(Signature.h5("/login/token/get?code="+$rootScope.code)).success(function(response){
                                 if(response.code==10000){

                                   if(response.data.session_token.length>0&&response.data.access_token.length>0) {
                                     window.sessionStorage.code = $rootScope.code;
                                     window.localStorage.access_token = "access_token=" + response.data.access_token;
                                     window.localStorage.session_token = "session_token=" + response.data.session_token;
                                     window.localStorage.invited_code=response.data.invited_code;
                                     $rootScope.userId = response.data.user_id;
                                     window.localStorage.user_id = $rootScope.userId;
                                     $rootScope.open_id=0;
                                                 window.localStorage.open_id=$rootScope.open_id;
                                     if(str=="/loginbind"){
                                        location.href="#/tabs/home";
                                     }else{
                                       window.localStorage.invited_code=Signature.getUrlParameter(str).param.inviteCode;
                                       location.href="#"+str
                                     }


                                   }
                                   }else if(response.code==30010){
                                   window.sessionStorage.code = $rootScope.code;
                                     $rootScope.open_id=response.data;
                                   window.localStorage.open_id=$rootScope.open_id;

                                   window.localStorage.invited_code=Signature.getUrlParameter(str).param.inviteCode;
                                     location.href="#"+str;
                                   }else{
                                      console.log(response.code);
                                     alert(response.msg)
                                   }
                                 })
               }
         }
  }else{
    if($location.$$search.isState!=1){
      window.localStorage.open_id="TheBrowserToRegister";
      location.href="#/tabs/home";
    }else{
      $scope.isState=1;
    }

    $scope.next = function (nick, password) {
       $scope.dataUrl = Signature.h5("/login?nick=" + nick + "&password=" + password);
       $http.get($scope.dataUrl).success(function successCallback(response) {
           if (response.code == 10000) {
             //alert(response.data.access_token);
             $rootScope.open_id=0;
             window.localStorage.open_id=$rootScope.open_id;
             window.localStorage.access_token = "access_token=" + response.data.access_token;
             window.localStorage.session_token = "session_token=" + response.data.session_token;
             $rootScope.userId = response.data.user_id;
             window.localStorage.user_id = $rootScope.userId;
             //window.localStorage.isLogin=1;
               window.location.href = "#/tabs/home"
           } else {
             alert(response.msg)
           }
         }
         , function errorCallback(response) {
           // 请求失败执行代码
         });

     };
  }





});
