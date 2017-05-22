
'use strict';
angular.module('app').controller('registerCtrl',['$interval','$http','$scope',function($interval,$http,$scope){
  $scope.submit = function(){
  //点击注册按钮，手机号密码输入错误时，无法点击触发这个submit函数
    console.log($scope.user);
  };

  var count = 60;
  //验证码60秒
  $scope.send=function(){
  //发送验证码
      $http.get('data/code.json').success(function(resp){
      //拿到验证码
          if(resp.state===1){
          //如果验证码发送成功
            count=60;
            $scope.time='60s';
            var interval = $interval(function(){
            //验证码倒计时
            if(count<=0){
              $interval.cancel(interval);
              //清除倒计时
              $scope.time='';
            }else{
              count--;
              $scope.time=count +'s';
            }
          },1000);
          }
      });
  };
}]);
