
<template>
<div class="main"  v-on:mousedown="preX=$event.clientX;preY=$event.clientY;" v-on:mouseup="preX=preY=null"
v-on:mousemove="drag($event)">
  <div id="canvas"
          style="width: 100%;
    height: 100%;
    overflow: hidden;">
    <div class="object3d" v-bind:style="{transform:'translate3d('+(ball.x-ball.clipwidthheight/2)+'px,'+(ball.y-ball.clipwidthheight/2)+'px,'+ball.z+'px) rotateX('+ball.rx+'deg) rotateY('+ball.ry+'deg) rotateZ('+ball.rz+'deg)'}">
      <div



      v-vue-tooltip="b.name"
      v-on:click="$playsong([Object.assign({}, b)])"
      v-on:mouseover="b.hanasu+=10;"  v-on:mouseout="b.hanasu-=10;" class="clip" v-for="(b,$index) in ball.clips" v-if="lines[$index]" style="" v-bind:style="{

                 'background-image': 'url('+(b.album&&b.album.picUrl)+'?param=60y60)',
                 'width':(ball.clipwidthheight-2)+'px',
                 'height':(ball.clipwidthheight-2)+'px',
                 'border-radius':((rotateYDeg($index,ball.clips.length)==90)||(rotateYDeg($index,ball.clips.length)==-90)?'100% !important':''),
                 'transform':'rotateX('+rotateXDeg($index)+'deg) '

                 +'rotateY('+rotateYDeg($index,ball.clips.length)+'deg) '
                 +(rotateYDeg($index,ball.clips.length)>0?'rotateZ(180deg)':'')
                 +' translateZ('+(ballR+ball.hanasuR+b.hanasu)+'px)'
                 +' scale('+(b.hanasu/20+1)+')'
                 ,

                }"></div>

    </div>

  </div>

</div>
</template>
<script>
import config from "@/config"
import qs from "qs"
import crypto from "@/util/crypto"
export default {
  name: 'rank',
  mounted() {




    window.addEventListener("resize",()=>{



      this.ball.clipwidthheight=(this.$el.offsetWidth>this.$el.offsetHeight?this.$el.offsetHeight:this.$el.offsetWidth)/10;
      console.log(this.ball.clipwidthheight);
      console.log(this.whRate);



    });




    this.type = this.$route.params.type || 1;
    this.search();


  },
  data() {
    return {
      ranklist: config.setting.ranklist,
      type: 1,
      searchString: "",
      msg: 'Welcome to Your Vue.js App',
      source: axios.CancelToken.source(),
      ball: {

        x: 0,
        y: 0,
        z: 0,
        rx: 0,
        ry: 0,
        rz: 0,
        clipwidthheight: 50,
        hanasuR: 0,
        clips: []
      },
      whRate:8,
      preX:null,
      preY:null,

    }
  },
  methods: {
    rotateYDeg($index, len) {
      if ($index == 0 || $index >= (len - 1)) {
        return (Math.floor($index / (len - 1)) - 90);
      } else {


        return this.lines[$index].y;
      }

    },
    rotateXDeg($index) {

      return this.lines[$index].x;
    },

    search() {
      this.source.cancel("aaaa");
      this.source = axios.CancelToken.source();

      // axios.post('music163/api/album/new', qs.stringify({
      //   'offset': 0,
      //   'total': true,
      //   'limit': 1,
      //   'area': "KR",
      //   "csrf_token": ""
      // })).then(m => {
      //   console.log(m)
      // });
      //新歌速递


      const cryptoreq = crypto({
        'offset': 0,
        'total': true,
        'limit': 10,
        'area': "KR",
        "csrf_token": ""
      });



      axios.post('music163/api/discovery/new/songs', qs.stringify({
        "params": cryptoreq.params,
        "encSecKey": cryptoreq.encSecKey


      })).then(m => {
        var f=0;
        for (var i = 0; i < 210; i++) {
          this.ball.clips.push({
            hanasu:0,
            ...m.data.data[f]
          });
          f++;
          if (f>=100) {
            f=0;

          }
        }

        this.$nextTick(()=>{

                    this.ball.clipwidthheight=(this.$el.offsetWidth>this.$el.offsetHeight?this.$el.offsetHeight:this.$el.offsetWidth)/this.whRate;

        });




      });



      // this.ranklist['rank'+this.type].forEach((obj) => {
      //
      //   axios.get('music163/api/playlist/detail?id=' + obj.code, {cancelToken: this.source.token}).then(m => {
      //     if (m.status == 200 && m.data.code == 200 && m.data.result && m.data.result.tracks) {
      //       obj.picUrl = m.data.result.coverImgUrl;
      //       obj.name=m.data.result.name;
      //       obj.list = m.data.result.tracks.filter((elt, i, arr) => {
      //
      //         return true;
      //       });
      //       obj.time = m.data.result.trackNumberUpdateTime;
      //       obj.count=m.data.result.playCount;
      //     }
      //
      //     console.log(m)
      //   });
      //
      // });

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
    drag($event){


              if (this.preX&&this.preY) {
                this.ball.ry+=($event.clientX-this.preX)/10;
        				this.ball.rx-=($event.clientY-this.preY)/10;
        				this.preX=$event.clientX;
        				this.preY=$event.clientY;
              }
    }
  },
  computed: {
    ballR: {
      get: function() {

        return Math.sqrt(this.ball.clips.length * this.ball.clipwidthheight * this.ball.clipwidthheight / 4 / Math.PI)

      },
      set: function(newValue) {

      }
    },
    lines: {
      get: function() {

        var lineCount = Math.floor(0.5 * Math.PI * this.ballR / this.ball.clipwidthheight);
        var lines = []
        var inx = 0;
        for (var i = 0; i <= lineCount; i++) {
          var count = Math.floor((2 * Math.PI * i / lineCount) * Math.floor(this.ballR / this.ball.clipwidthheight)) + Math.ceil(Math.sin(i / lineCount * Math.PI) * lineCount + 1);

          for (var j = 0; j < count; j++) {
            lines[inx] = {
              x: j * 360 / count,
              y: i / lineCount * 90 - 90
            };
            inx += 1;
          }

        }
        for (var i = 0; i <= (lineCount - 1); i++) {
          var count = Math.floor((2 * Math.PI * i / lineCount) * Math.floor(this.ballR / this.ball.clipwidthheight)) + Math.ceil(Math.sin(i / lineCount * Math.PI) * lineCount + 1);

          for (var j = 0; j < count; j++) {
            lines[inx] = {
              x: j * 360 / count,
              y: i / lineCount * 90 + 90
            };
            inx += 1;
          }

        }
        console.log(lines);
        return lines;


      },
      set: function(newValue) {

      }
    }





  },
  components: {

  },
  beforeDestroy() {

    this.source.cancel("aaaa");
    window.removeEventListener("resize",()=>{this.ball.clipwidthheight=(this.$el.offsetWidth>this.$el.offsetHeight?this.$el.offsetHeight:this.$el.offsetWidth)/this.whRate;});

  },
  watch: {
    $route() {
      this.source.cancel("aaaa");
      this.type = this.$route.params.type || 1;
      this.search();
    },





  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#canvas {
  transform-style: preserve-3d;
  perspective: 5000px;
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 5000px;
  -moz-transform-style: preserve-3d;
  -moz-perspective: 5000px;
  -ms-transform-style: preserve-3d;
  -ms-perspective: 5000px;
}

#canvas>* {
  transform-style: preserve-3d;
  perspective: 5000px;
  -webkit-transform-style: preserve-3d;
  -webkit-perspective: 5000px;
  -moz-transform-style: preserve-3d;
  -moz-perspective: 5000px;
  -ms-transform-style: preserve-3d;
  -ms-perspective: 5000px;
}

.object3d {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0px;
  height: 0px;
  transform-origin: center;
}

.clip {
  transform-origin: center;

  width: 18px;
  height: 18px;
  top: -10px;
  left: -10px;
  background: rgba(79, 192, 141, 0.5);
  border: inset 1px rgba(200, 200, 200, 0.5);
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: transform 0.5s;
  cursor: pointer;
}
.main
{
  position: fixed;
  width: calc(100% - 200px);
  height: calc(100% - 160px);
  margin-top: -20px;
}

@media screen and (max-width: 750px){
  .main
  {
    width: 100%;
  }
}
</style>
