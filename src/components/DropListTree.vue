<template>
	
	<div class="mydroplist btn-group" style="" >
	<button type="button" class="btn btn-danger">{{selectedId}}</button>
	<button v-on:click.stop="show=!show" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<span class="caret"></span>
		<span class="sr-only">Toggle Dropdown</span>
	</button>
	<transition name="window_transition">
	<ul class="dropdown-menu treedroplist"  v-bind:style="{'display': show?'block':'none'}">
		<input v-model="filterstr" placeholder="输入关键字查询">
		<TreeChild v-bind:searchlist="searchlist" v-bind:paddingleft="paddingleft" v-bind:datawidth="datawidth" v-bind:filterstr="filterstr" v-bind:selected-id.sync="selectedId"></TreeChild>
	</ul>
	</transition>
	</div>
	
</template>

<script>
	import TreeChild from "./TreeChild"
	
	
	
	export default {
            
            // 声明 props
            props: ['selectedId', 'searchlist', 'paddingleft', 'datawidth'],
            // prop 可以用在模板内
            // 可以用 `this.msg` 设置
            components:{TreeChild:TreeChild},
            created:function(){
            	
            	    document.attachEvent()
            		//es6
            		document.addEventListener('click',()=>{this.show=false});
            	
            }
            ,
            data: function () {
              return {
                filterstrtemp: "",
                selectedId: "",
                searchlist: "",
                paddingleft: 20,
                show:false,
              }
            },
            methods: {
              expendAll: function (list) {
                if (list && list.length > 0) {
                  var self = this;
                  list.forEach(function (obj) {
                    obj.expend = true;
                    self.expendAll(obj.children);
                  });
                }
              }
             
              
            },
            computed: {
              
              filterstr: {
                get: function () {
                  
                  return this.filterstrtemp;
                },
                set: function (newValue) {
                  
                  this.filterstrtemp = newValue.trim();
                  this.expendAll(this.searchlist);
                  
                }
                
              },
              
            }
          }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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