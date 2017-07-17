function toggleOptionsMenu(){var e=document.getElementById("slideshow-options-bar"),t=document.getElementById("slideshow-options-button");open?(e.style["max-height"]="0",e.style["z-index"]="0",t.style.bottom="10px",t.style.transition="bottom .48s",t.style.transitionDelay=".4s",t.style.backgroundImage="url('/static/svg/top.svg')",open=!1):(e.style["max-height"]="50vw",e.style["z-index"]="1",t.style.bottom="35vh",t.style.transition="bottom .4s",t.style.backgroundImage="url('/static/svg/bottom.svg')",open=!0)}function updateCurrent(){if(!(current_item>data_set.length||-1===current_item)){var e=data_set[current_item];console.log(current_item),console.log("Setting image url to "+e.img+", current_item="+current_item),$("#slideshow-image").attr("src",e.img),$("#slideshow-title").text(e.title),$("#slideshow-url").attr("value",e.url),console.log("Removing decoration of "+prior_item+" and adding decoration of "+current_item),-1!==prior_item&&$("#slideshow-prior-entriesbox a:nth-child("+(prior_item+1)+")").css({color:"#000","font-weight":"400"}),$("#slideshow-prior-entriesbox a:nth-child("+(current_item+1)+")").css({color:"#3d5ecc","font-weight":"600"})}}function toggleTitleVisibility(e){console.log("Checked out!"+e.checked),e.checked?$("#slideshow-title").css({"font-size":"1em"}):$("#slideshow-title").css({"font-size":"0"})}function setTimeValue(e){if(e){var t=Number(e);t<0||(delay_time=1e3*t,console.log("Setting delay time to "+delay_time),null!==interval_id&&(clearInterval(interval_id),interval_id=null,interval_id=setInterval(nextImage,delay_time)))}}function toggleAutoForward(e){e.checked?(null!==interval_id&&(clearInterval(interval_id),interval_id=null),interval_id=setInterval(nextImage,delay_time)):(clearInterval(interval_id),interval_id=null),console.log("Int_id: "+interval_id+", checkbox.checked: "+e.checked)}function nextImage(){prior_item=current_item,++current_item>=data_set.length&&(current_item=0!==data_set.length?0:-1),updateCurrent()}function priorImage(){prior_item=current_item,--current_item<0&&(current_item=-1===prior_item?-1:data_set.length-1),updateCurrent()}function setCurrent(e){prior_item=current_item,current_item=e,updateCurrent()}function updateListing(){var e=$("#slideshow-prior-entriesbox");for(-1===current_item&&0!==links_added&&(current_item=0,updateCurrent());links_added!==data_set.length;){links_added++;var t=$("<a>"+links_added+"</a>");t.attr("onClick","setCurrent("+(links_added-1)+"); return false;"),t.appendTo(e)}console.log(JSON.stringify(data_set))}function retrieveData(e){console.log("Url: "+e);var t=/.*\.(png|jpg|jpeg|bmp|tiff|gif|jiff)$/;$.ajax(e+".json?limit=100",{success:function(e){for(var i=0;i<e.data.children.length;i++){console.log("Running "+i);var n=e.data.children[i].data,r={};r.img=n.url,r.title=n.title,r.url="https://www.reddit.com"+n.permalink,t.test(r.img)&&(data_set.push(r),updateListing())}},error:function(e){console.log(e)}})}function load_data(){for(var e=0;e<urls.length;e++)retrieveData(urls[e])}var open=!1,data_set=[],prior_item=-1,current_item=-1,links_added=0,interval_id=null,delay_time=5e3;$(document).ready(function(){load_data()});