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
