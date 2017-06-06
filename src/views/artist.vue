<template>
<div>
  <!-- <h1>playlist</h1> -->
  <div class="main">

    <div class="coverImg disk"><img :src="(artistdata&&(artistdata.picUrl+'?param=180y180'))"></img>
    </div>
    <div class="playlistDesc">
      <h2 class="title"><span class="mark">歌手</span><span style="    flex-grow: 1;
          margin-bottom: -20px;
    text-align: left;    margin-top: 0px;">{{(artistdata&&artistdata.name)}}
    <br/>
    <span class="alias">
    <span v-for="(alias,$index) in (artistdata&&artistdata.alias)">
      <span>{{alias}}</span>
      <span v-if="$index<(artistdata&&artistdata.alias).length-1">、</span>
    </span>
    </span>



  </span>

      </h2>



      <p v-if="artistdata&&artistdata.musicSize"><span>单曲数：</span>{{artistdata&&artistdata.musicSize}}</p>
      <p v-if="artistdata&&artistdata.albumSize"><span>专辑数：</span>{{artistdata&&artistdata.albumSize}}</p>
      <p v-if="artistdata&&artistdata.mvSize"><span>MV数：</span>{{artistdata&&artistdata.mvSize}}</p>
      <p style="overflow: hidden;" :style="{maxHeight:isexpend&&expended?'9999px':'60px'}"><span>简介：</span><span class="desc">{{artistdata&&artistdata.briefDesc}}</span></p>
      <p class="more"><span style="float:left;margin-top:-10px;" v-if="isexpend&&!expended">......</span><span style="cursor:pointer;color:#4fc08d" v-if="isexpend&&!expended" v-on:click="expended=true;">更多</span><span style="cursor:pointer;color:#4fc08d" v-if="isexpend&&expended"
          v-on:click="expended=false;">收起</span></p>


    </div>



  </div>




  <div class="tablist">
    <div class="tab" :class="{select:list.type==tabselect}" v-for="list in searchlist" v-on:click="tabselect=list.type">{{list.name}}</div>
  </div>

    <template v-for="list in searchlist" >


        <div class="ranklist2" v-if="list.type==1" v-show="tabselect==list.type">
          <div class="continer">
            <template v-for="(rank,$index) in artistdataalbum">

          <div class="rank2 disk">
            <div class="rankimg2" :style="{background:'url('+rank.picUrl+'?param=150y150) no-repeat 0px 0px'}"   v-on:click="goAlbum(rank.id)">


              <!-- <span>{{Math.ceil(rank.playCount/10000)}}万</span> -->

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

          <div class="artistinfo" v-if="list.type==2" v-show="tabselect==list.type">
              <template v-for="txt in (artistdatainfo&&artistdatainfo.introduction)">
                    <h5>{{txt.ti}}</h5>
                    <p>{{txt.txt}}</p>
              </template>

            </div>
    </template>



</div>
</template>

<script>
import qs from "qs"
import crypto from "@/util/crypto"
export default {
  name: 'artist',


  mounted() {

    this.eventer.on("main-continer-scroll",this.onScroll);
    this.search();
    this.tabselect = this.searchlist[0].type;
  },

  data() {
    return {
      artistdata:null,
      artistdatainfo:null,
      artistdataalbum:[],
      list: [],
      isexpend: false,
      expended: false,
      searchStr: "",
      more:false,
      offset:0,
      limit:30,
      tabselect: -1,
      searchlist: [{type:"1",name:"专辑"},{type:"2",name:"歌手详情"}],
    }
  },
  methods: {
    onScroll(e){

      if (this.more) {

        this.searchMoreAlbum();
      }

    },
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
    search(){


        this.expended = false;

        const cryptoreq = crypto({

          "csrf_token": ""
        });


    // `/weapi/v1/artist/${id}?offset=${offset}&limit=${limit}`,
        axios.post('music163/weapi/v1/artist/' + this.$route.params.id,

          qs.stringify({
            "params": cryptoreq.params,
            "encSecKey": cryptoreq.encSecKey
          })

        ).then(m => {
          if (m.status == 200 && m.data.code == 200) {
            this.artistdata = m.data.artist;
            // this.artistdata.songs=m.data.songs;
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

        const cryptoreq2 = crypto({
          "id":this.$route.params.id,
          "csrf_token": ""
        });
        axios.post('music163/weapi/artist/introduction',

          qs.stringify({
            "params": cryptoreq2.params,
            "encSecKey": cryptoreq2.encSecKey
          })

        ).then(m => {
          if (m.status == 200 && m.data.code == 200) {
            this.artistdatainfo = m.data;

          }

          console.log(m)
        });


        const cryptoreq3 = crypto({
          "total": true,
          "offset": this.offset,
          "limit": this.limit,
          "csrf_token": ""
        });
        axios.post(`music163/weapi/artist/albums/${this.$route.params.id}`,

          qs.stringify({
            "params": cryptoreq3.params,
            "encSecKey": cryptoreq3.encSecKey
          })

        ).then(m => {
          if (m.status == 200 && m.data.code == 200) {
            // this.artistdataalbum = m.data.hotAlbums;

            m.data.hotAlbums.forEach((o)=>{

                this.artistdataalbum.push(o);


            });
            this.more=m.data.more;
            this.offset+=this.limit;
          }

          console.log(m)
        });


    }
    ,
    searchMoreAlbum(){
      const cryptoreq3 = crypto({
        "total": true,
        "offset": this.offset,
        "limit": this.limit,
        "csrf_token": ""
      });
      axios.post(`music163/weapi/artist/albums/${this.$route.params.id}`,

        qs.stringify({
          "params": cryptoreq3.params,
          "encSecKey": cryptoreq3.encSecKey
        })

      ).then(m => {
        if (m.status == 200 && m.data.code == 200) {
          // this.artistdataalbum = m.data.hotAlbums;

          m.data.hotAlbums.forEach((o)=>{

              this.artistdataalbum.push(o);


          });
          this.more=m.data.more;
          this.offset+=this.limit;
        }

        console.log(m)
      });



    }
  },
  components: {
  },
  beforeDestroy(){
      this.eventer.off("main-continer-scroll");

  }
  ,
  watch: {
    $route() {
      // this.source.cancel("aaaa");
      this.offset=0;
      this.more=false;
      this.tabselect = this.searchlist[0].type;
      this.artistdataalbum=[];
      this.artistdatainfo=null;
      this.artistdata=null;
      this.alltagsshow=false;
      this.search();
    },





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
.alias
{
  color: #cccccc;
    font-size: 14px;
    top: -10px;
    position: relative;
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




.ranklist2 {
  padding-top: 20px;
  /*border-top: solid 1px #e6e6e6;*/
  margin-left: 30px;
  margin-right: 30px;
}
.ranklist2 > div
{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  margin-bottom: 20px;
}
.ranklist2 .continer
{
  margin-left:-30px;
  margin-right:-30px;
}

.ranklist2 .rank2 .rankimg2 {
  height: 150px;
  width: 150px;
  position: relative;

  background-size: contain !important;
  border: solid 1px #e6e6e6;
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


.artistinfo
{
    margin-left: 30px;
    margin-right: 30px;
    text-align: left;


}
.artistinfo h5
{
    font-size: 16px;
    font-weight: 500;

}
.artistinfo p
{
    font-size: 14px;
}
.searchinput {
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

.tablist {
  padding-left: 30px;
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
.grid >p >span:nth-last-child(2) {
  display: none;
}
.grid >p >span:first-child{
  width: 10% !important;
}
.grid >p >span:nth-child(2) {
  width: 70% !important;
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


  .artistinfo h5
  {
      font-size: 14px;
      font-weight: 500;

  }
  .artistinfo p
  {
      font-size: 12px;
  }
}
</style>
