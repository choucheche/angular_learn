$(function(){$(window).resize(function(){!function(){for(var t=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],o=0;o<e.length;o++)if(t.indexOf(e[o])>0)return console.log("移动"),void(document.getElementsByTagName("html")[0].style.fontSize=window.screen.width/10+"px");console.log("PC"),document.getElementsByTagName("html")[0].style.fontSize="37.5px"}()})}),angular.module("app",["ui.router"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("data/city.json").success(function(e){t.city=e}),e.get("data/salary.json").success(function(e){t.salary=e}),e.get("data/scale.json").success(function(e){t.scale=e})}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),e.otherwise("main")}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(t,e,o){t.get("./data/company.json?id="+e.params.id).success(function(t){o.company=t,o.$broadcast("abc",{id:1})}),o.$on("cba",function(t,e){console.log(t,e)})}]),angular.module("app").controller("favoriteCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("loginCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t.get("./data/positionList.json").success(function(t){console.log(t),e.list=t}).error()}]),angular.module("app").controller("meCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("positionCtrl",["$q","$http","$state","$scope",function(t,e,o,n){function i(t){e.get("./data/company.json?id="+t).success(function(t){console.log(t),n.company=t})}n.isLogin=!1,function(){var i=t.defer();return e.get("./data/position.json?id="+o.params.id).success(function(t){console.log(t),n.position=t,i.resolve(t)}).error(function(t){i.reject(t)}),i.promise}().then(function(t){i(t.companyId),console.log(t)},function(){alert("进入error，接口错误")})}]),angular.module("app").controller("postCtrl",["$http","$scope",function(t,e){e.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}]}]),angular.module("app").controller("registerCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("searchCtrl",["dict","$http","$scope",function(t,e,o){o.name="",o.search=function(){e.get("./data/positionList.json?name="+o.name).success(function(t){o.positionList=t})},o.search(),o.sheet={},o.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}];var n="";o.filterObj={},o.tClick=function(e,i){n=e,o.sheet.list=t[e],o.sheet.visible=!0},o.sClick=function(t,e){t?(angular.forEach(o.tabList,function(t){t.id===n&&(t.name=e)}),o.filterObj[n+"Id"]=t):(delete o.filterObj[n+"Id"],angular.forEach(o.tabList,function(t){if(t.id===n)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪资";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/company.html"}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html"}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"="},link:function(t){t.back=function(){window.history.back()},t.$on("abc",function(t,e){console.log(t,e)}),t.$emit("cba",function(t,e){console.log(t,e)})}}}]),angular.module("app").directive("appPositionClass",[function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/positionClass.html",link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e,o){e&&t.showPositionList(0)})}}}]),angular.module("app").directive("appPositionInfo",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(t){t.imagePath=t.isActive?"img/star-active.png":"img/star.png"}}}]),angular.module("app").directive("appPositionList",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"="}}}]),angular.module("app").directive("appSheet",[function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}]),angular.module("app").directive("appTab",[function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var o=[];return angular.forEach(t,function(t){var n=!0;for(var i in e)t[i]!==e[i]&&(n=!1);n&&o.push(t)}),o}}]);