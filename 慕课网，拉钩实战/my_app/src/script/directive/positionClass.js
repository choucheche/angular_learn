'use strict';
angular.module('app').directive('appPositionClass',[function(){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    scope:{
      com:'='
    },
    templateUrl:'view/template/positionClass.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
    link:function($scope){
      //$scope.isActive = 0;
      $scope.showPositionList = function(idx){
      //idx为传入的索引值

          $scope.positionList = $scope.com.positionClass[idx].positionList;
          $scope.isActive = idx;
      };
      $scope.$watch('com',function(newVal,oldVal){
      //$scope.$watch('com'代表监控上面的 $scope.com 这个属性
      //newVal代表传入之后的值，oldVal代表传入之前的值
      //少写 $scope.$watch 写很多了会影响性能
        if(newVal){
        //一旦发现 $scope.com 传入值了
          $scope.showPositionList(0);
          //设置默认索引值为 0
          //需要先加载完 $scope.com 才能用
        }
      });

    }
  };
}]);
