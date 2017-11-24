/**
 * 关联购买
 */
'use strict';
app.controller('applyRelevanceCtrl',['$scope','$http','$ionicModal',function($scope,$http,$ionicModal){
  document.title="货蛮好网-关联购买";
  //ionicModal弹窗，由下往上;
  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(u) {
    $scope.modal.hide();
  };

//获得后台数据
  $scope.items={};
  $http({
    method : 'get',
    url :'apply.json',
  }).success(function(data,status,headers,config) {
    //这里的data，就是后台传递过来的数据jsonArray
    var  itemresult=data.data;
    itemresult.shopName=Mosaic(itemresult.shopName);
    $scope.items = itemresult;
  }).error(function(data,status,headers,config){
    alert("错误");
  });
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
}]);
