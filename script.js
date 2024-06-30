const accessKey= "seKivQK6-PnzDS-7GhgQ1fKqKdyN0R789CjiCTxNUtQ"

const formE1 = document.querySelector("form")
const searchInputEl = document.getElementById("search-input");

const seachResultsE1 = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData="";
let page = 1;

async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const responce = await fetch(url);
    const data = await responce.json();
    if(page==1){
        seachResultsE1.innerHTML = "";
    }
    const results = data.results;
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        seachResultsE1.appendChild(imageWrapper);
      });
    
      page++
    
    if (page>1) {
        showMoreButton.style.display = "block";
    }
}
formE1.addEventListener("submit", (event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
});

showMoreButton.addEventListener("click", ()=>{
    searchImages();
    
})