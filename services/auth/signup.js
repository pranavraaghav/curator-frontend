const signup = async (email, username, password) => {
  const data = {
    email: email,
    username: username,
    password: password,
  };
  const response = await fetch("http://curator.navboi.tech/api/user/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  return response.json();
};

module.exports = signup;
