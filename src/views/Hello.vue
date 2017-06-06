<template>
  <div class="hello">
  	<img src="../assets/logo.png"/>
  	<img :src="'static/logo.png?date='+imgdate"/>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>




    <a v-on:click="$refs.win1.show()" v-vue-tooltip>显示弹出框</a>
    <a v-on:click="alert('显示Alert'),alert('显示Alert')">显示Alert</a>
    <a v-on:click="toast('显示Toast'),toast('显示Toast2')">显示Toast</a>
    <input id="inputtest" />
    <Window ref="win1" :windowData="{title:'测试'}">

    	<template scope="props">
    		<button v-on:click="console.log(1111);props.close()"></button>


    	</template>

    </Window>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    	  imgdate:(new Date()).getTime(),
      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  components:{
//	"DropListTree":DropListTree,
'Window':() => System.import('@/components/Window'),
//'Window':Window,
//'Alert':Alert
  },
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2{
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#inputtest:before{
	content: "111111";
}
</style>
<style>
button{

	background-color: #22B2E7;
}

</style>
