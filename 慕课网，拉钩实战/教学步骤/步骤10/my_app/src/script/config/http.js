'use strict';
angular.module('app').config(['$provide',function($provide){
  $provide.decorator('$http',['$delegate','$q',function($delegate,$q){
  //$delegate在这个函数里等于 $http，目的是把 POST 请求改为 get 请求

      $delegate.post = function(url,data,config){
      //config等于配置对象，将post请求改为 get 请求
        var def = $q.defer();
        //因为是get请求，创建延迟加载对象
        $delegate.get(url).success(function(resp){
          def.resolve(resp);
          //传回值 resp
        }).error(function(err){
        //如果出现异常
          def.resolve(err);
          //传回值 err
        });
        return{
          success:function(cb){
            def.promise.then(cb);
            //当上面的 resolve 完成后执行这里
          },
          error:function(cb){
            def.promise.then(null,cb);
            //当上面的 resolve 完成后执行这里
          }
        };
      };
      return $delegate;
  }]);
  //装饰 $http
}]);
