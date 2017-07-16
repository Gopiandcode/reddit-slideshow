var open = false;
var data_set = [];

function toggleOptionsMenu() {
    var options = document.getElementById('slideshow-options-bar');
    var button = document.getElementById('slideshow-options-button');
    if(open) {
        options.style["max-height"]="0"
        button.style.bottom = "10px"
        button.style.transition = "bottom .48s"
        button.style.transitionDelay = ".4s"
        button.style.backgroundImage = "url('/static/svg/top.svg')"
        open = false;
    } else {
        options.style["max-height"]="50vw"
        button.style.bottom = "35vh"
        button.style.transition = "bottom .4s"
        button.style.backgroundImage = "url('/static/svg/bottom.svg')"
        open = true;
    }
}

var current_item = -1;
var links_added = 0;

function updateListing(){

    console.log(JSON.stringify(data_set));
}

function retrieveData(url) {
    console.log("Url: " + url);
    var image_url = /.*\.(png|jpg|jpeg|bmp|tiff|gif|jiff)$/;


    $.ajax(
        url + ".json?limit=100",
        {
            success: function(response) {
                for(var i = 0; i<response.data.children.length; i++) {
                    console.log("Running " + i);
                  var api_data = response.data.children[i].data;
                  var data = {};
                  data.img =   api_data.url;
                  data.title = api_data.title
                  data.url  = "https://www.reddit.com" + api_data.permalink;

                    if(image_url.test(data.img)) {
                        
                     data_set.push(data);
                     updateListing();
                    } 
                 
                }
            },
            error: function(err) {
                console.log(err);
            }

        }
    )
    
}

function load_data() {
    for(var i = 0; i<urls.length; i++) {
        retrieveData(urls[i]);
    }
}

$(document).ready(function() {
    load_data();
});