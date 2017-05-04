'use strict';
angular.module('app').directive('appPositionClass',[function(){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    templateUrl:'view/template/positionClass.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
  };
}]);
