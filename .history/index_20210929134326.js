
// ========== REUSABLE AUTOCOMPLETE CONFIGURATIONS ==========
const autoCompConfig = {
    renderOption(movie) {
        const imgScr = movie.Poster === 'N/A' ? '' : movie.Poster;
                return `
                    <img src="${imgScr}" />
                    ${movie.Title} <br>
                    (${movie.Year})`;
    },
    inputValue(movie) {
        return movie.Title; 
    },
    async fetchData(searchTerm) {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apikey: 'eff3b566',
                s: searchTerm
            }
        });
    
        return response.data.Search;
    }
}

// ========== AUTOCOMPLETE FUNCTION ==========
createAutoComplete({
    ...autoCompConfig,
    root: document.getElementById('left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.getElementById('left-summary'));
    }
});

createAutoComplete({
    ...autoCompConfig,
    root: document.getElementById('right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.getElementById('right-summary'));
    }
});

// ========== AUTOCOMPLETE CALLBACK FUNCTIONS ==========
const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: movie.imdbID
        }
    });
    
    summaryElement.innerHTML = movieTemplate(response.data);

    if
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
    <article class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p> 
    </article> 
    <article class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p> 
    </article> 
    <article class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p> 
    </article> 
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p> 
    </article> 
    <article class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p> 
    </article> 
    
    `;
}