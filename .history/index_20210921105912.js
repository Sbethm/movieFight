const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: 
        }
    });

    console.log(response.data);
};

fetchData();