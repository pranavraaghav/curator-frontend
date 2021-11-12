import { Fragment, useState } from "react"
import Add from "@mui/icons-material/Add"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@mui/material"
import EditableBlockCard from "../../../components/Block/EditableBlockCard"
import { postCuration } from "../../../services/curation/postCuration"
import * as yup from "yup"
import { useRouter } from "next/dist/client/router"

// Drag and drop stuff
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

function CreateCuration() {
  const [blocks, setBlocks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const router = useRouter()

  const addNewBlock = () => {
    const block = {
      title: "",
      description: "",
      url: "",
      key: uuidv4(),
    }
    setBlocks([...blocks, block]) // update state
  }

  const deleteBlocksHandler = (key) => {
    setBlocks(blocks.filter((block) => block.key !== key))
  }

  // Title, Description and Blocks have their own unique handlers
  const changeTitleHandler = (event) => {
    setTitle(event.target.value)
  }
  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value)
  }

  const updateBlocksHandler = (data) => {
    const idx = blocks.findIndex((block) => block.key === data.key) // find index of changed data object

    const blocksCopy = blocks
    blocksCopy[idx] = data

    setBlocks(blocksCopy) // update state
  }

  const submitCurationHandler = async () => {
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

    const data = {
      title: title,
      description: description,
      blocks: blocks,
    }

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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  return (
    <Fragment>
      <div className="w-full min-h-screen bg-bg">
        <div className="p-4 w-full lg:w-1/2 lg:ml-36 lg:mr-auto">
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
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="blocks">
                {(provided) => (
                  <ul
                    className="flex flex-col gap-4 py-6"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {blocks.map((block, idx) => {
                      return (
                        <Draggable
                          key={block.key}
                          draggableId={block.key}
                          index={idx}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {/* Block */}
                              <EditableBlockCard
                                data={block}
                                deleteHandler={() =>
                                  deleteBlocksHandler(block.key)
                                }
                                updateHandler={updateBlocksHandler}
                              />
                            </li>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
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
