const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        apikey
    });
};
