<template>
<div class="main"  >
    <div class="tagselect" v-on:click.stop="alltagsshow=!alltagsshow">{{this.type}}</div>

<div class="hottags">
  <h5>热门标签：</h5>
  <template v-for="(tag,$index) in hottags" >

  <h5 style="cursor:pointer;" v-on:click="$router.push({name:'allplaylist',params:{type:tag.name}});">
    {{tag.name}}
  </h5>
  <h5 class="col" v-if="$index<hottags.length-1"></h5>



  </template>

</div>
<div class="ranklist2">
  <div class="continer">
    <template v-for="(rank,$index) in list">

  <div class="rank2 disk">
    <div class="rankimg2" :style="{background:'url('+rank.coverImgUrl+'?param=150y150) no-repeat 0px 0px'}"   v-on:click="goPlaylist(rank.id)">


      <!-- <span>{{Math.ceil(rank.playCount/10000)}}万</span> -->
      <span><span>{{Math.ceil(rank.playCount/10000)}}万</span><div class="counticon"></div></span>
    </div>
    <span>{{rank.name}}</span>
  </div>

  </template>

  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>
  <div class="rank2" style="height:1px;"></div>

  </div>
  </div>
  <transition name="alltags_transition">
  <div class="alltags" v-on:click.stop="" v-show="alltagsshow">
    <span style="cursor:pointer;" v-on:click="$router.push({name:'allplaylist',params:{type:'全部'}});alltagsshow=false;">
      全部
    </span>
    <br/>
  <template v-for="(tag,$index) in alltags">

    <span style="cursor:pointer;" v-on:click="$router.push({name:'allplaylist',params:{type:tag.name}});alltagsshow=false;">
      {{tag.name}}
    </span>
    <h5 class="col" v-if="$index<alltags.length-1"></h5>
  </template>
  <div class="tran"></div>
</div>
</transition>
  </div>
</template>
<script>
import config from "@/config"
export default {
  name: 'allplaylist',
  mounted() {

    this.eventer.on("main-continer-scroll",this.onScroll);
    document.addEventListener("click",()=>{this.alltagsshow=false;});
    axios.get('music163/api/playlist/hottags',{}).then(m=>{



      if (m.status == 200 && m.data.code == 200 && m.data.tags) {
        this.hottags=m.data.tags;
      }








      console.log(m)
    });
    axios.get('music163/api/playlist/catalogue',{}).then(m=>{




      this.alltags=m.data.sub;


      console.log(m)




    });



    this.type = this.$route.params.type || "全部";
    this.search();


  },

  data() {
    return {
      list: [],
      hottags:[],
      alltags:[],
      type:"",
      searchString: "",
      msg: 'Welcome to Your Vue.js App',
      source:axios.CancelToken.source(),
      more:false,
      offset:0,
      alltagsshow:false,
    }
  },
  methods: {
    onScroll(e){

      if (this.more) {

        this.search();
      }

    },
    search() {
      this.source.cancel("aaaa");
      this.source=axios.CancelToken.source();

      axios.get('music163/api/playlist/list'+(this.type?('?cat='+this.type):'?cat=全部')+'&limit=30'+'&offset='+this.offset,{cancelToken: this.source.token}).then(m=>{


        if (m.status == 200 && m.data.code == 200 && m.data.playlists) {
          m.data.playlists.forEach((o)=>{

              this.list.push(o);


          });
          this.more=m.data.more;
          this.offset+=30;
        }



      });



    },
    goPlaylist(id) {

      this.$router.push({
        name: 'playlist',
        params: {
          id: id
        }
      });

    },
    goSong(id) {

      this.$router.push({
        name: 'song',
        params: {
          id: id
        }
      });

    },

  },
  components: {

  },
  beforeDestroy(){
      this.eventer.off("main-continer-scroll");
      document.removeEventListener("click");
    this.source.cancel("aaaa");

  }
  ,
  watch: {
    $route() {
      this.source.cancel("aaaa");
      this.offset=0;
      this.more=0;
      this.type = this.$route.params.type || "全部";
      this.list=[];
      this.alltagsshow=false;
      this.search();
    },





  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ranklist1 {
  padding-top: 20px;
  /*border-top: solid 1px #e6e6e6;*/
}
.ranklist2 {
  padding-top: 20px;
  /*border-top: solid 1px #e6e6e6;*/

}
.ranklist2 > div
{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.ranklist1 .rank1 {
  height: 360px;
  width: calc(33.3% - 10px);
  cursor: pointer;
  overflow: hidden;
  /*margin-left: 15px;*/
  display: inline-block;
  float: left;
  margin-bottom: 20px;
  border: solid 1px #e6e6e6;
}
.ranklist2 .rank2 {
  height: auto;
  width: 150px;
  cursor: pointer;
  overflow: hidden;
  /*margin-left: 15px;*/
  display: inline-block;
  /*float: left;*/
  margin-right: 30px;
  margin-left: 30px;
}
.ranklist2 .continer
{
  margin-left:-30px;
  margin-right:-30px;
}
.ranklist1 .rank1 .rankimg1 {
  height: 80px;
  width: 100%;
  position: relative;
}
.ranklist2 .rank2 .rankimg2 {
  height: 150px;
  width: 150px;
  position: relative;

  background-size: contain !important;
  border: solid 1px #e6e6e6;
}
/*.ranklist2 .rank2 .rankimg2::before {
  content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../assets/ntr.png) no-repeat rgba(0,0,0,0.5);

}*/
.ranklist1 .rank1 .rankimg1 span {
  font-size: 12px;
  color: #ffffff;
  position: absolute;
  bottom: 5px;
  left: 50px;
}
.ranklist2 .rank2 .rankimg2 > span {

  height: 20px;
  font-size: 13px;
  color: #ffffff;
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: 900;
  /*width: 50%;*/
  background: linear-gradient(-90deg,rgba(50,50,50,0.8),rgba(100,100,100,0.4),rgba(150,150,150,0));
  text-align: right;
  padding-right: 5px;
}
.ranklist2 .rank2 .rankimg2 span > *{

  float: right;
}
.ranklist2 .rank2 .rankimg2 span div{
width: 20px;
height: 20px;
background: url('../assets/headphones.png');
background-position: center;
background-repeat: no-repeat;
background-size: 80%;
}
.hotlist .hot p {
  width: 100%;
  margin: 0px;
  text-align: left;
}

.hotimg {
  width: 150px;
  height: 150px;
  border: solid 1px #e6e6e6;
}

.main {
  padding-left: 30px;
  padding-right: 30px;
  text-align: left;
}

.main h1 {
  margin: 0px;
  border-bottom: solid 3px #e6e6e6;
  display: inline-block;
  font-size: 24px;
  color: #666666;
  margin-right: 20px;
}
.main h3 {
  margin: 0px;
  display: inline-block;
  font-size: 16px;
  color: #666666;
  margin-right: 20px;
}
.hottags
{
  /*position: relative;*/

}

.hottags > *
{
  display: inline-block;
  margin: 0px;
}

.hottags > .col
{
  height: 15px;
  width:1px;
  background-color:#e6e6e6;
  margin-bottom: -3px;
  margin-left: 10px;
  margin-right: 10px;
}
.tagselect
{
    border-radius: 5px;
    border: solid 1px #cccccc;
    display: inline-block;
    padding: 5px 10px;
    margin-bottom: 5px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px;
    cursor: pointer;
}
.tagselect:active
{
    background-color: #efefef;
}
.alltags
{
  max-width: 600px;
      /*height: 400px;*/
      position: absolute;
      top: 45px;
      background: #fafafa;
      border: solid 1px #cccccc;
      box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.25);
      border-radius: 5px;
      padding: 5px;
      /*overflow: hidden;*/
}
.alltags .tran
{
  height: 10px;
  width: 10px;
  position: absolute;
  right: 30px;
  border-width: 0px 5px 8px;
  border-style: solid;
  /*border-color: transparent transparent rgb(255, 255, 255);*/
  border-color: transparent transparent rgba(0,0,0,0.15);
  /*box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.25);*/
  top: -10px;
  left: 10px;
  display: block;
}
.alltags .tran::before
{
  content: "";
  height: 2px;
  width: 0px;
  position: absolute;
  top: 2px;
  left: -5px;
  border-width: 0px 5px 8px;
  border-style: solid;
  border-color: transparent transparent rgb(255, 255, 255);
  display: block;
}
.alltags > span
{
      display: inline-block;
      margin: 5px;
}
.alltags > .col
{
  height: 15px;
  width:1px;
  background-color:#e6e6e6;
  margin-bottom: -3px;
  margin-top: 0px;
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
}
.alltags_transition-enter-active,
.alltags_transition-leave-active {
  transition: opacity .5s ;
}

.alltags_transition-enter,
.alltags_transition-leave-active {
  opacity: 0;
}
@media screen and (max-width: 750px){


.ranklist2 .rank2 {
  width: 210px;
  margin-right: 10px;
  margin-left: 10px;
}
.ranklist2 .continer
{
  margin-left:-10px;
  margin-right:-10px;
}
.ranklist2 .rank2 .rankimg2 {
  height: 210px;
  width: 210px;
}

.ranklist2 .rank2 .rankimg2>span {

  height: 40px;
  font-size: 26px;

  padding-right: 10px;
}



.ranklist2 .rank2 .rankimg2 span div {
  width: 40px;
  height: 40px;
}

h5
{
  font-size: 28px;
}

.alltags
{
  max-width: 690px;
  top: 80px;
}

.alltags .tran
{
  height: 20px;
  width: 20px;
  position: absolute;
  right: 30px;
  border-width: 0px 10px 18px;
  border-style: solid;
  /*border-color: transparent transparent rgb(255, 255, 255);*/
  border-color: transparent transparent rgba(0,0,0,0.15);
  /*box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.25);*/
  top: -20px;
  left: 10px;
  display: block;
}
.alltags .tran::before
{
  content: "";
  height: 2px;
  width: 0px;
  position: absolute;
  top: 3px;
  left: -10px;
  border-width: 0px 10px 18px;
  border-style: solid;
  border-color: transparent transparent rgb(255, 255, 255);
  display: block;
}
}
</style>
