const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: 'Harry Potter'
        }
    });

    console.log(response.data);
};

fetchData();