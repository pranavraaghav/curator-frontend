import axios from "axios"
import { getJwt } from "../Hooks/getJwt"

/**
 *
 * @param {string} curation_id
 * @param {object} data Validated payload for the request's body
 * @returns
 */
export async function putCuration(curation_id, data) {
  if (!data) {
    console.error("putCuration called without data")
    return
  }

  try {
    var jwt = getJwt()
  } catch (error) {
    console.error(error)
    return
  }

  // Add curation_id to data
  data.curation_id = curation_id

  try {
    const response = await axios.put(
      "http://curator.navboi.tech/api/curation",
      data,
      { headers: { Authorization: "Bearer " + jwt } }
    )
    return response
  } catch (error) {
    throw error.response
  }
}
