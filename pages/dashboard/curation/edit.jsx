import { Fragment, useState, useRef, useEffect } from "react"
import { putCuration } from "../../../services/curation/putCuration"
import * as yup from "yup"
import EditableCuration from "../../../components/Curation/EditableCuration"
import { useRouter } from "next/dist/client/router"
import { getCuration } from "../../../services/curation/getCuration"

import LoadingOverlay from "../../../components/common/LoadingOverlay"
import Loader from "react-loader-spinner"

function EditCuration() {
  // TODO: memoize getCuration() call using useCallback() maybe?
  // think it could fix the edit page breaking on reloading
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
      <LoadingOverlay>
        <Loader type="Puff" color="#324376" />
        <h1 className="p-4 text-3xl font-bold font-noto-serif text-primary">
          Fetching your curation...
        </h1>
      </LoadingOverlay>
    )
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-bg ">
        <div className="lg:w-1/2 lg:ml-36 lg:mr-auto">
          <h1 className="heading py-4">Edit a Curation</h1>
          <EditableCuration
            initState={initState.current}
            submitHandler={submitHandler}
          ></EditableCuration>
        </div>
      </div>
    </Fragment>
  )
}

export default EditCuration
