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
           
            // if(movie.Poster === 'N/A'){
            //     option.innerHTML = `${movie.Title}`;
            // } else {
            //     option.innerHTML = `
            //     <img src="${movie.Poster}" alt="movie poster"/>
            //     ${movie.Title}`;
            // }
            
            resultsWrapper.appendChild(option);
        }
        
}

input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', (event) => {
    if(!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});