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

// ==== Debounce ====


const onInput = (event) => {   
        fetchData(event.target.value);
}

// ========== Debouncing Input- Search Results ==========

input.addEventListener('input', debounce(onInput, 500));