const storeJWT = (jwt) => {
  // Setting jwt in sessionStorage
  sessionStorage.setItem("jwt", jwt);
};

module.exports = storeJWT;
