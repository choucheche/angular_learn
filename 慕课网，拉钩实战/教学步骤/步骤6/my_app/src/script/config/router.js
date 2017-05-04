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
