//
//  mobile-select-ds.js
//  Created by ds on 2015-10-28.
//  email:sghjdn@qq.com
//
(function(factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define(['$'], factory);
	} else if (typeof module === "object" && module && typeof module.exports === "object") {
		module.exports = factory();
	} else {
		factory(window.Zepto || window.jQuery || $);
	}
})(function($) {

	$.fn.mobileAreaSelect = function( options ) {
		var rnd = Math.random().toString().replace('.', '');
		//Options
		var settings = $.extend({
			id:"dialog_"+rnd,//寮瑰嚭灞侷D
			data:"/../../m/m_v2.0/js/address.json",//鏁版嵁璺緞
			index:0,
			value:[],//鍦板潃code
			text:[],//鍦板潃鍚嶇О
			level:2,//鍑犵骇閫夋嫨
			mtop:48,//鍒楄〃榛樿top鍊煎拰鍗曞垪楂樺害鏈夊叧
			separator:" ",//鍦板潃鍚嶇О闂撮殧绗﹀彿
			isMaskClose:true,//鏄惁缁檓ask濉姞鍏抽棴寮瑰眰浜嬩欢
			closeBtn:".js-close",//缁戝畾鍏抽棴寮瑰眰浜嬩欢瀵硅薄
			dialog:".select-dialog",
			onChange:$.noop//鐐瑰嚮纭畾鍚庣殑鍥炶皟鍑芥暟
		}, options );

		var preventDefault = function(e) {
			e.stopPropagation();
			e.preventDefault();
		}
		var _private={
			init:function(obj){
				this.index=settings.index;
				this.mtop=settings.mtop;
				this.value=settings.value;
				this.oldvalue = this.value.concat([]);
				this.text=settings.text;
				this.level=settings.level;
				this.scroller = $('#' + settings.id).find(".select-scroll ul");
				this.$ms=$(obj);
				this.getData();
				this.createHtml();
				this.bindEvent();
			},
			getData: function() {
				var _this = this;
				if (typeof settings.data == "object") {
					this.data = settings.data;
				} else {
					$.ajax({
						dataType: 'json',
						cache: true,
						url: settings.data,
						type: 'GET',
						success: function(result) {
							_this.data = result.data;
						},
						accepts: {
							json: "application/json, text/javascript, */*; q=0.01"
						}
					});
				}
			},
			bindEvent:function(){
				var _this=this;

				this.$ms.on("click",function(){
					$("body").append(_this.htmlStr);
					$("html").on("touchmove.popBlur",preventDefault);
					_this.scroller = $('#' + settings.id).find(".select-scroll ul");
					_this.format();
					var start = 0,
						end = 0;
					_this.scroller.children().on('touchstart', function(e) {
						start = e.originalEvent.changedTouches[0].pageY;

					});
					_this.scroller.children().on('touchmove', function(e) {
						end = e.originalEvent.changedTouches[0].pageY;
						var diff = end - start;
						var dl = $(e.target).parent();
						if (dl[0].nodeName != "DL") {
							return;
						}
						var top = parseInt(dl.css('top') || 0) + diff;
						dl.css('top', top);
						start = end;
						return false;
					});
					_this.scroller.children().on('touchend', function(e) {
						end = e.originalEvent.changedTouches[0].pageY;
						var diff = end - start;
						var dl = $(e.target).parent();
						if (dl[0].nodeName != "DL") {
							return;
						}
						var i = $(dl.parent()).index();
						var top = parseInt(dl.css('top') || 0) + diff;
						if (top > _this.mtop) {
							top = _this.mtop;
						}
						if (top < -$(dl).height() + 60) {
							top = -$(dl).height() + 60;
						}
						var mod = top / _this.mtop;
						var mode = Math.round(mod);
						var index = Math.abs(mode) + 1;
						if (mode == 1) {
							index = 0;
						}
						_this.value[i] = $(dl.children().get(index)).attr('ref');
						_this.value[i] == 0 ? _this.text[i] = "" : _this.text[i] = $(dl.children().get(index)).html();
						for (var j = _this.level - 1; j > i; j--) {
							_this.value[j] = 0;
							_this.text[j] = "";
						}
						if (!$(dl.children().get(index)).hasClass('focus')) {
							_this.format();
						}
						$(dl.children().get(index)).addClass('focus').siblings().removeClass('focus');
						dl.css('top', mode * _this.mtop);
						return false;
					});
				});

				$("body").on("click","#"+settings.id,function(e){

					//缁檓ask娣诲姞鍏抽棴浜嬩欢
					if($.contains(e.target,$(this).find(".select-cnt")[0])&&settings.isMaskClose){
						_this.close();
					}
					//鐐瑰嚮纭畾鎸夐挳
					if($(e.target).hasClass("js-submit")){
						_this.submit();
					}
					//鐐瑰嚮鍙栨秷鎸夐挳
					if($(e.target).hasClass("js-close")){
						_this.close();
					}

				});



			},
			createHtml:function(){
				var str='<div class="select-dialog show" id="'+settings.id+'">'
							+'<div class="select-cnt">'
							+'<div class="select-scroll"><ul>';
					//鏍规嵁level娣诲姞li
					for(var i=1;i<=settings.level;i++){
						str+='<li></li>';
					}
					str=str+'</ul><p></p></div>'
						+'<div class="select-action"><button class="b-submit js-submit">确定</button><button class="b-cencel js-close">取消</button></div>'
						+'</div></div>';
				this.htmlStr=str;
//				return str;
			},
			format: function() {
				var _this = this;
				this.f(this.data);
			},
			f: function(data) {
				var _this = this;
				var item = data;
				if (!item) {
					item = [];
				};
				var str = '<dl><dd ref="0">——</dd>';
				var focus = 0,
					childData, top = _this.mtop;
				if (_this.index !== 0 && _this.value[_this.index - 1] == "0") {
					str = '<dl><dd ref="0" class="focus">——</dd>';
					_this.value[_this.index] = 0;
					_this.text[_this.index] = "";
					focus = 0;
				} else {

					if (_this.value[_this.index] == "0") {
						str = '<dl><dd ref="0" class="focus">——</dd>';
						focus = 0;
					}
					for (var j = 0, len = item.length; j < len; j++) {
						var id = item[j].code || 0;
						var cls = '';
						if (_this.value[_this.index] == id) {
							cls = "focus";
							focus = id;
							childData = item[j].cities||item[j].district;
							top = _this.mtop * (-j);
						};
						str += '<dd class="' + cls + '" ref="' + id + '">' + item[j].name + '</dd>';

					}
				}
				str += "</dl>";
				var newdom = $(str);
				newdom.css('top', top);
				var child = _this.scroller.children();
				$(child[_this.index]).html(newdom);
				_this.index++;
				if (_this.index > _this.level - 1) {
					_this.index = 0;
					return;
				}
				_this.f(childData);
			},
			submit: function() {
				this.oldvalue = this.value.concat([]);
				if (this.$ms[0].nodeType == 1) {
					//input

					this.$ms.attr('data-value', this.value.join(','));
					if(this.value==''||this.value[1]==0){
            localStorage.setItem("submitfalse",1);
            alert("请输入完整省市两级地区！");
            this.$ms.val("请输入");
          }else{
            localStorage.removeItem("submitfalse");
            localStorage.setItem("submitflog",1);
            this.$ms.val(this.text.join(settings.separator));

          }
				}
        this.$ms.next(':hidden').val(this.value.join(','));
				this.close();
				//鎵ц鍥炶皟
				settings.onChange.apply(this,arguments);
			},
			close:function(){
				this.value = this.oldvalue.concat([]);
				$("#"+settings.id).remove();
				$("html").off(".popBlur");
				setTimeout(function () {
          if(localStorage.getItem("submitflog")==1){
            localStorage.setItem("submitflog",1);
          }else if(localStorage.getItem("submitflog")==undefined){
            localStorage.setItem("submitflog",0);
          }
          },300)


			}

		}

		return this.each(function(){
			_private.init(this);

		});
	}

});
