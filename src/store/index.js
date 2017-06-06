import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

Vue.use(Vuex);

export default new Vuex.Store({

	state: {
		count: 0,
		progressing:true,
		...state
	},
	getters: {
		ggg1: function() {
			return 11111;
		},
		...getters
	},
	mutations: {
		increment: function(state) {
			state.count++
		},
		...mutations
	},
	actions: {
		increment:function (context) {
    			context.commit('increment')
  	},
		...actions
	},
	modules:{
		...modules
		
	}
	

})