<template>
<div>


  <div class="searchlist">
    <div class="searchresult">
      <h6 v-for="list in searchlist" v-if="tabselect==list.type">搜索{{$route.params.str}}，找到{{list.count}}{{list.name}}


      </h6>
    </div>
    <div class="tablist">
      <div class="tab" :class="{select:list.type==tabselect}" v-for="list in searchlist" v-on:click="tabselect=list.type">{{list.name}}</div>
    </div>
    <div class="gridlist">

      <div class="grid" v-for="list in searchlist" v-show="tabselect==list.type">

        <template v-if="list.type==1">
          <p class="header">
            <span style="width:80px;"></span>
            <span style="width:50%">音乐标题</span>
            <span style="width:25%">歌手</span>
            <span style="width:25%">专辑</span>
            <span style="width:100px">时长</span>
            <span style="width:100px">热度</span>
          </p>
          <p class="body" v-for="(li,$index) in list.list">
            <span style="width:80px;">{{$index+1}}</span>
            <span v-vue-tooltip="'播放 '+li.name" style="width:50%;cursor:pointer;" v-on:click="$playsong([Object.assign({}, li)])">{{li.name}}</span>
            <span style="width:25%;margin-left:-20px;">
              <template v-for="(artist,$index) in li.artists">
                <span style="cursor:pointer" v-vue-tooltip="'艺人详细 '+artist.name" v-on:click="goArtist(artist.id)">{{artist.name}}</span><template v-if="$index<li.artists.length-1">、</template>
              </template>
            </span>
            <span style="cursor:pointer;width:25%" v-vue-tooltip="'前往专辑 '+li.album.name" v-on:click="goAlbum(li.album.id)">{{li.album.name}}</span>

            <span style="width:100px">{{li.duration | timefilter1000}}</span>
            <span style="width:100px;padding-top: 10px;"><hotbar :len="li.popularity/100"></hotbar></span>
          </p>

      </template>
        <template v-if="list.type==10">
        <div class="list list10" v-for="li in list.list">
          <img :src="li.picUrl+'?param=60y60'" v-on:click="goAlbum(li.id)"></img>
          <div style="margin-left:10px;cursor:pointer;width:50%;" v-on:click="goAlbum(li.id)">{{li.name}}</div>
          <div class="nobold">
            <template v-for="(artist,$index) in li.artists"><span style="cursor:pointer" v-on:click="goArtist(artist.id)">{{artist.name}}</span><template v-if="$index<li.artists.length-1">、</template></template>

          </div>

        </div>
      </template>
        <template v-if="list.type==100">
        <div class="list list100" v-for="li in list.list">
          <img :src="li.picUrl+'?param=60y60'"  v-on:click="goArtist(li.id)"></img>
          <div style="margin-left:10px;cursor:pointer;" v-on:click="goArtist(li.id)">{{li.name}}</div>

        </div>
      </template>
        <template v-if="list.type==1000">
        <div class="list list1000" v-for="li in list.list">
          <img :src="li.coverImgUrl+'?param=60y60'" v-on:click="goPlaylist(li.id)"></img>

          <div style="width:60%;margin-left:10px;"><span style="cursor:pointer;" v-on:click="goPlaylist(li.id)">{{li.name}}</span></div>
          <div style="width:100px;" class="nobold">{{li.trackCount}}首</div>
          <div style="width:20%;" class="nobold">创建者：{{li.creator.nickname}}</div>

        </div>
      </template>
      <template v-if="list.type==1004">
      <div class="list list1004" v-for="li in list.list">
        <img :src="li.cover+'?param=60y60'" v-on:click="goPlaylist(li.id)"></img>

        <div style="width:60%;margin-left:10px;"><span style="cursor:pointer;" v-on:click="goPlaylist(li.id)">{{li.name}}</span></div>
        <div>
          <span v-for="(artist,$index) in li.artists"><span style="cursor:pointer" v-on:click="goArtist(artist.id)">{{artist.name}}</span><span v-if="$index<li.artists.length-1">、</span></span>
        </div>

      </div>
    </template>
      </div>
    </div>

  </div>


</div>
</template>

<script>
import qs from "qs"

import config from "@/config"
import hotbar from "@/components/HotBar"
export default {
  name: 'search',
  methods: {
    goPlaylist(id) {

      this.$router.push({
        name: 'playlist',
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
    goSong(id) {

      this.$router.push({
        name: 'song',
        params: {
          id: id
        }
      });

    },
    search() {
      for (var list of this.searchlist) {
        let listx = list;
        if (this.tabselect != listx.type) {
          continue;
        }
        listx.count=0;
        // listx.list=[];
        axios.post(config.urls.search, qs.stringify({
          s: this.$route.params.str,
          offset: this.offset,
          limit: listx.limit,
          type: this.tabselect
        })).then(m => {

          if (m.status == 200 && m.data.code == 200 && m.data.result && m.data.result[listx.resparams.liststr]) {


            m.data.result[listx.resparams.liststr].forEach((o)=>{

                listx.list.push(o);


            });
            listx.count = m.data.result[listx.resparams.numstr];


            if (this.offset+listx.limit<listx.count) {
                  this.more=true;
                  this.offset+=listx.limit;
            } else {
                  this.more=false;
            }

          }

          console.log(m)
        });

      }
    }
    ,
    onScroll(e){

      if (this.more) {

        this.search();
      }

    },

  },
  mounted() {

    this.eventer.on("main-continer-scroll",this.onScroll);

    this.searchlist.forEach((l)=>{l.list=[]});
    this.more=false;
    this.offset=0;
    this.tabselect = this.$route.params.type;
    this.search();

  },
  data() {
    return {
      imgdate: (new Date()).getTime(),
      msg: 'Welcome to Your Vue.js App',
      tabselect: -1,
      searchlist: config.setting.searchlist,
      more:false,
      offset:0,
    }
  },
  components: {
    //	"DropListTree":DropListTree,
    'Window': () => System.import('@/components/Window'),
    'hotbar':hotbar
    //'Window':Window,
    //'Alert':Alert
  },
  beforeDestroy(){
      this.eventer.off("main-continer-scroll");

  }
  ,
  watch: {
    $route() {
      // this.tabselect=0;
      // this.$nextTick(()=>{
      this.searchlist.forEach((l)=>{l.list=[]});
      this.more=false;
      this.offset=0;
      this.tabselect = this.$route.params.type;
      this.search();
      // });
    },
    tabselect(value) {

      if (value == 0) {
        this.$router.push({
          name: 'search',
          params: {
            type: this.searchlist[0].type,
            str: this.$route.params.str
          }
        });
      } else {
        this.$router.push({
          name: 'search',
          params: {
            type: value,
            str: this.$route.params.str
          }
        });
      }


    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.searchresult h6
{
  margin-left: 20px;
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
}
.tablist {
  padding-left: 20px;
  width: 100%;
  overflow: hidden;
  border-bottom: solid 2px #4fc08d;
}

.tablist>.tab {
  float: left;
  margin-right: 5px;
  height: 30px;
  min-width: 80px;
  color: #121212;
  background-color: #f4f4f4;

  border: solid 1px #ababab;
  border-bottom: none;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.5s
}

.tablist>.tab.select {
  color: #ffffff;
  background-color: #4fc08d;
  border: none;
}

.gridlist {}

.grid .list {
  padding-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
}
.grid .nobold {

  font-size: 12px;
  font-weight: 400;
  color: #888888;
}

.grid .list>* {
  /*float: left;*/
}

.grid .list>img {
  cursor: pointer;
  height: 40px;
  width: 40px;
  border: solid 1px #e6e6e6;
}

.grid .list1 {}

.grid .list10 {
  height: 60px;
  overflow: hidden;
}

.grid .list10>div {
  margin-left: 10px
}

.grid .list100 {
  height: 60px;
  overflow: hidden;
}

.grid .list1000 {
  height: 60px;
  overflow: hidden;
}

.grid .list:nth-child(2n) {
  background-color: #f4f4f4;
}


.grid .header {
  border-bottom: solid 1px #cccccc;
  margin: 0px;
}

.grid .header>span {
  border-right: solid 1px #cccccc;
}

.grid .header>span:last-child {
  border-right: none;
}

.grid .body:nth-child(2n) {
  background-color: #f4f4f4;
}

.grid>p {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 0px;
  font-size: 13px;
}
.grid div {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.grid span {
  /*display: inline-block;*/
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}




@media screen and (max-width: 750px){

.searchresult h6
{
  font-size: 32px;
}
.tablist {
  border-bottom: solid 4px #4fc08d;
}

.tablist>.tab {
  float: left;
  margin-right: 10px;
  height: 60px;
  min-width: 160px;

  border: solid 2px #ababab;
  border-bottom: none;
  margin-bottom: -2px;
  font-size: 36px;
}






.grid .list {
  padding-left: 20px;
  font-size: 28px;
  font-weight: 500;
}
.grid .nobold {

  font-size: 21px;
  font-weight: 400;
}

.grid .list>img {
  height: 80px;
  width: 80px;
  border: solid 2px #e6e6e6;
}

.grid .list1 {}

.grid .list10 {
  height: 120px;
  overflow: hidden;
}

.grid .list10>div {
  margin-left: 10px
}

.grid .list100 {
  height: 120px;
  overflow: hidden;
}

.grid .list1000 {
  height: 120px;
  overflow: hidden;
}



.grid .header {
  border-bottom: solid 2px #cccccc;
}

.grid .header>span {
  border-right: solid 2px #cccccc;
}


.grid>p {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
}


.grid  p.header > span:nth-last-child(1) {
  display: none;
}
.grid  p.body > span:nth-last-child(1) {
  display: none;
}
.grid  p.header > span:nth-last-child(2) {
  display: none;
}
.grid  p.body > span:nth-last-child(2) {
  display: none;
}

.grid  .list1000 > div:nth-last-child(1) {
  width: 40%!important;
}
}
</style>
