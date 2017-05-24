'use strict';
angular.module('app').directive('appPositionInfo',['$http',function($http){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    templateUrl:'view/template/positionInfo.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
    scope:{
      isActive:'=',
      isLogin:'=',
      pos:'=',
    },
    link:function($scope){
      $scope.$watch('pos',function(newVal){
      //等 pos 值传过来再执行函数里的内容
        if(newVal){
          $scope.pos.select = $scope.pos.select || false;
          $scope.imagePath=$scope.pos.select?'img/star-active.png':'img/star.png';
        }
      });

      $scope.favorite = function(){
      //当用户点击收藏按钮
        $http.post('data/favorite.json',{
          id:$scope.pos.id,
          select:$scope.pos.select
        }).then(function(resp){
          $scope.pos.select = !$scope.pos.select;
          $scope.imagePath=$scope.pos.select?'img/star-active.png':'img/star.png';
        });
      };
    }
  };
}]);
