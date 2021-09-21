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

let timeOutID;

const onInput = () => {
    setTimeout(() => {
        fetchData(event.target.value)}, 500)
}

input.addEventListener('input', (event) => 
    onInput();
)