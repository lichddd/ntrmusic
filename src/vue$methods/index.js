import arraybyfilter from './arraybyfilter'
import playsong from './playsong'
export default {
	install: function(Vue) {

		arraybyfilter.install(Vue);
playsong.install(Vue);
	}

}
