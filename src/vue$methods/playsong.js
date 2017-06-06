import qs from "qs"
import crypto from "@/util/crypto"


var timefilter = {};

timefilter.install = function(Vue) {



  Vue.prototype.$playsong = function(list) {

    var ids=[];
    list.forEach((obj)=>{

      ids.push(obj.id);


    });

    const cryptoreq = crypto({
      "ids": "[" + ids.join(',') + "]",
      "br": 999000,
      "csrf_token": ""
    });
    axios.post('music163/weapi/song/enhance/player/url',
      qs.stringify({
        "params": cryptoreq.params,
        "encSecKey": cryptoreq.encSecKey
      })
    ).then(m => {

      m.data.data.forEach((obj)=>{

          let temp=list.find((value)=>{

            return value.id==obj.id;
          })
          temp.url=obj.url;
          temp.artists=temp.artists||temp.ar;
          temp.album=temp.album||temp.al;
      })
      Vue.playMp3(list);

    });


  };

}

export default timefilter
