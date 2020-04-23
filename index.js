const Twit = require('twit');
const config = require('./config');

let t = new Twit(config);

const q = {
    q: 'Coronavirus',
    count: 1,
    result_type: 'recent',
    lang: 'en'
}

function tweetIt(){
    t.get('search/tweets', q, handleTweet);
}

function handleTweet(err, data, response){
    if(err){
        console.log("Something went wrong!");
    }else{
        let statuses = data.statuses;

        let query = '';
        for(let i=0; i<statuses.length; i++){
            query = query + `@${statuses[i].user.screen_name}: ${statuses[i].text}\n`;
        }

        t.post('statuses/update', { status: query }, function(err, data, response) {
            if(err){
                console.log("Something went wrong!");
                console.log(err);
            }else{
                console.log(data);
                console.log("It worked!");
            }
          })
    }
}
tweetIt();
setInterval(tweetIt, 1000*60*15);
