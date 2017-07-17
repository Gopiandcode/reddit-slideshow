var open = false;
var data_set = [];

function toggleOptionsMenu() {
    var options = document.getElementById('slideshow-options-bar');
    var button = document.getElementById('slideshow-options-button');
    if (open) {
        options.style["max-height"] = "0"
        options.style["z-index"] = "0"
        button.style.bottom = "10px"
        button.style.transition = "bottom .48s"
        button.style.transitionDelay = ".4s"
        button.style.backgroundImage = "url('/svg/top.svg')"
        open = false;
    } else {
        options.style["max-height"] = "50vw"
        options.style["z-index"] = "1"
        button.style.bottom = "35vh"
        button.style.transition = "bottom .4s"
        button.style.backgroundImage = "url('/svg/bottom.svg')"

        open = true;
    }
}

var prior_item = -1;
var current_item = -1;
var links_added = 0;
var interval_id = null;
var delay_time = 5000;

function updateCurrent() {
    if (current_item > data_set.length || current_item === -1) return;
    var data = data_set[current_item];
    console.log(JSON.stringify(data));
    $('#slideshow-image')
        .attr("src", data.img);
    $('#slideshow-title')
        .text(data.title);
    $('#slideshow-url')
        .attr("value", data.url);
    if (prior_item !== -1) {
        $('#slideshow-prior-entriesbox a:nth-child(' + (prior_item + 1) + ')')
            .css({
                "color": "#000",
                "font-weight": "400"
            });
    }

    $('#slideshow-prior-entriesbox a:nth-child(' + (current_item + 1) + ')')
        .css({
            "color": "#3d5ecc",
            "font-weight": "600"
        });


}

function toggleTitleVisibility(checkbox) {
    if (!checkbox.checked) {
        $('#slideshow-title')
            .css({
                "font-size": "0"
            })
    } else {
        $('#slideshow-title')
            .css({
                "font-size": "1em"
            })
    }
}

function setTimeValue(value) {
    if (!value) return;
    var time_val = Number(value);
    if (time_val < 0) return;
    delay_time = time_val * 1000;
    if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
        interval_id = setInterval(nextImage, delay_time);
    }
}

function toggleAutoForward(checkbox) {
    if (checkbox.checked) {
        if (interval_id !== null) {
            clearInterval(interval_id);
            interval_id = null;
        }
        interval_id = setInterval(nextImage, delay_time);
    } else {
        clearInterval(interval_id);
        interval_id = null;
    }

}

function nextImage() {
    prior_item = current_item;
    current_item++;
    if (current_item >= data_set.length) {
        if (data_set.length !== 0) {
            current_item = 0;
        } else {
            current_item = -1;
        }
    }

    updateCurrent();
}

function priorImage() {
    prior_item = current_item;
    current_item--;
    if (current_item < 0) {
        if (prior_item === -1) {
            current_item = -1;
        } else current_item = data_set.length - 1;
    }

    updateCurrent();
}

function setCurrent(pos) {
    prior_item = current_item;
    current_item = pos;
    updateCurrent();
}

function updateListing() {
    var data_ref = $('#slideshow-prior-entriesbox');
    // First check if the current item has to be updated
    if (current_item === -1 && links_added !== 0) {
        current_item = 0;
        updateCurrent();
    }

    while (links_added !== data_set.length) {
        links_added++;
        var a = $("<a>" + links_added + "</a>");

        a.attr("onClick", "setCurrent(" + (links_added - 1) + "); return false;");

        a.appendTo(data_ref);

    }

}

function retrieveData(url) {
    console.log("Url: " + url);
    var image_url = /.*\.(png|jpg|jpeg|bmp|tiff|gif|jiff|gifv|webm)$/;
    var imgur_link = /(?:https?:\/\/)?(?:[a-zA-Z]\.)?imgur\.com\/(?:((?:[a-zA-Z]|(?:gallery)))\/)?([a-zA-Z0-9]*)/;
    var gyfcat_link = /(?:https?:\/\/)?gfycat.com\/([a-zA-Z0-9]*)/;


    $.ajax(
        url + ".json?limit=100", {
            success: function (response) {
                return function() {
                for (var i = 0; i < response.data.children.length; i++) {
                    var a = function() {
                    var api_data = response.data.children[i].data;
                    var data = {};
                    data.img = api_data.url;
                    data.title = api_data.title
                    data.url = "https://www.reddit.com" + api_data.permalink;

                    if (image_url.test(data.img)) {

                        data_set.push(data);
                        updateListing();
                    } else if (imgur_link.test(data.img)) {
                        var matched_data = imgur_link.exec(data.img);
                        var test;
                        if(!matched_data[1]) {
                            // just a normal imgur link
                            test = function() {
                                var imgur_id = matched_data[2];
                                var image_link = "https://api.imgur.com/3/image/" + imgur_id;
                                var gallery_link = "https://api.imgur.com/3/gallery/" + imgur_id;
                                var album_link = "https://api.imgur.com/3/album/" + imgur_id;
                                var headers = {
                                    'Authorization': 'Client-ID ' + client_id
                                };

                            $.ajax(
                                image_link,
                                {
                                    headers: headers,
                                    method: 'GET',
                                    dataType: 'json',
                                    success: function (resp) {
                                            // if it works, we get a image item -  parse
                                            var d_imgur = resp.data.link;
                                            data.img = d_imgur;
                                            data_set.push(data);
                                            updateListing();
                                    }
                                }
                            );

                           }();
                        } else if(matched_data[1] === 'a') {
                            // album link
                           test = function() {
                                var imgur_id = matched_data[2];
                                var album_link = "https://api.imgur.com/3/album/" + imgur_id;
                                var headers = {
                                    'Authorization': 'Client-ID ' + client_id
                                };

                                        $.ajax(
                                            album_link, {
                                                headers: headers,
                                                method: 'GET',
                                                dataType: 'json',
                                                success: function (resp) {
                                                    // image setsi recieved, time to work
                                                    var images = resp.data.images;

                                                    for (var i = 0; i < images.length; i++) {

                                                        var d_img = images[i].link;
                                                        var image = {};
                                                        image.img = d_img;
                                                        image.title = data.title;
                                                        image.url = data.url;

                                                        data_set.push(image);
                                                        updateListing();
                                                    }
                                                }
                                            }
                                        );

                           }();
                        } else if(matched_data[1] === 'gallery') {
                            // gallery link
                           test = function() {
                                var imgur_id = matched_data[2];
                                var gallery_link = "https://api.imgur.com/3/gallery/" + imgur_id;
                                var headers = {
                                    'Authorization': 'Client-ID ' + client_id
                                };
                                $.ajax(
                                    gallery_link, {
                                        headers: headers,
                                        method: 'GET',
                                        dataType: 'json',
                                        success: function (resp) {
                                            // image setsi recieved, time to work
                                            var images = resp.data.images;

                                            for (var i = 0; i < images.length; i++) {

                                                var d_img = images[i].link;
                                                var image = {};
                                                image.img = d_img;
                                                image.title = data.title;
                                                image.url = data.url;

                                                data_set.push(image);
                                                updateListing();
                                            }
                                        }
                                    }
                                );

                           }();
                        }
                        
                   } else if(gyfcat_link.test(data.img)) {
                       var c = function() {
                        var headers = {
                                    'Authorization': 'Client-ID ' + client_id
                        };
                        var gfy_name = gyfcat_link.exec(data.img)[1];
                        var gfy_url = "https://gfycat.com/cajax/get/" + gfy_name;
                        $.ajax(gfy_url, {
                            method: 'GET',
                            dataType: 'json',
                            success: function(resp) {
                                var url = resp.gfyItem.gifUrl;
                                data.img = url;
                                data_set.push(data);
                                updateListing();
                            }

                        })
                       }();

                   }

                }();}}();
            },
            error: function (err, alt, more) {
                console.log("Got an error");
                console.log(err);
                console.log(alt);
                console.log(more);
            }

        }
    )

}

function load_data() {
    for (var i = 0; i < urls.length; i++) {
        retrieveData(urls[i]);
    }
}

$(document)
    .ready(function () {
        load_data();
    });