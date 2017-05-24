
'use strict';
angular.module('app').controller('postCtrl',['$http','$scope',function($http,$scope){
  $scope.tabList=[{
    id:'all',
    name:'全部'
  },{
    id:'pass',
    name:'面试邀请'
  },{
    id:'fail',
    name:'不合适'
  }];
  $http.get('data/myPost.json').then(function(resp){
    $scope.positionList = resp.data;
  });
  $scope.filterObj = {};
  //过滤数据
  $scope.tClick=function(id,name){
  //切换 投递记录 tab  
    switch (id) {
      case 'all':
        delete $scope.filterObj.state;
        //全选
        break;
      case 'pass':
        $scope.filterObj.state = '1';
        break;
      case 'fail':
        $scope.filterObj.state = '-1';
        break;
      default:

    }
  };
}]);
