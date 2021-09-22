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

const onInput = (event) => {   
        const searchRes = async => fetchData(event.target.value);
        
        console.log()
}

input.addEventListener('input', debounce(onInput, 500));