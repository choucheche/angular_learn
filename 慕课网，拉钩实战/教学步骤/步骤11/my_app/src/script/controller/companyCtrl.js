'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
/*
  这里的companyCtrl 在 router.js 的
  company函数中 view/company.html 页面上为控制器
*/
  $http.get('./data/company.json?id='+$state.params.id).then(function(resp){
    $scope.company = resp.data;
    $scope.$broadcast('abc',{id:1});
    //当事件加载完成，才能显示
  });
  $scope.$on('cba',function(event,data){
    //当事件加载完成，才能显示
    console.log(event,data);
  });
}]);
