<template>
<div>

<div class="main-continer">

<router-view></router-view>
</div>
<div class="tablist">

  <div class="tab" v-for="tab in tablist" v-on:click="$router.push({ name: tab.view});" :class="{select:(tab.view==$route.name)}">
    {{tab.name}}
  </div>

</div>
</div>
</template>

<script>
export default {
  name: 'home',
  mounted() {
  },
  data() {
    return {
      tablist:[
        // {
        //   name:"推荐",
        //   view:"osusume"
        // },
        {
          name:"最新音乐",
          view:"newmusic"
        },
        {
          name:"排行榜",
          view:"rank"
        },
        {
          name:"歌单",
          view:"allplaylist"
        },


      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    search(){

      this.$router.push({ name: 'search', params: { str: this.searchString }});

    }
    ,
    goPlaylist(id){

      this.$router.push({ name: 'playlist', params: { id: id }});

    }


  },
  components: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tablist
{
  width: calc(100% - 200px);
  height: 40px;
  border-bottom: solid 1px #dedede;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;;
  position: fixed;
}
  .tablist .tab
  {

    margin-left: 40px;
    margin-right: 40px;
    cursor: pointer;
    transition: color 0.5s;
  }
  .tablist .tab.select
  {
     color: #4fc08d;
  }

  .main-continer
  {
  left: 0px;
  top: 60px;

  width: 100%;
  position: absolute;
}

@media screen and (max-width: 750px){
  .tablist
  {
    width: calc(100%);
    height: 80px;
    font-weight: 900;
  }
  .main-continer
  {
  left: 0px;
  top: 100px;
}
}
</style>
