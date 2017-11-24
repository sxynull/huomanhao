app.factory('Signature', function($rootScope,$filter) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var signature = {};
  var imgurl1=null;
  return {
    h5: function(url) {
     var strlocal=url.substr(0,url.indexOf("?")+1);
     var url=url;
      var myJsDate="&date="+$filter('date')(new Date(),'yyyyMMddhhmmss');
   var  ifurl=function (){
      var str1=url.substr(url.indexOf("?")+1)+"&"+$rootScope.app_key+myJsDate;
           var arr=str1.split("&");
           var num=null;
                   var value=null;
           for(var i=0;i < arr.length;i++){
              num=arr[i].indexOf("=");
              if(num>0){
               name=arr[i].substring(0,num);
               value=arr[i].substr(num+1);
               this[name]=value;
               }
              }
              return arr.sort().join("&");

    };

       url.indexOf("?") != -1 ? str=url+"&api_sign="+md5($rootScope.pwd+ifurl()+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate : str=url+"?api_sign="+md5($rootScope.pwd+$rootScope.app_key+myJsDate+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate;
       return $rootScope.ip+str;
    },
    login: function(url) {

        var url=url;
               var myJsDate="&date="+$filter('date')(new Date(),'yyyyMMddhhmmss');
           Array.prototype.unique3 = function(){           //去重
                 var res = [];
                 var json = {};
                 for(var i = 0; i < this.length; i++){
                  if(!json[this[i]]){
                   res.push(this[i]);
                   json[this[i]] = 1;
                  }
                 }
                 return res;
                };
            var  ifurl=function (){
              if($rootScope.open_id!=0&& $rootScope.open_id!=undefined){
                var str1=url.substr(url.indexOf("?")+1)+"&"+$rootScope.app_key+myJsDate;
              }else{
                var str1=url.substr(url.indexOf("?")+1)+"&"+$rootScope.app_key+myJsDate+"&"+window.localStorage.access_token+"&"+window.localStorage.session_token;
              }
                //console.log(str1)
                    var arr=str1.split("&");
                    var num=null;
                    var value=null;
                    for(var i=0;i < arr.length;i++){
                       num=arr[i].indexOf("=");
                       if(num>0){
                        name=arr[i].substring(0,num);
                        value=arr[i].substr(num+1);
                        this[name]=value;
                        }
                       }
                      // console.log(arr);
                     // console.log(arr.unique3().sort())
                       return arr.unique3().sort().join("&");

             };
               if($rootScope.open_id!=0&& $rootScope.open_id!=undefined){
                 url.indexOf("?") != -1 ? str=url+"&api_sign="+md5($rootScope.pwd+ifurl()+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate : str=url+"?api_sign="+md5($rootScope.pwd+$rootScope.app_key+myJsDate+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate;
                                 return $rootScope.ip+str;

               }else{
                 url.indexOf("?") != -1 ? str2=url+"&api_sign="+md5($rootScope.pwd+ifurl()+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate+"&"+window.localStorage.access_token+"&"+window.localStorage.session_token : str2=url+"?api_sign="+md5($rootScope.pwd+window.localStorage.access_token+"&"+$rootScope.app_key+myJsDate+"&"+window.localStorage.session_token+$rootScope.pwd)+"&"+$rootScope.app_key+myJsDate+"&"+window.localStorage.session_token+"&"+window.localStorage.access_token;
                                 return $rootScope.ip+str2;

               }



    },
    imgFileUp:function(fileDom,activiId,imgId){

        //判断是否支持FileReader
            if (window.FileReader) {
              var reader = new FileReader();
            } else {
              alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
            }
            console.log(fileDom)
            //获取文件
            var file = fileDom.target.files[0];
            if (file.size > 2097152) {
              alert("上传图片过大超过2M，请使用手机设置拍照尺寸降低图片大小！")
            } else {
              var imageType = /^image\//;
              //是否是图片
              if (!imageType.test(file.type)) {
                alert("请选择图片！");
                return;
              }
              //读取完成
              reader.onload = function (e) {
                //获取图片dom
                var img = document.getElementById(imgId);
                //图片路径设置为读取的图片
                img.src = e.target.result;
              };
              reader.readAsDataURL(file);
              var config = {
                api: 'http://v0.api.upyun.com/',
                bucket: 'huomanhaoimage',

                // 空间的表单 API
                form_api: 'g75u3RSExKH88c2d2dcKxA9K1Ig='
              };
              if (!file) {
                console.log('no file is selected');
                return;
              }

              var index1 = file.name.lastIndexOf(".");
              var index2 = file.name.length;
              var suffix = file.name.substring(index1 + 1, index2);//后缀名
              // 计算 policy 和 signature 所需的参数
              // 详情见： http://docs.upyun.com/api/form_api/#表单API接口简介
              var options = {
                bucket: config.bucket,
                expiration: Math.floor(new Date().getTime() / 1000) + 86400,
                'save-key': $filter('date')(new Date(), 'yyyyMMdd') + "/a_" + activiId + "/" + Math.random() * 10000000000000000 + "." + suffix
              };
              var policy = window.btoa(JSON.stringify(options));
              var signature = md5(policy + '&' + config.form_api);
              var data = new FormData();
              data.append('policy', policy);
              data.append('signature', signature);
              data.append('file', file);
              var request = new XMLHttpRequest();
              request.open('POST', config.api + options.bucket);
              request.send(data);
              request.onreadystatechange = function () {
                               if (request.readyState == 4 && (request.status == 200 || request.status == 304)) {  // 304未修改
                                 $rootScope.imgId = "http://m.huomanhao.com/" + JSON.parse(request.response).url;
                                 return  $rootScope.imgId || imgFileUp
                              }
                          };

             /* request.onload = function () {
                $rootScope.imgId = "http://laquimage.b0.upaiyun.com/" + JSON.parse(request.response).url;
                return  $rootScope.imgId || ""
              };*/

            }

      },
    getUrlParameter:function (str) {
                       var param = {}, hash = {}, anchor;
                       var url = str || location.href;
                       var arr = /([^?]*)([^#]*)(.*)/.exec(url);
                       var ar1 = /(.*:)?(?:\/?\/?)([\.\w]*)(:\d*)?(.*?)([^\/]*)$/.exec(arr[1]);
                       var ar2 = arr[2].match(/[^?&=]*=[^?&=]*/g);
                       var ar3 = arr[3].match(/[^#&=]*=[^#&=]*/g);

                       if(ar2){
                           for(var i = 0, l = ar2.length; i < l; i++){
                               var ar22 = /([^=]*)(?:=*)(.*)/.exec(ar2[i]);
                               param[ar22[1]] = ar22[2];
                           }
                       }

                       if(ar3){
                           for(var i = 0, l = ar3.length; i < l; i++){
                               var ar33 = /([^=]*)(?:=*)(.*)/.exec(ar3[i]);
                               hash[ar33[1]] = ar33[2];
                           }
                       }

                       if(arr[3] && !/[=&]/g.test(arr[3])){
                           anchor = arr[3];
                       }

                       function getUrl(){
                           var that = this, url = [], param = [], hash = [];

                           url.push(that.protocol, that.protocol && '//' || ' ', that.host, that.port, that.path, that.file);

                           for(var p in that.param){
                               param.push(p+ '=' +that.param[p]);
                           }

                           for(var p in that.hash){
                               hash.push(p+ '=' +that.hash[p]);
                           }

                           url.push(param.length && '?' + param.join('&') || ' ');

                           if(that.anchor){
                               url.push(that.anchor);
                           }else{
                               url.push(hash.length && '#' + hash.join('&') || '');
                           }

                           return url.join(' ');
                       }

                       return {
                           href: arr[0],
                           protocol: ar1[1],
                           host: ar1[2],
                           port: (ar1[3] || ' '),
                           path: ar1[4],
                           file: ar1[5],
                           param: param,
                           hash: hash,
                           anchor: anchor,
                           getUrl: getUrl
                   };
                   } ,
    /*转为时间戳*/
    DateFuc:function (date) {
       return new Date(date)
    }

  };
});
