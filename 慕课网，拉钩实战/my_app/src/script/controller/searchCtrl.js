
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
