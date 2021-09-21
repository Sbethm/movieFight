const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    console.log(response.data);
};


// ========== Debouncing Search Inp ==========
const input = document.querySelector('input');

let timeoutId;
const onInput = (event) => {   
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        fetchData(event.target.value)}, 500)
}

input.addEventListener('input', onInput);