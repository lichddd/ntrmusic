<template>
<div>
  <!-- <h1>playlist</h1> -->
  <div class="main">

    <div class="coverImg disk"><img :src="playlistdata.coverImgUrl"></img>
    </div>
    <div class="playlistDesc">
      <h2 class="title"><span class="mark">歌单</span><span style="    flex-grow: 1;
    text-align: left;    margin-top: 0px;">{{playlistdata.name}}</span><div class="count">
        <div class="n">
          <span>歌曲数</span>
          <span style="color:#666666;font-weight:900;font-size:14px;">{{playlistdata.trackCount}}</span>
        </div>
        <div class="q">/</div>
        <div class="n">
          <span>收听数</span>
          <span style="color:#666666;font-weight:900;font-size:14px;">{{Math.ceil(playlistdata.playCount/10000)}}万</span>
        </div>
      </div></h2>

      <p><span>创建时间：</span>{{playlistdata.createTime | datefilter('YYYY年MM月DD日')}} <span>最近更新：</span>{{playlistdata.trackUpdateTime | datefilter('YYYY年MM月DD日')}}</p>
      <p><span>标签：</span><span v-for="(tag,$index) in playlistdata.tags"><span class="tags" v-on:click="goTag(tag)">{{tag}}</span><span v-if="$index<playlistdata.tags.length-1"> / </span></span>
      </p>
      <p style="overflow: hidden;" :style="{maxHeight:isexpend&&expended?'9999px':'60px'}"><span>简介：</span><span class="desc">{{playlistdata.description}}</span></p>
      <p class="more"><span style="float:left;margin-top:-10px;" v-if="isexpend&&!expended">......</span><span style="cursor:pointer;color:#4fc08d" v-if="isexpend&&!expended" v-on:click="expended=true;">更多</span><span style="cursor:pointer;color:#4fc08d" v-if="isexpend&&expended"
          v-on:click="expended=false;">收起</span></p>


    </div>




  </div>

  <div class="grid">
    <input v-model="searchStr" class="searchinput" placeholder="搜索歌单音乐"></input>
    <p class="header">
      <span style="width:40px;"></span>
      <span style="width:50%">音乐标题</span>
      <span style="width:20%">歌手</span>
      <span style="width:20%">专辑</span>
      <span style="width:10%">时长</span>
    </p>
    <p class="body" v-for="(li,$index) in $arraybyfilter(playlistdata.tracks,searchStr,'name',1)">
      <span style="width:40px;text-align:right;padding-right:5px;padding-left:5px;">{{$index+1}}</span>
      <span v-vue-tooltip="'播放 '+li.name" style="width:50%;cursor:pointer;" v-on:click="$playsong([Object.assign({}, li)])">{{li.name}}</span>
      <span style="width:20%">
        <span v-for="(artist,$index) in li.artists">
          <span style="cursor:pointer" v-vue-tooltip="'艺人详细 '+artist.name" v-on:click="goArtist(artist.id)">{{artist.name}}</span>
      <span v-if="$index<li.artists.length-1">、</span>
      </span>
      </span>
      <span style="cursor:pointer;width:20%" v-vue-tooltip="'前往专辑 '+li.album.name" v-on:click="goAlbum(li.album.id)">{{li.album.name}}</span>
      <span style="width:10%">{{li.duration | timefilter1000}}</span>
    </p>
  </div>






</div>
</template>

<script>
import qs from "qs"
export default {
  name: 'playlist',
  mounted() {
    this.expended = false;
    axios.get('music163/api/playlist/detail?id=' + this.$route.params.id, {}).then(m => {
      if (m.status == 200 && m.data.code == 200 && m.data.result) {
        this.playlistdata = m.data.result;
        this.$nextTick(() => {


          if (this.$el.getElementsByClassName("desc")[0].offsetHeight > 40) {
            this.isexpend = true;
          } else {
            this.isexpend = false;
          }




        })
      }

      console.log(m)
    });


  },
  data() {
    return {
      playlistdata: {},
      list: [],
      isexpend: false,
      expended: false,
      searchStr:"",
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    goTag(tag) {
      this.$router.push({
        name: 'allplaylist',
        params: {
          type: tag
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
    goArtist(id) {

      this.$router.push({
        name: 'artist',
        params: {
          id: id
        }
      });

    },
    goAlbum(id) {

      this.$router.push({
        name: 'album',
        params: {
          id: id
        }
      });

    },


  },
  components: {
    //	"DropListTree":DropListTree,
    'Window': () => System.import('@/components/Window'),
    //'Window':Window,
    //'Alert':Alert
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

#inputtest:before {
  content: "111111";
}

.main {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 30px;
  display: flex;
  margin-bottom: 60px;
}

.coverImg {
  border: solid 1px #cccccc;
  flex-grow: 0;
  flex-shrink: 0;
  width: 180px;
  height: 180px;
  -webkit-box-reflect: below -2px linear-gradient(transparent, transparent 85%, rgba(255, 255, 255, 0.4));
}

.coverImg>img {
  width: 100%;
  height: 100%;
}

.mark {
  background-color: #4fc08d;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  padding-top: 1px;
  color: #ffffff;
  height: 20px;
  width: 40px;
  align-self: flex-start;
  margin-top: 7px;
  flex-grow: 0;
  flex-shrink: 0;
}

.title {
  margin-top: 0px;
  display: flex;
  /*align-items: center;*/
}

.playlistDesc {
  flex-grow: 1;
  margin-left: 30px;
}

.playlistDesc>p {
  font-size: 13px;
  text-align: left;
  margin-top: 0px;
  margin-bottom: 5px;
  /*height: 15px;*/
}

.playlistDesc>p>span.desc {
  font-weight: normal;
}

.playlistDesc>p>span {
  font-weight: 900;
}

.playlistDesc>p.more {
  /*margin-top: -10px;*/
}

.playlistDesc>p.more>span {
  font-weight: normal;
  float: right;
}

.playlistDesc>p>span>span.tags {
  color: #4fc08d;
  cursor: pointer;
}

.playlistDesc>p>span>span {
  font-weight: normal;
}

.count {

  color: #888888;
  display: flex;
  align-items: flex-start;
  margin-top: 0px;

  flex-grow: 0;
  flex-shrink: 0;
}

.count>div.n {
  font-size: 12px;
  font-style: oblique;
  display: flex;
  flex-direction: column;
}

.count>div.q {
  font-size: 36px;
  display: flex;
  flex-direction: column;
  font-weight: lighter;
  color: #cccccc;
  margin-top: -5px;
}

.grid {
  border-top: solid 2px #4fc08d;
}
.grid>p  {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 0px;
  font-size: 13px;
}
.grid p > span {
  /*display: inline-block;*/
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.grid .body:nth-child(2n) {
  background-color: #f4f4f4;
}
.grid .header{
  border-bottom: solid 1px #cccccc;
}
.grid .header> span{
  border-right: solid 1px #cccccc;
}
.grid .header> span:last-child{
  border-right: none;
}
.searchinput
{
  border-radius: 10px;
  border: solid 1px #e6e6e6;
  padding-left: 5px;
  padding-right: 5px;
  right: 30px;
  position: absolute;
  margin-top: -30px;
  height: 20px;
  width: 150px;
  line-height: 20px;
}

@media screen and (max-width: 750px){


.title
{
  font-size: 24px;
}
.grid>p {
  display: flex;
  height: 60px;
  line-height: 60px;
  margin: 0px;
  font-size: 24px;
}

.grid >p >span:last-child {
  display: none;
}
.grid >p >span:first-child{
  width: 10% !important;
}

.searchinput{
  border-radius: 20px;
  border: solid 2px #e6e6e6;
  padding-left: 15px;
  padding-right: 15px;
  right: 10px;
  position: absolute;
  margin-top: -50px;
  height: 40px;
  width: 200px;
  line-height: 40px;
  font-size: 20px;

}
}
</style>
