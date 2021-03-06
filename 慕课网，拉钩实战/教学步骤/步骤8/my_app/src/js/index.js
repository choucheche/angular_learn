
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
        }).state('search',{
        //公司详情页面
          url:'/search',
          //需要传 id 得知哪个公司
          templateUrl: 'view/search.html',
          controller: 'searchCtrl'
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
    link:function($scope){
      $scope.back=function(){
        window.history.back();
      };
      $scope.$on('abc',function(event,data){
      /*
      $on向上广播
      传入俩个参数，事件名称 abc，
      和处理这个函数，它也有俩个参数，事件对象，会时间
      */
        console.log(event,data);
      });
      $scope.$emit('cba',function(event,data){
      /*
      $emit向下广播
      传入俩个参数，事件名称 abc，
      和处理这个函数，它也有俩个参数，事件对象，会时间
      */
        console.log(event,data);
      });
    }
  };
}]);

'use strict';
angular.module('app').directive('appPositionClass',[function(){
  return{
    restrict:'A',
    // A 从属性中读取，连接到 app-PositionInfo
    replace: true,
    scope:{
      com:'='
    },
    templateUrl:'view/template/positionClass.html',
    //路由，让 <div app-position-Info>变成 positionInfo.html页面
    link:function($scope){
      //$scope.isActive = 0;
      $scope.showPositionList = function(idx){
      //idx为传入的索引值

          $scope.positionList = $scope.com.positionClass[idx].positionList;
          $scope.isActive = idx;
      };
      $scope.$watch('com',function(newVal,oldVal){
      //$scope.$watch('com'代表监控上面的 $scope.com 这个属性
      //newVal代表传入之后的值，oldVal代表传入之前的值
      //少写 $scope.$watch 写很多了会影响性能
        if(newVal){
        //一旦发现 $scope.com 传入值了
          $scope.showPositionList(0);
          //设置默认索引值为 0
          //需要先加载完 $scope.com 才能用
        }
      });

    }
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
      data:'=',
      filterObj:'='
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

'use strict';
angular.module('app').directive('appSheet',[function(){
  return {
    restrict:'A',
    replace: true,
    scope:{
      list:'=',
      visible:'=',
      select:'&'
    },
    templateUrl:'view/template/sheet.html'
  };
}]);

'use strict';
angular.module('app').directive('appTab',[function(){
  return {
    restrict:'A',
    replace: true,
    scope:{
      list:'=',
      tabClick:'&'
    },
    templateUrl:'view/template/tab.html',
    link:function($scope){
      $scope.click=function(tab){
        $scope.selectId = tab.id;
        $scope.tabClick(tab);
      };
    }
  };
}]);

'use strict';
angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
/*
  这里的companyCtrl 在 router.js 的
  company函数中 view/company.html 页面上为控制器
*/
  $http.get('./data/company.json?id='+$state.params.id).success(function(resp){
    $scope.company = resp;
    $scope.$broadcast('abc',{id:1});
    //当事件加载完成，才能显示
  });
  $scope.$on('cba',function(event,data){
    //当事件加载完成，才能显示
    console.log(event,data);
  });
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
    //获得父级页面 json 的 id 值，获得接口
    console.log(resp);
    $scope.company = resp;
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
angular.module('app').controller('searchCtrl',['dict','$http','$scope',function(dict,$http,$scope){
//这里的searchCtrl 在 router.js 的 main 函数中 view/search.html 页面上为控制器
//这里的 dict，在 script/config/dict.js 里
//$http可以调用 data文件夹下的json文件
  // $http.get('./data/positionList.json').success(function(resp){
  //   $scope.positionList=resp;
  // });
  $scope.name='';
  //默认搜索内容为空
  $scope.search=function(){
    $http.get('./data/positionList.json?name='+$scope.name).success(function(resp){
    //传入参数 name='+$scope.name
      $scope.positionList=resp;
    });
  };
  $scope.search();
  $scope.sheet={};
  $scope.tabList=[{
    id:'city',
    name:'城市'
  },{
    id:'salary',
    name:'薪水'
  },{
    id:'scale',
    name:'公司规模'
  }];
  var tabId = '';
  $scope.filterObj={};
  $scope.tClick=function(id,name){
    tabId = id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
    //console.log(id,name);
  };
  $scope.sClick=function(id,name){
    //console.log(id,name);
    if(id){
      angular.forEach($scope.tabList,function(item){
      //遍历 $scope.tabList，当选择 tab里的列表后，tab相应点击位置文字改为选择的文字
      //比如点城市，列表选择北京，那么 tab上的城市，改为北京
        if(item.id===tabId){
          item.name = name;
        }
      });
      /**/
      $scope.filterObj[tabId+'Id'] = id;
      //tabId+'Id'是 json里的属性名
      /**/
    }else{
      //如果没有id，那么就是默认值
      delete $scope.filterObj[tabId + 'Id'];
      //
      angular.forEach($scope.tabList,function(item){
        if(item.id===tabId){
          switch (item.id) {
            case 'city':
              item.name = '城市';
              break;
            case 'salary':
              item.name = '薪资';
              break;
            case 'scale':
              item.name = '公司规模';
              break;
            default:

          }
        }
      });
    }
  };
}]);
