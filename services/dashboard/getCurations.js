const getCurations = async (jwt) => {
    const response = await fetch("http://curator.navboi.tech/api/user/curations", {
        method : "POST",
        headers: {
            "Authorization" : `Bearer ${jwt}`,
            "Content-type": "application/json; charset=UTF-8",
          },
    });

    return await response.json();
};

export default getCurations;