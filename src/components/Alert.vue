<template>
	<transition name="window_transition">
	<div v-show="alerts.length" class="windowcontiner"  style=""  v-on:mouseup="dragresizeEnd($event)" v-on:mousemove="drag($event)" >

				<transition-group name="list" tag="div">
				<div v-for="alert in alerts" v-bind:key="alert" class="window" :style="{top:alert.position.top+'px',left:alert.position.left+'px'}">
					<div class="wintitle" v-on:mousedown="dragStart($event,alert)">
						<h2>{{alert.title}}</h2>
						<div class="winbtns">
							<div v-on:click="close(alert)" class="icon iconfont windowclose">
								&#xe602;</div>
						</div>

					</div>
					<div>
						<p>{{alert.text}}</p>
					</div>
          <div class="buttons" v-if="alert.okcallback">

              <button
                      v-on:click="cancel(alert)">
                  {{alert.canceltext||'取消'}}
              </button>
              <button
                      v-on:click="ok(alert)">
                  {{alert.oktext||'确定'}}
              </button>
          </div>
				</div>
				</transition-group>
	</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	export default {
		name: 'alert',
		props: [],
		components: {
			Window
		},
		data() {
			return {

				alerts: [],
				nowAlert:null,
			}
		},
		created: function() {
			var tempVue=Vue.prototype;
			tempVue.alert=(title,text,okcallback,cancelcallback,oktext,canceltext)=>{

				this.alerts.push({
					title:title,
					text:text,
          okcallback:okcallback,
          cancelcallback:cancelcallback,
          oktext:oktext,
          canceltext:canceltext,
				position: {
					left: 0,
					top: 0
				},
				preresize: null,
				prepoint: null,
			});
			var tempalert=this.alerts[this.alerts.length-1];
			this.$nextTick(()=>{

				var width=this.$el.getElementsByClassName("window")[this.alerts.indexOf(tempalert)].offsetWidth;
				var height=this.$el.getElementsByClassName("window")[this.alerts.indexOf(tempalert)].offsetHeight;


				tempalert.position.left = (window.innerWidth - width)/2;
				tempalert.position.top = (window.innerHeight - height)/2;

			});


			}


		},
		methods: {
			close: function(alert) {
				//es6 Array.filter()
				this.alerts=this.alerts.filter((alertX)=>{
					return !(alertX===alert);
				});
			},
      ok: function(alert) {
				//es6 Array.filter()
				if (alert.okcallback) {
				  var p=alert.okcallback();
					if (p&&p.then) {

						p.then(()=>{this.close(alert);});

					}
          else
          {
            this.close(alert);
          }
				}
				else
				{
					this.close(alert);
				}

			},
      cancel: function(alert) {
				//es6 Array.filter()
        if (alert.cancelcallback) {
				  alert.cancelcallback();
				}
        this.close(alert)
			},
			show: function() {
				this.closed = false;
			},
			////弹出框 拖拽效果
			dragStart: function(e,alert) {
				this.nowAlert=alert;
				this.nowAlert.prepoint = {
					x: e.clientX,
					y: e.clientY
				};

			},
			dragresizeEnd: function() {

				this.nowAlert.prepoint = null;
				this.nowAlert=null;

			},
			drag: function(e) {

				var point = this.nowAlert&&this.nowAlert.prepoint;

				if(point) {


					//es6 Array.indexOf()
					var width=this.$el.getElementsByClassName("window")[this.alerts.indexOf(this.nowAlert)].offsetWidth;
					var height=this.$el.getElementsByClassName("window")[this.alerts.indexOf(this.nowAlert)].offsetHeight;

					console.log(point)

					this.nowAlert.position.left = (this.nowAlert.position.left + e.clientX - point.x);

					if(this.nowAlert.position.left + width > window.innerWidth) {
						this.nowAlert.position.left = window.innerWidth - width;
					}
					if(this.nowAlert.position.left < 0) {
						this.nowAlert.position.left = 0;
					}

					this.nowAlert.position.top = (this.nowAlert.position.top + e.clientY - point.y);

					if(this.nowAlert.position.top + height > window.innerHeight) {
						this.nowAlert.position.top = window.innerHeight - height;
					}
					if(this.nowAlert.position.top < 0) {
						this.nowAlert.position.top = 0;
					}
					this.nowAlert.prepoint = {
						x: e.clientX,
						y: e.clientY
					};

					//	    $(this).trigger("windowmoved");
				}


			},


		}
	}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.window_transition-enter-active,
	.window_transition-leave-active {
		transition: opacity .5s
	}

	.window_transition-enter,
	.window_transition-leave-active {
		opacity: 0
	}

	.list-enter-active.window,
	.list-leave-active.window {

		transition: transform .5s,opacity .5s
	}

	.list-enter.window,
	.list-leave-active.window {
		transform: translateY(-100%) scale(0.75);
		opacity:0;
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
		min-width: 160px;
		min-height: 120px;
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
	.windowcontiner .window p {

	    margin: 15px;
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






  .buttons {

    width: 250px;
    margin: 10px;
  }

  .buttons button {
  	background-color: #4fc08d;
  	/* border: solid; */
  	border-radius: 5px;
  	border: none;
  	border-bottom: solid 2px #3a8f68;
  	border-top: solid 2px rgba(1, 1, 1, 0);
  	color: #fefefe;
    font-size: 16px;
    font-weight: 600;
    width: 100px;
    height: 35px;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
  }

  .buttons button:active {
  	border-top: none;
  	border-bottom: none;
  }
</style>
