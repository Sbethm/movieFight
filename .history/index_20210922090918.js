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
        const searchRes = fetchData(event.target.value);
        
        await console.log(searchRes);
}

input.addEventListener('input', debounce(onInput, 500));