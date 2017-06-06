<template>
<div>
  <h1>song</h1>
  <h3>
    <a :href="song.mp3Url" target="_blank">{{song.name}}</a>
    <a v-on:click="playMp3(song.mp3Url);" target="_blank">播放</a>


  </h3>






</div>
</template>

<script>
import qs from "qs"
import crypto from "@/util/crypto"
export default {
  name: 'search',
  mounted() {

    axios.get('music163/api/song/detail/?id=' + this.$route.params.id + '&ids=%5B' + this.$route.params.id + '%5D', {}).then(m => {
      if (m.status == 200 && m.data.code == 200 && m.data.songs && m.data.songs[0]) {
        this.song = m.data.songs[0];
      }
      console.log(this.$router);
      console.log(m)
    }).then(
      () => {
        if (!this.song.mp3Url) {
          const cryptoreq = crypto({
            "ids": "[" + this.$route.params.id.toString() + "]",
            "br": 999000,
            "csrf_token": ""
          });
          axios.post('music163/weapi/song/enhance/player/url',
            qs.stringify({
              "params": cryptoreq.params,
              "encSecKey": cryptoreq.encSecKey
            })
          ).then(m => {
            if (m.status == 200 && m.data.code == 200 && m.data.data[0] && m.data.data[0].url) {

              this.song.mp3Url = m.data.data[0].url;
            }
          });
        }



      }

    );








    //
    // axios.post('music163/weapi/song/enhance/player/url',
    //   qs.stringify({
    //     "ids": "[" + this.$route.params.id.toString() + "]",
    //     "br": 999000,
    //     "csrf_token": ""
    //   }), {
    //     headers: {
    //       'Accept': '*/*',
    //       'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
    //       'Connection': 'keep-alive',
    //       // 'Content-Type': 'application/x-www-form-urlencoded',
    //       "Content-Type": "application/json",
    //       'Referer': 'http://music.163.com',
    //       'Cookie': 'appver=2.0.2',
    //       'Host': 'music.163.com',
    //       // 'Cookie': cookie,
    //       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
    //     },
    //   }
    //
    // ).then(m => {
    //
    //   console.log(m)
    // });


  },
  data() {
    return {
      song: {},
      msg: 'Welcome to Your Vue.js App'
    }
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
</style>
<style>
button {

  background-color: #22B2E7;
}
</style>
