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
