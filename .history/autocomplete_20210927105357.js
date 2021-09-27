const createAutoComplete = ({ root }) => {
    console.log(root);
    root.innerHTML = `
      <label><b>Search For a Movie</b></label>
      <input class="input" />
      <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
      </div>
    `;
    
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    
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
    
            for(let item of searchRes) {
                const option = document.createElement("a");
                option.classList.add('dropdown-item');
    
                renderOption(option);
                // const imgScr = movie.Poster === 'N/A' ? '' : movie.Poster;
                // option.innerHTML = `
                //     <img src="${imgScr}" />
                //     ${movie.Title}`;
               
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

};