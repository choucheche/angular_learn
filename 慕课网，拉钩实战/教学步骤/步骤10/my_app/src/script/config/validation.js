'use strict';
angular.module('app').config(['$validationProvider',function($validationProvider){
//$validationProvider是，index.html引来的js插件。对模块和服务进行配置
  var expression = {
  //判断条件
    phone:/^1[\d]{10}/,
    //手机号是 11位，首位必须是 1
    password:function(value){
      return value.length > 5 ;
      //密码必须大于5位
    },
    required:function(value){
    //校验，手机验证码的规则
        return !!value;
        //不能为空
    }
  };
  var defaultMsg = {
  //表单校验提示文字
    phone:{
      success:'',
      error:'必须是11位手机号'
    },
    password:{
      success:'',
      error:'长度至少6位'
    },
    required:{
      success:'',
      error:'不能为空'
    }
  };
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
  //设置提示语
}]);
