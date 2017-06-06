<template>
	<transition name="window_transition">
	<div v-if="!closed" class="windowcontiner" v-on:mouseup="dragresizeEnd($event)" v-on:mousemove="drag($event)" style="">

		<div v-bind:class="{'fullscreen':fullscreen}" :style="{top:position.top+'px',left:position.left+'px',width:size.width+'px',height:size.height+'px'}" class="window">
			<div class="wintitle" v-on:mousedown="dragStart($event)">
				<h2>{{windowData&&windowData.title}}</h2>
				<div class="winbtns">
					<div v-on:click="close()" class="icon iconfont windowclose">
						&#xe602;</div>
					<div v-on:click="fullscreen=!fullscreen" class="windowclose fullscreenicon1" v-bind:class="{'fullscreenicon2':fullscreen}"></div>

				</div>
				
			</div>
			<div>
				
				<slot :close="close"></slot>
				
			</div>
			<div v-on:mousedown="resizeStart($event,'left')" class="window-left-resize resize-bar" style="height: 100%;width: 4px;position: absolute;left: 0px;top: 0px;cursor: w-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'right')" class="window-right-resize resize-bar" style="height: 100%;width: 4px;position: absolute;right: 0px;top: 0px;cursor: e-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'top')" class="window-top-resize resize-bar" style="height: 4px;width: 100%;position: absolute;left: 0px;top: 0px;cursor: s-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'bottom')" class="window-bottom-resize resize-bar" style="height: 4px;width: 100%;position: absolute;left: 0px;bottom: 0px;cursor: n-resize;"></div>

			<div v-on:mousedown="resizeStart($event,'left top')" class="window-left-resize window-top-resize resize-bar" style="height: 10px;width: 10px;position: absolute;left: 0px;top: 0px;cursor: se-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'left bottom')" class="window-left-resize window-bottom-resize resize-bar" style="height: 10px;width: 10px;position: absolute;left: 0px;bottom: 0px;cursor: sw-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'top right')" class="window-top-resize window-right-resize  resize-bar" style="height: 10px;width: 10px;position: absolute;right: 0px;top: 0px;cursor: sw-resize;"></div>
			<div v-on:mousedown="resizeStart($event,'bottom right')" class="window-bottom-resize window-right-resize  resize-bar" style="height: 10px;width: 10px;position: absolute;right: 0px;bottom: 0px;cursor: se-resize;"></div>

		</div>

	</div>
	</transition>
</template>

<script>
//	require('!css-loader!./xxx.css');
//	import './xxx.css'
	
	export default {
		name: 'window',
		props: ['windowData'],
		data() {
			return {
				closed: true,
				fullscreen: false,

				position: {
					left: 0,
					top: 0
				},
				size: {
					width: 800,
					height: 360
				},
				preresize: null,
				prepoint: null,
			}
		},
		created: function() {
			this.ind = this;
			window.onresize = e => {

				this.position.left = (window.innerWidth - this.size.width) / 2;
				this.position.top = (window.innerHeight - this.size.height) / 2;

				if(this.position.left < 0) {
					this.position.left = 0;
				}
				if(this.position.top < 0) {
					this.position.top = 0;
				}

				//    $(this).trigger("windowmoved");

			}

		},
		methods: {
			close: function() {
				this.closed = true;
			},
			show: function() {
				this.closed = false;
			},
			////弹出框 拖拽效果
			dragStart: function(e) {
				this.prepoint = {
					x: e.clientX,
					y: e.clientY
				};

			},
			dragresizeEnd: function() {

				this.preresize = null;
				this.prepoint = null;

			},
			drag: function(e) {

				var point = this.prepoint;

				if(point) {

					this.position.left = (this.position.left + e.clientX - point.x);

					if(this.position.left + this.size.width > window.innerWidth) {
						this.position.left = window.innerWidth - this.size.width;
					}
					if(this.position.left < 0) {
						this.position.left = 0;
					}

					this.position.top = (this.position.top + e.clientY - point.y);

					if(this.position.top + this.size.height > window.innerHeight) {
						this.position.top = window.innerHeight - this.size.height;
					}
					if(this.position.top < 0) {
						this.position.top = 0;
					}
					this.prepoint = {
						x: e.clientX,
						y: e.clientY
					};

					//	    $(this).trigger("windowmoved");
				}

				var resize = this.preresize;
				if(resize) {
					e.stopImmediatePropagation();
					e.stopPropagation();
					e.preventDefault();
					if(resize.d.match(/left/)) {

						if((this.size.width - e.clientX + resize.x) > 160) {
							this.position.left = this.position.left + e.clientX - resize.x;
							this.size.width = this.size.width - e.clientX + resize.x;
						}

					}
					if(resize.d.match(/right/)) {
						if((this.size.width + e.clientX - resize.x) > 160) {
							{

								this.size.width = this.size.width + e.clientX - resize.x;
							}
						}
					}
					if(resize.d.match(/top/)) {
						if((this.size.height - e.clientY + resize.y) > 100) {

							this.position.top = this.position.top + e.clientY - resize.y;
							this.size.height = this.size.height - e.clientY + resize.y;
						}
					}
					if(resize.d.match(/bottom/)) {
						if((this.size.height + e.clientY - resize.y) > 100) {

							this.size.height = this.size.height + e.clientY - resize.y;
						}
					}
					this.preresize = {
						x: e.clientX,
						y: e.clientY,
						d: resize.d
					};

					//			$(this).find('.window').trigger("resize");

					//			$(this).find('.window').trigger("resize");
					//			$(this).parent(".windowcontiner").trigger("windowmoved");
				}

			},
			////弹出框 缩放效果
			resizeStart: function(e, type) {

				this.preresize = {
					x: e.clientX,
					y: e.clientY,
					d: type
				}

			},

		}

	}

	//
	//
	//
	//
	//;(function ($) {
	//  var tempshowFunc = $.fn.show;
	//  $.fn.show = function (s1, s2, s3) {
	//    var linkobj = tempshowFunc.call(this, s1, s2, s3);
	//    $(this).trigger("aftershow");
	//    return linkobj;
	//  }
	//  $.fn.center = function () {
	//    $(this).css("position", "absolute");
	//    $(this).css("margin", "0px");
	//    $(this).css("left", ($(window).width() - $(ele).width()) / 2 + "px");
	//    $(this).css("top", ($(window).height() - $(ele).height()) / 2 + "px");
	//  }

	//})(jQuery)
	//$().ready(function () {

	//$(".windowcontiner").on("aftershow", function (e) {
	//  if (e.target) {
	//    if (e.target == this) {
	//    
	//    } else {
	//      return;
	//    }
	//  } else {
	//    return;
	//  }
	//  
	//  var ele = $(this).find(".window");
	//  $(ele).css("position", "absolute");
	//  $(ele).css("margin", "0px");
	//  $(ele).css("left", ($(window).width() - $(ele).width()) / 2 + "px");
	//  $(ele).css("top", ($(window).height() - $(ele).height()) / 2 + "px");
	//  $(this).trigger("windowmoved");
	//});
	//
	//$(".windowcontiner .window").resize(function (event) {
	//  //		event.stopImmediatePropagation();
	//  //		return false;
	//  //		$(this).css("position", "absolute");
	//  //		$(this).css("margin", "0px");
	//  //		$(this).css("left", ($(window).width() - $(ele).width()) / 2 + "px");
	//  //		$(this).css("top", ($(window).height() - $(ele).height()) / 2 + "px");
	//  //		$(this).parent(".windowcontiner").trigger("windowmoved");
	//  
	//});

	//
	//});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.window_transition-enter-active, .window_transition-leave-active {
  transition: opacity .5s
}
.window_transition-enter, .window_transition-leave-active {
  opacity: 0
}


.window_transition-enter-active .window, .window_transition-leave-active .window {
  transition: transform .5s
}
.window_transition-enter .window, .window_transition-leave-active .window {
  transform: translateY(-100%) scale(0.75);
}	
	
	.windowcontiner {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 1001;
		background-color: rgba(0, 0, 0, 0.2);
	}
	
	.window {
		background-color: #FFFFFF;
		max-height: calc(100% - 15px);
		max-width: calc(100% - 15px);
		overflow-y: auto;
		overflow-x: hidden;
		position: absolute;
		box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.2);
	}
	
	.windowcontiner .window .resize-bar:active {
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.windowcontiner .window .wintitle {
		-webkit-user-select: none;
		-ms-user-select: none;
		cursor: move;
	}
	
	.fullscreen {
		margin-top: 0px !important;
		width: 100% !important;
		height: 100% !important;
		left: 0 !important;
		right: 0 !important;
		top: 0 !important;
		bottom: 0 !important;
	}
	
	.fullscreenicon1 {
		/*background: url(../icon/fullscreen.png) no-repeat center;*/
	}
	
	.fullscreenicon2 {
		/*background: url(../icon/normalscreen.png) no-repeat center;*/
	}
	
	.wintitle {
		width: 100%;
		height: 40px;
	}
	
	.wintitle h2 {
		float: left;
		color: #595959;
		margin: 10px 0px 10px 15px;
		font-size: 16px;
	}
	
	.winbtns {
		float: right;
	}
	
	.winbtns>* {
		float: right;
	}
	
	.windowclose {
		cursor: pointer;
		height: 40px;
		width: 40px;
		text-align: center;
		padding-top: 10px;
		margin: 0px;
	}
	
	.windowbottombtn {
		cursor: pointer;
		height: 40px;
		width: 40px;
		text-align: center;
		padding-top: 10px;
		margin: 0px;
		color: #22B2E7;
	}
	
	.winbottom {
		margin-top: -90px;
	}
	
	.winbottom .winbtns {
		float: none;
		width: 100%;
		text-align: center;
		margin-top: 10px;
	}
	
	.winbottom .winbtns .windowbottombtn {
		float: none;
		/* width: 100%; */
		display: inline;
		font-size: 21px;
		margin: 0 10px;
	}
	
	.windowclose:hover {
		background-color: #e44444;
		color: #f3f3f3;
	}
</style>