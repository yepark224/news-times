import config from "./apikey.js";
const API_KEY = config.MY_API_KEY;

let newsList = [];
let url = new URL(
  `https://newsapi.org/v2/everything?q=earthquake&apiKey=${API_KEY}`
);
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page",page); // => &page = page
    url.searchParams.set("pageSize",pageSize);
    const response = await fetch(url); // 호출
    const data = await response.json();
    // newsList = data.articles;
    console.log(response.status);
    console.log(data);
    // render();
    if (response.status === 200) {
      if (data.articles.length ===0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  //new URL 은 url instance를 만들어 준다. 객체를 만들어줌
  url = new URL(
    `https://newsapi.org/v2/everything?q=earthquake&apiKey=${API_KEY}`
  );

  getNews();
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

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea) {
    // inputArea가 null이 아닌 경우에만 실행
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  } else {
    console.error("Element with id 'input-area' not found");
  }
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

//getNewsByKeyword();

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img
              class="news-img-size"
              src=${
                news.urlToImage ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
              }
              alt=""
            />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
            <div>${news.source.name} * ${news.publishedAt}</div>
          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML =
  `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML=errorHTML;
};

const paginationRender = () => {
  //totalResult,
  //page
  //pageSize
  //groupSize
  //totalpages
  const totalPages = Math.ceil(totalResults / pageSize)
  //pageGroup
  const pageGroup = Math.ceil(page/groupSize);
  //lastPage
  const lastPage = pageGroup * groupSize;
  // 마지막 페이지 그룹이 그룹 사이즈보다 작다? lastpage = totalpage
  if(lastPage> totalPages){
    lastPage=totalPages
  }
  //firstPage
  const firstPage = lastPage - (groupSize-1) <= 0 ? 1 : lastPage - (groupSize-1);
  
  let paginationHTML = `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link" href="#">Previous</a></li>`
  
  for(let i=firstPage; i<=lastPage;i++){
    paginationHTML+=`<li class="page-item ${i===page? "active":""}" onclick="moveToPage(${i})"><a href="#" class="page-link">${i}</a></li>`
  }

  paginationHTML+= `<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link" href="#">Next</a></li>`

  document.querySelector(".pagination").innerHTML = paginationHTML
//   <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav>
}

const moveToPage = (pageNum) =>{
  console.log("movetopage", pageNum);
  page = pageNum;
  getNews();
}

window.openNav = openNav;
window.closeNav = closeNav;
window.openSearchBox = openSearchBox;
window.getNewsByKeyword = getNewsByKeyword;
window.moveToPage = moveToPage;
