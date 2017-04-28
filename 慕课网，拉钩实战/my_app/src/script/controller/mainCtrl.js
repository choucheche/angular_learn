
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
