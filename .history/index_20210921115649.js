const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            s: searchTerm
        }
    });

    console.log(response.data);
};


// ========== Setup ==========
const input = document.querySelector('input');

input.addEventListener('input', (event) => {
    set
    fetchData(event.target.value);
})