import axios from "axios"
import { getJwt } from "../Hooks/getJwt"

/**
 * Takes id of a curation and executes API request to delete it.
 *
 * @param {string} id curation id
 */
export async function deleteCuration(id) {
  if (!id) {
    console.error("deleteCuration called without id")
    return
  }

  // Adhereing to schema
  const data = {
    curation_id: id,
  }

  try {
    var jwt = getJwt()
  } catch (error) {
    console.error(error)
    return
  }

  const config = {
    data: data,
    headers: { Authorization: "Bearer " + jwt },
  }
  try {
    const response = await axios.delete(
      "http://curator.navboi.tech/api/curation",
      config
    )
    return response
  } catch (error) {
    console.error(error.response)
    throw error
  }
}
