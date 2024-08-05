import config from ".apiKey"
const API_KEY= config.MY_API_KEY
const getLatestNews = ()=>{
    const url = new URL (`https://newsapi.org/v2/top-headlines?country=us&apiKey= ${API_KEY}`) ;
    console.log("uuu", url);
}

getLatestNews();


