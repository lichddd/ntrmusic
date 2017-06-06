var timefilter = {};

timefilter.install = function(Vue) {

	Vue.filter("arrayjoinfilter",(value,code)=>{
    var tempstr="";
    if (value&&value.length&&value.length>0) {
      value.forEach((obj)=>{

        tempstr+=obj[code];

      })
    }
    return tempstr;

  });

}

export default timefilter
