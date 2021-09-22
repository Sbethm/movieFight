// ========== Variables for/from the DOM ==========
const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label for="search-input"><b>Search For A Movie</b></label>
    <input type="text" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper =  document.querySelector('.results');

// ========== Fetching Data ==========
const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    if(response.data.Error) {
        return false;
    }
    return response.data.Search;
};

const onInput = async (event) => {   
        const searchRes = await fetchData(event.target.value);

        dropdown.classList.add('is-active');
        
        if(!searchRes) {
            const errorRes = document.createElement("div");
            errorRes.innerHTML = `No Movie Found! Please try again or ~ keep typing :)`;
            resultsWrapper.appendChild(errorRes);
        }

        for(let movie of movies) {
            const option = document.createElement("a");
            option.classList.add
            option.innerHTML = `
            <img src="${movie.Poster}" alt="movie poster">
            <p class="movie-title">${movie.Title}</p>`;
            resultsWrapper.appendChild(option);
        }
}

input.addEventListener('input', debounce(onInput, 500));