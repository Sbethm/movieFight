const fetchData = async () => {
    const response = await axios.get("http://www.omdbapi.com/", {
        paraapikey: eff3b566,
        s: 'Harry Potter'
    });
};
