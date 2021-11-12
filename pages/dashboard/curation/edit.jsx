import { Fragment, useState, useRef, useEffect } from "react"
import { putCuration } from "../../../services/curation/putCuration"
import * as yup from "yup"
import EditableCuration from "../../../components/Curation/EditableCuration"
import { useRouter } from "next/dist/client/router"
import { getCuration } from "../../../services/curation/getCuration"

function EditCuration() {
  const router = useRouter()
  const curationId = router.query.curationId

  const [isReady, setIsReady] = useState(false)

  const initState = useRef({
    title: "",
    description: "",
    blocks: [],
  })

  useEffect(() => {
    let retries = 3
    async function getInitialState() {
      try {
        const response = await getCuration(curationId)
        if (response) {
          initState.current = response.data
          setIsReady(true)
        }
      } catch (error) {
        console.error(error)
        if (retries > 0) {
          setTimeout(() => {
            retries--
            getInitialState()
          }, 300)
        }
      }
    }
    getInitialState()
  }, [])

  const submitHandler = async (data) => {
    // Validation Schema
    const blockSchema = yup
      .object({
        title: yup.string().required(),
        url: yup.string().url().notRequired(),
        description: yup.string().notRequired(),
      })
      .noUnknown(true)

    const schema = yup
      .object({
        title: yup.string().required(),
        description: yup.string().notRequired(),
        blocks: yup.array().of(blockSchema).notRequired(),
      })
      .noUnknown(true)

    // Validate against schema
    try {
      var validatedData = await schema.validate(data) // throws error when invalid
    } catch (error) {
      console.error(
        "Failed schema validation at create.jsx with errror: ",
        error
      )
    }

    // Put to server
    try {
      // console.log("Updating the following: ", validatedData)
      const response = await putCuration(curationId, validatedData)
      // console.log(response)
    } catch (error) {
      console.error("failed postCuration with error: ", error)
      return
    }

    // Redirect to dashboard
    router.push("/dashboard")
  }

  if (!isReady) {
    return (
      // TODO: Make a proper loading placeholder
      <div>LOADING</div>
    )
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-bg">
        <EditableCuration
          initState={initState.current}
          submitHandler={submitHandler}
        ></EditableCuration>
      </div>
    </Fragment>
  )
}

export default EditCuration
