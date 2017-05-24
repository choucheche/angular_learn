
'use strict';
angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope',function($q,$http,$state,$scope){
//这里的positionCtrl 在 router.js 的 position 函数中 view/position.html 页面上为控制器
//$q 为了实现延迟加载对象，避免子页面，需要父页面的 json 数据
$scope.isLogin = false;
function getPosition(){
  var def = $q.defer();
  //设置延迟加载对象
  $http.get('./data/position.json?id='+$state.params.id).then(function(resp){
  //获取的 json 数据，存在 resp 里
    console.log(resp.data);
    $scope.position=resp.data;
    //这里的 $scope.position 会在 position.html 里 进行 pos='position' 转化
    //转化后的值显示在 positionInfo 中
    def.resolve(resp.data);
    //把值传回去
  });
  // .error(function(err){
  //   def.reject(err);
  // });
  return def.promise;
}
function getCompany(id){
  $http.get('./data/company.json?id='+id).then(function(resp){
    //获得父级页面 json 的 id 值，获得接口
    console.log(resp.data);
    $scope.company = resp.data;
  });
}
getPosition().then(function(obj){
/*
getPosition().then()表示，
上面的 getPosition() 函数执行后，执行这个函数
他有俩个函数，一个是 getPosition()执行 then 时执行的，
一个是 getPosition()执行 error 时执行的，
*/
  getCompany(obj.companyId);
  console.log(obj);
},function(){
  alert('进入error，接口错误');
});
/*
  传入俩个函数，第一个是 def.resolve(resp);
  第二个是 def.reject(err);
*/
  // $scope.list=[
  // //列表数据
  //   {
  //     id:'1232',
  //     name:'销售',
  //     imgSrc:'img/me.jpg',
  //     compayName:'千度',
  //     city:'上海',
  //     industry:'互联网',
  //     time:'2016-06-01 11:05'
  //   },
  //   {
  //     id:'2',
  //     name:'web前端',
  //     imgSrc:'img/me.jpg',
  //     compayName:'慕课网',
  //     city:'北京',
  //     industry:'互联网',
  //     time:'2016-06-01 01:05'
  //   }
  // ];
}]);
