import Vue from 'vue'
import Router from 'vue-router'

import router1 from './router1'
import beforeEach from './beforeEach'
import afterEach from './afterEach'
//import Hello from '@/components/Hello'
//var tooltip = require("@/components/tooltip");
//
//console.log(tooltip);

//import App from '@/App'
Vue.use(Router)

//const Hello = resolve => require(['@/views/Hello.vue'], resolve)

//console.log(Hello);
var a="";
let router = new Router({
	routes: [{
			path: '/hello',
			name: 'Hello',
			component:
				()=>import('@/views/Hello')
//				() => {
//
//				try{
//					window.vm.progressing=true;
//				}catch(e){
//					//TODO handle the exception
//				}
//				var temp =
//					import('@/views/Hello');
//
//					temp.then(function(r) {
//						try{
//					window.vm.progressing=false;
//				}catch(e){
//					//TODO handle the exception
//				}
//					});
//
//
//				return temp;
//			},
			//			component: () => System.import('@/views/Hello'),
			//    component: Hello,

		},
		{
			path: '/login',
			name: 'login',
			component:
				()=>import('@/views/login')
		},


{ path: '/', redirect: '/home' },
    {
			path: '/home',
			name: 'home',
			component:
				()=>import('@/views/home'),
      children: [
        { path: '/home', redirect: '/home/newmusic/' },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          name:'osusume',
          path: 'osusume',
          component: ()=>import('@/views/osusume'),
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          name:'newmusic',
          path: 'newmusic/:album?/:type?',
          component: ()=>import('@/views/newmusic'),
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          name:'allplaylist',
          path: 'allplaylist/:type?',
          component: ()=>import('@/views/allplaylist'),
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          name:'rank',
          path: 'rank/:type?',
          component: ()=>import('@/views/rank'),
        }
      ]


		},

    {
			path: '/search/:type/:str',
			name: 'search',
			component:
				()=>import('@/views/search')
		},

    {
			path: '/playlist/:id',
			name: 'playlist',
			component:
				()=>import('@/views/playlist')
		},
    {
			path: '/artist/:id',
			name: 'artist',
			component:
				()=>import('@/views/artist')
		},
    {
			path: '/album/:id',
			name: 'album',
			component:
				()=>import('@/views/album')
		},
    {
			path: '/song/:id',
			name: 'song',
			component:
				()=>import('@/views/song')
		},
    //

     { path: '*', redirect: '/' },
		...router1
	]
});
router.beforeEach(beforeEach);
router.afterEach(afterEach);
export default router;
