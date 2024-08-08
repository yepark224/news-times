import config from './apikey.js'
const API_KEY= config.MY_API_KEY

let news = []

const getLatestNews = async ()=>{
    //new URL 은 url instance를 만들어 준다. 객체를 만들어줌
    const url = new URL (`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`) ;
    
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles
    console.log("dddd",news);
};

getLatestNews();


/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

