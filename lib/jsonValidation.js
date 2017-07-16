module.exports = {
    'sanitize': function(urls) {
        var result = [];
        var html_expr = /^https?:\/\/www.reddit.com\/r\/[a-zA-Z0-9]+\/((hot|new|top|rising|gilded|controversial|ads)\/)?/;
        var http_excluded_expr = /^www.reddit.com\/r\/[a-zA-Z0-9]+\/((hot|new|top|rising|gilded|controversial|ads)\/)?/ 
        var r_slash_expr = /r\/[a-zA-Z0-9]+\/((hot|new|top|rising|gilded|controversial|ads)\/)?/; 
        var r_slash_sans_final_expr = /r\/(([a-zA-Z0-9]+\/((hot|new|top|rising|gilded|controversial|ads)))|(([a-zA-Z0-9]+)))/

        for(var i = 0; i<Math.min(urls.length, 100);i++) {
           if(html_expr.test(urls[i])) {
               result.push(html_expr.exec(urls[i])[0]);
           } else if (http_excluded_expr.test(urls[i])){
                let inp = http_excluded_expr.exec(urls[i])[0];
                inp = "https://" + inp;
                result.push(inp);
           } else if(r_slash_expr.test(urls[i])) {
               let inp = r_slash_expr.exec(urls[i])[0];
               inp = "https://www.reddit.com/" + inp;
               result.push(inp);
           } else if(r_slash_sans_final_expr.test(urls[i])) {
               let inp = r_slash_sans_final_expr.exec(urls[i])[0];
               inp = "https://www.reddit.com/" +  inp + "/"
               result.push(inp);
           }
        }

        return result;
    },
    'parseParams': function(params) {
        var subreddit = params.subreddit;
        var specifier = params.specifier;

        if(!subreddit) 
            return false;

        var url = "https://www.reddit.com/r/" + subreddit + "/";

        if(specifier) {
            url += specifier + "/";
        }

        return url;
    }
}