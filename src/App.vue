<template>
<div id="app">
  <div class="top-continer">
    <toppart></toppart>
  </div>
  <div class="left-continer">

    <leftpart></leftpart>

  </div>

  <div class="main-continer"  v-on:scroll="onScroll($event)">
    <div>
    <router-view></router-view>
    </div>
  </div>
  <div class="bottom-continer">
    <bottompart></bottompart>
  </div>
  <Alert></Alert>

  <div v-show="progress.progressing.length>0||progress.firstprogressing" class="progeressing">

      <div :class="{progeressingicon:(progress.progressing.length>0||progress.firstprogressing)}">
        <div class="spinner-container container1">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <div class="spinner-container container2">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
        <!-- <div class="spinner-container container3">
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div> -->
      </div>


    <span>Oo.载入中.oO</span>
  </div>

</div>
</template>

<script>
import DropListTree from "@/components/DropListTree"
import toppart from "@/views/top-part"
import leftpart from "@/views/left-part"
import bottompart from "@/views/bottom-part"
import qs from "qs"
//import Window from "@/components/Window"
//const Window = resolve => require(['@/components/Window'], resolve)
console.log(Window);
//const Alert =resolve => require(['@/components/Alert'], resolve)
export default {
  name: 'app',
  //components:{Window},
  components: {
    "toppart": toppart,
    "leftpart":leftpart,
    "bottompart":bottompart,
    "DropListTree": DropListTree,
    'Window': () => System.import('@/components/Window'),
    'Alert': () => System.import('@/components/Alert'),
    //'Window':Window,
    //'Alert':Alert
  },
  methods:{

    onScroll(e){


        var main=this.$el.getElementsByClassName("main-continer")[0];

        if (main.scrollTop>=main.scrollHeight-main.offsetHeight) {
            this.eventer.emit("main-continer-scroll",e);
        }


      }
  },
  created: function() {





    // axios.get('music163/api/discovery/new/songs', {
    //   s: "girigiri",
    //   offset: 0,
    //   limit: 100,
    //   type: 1
    // }).then(m => {
    //   console.log(m)
    // });
    //
    // axios.get('music163/api/banner/get', qs.stringify({
    //
    // })).then(m => {
    //   console.log(m)
    // });

    // type ALL, ZH,EA,KR,JP



    // axios.post('music163/api/v2/banner/get',qs.stringify({s:"girigiri",offset:'0',limit:'100',type:'1'})).then(m=>{console.log(m)});



  },
  data: function() {

    return {



      searchlist: [{
          id: 1,
          title: "xxx",
          expend: false,
          children: [{
            id: 1,
            title: "xxx",
            expend: false,
            children: [{
              id: 1,
              title: "xxx",
              expend: false,
              children: []
            }]
          }]
        },
        {
          id: 1,
          title: "xxx",
          expend: false,
          children: [{
            id: 1,
            title: "xxx",
            expend: false,
            children: [{
              id: 1,
              title: "xxx",
              expend: false,
              children: []
            }]
          }]
        }
      ]

    }
  }
  //
  //
  //computed: {
  //  progressing:function () {
  //    return this.$store.state.progressing;
  //  }
  //}
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  position: absolute;
  /*min-width: 1000px;*/
  font-size: 16px;
}

.main-continer {
  left: 200px;
  top: 60px;
  height: calc(100% - 60px - 60px);
  width: calc(100% - 200px);
  position: absolute;
  overflow: auto;
  background-color: #fafafa;
}

.top-continer {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 60px;
  width: 100%;
  background-color: #4fc08d;
}

.left-continer {
  background-color: #f1f1f1;
  position: absolute;
  left: 0px;
  top: 60px;
  bottom: 60px;
  height: calc(100% - 60px - 60px);
  width: 200px;
  /*width: 0px;*/
  border-right: solid 1px #dcdcdc;
}

.bottom-continer {
  background-color: #efefef;
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  border-top: solid 1px #dcdcdc;
}

.progeressing {
      width: 20%;
  height: 100px;
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  pointer-events: none;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.progeressing span
{
    margin-top: 20px;
    position: relative;
    color: #4fc08d;
    text-shadow: 0px 0px 2px #ffffff;
    font-weight: 900;
    font-size: 18px;

}








.progeressingicon {
  /*margin: 100px auto;*/
  width: 60px;
  height: 60px;
  position: relative;
}

.progeressingicon .container1 > div,.progeressingicon .container2 > div,.progeressingicon .container3 > div {
  width: 16px;
  height: 16px;
  background-color: #4fc08d;

  border-radius: 100%;
  position: absolute;
  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;
  animation: bouncedelay 1.2s infinite ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.progeressingicon .spinner-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.container2 {
  -webkit-transform: rotateZ(45deg);
  transform: rotateZ(45deg);
}

.container3 {
  -webkit-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}

.circle1 { top: 0; left: 0; }
.circle2 { top: 0; right: 0; }
.circle3 { right: 0; bottom: 0; }
.circle4 { left: 0; bottom: 0; }

.progeressingicon .container2 .circle1 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.progeressingicon .container3 .circle1 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.progeressingicon .container1 .circle2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.progeressingicon .container2 .circle2 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

.progeressingicon .container3 .circle2 {
  -webkit-animation-delay: -0.7s;
  animation-delay: -0.7s;
}

.progeressingicon .container1 .circle3 {
  -webkit-animation-delay: -0.6s;
  animation-delay: -0.6s;
}

.progeressingicon .container2 .circle3 {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
}

.progeressingicon .container3 .circle3 {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}

.progeressingicon .container1 .circle4 {
  -webkit-animation-delay: -0.3s;
  animation-delay: -0.3s;
}

.progeressingicon .container2 .circle4 {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.progeressingicon .container3 .circle4 {
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
@media screen and (max-width: 750px){
  #app
  {
    font-size: 32px;
  }

  .top-continer {
    height: 100px;
  }


  .left-continer
  {
    width: 0px;
  }

  .main-continer {
    width: 100%;
    left:0px;
    top: 100px;
        height: calc(100% - 100px - 60px);
  }



  .progeressing {
        width: 40%;
    height: 200px;

  }

  .progeressing span
  {
      margin-top: 20px;
      font-size: 36px;

  }








  .progeressingicon {
    /*margin: 100px auto;*/
    width: 120px;
    height: 120px;
    position: relative;
  }

  .progeressingicon .container1 > div,.progeressingicon .container2 > div,.progeressingicon .container3 > div {
    width: 32px;
    height: 32px;
  }
}



</style>
<style>
.disk
{
  background:url(assets/disk.png) no-repeat;
  background-size: contain;
}
</style>
