import { Fragment } from "react"
import { postCuration } from "../../../services/curation/postCuration"
import * as yup from "yup"
import EditableCuration from "../../../components/Curation/EditableCuration"
import { useRouter } from "next/dist/client/router"

function CreateCuration() {
  const router = useRouter()

  const initState = {
    title: "",
    description: "",
    blocks: [],
  }

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

    // Post to server
    try {
      // console.log("Posting the following: ", validatedData)
      const response = await postCuration(validatedData)
      // console.log(response)
    } catch (error) {
      console.error("failed postCuration with error: ", error)
      return
    }

    // Redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-bg">
        <div className="lg:w-1/2 lg:ml-36 lg:mr-auto">
          <h1 className="heading py-4">Create a Curation</h1>
          <EditableCuration
            initState={initState}
            submitHandler={submitHandler}
          ></EditableCuration>
        </div>
      </div>
    </Fragment>
  )
}

export default CreateCuration
