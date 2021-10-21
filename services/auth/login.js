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

  return await response.json();
};

module.exports = login;
