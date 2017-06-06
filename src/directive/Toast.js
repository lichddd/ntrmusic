import "./toast.css"
var VueToast = {};

VueToast.install = function(Vue) {

	Vue.prototype.toast = function(text) {
		var toast = document.createElement("div");
		toast.setAttribute("role", "toast");
		toast.innerHTML = text;

		document.getElementsByTagName("body")[0].appendChild(toast);
		toast.className = 'toast fade ';
		
		//IE9+
		toast.style.left = 'calc((100% - ' + toast.clientWidth + 'px)/2)';
		toast.style.top = 'calc((100% - ' + toast.clientHeight + 'px)/2)';

		setTimeout(function() {
			toast.className = 'toast fade in';
		}, 0);

		setTimeout(function() {
			toast.className = 'toast fade';
			setTimeout(function() {
				document.getElementsByTagName("body")[0].removeChild(toast);
			}, 500);
		}, 2000);

	}
	
}

export default VueToast