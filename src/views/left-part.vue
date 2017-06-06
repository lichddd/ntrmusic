<template>
  <div class="left-part">
    <div class="menublock">
      <h6>推荐</h6>
      <div class="list" :class="{select:(select==li.target)}" v-for="li in list" v-on:click="go(li.target)">
        <div class="selectmark" v-show="(select==li.target)"></div>
        <div :class="li.iconname" class="icon"></div>
        <div class="title">{{li.title}}</div>

      </div>
    </div>


  </div>
</template>

<script>
import config from "@/config"
export default {
  name: 'left-part',
  data () {
    return {
      list:[{target:"home",iconname:"find",title:"发现音乐"}],
      select:"",
    }
  }
  ,
  mounted() {


  },
  methods:{
    go(target){
      this.$router.push({
        name: 'home'

      });
    }


  },
  watch:{
    $route(){

      this.select=this.$route.path.split("/")[1];


    }

  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left-part
  {
    width: 100%;
    height: 100%;
  }
  .menublock
  {
    width: 100%;
    margin-bottom: 20px;
  }
  .menublock h6
  {
    text-align: left;
    margin: 5px;
    color: #666666;
    font-weight: normal;
  }
  .menublock .list
  {
    height: 30px;
    padding: 5px;
    text-align: left;
    font-size: 14px;
  }
  .menublock .list .icon
  {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-position: center;
    background-size: 80%;
    background-repeat: no-repeat;
    float: left;
    margin-left: 20px;
    cursor: pointer;

  }
  .menublock .list .selectmark
  {
    width: 4px;
    height: 20px;
    background: #4fc08d;
    position: absolute;
    left: 0px;

  }
  .menublock .list .title
  {
    cursor: pointer;
    height: 20px;
    display: inline-block;
    float: left;
    margin-left: 5px;
  }
  .menublock .list .icon.find
  {
    background-image: url('../assets/music.png');
  }
  .menublock .list.select
  {
    background-color: #cccccc;
  }
  @media screen and (max-width: 750px){
    .left-part
    {
      display: none;
    }
  }
</style>
