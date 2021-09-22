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
        const searchRes = fetchData(event.target.value);
}

input.addEventListener('input', debounce(onInput, 500));