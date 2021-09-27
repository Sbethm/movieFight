// ========== Fetching Data ==========
const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    return response.data.Search;
};

// ========== Variables for/from the DOM ==========
const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For a Movie</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const choice2 = document.querySelector('.choice--two');

// ========== Setup ==========
const onInput = async (event) => {   
        const searchRes = await fetchData(event.target.value);

        if(!searchRes){
            dropdown.classList.remove('is-active');
            return;
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');

        for(let movie of searchRes) {
            const option = document.createElement("a");
            option.classList.add('dropdown-item');

            const imgScr = movie.Poster === 'N/A' ? '' : movie.Poster;
            option.innerHTML = `
                <img src="${imgScr}" />
                ${movie.Title}`;
           
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = movie.Title;
                
                onMovieSelect(movie);
            })
            
            resultsWrapper.appendChild(option);
        }
}


input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', (event) => {
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});


const onMovieSelect = async (movie) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: movie.imdbID
        }
    });
    
    const choice1 = document.querySelector('.choice--one');
    choice1.innerHTML = movieTemplate
}

const movieTemplate = (movieDetail) => {
    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    
    `;
}