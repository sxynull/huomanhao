/**
 * 帮助中心
 */
'use strict';
app.controller('helpcenterDetailCtrl',['$scope','$location',function($scope,$location){
  document.title="货蛮好网-帮助中心";
  var number=$location.$$search.number;
  for(var i=0;i<$(".module").length;i++){
    if(number==$(".module").eq(i).attr("data")){
      $(".module").eq(i).css("display","block").siblings().css("display","none");
    }
    console.log($(".module").eq(i).attr("data"))
  }
}]);
