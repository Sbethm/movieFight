// ========== Variables from the DOM ==========
const input = document.querySelector('input');

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

const onInput = async (event) => {   
        const searchRes = await fetchData(event.target.value);
        
        console.log(searchRes);

        for(let movie of searchRes) {
            const movieRes = document.createElement("div");
            movieRes.innerHTML = `${movie.Poster} ${movie.Title}`;
            document.getElementById("search-results").appendChild(movieRes);
        }
}

input.addEventListener('input', debounce(onInput, 500));