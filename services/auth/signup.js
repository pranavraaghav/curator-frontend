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

  if(response.status != 201) {
    throw new Error("Non 201 response code")
  }
  return response.json();
};

module.exports = signup;
