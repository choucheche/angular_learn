
$(function(){
  $(window).resize(function() {
  //当页面宽度变化时
    (function IsPC() {
    //判断是 移动端 还是 PC
      for (var userAgentInfo = navigator.userAgent, Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], flag = !0, v = 0; v < Agents.length; v++)
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          console.log('移动');

          document.getElementsByTagName('html')[0].style.fontSize=window.screen.width/10+'px';
          //body字体大小为页面宽度除以 10

          return;
        }
      console.log('PC');

      document.getElementsByTagName('html')[0].style.fontSize=37.5+'px';
      /*
        设置页面 html 文字根字号大小为37.5，为了让 less 好计算
        这样 less 里的数值是多少就是多少 px了
      */

      return;
    })();
  });

});

'use strict';
angular.module('app',['ui.router']);
//引入路由模块 ui.router

//注意：所有script里的js代码会 用 gulp 的 concat 合并到 js/index.js 中

'use strict';
//这是配置路由的js
angular.module('app').config([
    //配置路由
    '$stateProvider', '$urlRouterProvider',
    /*
      $stateProvider是配置状态
    */
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('main', {
        //首页，配置路由的函数，id为 main
            url: '/main',
            //路由路径
            templateUrl: 'view/main.html',
            //文件路径
            controller: 'mainCtrl'
            //控制器为 mainCtrl，在mainCtrl.js里
        }).state('position',{
        //职位详情页面
          url:'/position/:id',
          //需要传 id 得知哪个职位
          templateUrl: 'view/position.html',
          controller: 'positionCtrl'
        }).state('company',{
        //公司详情页面
          url:'/company/:id',
          //需要传 id 得知哪个公司
          templateUrl: 'view/company.html',
          controller: 'companyCtrl'
        });
        $urlRouterProvider.otherwise('main');
        //其他地址，执行 id 为 main 的路由
    }
]);
/*
路由路径说明：
/home 只匹配 /home
/user/:id 和 /user/{id} 匹配 /user/1234 或者 /user/
/messages?before&after 非 rest传参
*/

/*跳转方式，html里写跳转
<a ui-sref='main'></a>
跳转到 main页面

<a ui-sref='main({id:1234})'></a>
跳转到 main页面，传参数 id:1234
*/

/*跳转方式，js使用跳转
$state.go('main',{id:contact.id},{location:'replace'});

说明：
location:'replace'
消除当前的路径地址，会跳的时候，页面就不会跳回之前的页面
*/

/*获取对应页面参数
$state.params 或 $stateParams 里面有所有对应的参数
比如:
$state.params.id
$stateParams.id
*/

'use strict';
angular.module('app').controller('companyCtrl',['$scope',function($scope){
/*
  这里的companyCtrl 在 router.js 的
  company函数中 view/company.html 页面上为控制器
*/
}]);


'use strict';
angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
//这里的mainCtrl 在 router.js 的 main 函数中 view/main.html 页面上为控制器
//$http可以调用 data文件夹下的json文件
  $http.get('./data/positionList.json').success(function(resp){
  //获取的 json 数据，存在 resp 里
    console.log(resp);
    $scope.list=resp;
  }).error();
  //获取 json 数据
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


'use strict';
angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope',function($q,$http,$state,$scope){
//这里的positionCtrl 在 router.js 的 position 函数中 view/position.html 页面上为控制器
//$q 为了实现延迟加载对象，避免子页面，需要父页面的 json 数据
$scope.isLogin = false;
function getPosition(){
  var def = $q.defer();
  //设置延迟加载对象
  $http.get('./data/position.json?id='+$state.params.id).success(function(resp){
  //获取的 json 数据，存在 resp 里
    console.log(resp);
    $scope.position=resp;
    //这里的 $scope.position 会在 position.html 里 进行 pos='position' 转化
    //转化后的值显示在 positionInfo 中
    def.resolve(resp);
    //把值传回去
  }).error(function(err){
    def.reject(err);
  });
  return def.promise;
}
function getCompany(id){
  $http.get('./data/company.json?id='+id).success(function(resp){
    //获得父级页面 json 的 id 值后，获得 json 值
    console.log(resp);
    $scope.company = resp;
    //传入 company.html 值
  });
}
getPosition().then(function(obj){
/*
getPosition().then()表示，
上面的 getPosition() 函数执行后，执行这个函数
他有俩个函数，一个是 getPosition()执行 success 时执行的，
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

'use strict';
angular.module('app').directive('appCompany',[function(){
/*设置自定义标签，
找到带 app-company 的属性标签，让里面写入 view/template/company.html的内容
注意：company.html里需要有一个根标签
*/
  return {
    restrict:'A',
    // A 从属性中读取，连接到 app-company
    replace: true,
    scope:{
      com:'='
    },
    templateUrl:'view/template/company.html'
  };
}]);

'use strict';
angular.module('app').directive('appFoot',[function(){
/*设置自定义标签，
找到带 app-foot 的属性标签，让里面写入 view/template/foot.html的内容
foot.html里需要有一个根标签
*/
  return {
    restrict:'A',
    // A 从属性中读取，连接到 app-foot
    replace: true,
    templateUrl:'view/template/foot.html'
  };
}]);

'use strict';
angular.module('app').directive('appHead',[function(){
/*设置自定义标签，
找到带 app-head 的属性标签，让里面写入 view/template/head.html的内容
注意：head.html里需要有一个根标签
*/
  return {
    restrict:'A',
    // A 从属性中读取，连接到 app-head
    replace: true,
    templateUrl:'view/template/head.html'
  };
}]);

'use strict';
angular.module('app').directive('appHeadBar',[function(){
/*设置自定义标签，
找到带 app-head 的属性标签，让里面写入 view/template/head.html的内容
注意：head.html里需要有一个根标签
*/
  return {
    restrict:'A',
    // A 从属性中读取，连接到 app-head
    replace: true,
    templateUrl:'view/template/headBar.html',
    scope:{
      text:'='
    },
    link:function(scope){
      scope.back=function(){
        window.history.back();
      }
    }
  };
}]);

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

'use strict';
angular.module('app').directive('appPositionInfo',[function(){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    templateUrl:'view/template/positionInfo.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
    scope:{
      isActive:'=',
      isLogin:'=',
      pos:'=',
    },
    link:function($scope){
      $scope.imagePath=$scope.isActive?'img/star-active.png':'img/star.png';
    }
  };
}]);

'use strict';
angular.module('app').directive('appPositionList',[function(){
/*设置自定义标签，
找到带 app-positionList 的属性标签，让里面写入 view/template/positionList.html的内容
positionList.html里需要有一个根标签
*/
  return {
    restrict:'A',
    // A 从属性中读取，连接到 app-positionList
    replace: true,
    templateUrl:'view/template/positionList.html',
    //路由，让 <div app-position-list>变成 positionList.html页面
    scope:{
      data:'='
    }
    /*
    这里的 scope 里的 data:'=' 是让
    positionList.html里的
    <li class='item' ng-repeat='item in data'> 里面的 data
    等于
    mainCtrl.js里的 $scope.list
    作用就是重命名，为了不让名字重复，太乱
    */
  };
}]);
