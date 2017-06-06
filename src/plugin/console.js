(function () {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
  
  while (length--) {
    method = methods[length];
    
    // Only stub undefined methods.
    
    if (process.env.NODE_ENV=="development") {
  	if (!console[method]) {
      console[method] = noop;
    }
	}
    else
    {
    		console[method] = noop;
    }
  }
  
  
  
}());