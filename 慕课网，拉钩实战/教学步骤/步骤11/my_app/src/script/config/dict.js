//
'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
  $http.get('data/city.json').then(function(resp){
  //获取城市列表
    dict.city = resp.data;
  });
  $http.get('data/salary.json').then(function(resp){
  //获取薪资列表
    dict.salary = resp.data;
  });
  $http.get('data/scale.json').then(function(resp){
  //获取公司规模列表
    dict.scale = resp.data;
  });
}]);
