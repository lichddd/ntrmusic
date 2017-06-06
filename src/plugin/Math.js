

/**
 * @param {String} objName
 * @param {Int} direction 1/-1
 * @return {Function}
 */
Math.bigOrSmall=function (objName,direction) {
	var direc=direction;
  if (!direc) {
  	direc=1;
  }
  return function (a, b) {
    if (a && b) {
      if (a[objName] && b[objName]) {
        if (a[objName].toString() && b[objName].toString() && a[objName].toString().length > 0 && b[objName].toString().length > 0) {
          return (Number(a[objName].toString().replace(/^0|\D/g, '')) - Number(b[objName].toString().replace(/^0|\D/g, '')))*direc;
        } else {
          return 0;
        }
        
      } else {
        return 0;
      }
    } else {
      return 0;
    }
    
  }
  
}