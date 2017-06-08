<template>
<div class="left-part">
  <div class="menublock" :class="{closed:menu.closed}" v-for="menu in menulist">
    <h6 v-on:click="menulist.forEach((m)=>{m.closed=true});menu.closed=false;">{{menu.title}}</h6>
    <div class="listcontiner" :style="{'height':menu.list.length*30+'px'}">
      <div class="list" :class="{select:(select==li.target)}" v-for="li in menu.list" v-on:click="li.target?go(li.target):(li.onclick?doclick(li.onclick):'')">
        <div class="selectmark" v-show="(select==li.target)"></div>
        <div :class="li.iconname" class="icon"></div>
        <div class="title">{{li.title}}</div>
      </div>
    </div>
  </div>


</div>
</template>

<script>
import config from "@/config"
export default {
  name: 'left-part',
  data() {
    return {
      menulist: [{
          title: "推荐",
          closed: false,
          list: [{
              target: "home",
              iconname: "find",
              title: "发现音乐"
            }
            // ,
            // {
            //   onclick: "this.alert('关机','你确定要关机吗？',()=>{return new Promise((resolve,reject)=>{this.alert('关机','你确定要关机吗？',()=>{console.log('关机');resolve();},null,'关机','不关机')});},null,'关机','不关机')",
            //   target: "",
            //   iconname: "find",
            //   title: "关机"
            // }
          ]
        },
        // {
        //   title: "查询",
        //   closed:true,
        //   list: [{
        //     target: "search",
        //     iconname: "find",
        //     title: "查询音乐"
        //   }]
        // },
        // {
        //   title: "推荐",
        //   closed:true,
        //   list: [{
        //     target: "allplaylist",
        //     iconname: "find",
        //     title: "发现音乐"
        //   }]
        // }
      ],
      select: "",
    }
  },
  mounted() {


  },
  methods: {
    go(target) {
      this.$router.push({
        name: target

      });
    },
    doclick(str) {
      eval(str);

    }

  },
  watch: {
    $route() {
      console.log(this.$route);
      this.select = this.$route.matched && this.$route.matched[0] && this.$route.matched[0].name;


    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-part {
  width: 100%;
  height: 100%;
}

.menublock {
  width: 100%;
  margin-bottom: 5px;
  display: inline-block;
}

.menublock h6 {
  text-align: left;
  margin: 5px;
  color: #4fc08d;
  font-weight: normal;
  cursor: pointer;
}

.menublock.closed h6 {

  color: #666666;
}

.menublock .list {
  height: 30px;
  padding: 5px;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
}

.menublock .listcontiner {
  transition: height 0.5s;

  overflow: hidden;
}

.menublock.closed .listcontiner {
  height: 0px!important;
}

.menublock .list .icon {
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

.menublock .list .selectmark {
  width: 4px;
  height: 20px;
  background: #4fc08d;
  float: left;
  margin-left: -5px;
}

.menublock .list .title {
  cursor: pointer;
  height: 20px;
  display: inline-block;
  float: left;
  margin-left: 5px;
}

.menublock .list .icon.find {
  background-image: url('../assets/music.png');
}

.menublock .list.select {
  background-color: #cccccc;
}

@media screen and (max-width: 750px) {
  .left-part {
    display: none;
  }
}
</style>
