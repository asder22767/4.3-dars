const slicedMovies = movies.slice(0, 30);

const elResultInNumber = document.querySelector("#result--number");
elResultInNumber.textContent = slicedMovies.length;

const elMoviesList = document.querySelector("#list");
const elTemplateCard = document.querySelector("#template");
elMoviesList.innerHTML = null;

let newMoviesFolder = slicedMovies.map((item) => {
    return {
        title: item.Title.toString(),
        publishingDate: item.movie_year,
        categories: item.Categories,
        movieAbout: item.summary,
        ytid: item.ytid,
        imageUrl: `https://img.youtube.com/vi/${item.ytid}/sddefault.jpg`,
        trailerUrl: `https://www.youtube.com/watch?v=${item.ytid}`,
        imdbRating: item.imdb_rating
    }
});

const elBookmarkList = document.querySelector("#bookmark-list");
const elBookmarkItem = document.querySelector(".bookmark-item");
elBookmarkList.innerHTML = null;

function filmRender(films) {
    for (const item of newMoviesFolder) {  
        const card = elTemplateCard.cloneNode(true);
        const bookmark = elBookmarkItem.cloneNode(true);
        
        const elImgForMovie = card.querySelector(".img");
        elImgForMovie.src = item.imageUrl;
        
        const elTitleOfMovie = card.querySelector(".title");
        elTitleOfMovie.textContent = item.title;
        
        const elPublishingDate = card.querySelector(".date");
        elPublishingDate.textContent = item.publishingDate;
        
        const elRanking = card.querySelector(".rating");
        elRanking.textContent = item.imdbRating;
        
        const elAHref = card.querySelector(".trailer-link");
        elAHref.href = item.trailerUrl;
        
        const elBookmarkBtn = card.querySelector(".bookmark");
        const elDeleteBtn = bookmark.querySelector(".delete-btn");
        elBookmarkBtn.dataset.id = item.ytid;
        
        elBookmarkBtn.addEventListener("click", () => {
            bookmark.dataset.id = item.ytid;
            const bookmarkId = bookmark.dataset.id;
            console.log(item.ytid);
            
            const elTitle = bookmark.querySelector(".bookmark-title");
            elTitle.textContent = item.title;   
            
            elDeleteBtn.dataset.id = item.ytid;
            const delId = elDeleteBtn.dataset.id;
            
            elBookmarkList.appendChild(bookmark);
            
            elDeleteBtn.addEventListener("click", (evt) => {
                if (delId == bookmarkId) {
                    bookmark.remove()
                }
            });
        });    
        
        const newLi = document.createElement("li");
        newLi.classList.add("col");
        newLi.appendChild(card);
        
        newLi.appendChild(card);
        elMoviesList.appendChild(newLi);
    };
}

filmRender(slicedMovies)
