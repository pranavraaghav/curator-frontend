import { Fragment, useState } from "react"
import Add from "@mui/icons-material/Add"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@mui/material"
import EditableBlockCard from "../../../components/Block/EditableBlockCard"
import { postCuration } from "../../../services/curation/postCuration"

function CreateCuration() {
  const [blocks, setBlocks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // Title, Description and Blocks have their own unique handlers
  const changeTitleHandler = (event) => {
    setTitle(event.target.value)
  }

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value)
  }

  const addNewBlock = () => {
    const block = {
      title: "test",
      description: "",
      url: "",
      key: uuidv4(),
    }
    setBlocks([...blocks, block]) // update state
  }

  const updateBlocksHandler = (data) => {
    const idx = blocks.findIndex((block) => block.key === data.key) // find index of changed data object

    const blocksCopy = blocks
    blocksCopy[idx] = data

    setBlocks(blocksCopy) // update state
  }

  const deleteBlocksHandler = (key) => {
    setBlocks(blocks.filter((block) => block.key !== key))
  }

  const submitCurationHandler = async () => {
    // TODO: Add URL validation for each block.
    const data = {
      title: title,
      description: description,
      blocks: blocks,
    }

    // removing keys from each block before making POST request
    data.blocks.forEach((item) => {
      if (item["key"]) delete item["key"]
    })

    console.log("Posting the following: ", data)

    await postCuration(data)
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-bg">
        <div className="p-4 w-full lg:w-8/12 lg:ml-36 lg:mr-auto">
          {/* Title */}
          <label
            htmlFor="title"
            className="font-bold text-lg font-noto-serif my-2"
          >
            Title
          </label>
          <input
            className="form-text rounded-md"
            name="title"
            label="title"
            type="text"
            value={title}
            onChange={changeTitleHandler}
          />

          {/* Description */}
          <label
            htmlFor="description"
            className="font-bold text-lg font-noto-serif my-2 "
          >
            Description
          </label>
          <textarea
            variant="outlined"
            value={description}
            label="Description"
            type="text"
            name="description"
            className="form-text rounded-md"
            onChange={changeDescriptionHandler}
            rows={4}
          />
          {/* Button to create new blocks*/}
          <Button
            variant="contained"
            className="
            ml-auto 2xl:my-2
            text-sm md:text-md lg:text-lg 
            font-bold p-2 md:p-4
            "
            onClick={addNewBlock}
          >
            Add a block
            <Add className="ml-2 text-lg lg:text-3xl" />
          </Button>

          {/* Block Container */}
          {blocks.length !== 0 && (
            <div className="flex flex-col gap-4 py-6">
              {blocks.map((block, idx) => {
                return (
                  <EditableBlockCard
                    key={block.key}
                    data={block}
                    deleteHandler={() => deleteBlocksHandler(block.key)}
                    updateHandler={updateBlocksHandler}
                  />
                )
              })}
            </div>
          )}

          {/* Button to submit curation */}
          {/* TODO: Make a tailwind button for this */}
          {blocks.length !== 0 && (
            <Button
              variant="contained"
              className="
              block
              mx-auto 2xl:my-2
              text-sm md:text-md lg:text-lg 
              font-bold p-2 md:p-4
              bg-green-500
              "
              onClick={submitCurationHandler}
            >
              Submit Curation
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default CreateCuration
