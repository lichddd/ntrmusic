<template>
<div class="main">

  <div>

  </div>
  <h1>热门精选</h1>
  <div class="hotlist">


    <div class="hot disk" v-for="hot in hotlist" v-on:click="goPlaylist(hot.id)">
      <img class="hotimg" :src="hot.picUrl+'?param=150y150'"></img>
      <p>{{hot.name}}</p>
    </div>
  </div>
  <div>
    <h1>新歌速递</h1>


  </div>
</div>
</template>

<script>
export default {
  name: 'osusume',
  mounted() {

    axios.get('music163/api/discovery/hotspot', {
    }).then(m => {
      if (m.status==200&&m.data&&m.data.code==200) {
          this.hotlist=m.data.data.filter((elt,i,arr)=>{

            if (elt.type==1) {
                return true;
            } else {
                return false;
            }
            return false;
          })
      }
      console.log(m)
    });


  },
  data() {
    return {
      hotlist:[],
      searchString:"",
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
.hotlist
{
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  border-top: solid 1px #e6e6e6;
}
.hotlist .hot
{
  width: 150px;
  cursor: pointer;
}

.hotlist .hot p
{
  width: 100%;
  margin: 0px;
  text-align: left;
}

.hotimg{
  width: 150px;
  height: 150px;
  border: solid 1px #e6e6e6;
}
.main
{
  padding-left: 30px;
  padding-right:30px;
  text-align: left;
}

.main h1
{
    margin: 0px;
    border-bottom: solid 3px #e6e6e6;
    display: inline-block;
    font-size: 24px;
    color: #666666;
}
</style>
