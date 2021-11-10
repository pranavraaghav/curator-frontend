const login = async (username, password) => {
  const data = {
    username: username,
    password: password,
  };
  const response = await fetch("http://curator.navboi.tech/api/user/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if(response.status != 200) {
    throw new Error("Non 200 response code")
  }
  return await response.json();
};

module.exports = login;
