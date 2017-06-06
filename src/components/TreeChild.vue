<template>
	
	<div>
	<transition-group name="list" tag="div">
	<li v-for="item in searchlist" :key="item">
		<a class="data-toggle-tooltip"  v-bind:style="{paddingLeft:(paddingleft+'px')}"  v-bind:title="item.title" href="javascript:;" v-on:click="onnodeclick(item,$event)">
			<div class="icon iconfont expendicon" v-bind:class="{'no':item.expend,'noshow':!(item.children&&item.children.length>0)}" v-on:click.stop="item.expend=!item.expend"></div>{{item.title}}
			<div class="data-toggle-tooltip listitemhelp data-toggle-tooltip"  v-bind:title="item.tooltip" v-show="item.tooltip&&item.tooltip.length>0"></div>
		</a>
		<transition name="window_transition">
		<ul v-show="item.expend" style="height: 30px;">
			<TreeChild :filterstr="filterstr" v-bind:paddingleft="paddingleft+20" v-bind:datawidth="datawidth" v-bind:searchlist="item.children" v-bind:selected-id.sync="selectedId"></TreeChild>
		</ul>
		</transition>
	</li>
	</transition-group>
</div>
	
</template>

<script>
	export default {
            // 声明 props
            name:'TreeChild',
            props: ['searchlist', 'filterstr', 'filterstrtemp', 'selectedId', 'paddingleft', 'datawidth'],
            // prop 可以用在模板内
            // 可以用 `this.msg` 设置
            methods: {
              
              onnodeclick: function (item, event) {

                if (item.children && item.children.length > 0) {
                  item.expend = !item.expend;
                  event.stopPropagation();
                  event.preventDefault();
                } else {
                	
                	
                	
                	
                	
                }
              }
              
            }
          }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.window_transition-enter-active,
	.window_transition-leave-active {
		transition: all .5s
	}
	
	.window_transition-enter,
	.window_transition-leave-active {
		opacity: 0;
		height:0px
	}
	
	.list-enter-active.window,
	.list-leave-active.window {
		transition: all .5s
	}
	
	.list-enter.window,
	.list-leave-active.window {
		transform: translateY(-100%) scale(0.75);
		opacity:0;
	}
	
.mydroplist.btn-group button,
.mydroplist.btn-group button:hover,
.mydroplist.btn-group button:hover:active,
.mydroplist.btn-group button:active,
.mydroplist.btn-group button:focus {
	border-radius: 0px;
	border-color: #d8d8d8;
	background-color: #ffffff;
	color: #838383;
}

.mydroplist.btn-group button:first-child {
	height: 33px;
	width: calc(100% - 34px);
	text-align: left;
	line-height: 1;
	overflow: hidden;
}

.mydroplist .btn.btn-danger.dropdown-toggle {
	background-image: url(../assets/arrow.png);
}

.mydroplist.btn-group .dropdown-toggle,
.mydroplist.btn-group .dropdown-toggle:hover,
.mydroplist.btn-group .dropdown-toggle:hover:active,
.mydroplist.btn-group .dropdown-toggle:active,
.mydroplist.btn-group .dropdown-toggle:focus {
	height: 33px;
	width: 33px;
	border-radius: 0px;
	border-color: #d8d8d8;
	background-color: inherit;
}

.open>.dropdown-toggle {
	border-color: #d8d8d8 !important;
	background-color: inherit !important;
}

.mydroplist .dropdown-menu {
	    padding-top: 0px;
	width: calc(100% - 34px);
	box-shadow: none;
	margin-top: 0px;
	border-radius: 0px;
	background-color: #fafafa;
	max-height: 360px !important;
    overflow: auto;
}

.mydroplist .dropdown-menu a:hover {
	background-color: #efefef;
}
.treedroplist
{
	/*width: 375px;*/
	max-height: 400px;
	color: #595959;
	    overflow-y: auto;
    overflow-x: hidden;
}
/*.treedroplist>input 
{
    width: 335px !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
    background-color: #FFFFFF !important;

	border: solid 1px #CFE5F1 !important;
    height: 40px !important;
    color: #b3b3b3 !important;
    margin-bottom: 25px !important;
}*/

.dropdown-menu a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis; 
}
ul
{
	list-style: none;
	padding-left: 0px;
	height: auto;
}
.treedroplist .expendicon
{
    width: 14px;
    height: 14px;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    background: url(../assets/tabletreeexpend.png) no-repeat center;
}
.treedroplist .expendicon.no
{

    background: url(../assets/tabletreenoexpend.png) no-repeat center;
}
.treedroplist .expendicon.noshow
{

    visibility: hidden;
}

/*.treedroplist  a
{
	color: #595959;
	    font-size: 1em;
    margin-left: 10px;
}*/
.treedroplist > h4
{
	    font-size: 1.1em;
    margin-left: 20px;
}
.treedroplist > li
{
	    /*margin-left: 20px;*/
}
.treedroplist a + ul>li>a
{
	padding-left: 30px;
	    /*margin-left: 20px;*/
}
.treedroplist input
{
    width: calc(100% - 10px);
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    background-color: #FAFAFA;
}

.treedroplist .treedroplist-listcontiner
{
    overflow-y: auto;
    width: 100%;
    padding-left: 20px;
    margin-bottom: 10px;
    /*height: 320px;*/
}

.treedroplist
{
	    background-color: #ffffff !important;
}
</style>