'use strict';
angular.module('app').directive('appPositionList',['$http',function($http){
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
      filterObj:'=',
      isFavorite:'='
    },link:function($scope){
      $scope.select = function(item){
      //切换收藏状态
        $http.post('data/myFavorite.json',{
          id:item.id,
          select:!item.select
        }).then(function(resp){
          item.select = !item.select;
        });

        //取反
      };
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
