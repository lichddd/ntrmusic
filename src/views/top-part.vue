<template>
  <div class="top-part">
    <div class="title" v-on:click="$router.push({ name: 'home'});">
      <div class="ntrmark"></div>
      <span>NTR音乐</span>
    </div>
    <div class="nextprevdiv">
      <div class="nextprev">
        <div class="left" v-vue-tooltip="'不原谅她'"  v-on:click="goback()"></div>
        <div class="right" v-vue-tooltip="'原谅她'"  v-on:click="goforward()"></div>
      </div>
    </div>
    <div class="searchdiv">
      <div class="search">
        <div class="searchmark"></div>
        <input placeholder="搜索音乐、歌手、歌单、专辑" v-on:keydown.enter="search()" v-model="searchString"></input>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config"
export default {
  name: 'top-part',
  data () {
    return {
      searchString:"",
      msg: 'Welcome to Your Vue.js App'
    }
  }
  ,
  mounted() {


  },
  methods:{
    goback(){
      this.$router.back();

    }
    ,
    goforward(){
      this.$router.forward();

    }
    ,
    search(){

      this.$router.push({ name: 'search', params: {type:config.setting.searchlist[0].type, str: this.searchString }});

    }
    ,

  },
  watch:{
    $route(){
      // console.log(this.$route);


    }

  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top-part
  {
    width: 100%;
    height: 100%;
  }
  .ntrmark
  {
    background: url(../assets/ntr.png) no-repeat;
    background-size:  cover;
    background-position: center;
    width: 40px;
  }
  .title
  {
    margin-left: 20px;
    top: 10%;
    height: 80%;
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    position: relative;
    float: left;
    cursor: pointer;
  }
  .title > *
  {
    height: 100%;
    float: left;
        margin-right: 10px;
  }
  .nextprevdiv
  {

    float: left;
    position: relative;
    height: 100%;
    margin-left: 50px;
    width: 60px;
  }
  .nextprev
  {
    width:50px;
    height: 25px;
    border: solid 0.1px rgba(50,50,50,0.2);
    border-radius: 5px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    overflow: hidden;
  }
  .nextprev > *
  {
    width: 50%;
    height: 100%;
    float: left;
    background-repeat: no-repeat;
  }
  .nextprev > .left
  {
    border-right:  solid 0.1px rgba(50,50,50,0.2);
    margin-right: -1px;

    background-image: url(../assets/left.png);
    background-size:  75%;
    background-position: center;
  }
  .nextprev > .right
  {
    background-image: url(../assets/right.png);
    background-size:  75%;
    background-position: center;
  }
  .nextprev > .left:hover
  {
    background-color: rgba(255, 255, 255, 0.2);
    background-image:  url(../assets/left-on.png);
  }
  .nextprev > .right:hover
  {
    background-color: rgba(255, 255, 255, 0.2);
    background-image: url(../assets/right-on.png);
  }
  .searchdiv
  {
    float: left;
    position: relative;
    height: 100%;
    margin-left: 50px
  }
  .search
  {
    /*width:50px;*/
    height: 25px;
    border-radius: 25px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    margin: auto;
    overflow: hidden;
    background-color: #ffffff;

  }
  .search > input
  {
    margin-left: 30px;
    background: none;
    border: none;
    height: 25px;
    font-size: 16px;
    width: 240px;

  }

  .searchmark
  {
    background: url(../assets/sou.png) no-repeat;
    background-size: 18px;
    background-position: center;
    width: 25px;
    height: 100%;
    margin-left: 3px;
    position: absolute;
  }


  @media screen and (max-width: 750px){
    .ntrmark
    {
      background: url(../assets/ntr.png) no-repeat;
      background-size:  cover;
      background-position: center;
      width: 80px;
    }
    .title
    {
      margin-left: 10px;
    }
    .title > span
    {
      display: none;
    }
    .nextprevdiv
    {
      margin-left: 10px;
      width: 120px;
    }
    .nextprev
    {
      width:120px;
      height: 50px;
      border: solid 2px rgba(50,50,50,0.2);
    }







    .nextprev > .left
    {
      border-right:  solid 2px rgba(50,50,50,0.2);

    }







    .searchdiv
    {
      margin-left: 15px;
    }
    .search
    {
      height: 50px;
      border-radius: 50px;

    }
    .search > input
    {
      margin-left: 50px;
      height: 50px;
      font-size: 32px;
      width: 440px;

    }

    .searchmark
    {
      background-size: 36px;
      width: 50px;
    }
  }
</style>
