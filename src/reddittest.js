const axios = require('axios');
const twitter = require('twitter');

axios({
    method: 'get',
    url: 'https://www.reddit.com/search.json?q=cats&limit=5&sort=top',
})
.then((result) => {
    console.log(result.data.data.children);
})
.catch(console.error);


