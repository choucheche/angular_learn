
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
            //配置路由的函数，id为 main
            url: '/main',
            //路由路径
            templateUrl: 'view/main.html',
            //文件路径
            controller: 'mainCtrl'
            //控制器为 mainCtrl，在mainCtrl.js里
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
angular.module('app').controller('mainCtrl',['$scope',function($scope){
//这里的mainCtrl 在 router.js 的 main 函数中 view/main.html 页面上为控制器
  $scope.list=[
  //列表数据  
    {
      id:'1232',
      name:'销售',
      imgSrc:'img/me.jpg',
      compayName:'千度',
      city:'上海',
      industry:'互联网',
      time:'2016-06-01 11:05'
    },
    {
      id:'2',
      name:'web前端',
      imgSrc:'img/me.jpg',
      compayName:'慕课网',
      city:'北京',
      industry:'互联网',
      time:'2016-06-01 01:05'
    }
  ];
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
