/*搜索页*/
'use strict';

app.controller('searchCtrl', ['$scope','$http',function($scope,$http) {
  document.title="货蛮好网-搜索页";
  if(window.localStorage.job==null){
    $scope.storage=[]
  }else{
    console.log(888888)
    $scope.storage=JSON.parse(window.localStorage.job);
    $scope.data=JSON.parse(window.localStorage.job);
    for(var i = 0; i < $scope.data.length; i++){
      $scope.data[i] = JSON.parse($scope.data[i]);
                       // console.log(job[i])
          }
  }
  document.getElementById("searchInput").onkeyup = function (event) {
              var e = event || window.event;
              var keyCode = e.keyCode || e.which;
              switch (keyCode) {
                  case 13 :
                     searchAll(this.value);
                      break;
                  default:
                      break;
              }
          };
  $scope.searchHistory=function(searchText){
    searchAll(searchText)
  };
  $scope.ifSearch=true;
  function searchAll(searchText) {
    if($scope.ifSearch==true){
      $scope.ifSearch=false;
      $scope.w=null;
            for(var q=0;q<$scope.storage.length;q++){

              if(JSON.parse($scope.storage[q]).name===searchText){

                $scope.w=0;
                location.href="#/searchResults?item_name="+searchText;
              return false
              }
            }
           // console.log($scope.w)

              if($scope.w!=0){
                    if($scope.storage.length>19){
                      $scope.storage.splice(0,1);
                      $scope.storage.push(JSON.stringify({name:searchText}));
                      //console.log(1111111)

                    }else{
                      $scope.storage.push(JSON.stringify({name:searchText}));
                     // console.log(2222222)
                    }

                  }
                  window.localStorage.job = JSON.stringify($scope.storage); //将storage转变为字符串存储
                  var job = JSON.parse(window.localStorage.job);
                   //console.log(job.length)

                    for(var i = 0; i < job.length; i++){
                          job[i] = JSON.parse(job[i]);
                                  // console.log(job[i])
                     }
                  $scope.data=job;
         location.href="#/searchResults?item_name="+searchText
    }


  }

      $scope.delete=function(a){
          var i=$scope.data.indexOf(a);
          $scope.data.splice(i,1)
        $scope.data2=$scope.data;
          console.log($scope.data)
      /* for(var q=0;q<$scope.data2.length;q++){
         $scope.data2[q] = JSON.stringify($scope.data2[q]);
       }*/

      var deleteArr=JSON.parse(window.localStorage.job)
        deleteArr.splice(i,1);
         window.localStorage.job=JSON.stringify(deleteArr);
        console.log(window.localStorage.job)
      };
      $scope.add=function (a) {
        if($scope.data.length>0){
          var i=$scope.data.indexOf(a);
               document.getElementById("searchInput").value=$scope.data[i].name
        }
      };
      $scope.allDelete=function () {
        $scope.data=[];
        window.localStorage.removeItem("job");
        setTimeout(function(){
          location.reload()
        },1000)
      };
      $scope.doRefresh=function(){
          $http.get("name.json").success(function(item){
              $scope.data=item
          }).finally(function(){
              $scope.$broadcast("scroll.refreshComplete");
          });
      }
}]);
