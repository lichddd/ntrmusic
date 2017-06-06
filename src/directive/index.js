import tooltip from './Tooltip'
import toast from './Toast'

export default {
	install: function(Vue) {

		tooltip.install(Vue);
		toast.install(Vue);

	}

}