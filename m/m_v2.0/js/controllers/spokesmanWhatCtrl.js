/*代言人介绍页*/
'use strict';
app.controller('spokesmanWhatCtrl', ['$scope','$http','Signature','$location',function($scope,$http,Signature,$location) {
  document.title="货蛮好网-代言人介绍页";
     $scope.toggleFunc=function(obj){
          $(obj.target).parent().next().toggle();
          // console.log($(obj.target).parent().next().css('display'));
          // console.log($(obj.target));
          // 判断点击的对象来切换箭头的朝向
           if($(obj.target).parent().next().css('display')=='flex'&&$(obj.target).hasClass('icon')){
     			$(obj.target).css('background',"url('/m/m_v2.0/img/spokesman/slideUp.png') no-repeat left 37px")
     		}else if($(obj.target).parent().next().css('display')=='none'&&$(obj.target).hasClass('icon')){
     			$(obj.target).css('background',"url('/m/m_v2.0/img/spokesman/slideDown.png') no-repeat left 37px")
     		}
     		if($(obj.target).parent().next().css('display')=='none'&&$(obj.target).hasClass('spokes-title')){
     			$(obj.target).next().css('background',"url('/m/m_v2.0/img/spokesman/slideUp.png') no-repeat left 37px")
     		}else if($(obj.target).parent().next().css('display')=='flex'&&$(obj.target).hasClass('spokes-title')){
     			$(obj.target).next().css('background',"url('/m/m_v2.0/img/spokesman/slideDown.png') no-repeat left 37px")
     		}
     } ;
    
}]);
