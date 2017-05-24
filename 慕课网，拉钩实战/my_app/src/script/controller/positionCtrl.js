
'use strict';
angular.module('app').controller('positionCtrl',['$log','cache','$q','$http','$state','$scope',function($log,cache,$q,$http,$state,$scope){
//这里的positionCtrl 在 router.js 的 position 函数中 view/position.html 页面上为控制器
//$q 为了实现延迟加载对象，避免子页面，需要父页面的 json 数据
//$log为 angular 自带的 console.log
$scope.isLogin = !!cache.get('name');
//判断是否有 cookies 的 name 值，!!俩个叹号将值强行转成布尔值
$scope.message = $scope.isLogin?'投个简历':'去登陆';
//判断用户是否登录，来显示按钮的文字
function getPosition(){
  var def = $q.defer();
  //设置延迟加载对象
  $http.get('./data/position.json?id='+$state.params.id).then(function(resp){
  //获取的 json 数据，存在 resp 里
    console.log(resp.data);
    $scope.position=resp.data;
    //这里的 $scope.position 会在 position.html 里 进行 pos='position' 转化
    //转化后的值显示在 positionInfo 中
    if(resp.data.posted){
      $scope.message = '已投递';
    }
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
$scope.go = function(){
//投递简历按钮
if($scope.message!=='已投递'){
  if($scope.isLogin){
    $http.post('data/handle.json',{
      id:$scope.position.id
    }).then(function(resp){
    //投递简历成功
      console.log(resp);
      $log.info(resp);
      $scope.message='已投递';

    });

  }else{
    $state.go('login');
  }
}

};

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
