const getCurations = async (jwt) => {
  const response = await fetch(
    "http://curator.navboi.tech/api/user/curations",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )

  return await response.json()
}

export default getCurations
