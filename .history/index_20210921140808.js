const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    console.log(response.data);
};


// ========== Debouncing Input- Search Results ==========
const input = document.querySelector('input');

// ========== REDebouncing Input ==========

const onInput = (inputValue) => {   
    if(debouceId) {
        clearTimeout(debouceId);
    }
    debouceId = setTimeout(() => {
        fetchData(event.target.value)}, 500)
}

// ========== Debouncing Input- Search Results ==========
let timeoutId;
const onInput = (event) => {   
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value)}, 500)
}

input.addEventListener('input', onInput);