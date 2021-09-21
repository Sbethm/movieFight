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

    console.log(response.data);
};


const onInput = (event) => {   
        fetchData(event.target.value);
}

// ========== INVOKING ==========

input.addEventListener('input', debounce(onInput, 500));