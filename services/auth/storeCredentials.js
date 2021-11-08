const storeCredentials = ( jwt, username ) => {
  // Setting jwt in sessionStorage
  sessionStorage.setItem("jwt", jwt);

  sessionStorage.setItem("username", username);
};

export default storeCredentials;
