//
'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
  $http.get('data/city.json').success(function(resp){
  //获取城市列表
    dict.city = resp;
  });
  $http.get('data/salary.json').success(function(resp){
  //获取薪资列表
    dict.salary = resp;
  });
  $http.get('data/scale.json').success(function(resp){
  //获取公司规模列表
    dict.scale = resp;
  });
}]);
