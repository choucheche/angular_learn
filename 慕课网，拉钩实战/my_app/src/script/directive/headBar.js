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
