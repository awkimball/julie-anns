const cheerio = require('cheerio')
var rp = require('request-promise');
const url = 'https://julieanns.com/flavors/';

(function() {


    var getResponse = function () {

       return rp(url).then(function (body) {

            const $ = cheerio.load(body);
            var flavor = JSON.parse($(".tribe-events-present div.hentry").attr("data-tribejson"));
            var name = flavor.title;
            var desc = flavor.excerpt;
            var desc = desc.replace(RegExp('<[^>]*>', 'g'), '');

            var response = {
                "version":"1.0",
                "response":{
                    "outputSpeech": {
                        "type":"PlainText",
                        "text": "today's flavor is: " + name + ": " + desc

                    }
                }
            };

            return response;

        });

    }

    
    exports.handler = function(event, context, callback) {
    
        console.log('test');
        getResponse().then(function(response) {

            callback(null, response);
    

        }) 
      
        
    };
    

    
}());
