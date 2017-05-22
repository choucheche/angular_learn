'use strict';
angular.module('app').filter('filterByObj',[function(){
//search.html用的，filter过滤器，名为 filterByObj
  return function(list,obj){
    var result = [];
    angular.forEach(list,function(item){
      var isEqual = true;
      for(var e in obj){
        if(item[e]!==obj[e]){
        //如果不符合
          isEqual = false;
        }
      }
      if(isEqual){
      //如果找到符合的
        result.push(item);
      }
    });
    return result;
  };
}]);
