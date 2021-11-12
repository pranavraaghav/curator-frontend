export function getJwt() {
  const jwt = sessionStorage.getItem("jwt")
  if (jwt) return jwt
  else throw new Error("JWT does not exist in sessionStorage")
}
