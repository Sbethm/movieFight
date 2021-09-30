
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
        runComparison(leftMovie, rightMovie);
    }
};

const runComparison = (left, right) => {
    leftSideStats = document.querySelectorAll('#left-summary .notification');
    rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index)) => {
        let rightStat = rightSideStats[inde] 
    }

}

const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const rating = parseFloat(movieDetail.imdbRating);
    const votes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word)=> {
        const value = parseInt(word);

        if(isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }

    }, 0);
   

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
    <article data-value="${awards}" class="notification is-primary">
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p> 
    </article> 
    <article data-value="${dollars}" class="notification is-primary">
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p> 
    </article> 
    <article data-value="${metascore}" class="notification is-primary">
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p> 
    </article> 
    <article data-value="${rating}" class="notification is-primary">
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Rating</p> 
    </article> 
    <article data-value="${votes}" class="notification is-primary">
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p> 
    </article> 
    
    `;
}