'use strict';
angular.module('app').directive('appPositionInfo',[function(){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    templateUrl:'view/template/positionInfo.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
    scope:{
      isActive:'='
    },
    link:function($scope){
      $scope.imagePath=$scope.isActive?'img/star-active.png':'img/star.png';
    }
  };
}]);
