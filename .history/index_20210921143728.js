// ========== Variables from the DOM ==========
const input = document.querySelector('input');

// ========== REUSABLE FUNCTIONS ==========


 
// ==== Debounce ====

const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
}

const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    console.log(response.data);
};




// ==== Fetching Data ====

const onInput = (event) => {   
        fetchData(event.target.value);
}

// ========== INVOKING ==========

input.addEventListener('input', debounce(onInput, 500));