let searchlist = [
  {
    type: "1",
    limit: 100,
    name: "单曲",
    select: false,
    resparams: {
      numstr: "songCount",
      liststr: "songs"
    },
    list: [],
    count: 0
  }, {
    type: "10",
    limit: 20,
    name: "专辑",
    select: false,
    resparams: {
      numstr: "albumCount",
      liststr: "albums"
    },
    list: [],
    count: 0
  }, {
    type: "100",
    limit: 20,
    name: "歌手",
    select: false,
    resparams: {
      numstr: "artistCount",
      liststr: "artists"
    },
    list: [],
    count: 0
  }, {
    type: "1000",
    limit: 20,
    name: "歌单",
    select: false,
    resparams: {
      numstr: "playlistCount",
      liststr: "playlists"
    },
    list: [],
    count: 0
  }
  // ,
  // {
  //   type: "1004",
  //   limit: 20,
  //   name: "MV",
  //   select: false,
  //   resparams: {
  //     numstr: "mvCount",
  //     liststr: "mvs"
  //   },
  //   list: [],
  //   count: 0
  // }
]

let ranklist = {
  rank1: [
    {
      code: "3779629",
      name: " 云音乐新歌榜",
      picUrl: "",
      bkc: "#5ec2ca",
      time: 0,
      list: []
    }, {
      code: "3778678",
      name: " 云音乐热歌榜",
      picUrl: "",
      bkc: "#c88160",
      time: 0,
      list: []
    }, {
      code: "2884035",
      name: " 网易原创歌曲榜",
      picUrl: "",
      bkc: "#d06080",
      time: 0,
      list: []
    }, {
      code: "19723756",
      name: " 云音乐飙升榜",
      picUrl: "",
      bkc: "#819ee8",
      time: 0,
      list: []
    }, {
      code: "10520166",
      name: " 云音乐电音榜",
      picUrl: "",
      bkc: "#333333",
      time: 0,
      list: []
    }
  ],
  rank2: [
    {
      code: "180106",
      name: " UK排行榜周榜",
      picUrl: "",
      count: 0
    }, {
      code: "60198",
      name: " 美国Billboard周榜",
      picUrl: "",
      count: 0
    }, {
      code: "21845217",
      name: " KTV嗨榜",
      picUrl: "",
      count: 0
    }, {
      code: "11641012",
      name: " iTunes榜",
      picUrl: "",
      count: 0
    }, {
      code: "120001",
      name: " Hit FM Top榜",
      picUrl: "",
      count: 0
    }, {
      code: "60131",
      name: " 日本Oricon周榜",
      picUrl: "",
      count: 0
    }, {
      code: "3733003",
      name: " 韩国Melon排行榜周榜",
      picUrl: "",
      count: 0
    }, {
      code: "60255",
      name: " 韩国Mnet排行榜周榜",
      picUrl: "",
      count: 0
    }, {
      code: "46772709",
      name: " 韩国Melon原声周榜",
      picUrl: "",
      count: 0
    }, {
      code: "112504",
      name: " 中国TOP排行榜(港台榜)",
      picUrl: "",
      count: 0
    }, {
      code: "64016",
      name: " 中国TOP排行榜(内地榜)",
      picUrl: "",
      count: 0
    }, {
      code: "10169002",
      name: " 香港电台中文歌曲龙虎榜",
      picUrl: "",
      count: 0
    }, {
      code: "4395559",
      name: " 华语金曲榜",
      picUrl: "",
      count: 0
    }, {
      code: "1899724",
      name: " 中国嘻哈榜",
      picUrl: "",
      count: 0
    }, {
      code: "27135204",
      name: " 法国 NRJ EuroHot 30周榜",
      picUrl: "",
      count: 0
    }, {
      code: "112463",
      name: " 台湾Hito排行榜",
      picUrl: "",
      count: 0
    }, {
      code: "3812895",
      name: " Beatport全球电子舞曲榜",
      picUrl: "",
      count: 0
    }
  ]
}
export default {
  searchlist,
  ranklist
};
