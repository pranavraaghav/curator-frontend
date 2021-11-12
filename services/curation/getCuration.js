import axios from "axios"

export async function getCuration(id) {
  if (!id) {
    console.error("getCuration called without id")
    return
  }

  try {
    const response = await axios.get(
      "http://curator.navboi.tech/api/curation",
      { params: { curation_id: id } }
    )
    return response
  } catch (error) {
    throw error
  }
}
