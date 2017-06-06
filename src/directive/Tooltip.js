import "./tooltip.css"
import ispc from  "../util/ispc"
var VueTooltip={};



VueTooltip.install=function(Vue){


	Vue.directive('vue-tooltip', {


      bind: function (el,binding) {
				if (!ispc()) {
						return ;
				}


      	var vm=this;



    var tooltipcolor = "#4fc08d";
    var tooltiptextcolor = "#ffffff";
    var text = '放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔放假科技馆加热管居然看过王嘉尔';
    text=binding.value;

    var classname='tooltip top fade';

     	var temple = '<div style="border-top-color:' + tooltipcolor + '" class="tooltip-arrow"></div><div style="font-size:15px;color:' + tooltiptextcolor + ';background-color:' + tooltipcolor + '" class="tooltip-inner">'+text+'</div>'
      	el.addEventListener("mouseover",function(e){




      		var tooltip=document.createElement("div");
      		tooltip.setAttribute("role","tooltip");
      		tooltip.innerHTML=temple;


      		document.getElementsByTagName("body")[0].appendChild(tooltip);
      		tooltip.className=classname;

      		var left=el.getBoundingClientRect().left+(el.getBoundingClientRect().width/2)-(tooltip.clientWidth/2);


      		if (left<0) {
      			tooltip.getElementsByTagName('div')[0].style.left=(tooltip.clientWidth/2)+left>8?tooltip.getElementsByTagName('div')[0].style.left:"8px";
      			left=0;
      		}

      		var top=el.getBoundingClientRect().top-tooltip.clientHeight;

      		if (top<0) {
      			top=el.getBoundingClientRect().top+el.getBoundingClientRect().height;
      			tooltip.getElementsByTagName('div')[0].style.borderTopColor='none';
      			tooltip.getElementsByTagName('div')[0].style.borderBottomColor=tooltipcolor;
      			classname='tooltip bottom fade';
      			tooltip.className=classname;
      		}



      		tooltip.style.left=left+"px";
      		tooltip.style.top=top+"px";

      		setTimeout(function () {
      			tooltip.className=classname+' in';
      		},0);


          var out=function(e){
            var temptooltip=tooltip;

            if (temptooltip) {
                temptooltip.className=classname;
                setTimeout(function () {

              document.getElementsByTagName("body")[0].removeChild(temptooltip);
            },500);

            }

            el.removeEventListener("mouseout",out);
            el.removeEventListener("click",out);

          };
          el.addEventListener("mouseout",out);
          el.addEventListener("click",out);



      	})




      }
    });

}

export default VueTooltip
