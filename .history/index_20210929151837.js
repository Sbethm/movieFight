
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
        onMovieSelect(movie, document.getElementById('left-summary'), 'left');
    }
});

createAutoComplete({
    ...autoCompConfig,
    root: document.getElementById('right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.getElementById('right-summary'), 'right');
    }
});

// ========== AUTOCOMPLETE CALLBACK FUNCTIONS ==========

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: movie.imdbID
        }
    });
    
    summaryElement.innerHTML = movieTemplate(response.data);

    if(side === 'left') {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if(leftMovie && rightMovie) {
        runComparison();
    }
};

const runComparison = () => {
    console.log('Time to compare!');
}

const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    const votes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    c

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