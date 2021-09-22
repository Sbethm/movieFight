// ========== Variables from the DOM ==========
const searchBox = document.querySelector('.autocomplete');
searchBox.innerHTML = `
    <label for="search-input"><b>Search For A Movie</b></label>
    <input type="text" class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
    </div>
`;

const input = document.querySelector('input');
const dropDownMenu =  document.querySelector('.dropdown-content');

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
        
        if(!searchRes) {
            const errorRes = document.createElement("li");
            errorRes.innerHTML = `No Movie Found! Please try again or ~ keep typing :)`;
            dropDownMenu.appendChild(errorRes);
        }

        for(let movie of searchRes) {
            const movieLink = document.createElement("a");
            movieLink.innerHTML = `
            <img src="${movie.Poster}" alt="movie poster">
            <p class="movie-title">${movie.Title}</p>`;
            dropDownMenu.appendChild(movieLink);
        }
}

input.addEventListener('input', debounce(onInput, 500));