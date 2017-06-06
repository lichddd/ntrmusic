
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'


export default {

	state: {
		count: 0,
		...state
	},
	getters: {
		gggg1: function() {
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
	
	

}