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
