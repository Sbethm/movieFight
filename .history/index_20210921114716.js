const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: 'eff3b566',
            i: "tt0241527"
        }
    });

    console.log(response.data);
};

const input = 