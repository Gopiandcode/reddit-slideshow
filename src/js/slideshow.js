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

var prior_item = -1;
var current_item = -1;
var links_added = 0;

function updateCurrent() {
    if(current_item > data_set.length || current_item === -1) return;
    var data = data_set[current_item];
    console.log("Setting image url to " + data.img + ", current_item=" + current_item);
    $('#slideshow-image').attr("src", data.img);
    $('#slideshow-title').text(data.title);
    $('#slideshow-url').attr("value", data.url);
    if(prior_item !== -1) {
        $('#slideshow-prior-entriesbox a:nth-child('+(prior_item + 1) + ')').css({
            "color": "#000",
            "font-weight": "400"
        });
    }

    $('#slideshow-prior-entriesbox a:nth-child(' + (current_item + 1) + ')').css({
        "color": "#3B41B0",
        "font-weight": "600"
    });

}


function nextImage() {
    prior_item = current_item;
    current_item++;
    if(current_item > data_set.length) {
        if(data_set.length !== 0) {
            current_item = current_item % data_set.length;
        } else {
            current_item = -1;
        }
    }

    updateCurrent();
}

function priorImage() {
    prior_item = current_item;
    current_item--;
    if(current_item < 0) {
        if(prior_item === -1) {
            current_item = -1;
        }
        else current_item = data_set.length-1;
    }

    updateCurrent();
}

function setCurrent(pos) {
    prior_item = current_item;
    current_item = pos;
    updateCurrent();
}

function updateListing(){
    var data_ref = $('#slideshow-prior-entriesbox');
    // First check if the current item has to be updated
    if(current_item === -1 && links_added !== 0) {
        current_item = 0;
        updateCurrent();
    }

    while(links_added !== data_set.length) {
        links_added++;
        var a = $("<a>" + links_added + "</a>");

        a.attr("onClick", "setCurrent(" + (links_added-1) + "); return false;");

        a.appendTo(data_ref);

    }

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