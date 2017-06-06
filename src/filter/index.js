import timefilter from './timefilter'
import arrayjoinfilter from './arrayjoinfilter'

export default {
	install: function(Vue) {

		timefilter.install(Vue);
    arrayjoinfilter.install(Vue);

	}

}
