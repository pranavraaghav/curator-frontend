import axios from "axios"
import { getJwt } from "../Hooks/getJwt"

export async function postCuration(data) {
  if (!data) {
    console.error("postCuration called without data")
    return
  }

  try {
    var jwt = getJwt()
  } catch (error) {
    console.error(error)
    return
  }

  try {
    const response = await axios.post(
      "http://curator.navboi.tech/api/curation",
      data,
      { headers: { Authorization: "Bearer " + jwt } }
    )
    return response
  } catch (error) {
    throw error
  }
}
