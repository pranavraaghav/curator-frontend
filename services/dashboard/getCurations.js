import axios from "axios"

export default async function getCurations(jwt) {
  if (!jwt) {
    console.error("getCurations called without jwt")
    return
  }

  try {
    const response = await axios.get(
      "http://curator.navboi.tech/api/user/curations",
      { headers: { Authorization: "Bearer " + jwt } }
    )
    return response.data
  } catch (error) {
    throw error
  }
}
