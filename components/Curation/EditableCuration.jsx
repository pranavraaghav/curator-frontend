import { useState } from "react"
import { Add, Publish, Info } from "@mui/icons-material"
import { v4 as uuidv4 } from "uuid"
import { Button, TextField } from "@mui/material"
import EditableBlockCard from "../Block/EditableBlockCard"
import { motion, AnimatePresence } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd" // Drag and drop stuff

function EditableCuration({ initState, submitHandler }) {
  const [title, setTitle] = useState(initState.title)
  const [description, setDescription] = useState(initState.description)
  const [blocks, setBlocks] = useState(initState.blocks)

  const addNewBlock = () => {
    const block = {
      title: "",
      description: "",
      url: "",
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  return (
    <div className="flex flex-row ">
      <div className="flex flex-col items-start w-full p-4 space-y-4 lg:w-1/2 lg:ml-36 lg:mr-auto">
        <h1 className="heading">Create a Curation</h1>
        <div className="space-y-0 card-wrapper">
          {/* Title */}
          {/* <label
            htmlFor="title"
            className="m-2 text-lg font-bold lg:text-3xl heading font-noto-serif"
          >
            Title
          </label> */}
          {/* <input
            className="text-lg rounded desc form-text"
            name="title"
            label="title"
            type="text"
            placeholder={"Title"}
            value={title}
            onChange={changeTitleHandler}
          /> */}

          <TextField
            className="form-text"
            name="title"
            placeholder="Title"
            type="text"
            value={title}
            onChange={changeTitleHandler}
            variant="outlined"
            InputProps={{
              className: "desc",
            }}
          />

          {/* Description */}
          {/* <label
            htmlFor="description"
            className="m-2 text-lg font-bold lg:text-3xl heading font-noto-serif "
          >
            Description
          </label> */}

          {/* <textarea
            variant="outlined"
            value={description}
            label="Description"
            type="text"
            name="description"
            placeholder="Describe the curation "
            className="rounded-md desc form-text"
            onChange={changeDescriptionHandler}
            rows={4}
          /> */}

          <TextField
            className="form-text"
            name="description"
            placeholder="Describe the curation"
            type="text"
            value={description}
            onChange={changeDescriptionHandler}
            multiline
            rows={4}
            variant="outlined"
            InputProps={{
              className: "desc",
            }}
          />
        </div>

        {/* Block Container */}
        {blocks.length !== 0 && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="blocks">
              {(provided) => (
                <ul
                  className="flex flex-col w-full gap-4 py-6"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <AnimatePresence>
                    {blocks.map((block, idx) => {
                      if (!block.key) {
                        block.key = uuidv4()
                      }
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
                                index={idx}
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
                  </AnimatePresence>
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <div className="items-center justify-center space-y-4 fcc card-wrapper">
          <div className="hidden card-wrapper frc hover:bg-hover lg:flex">
            <Info className="mx-2 text-lg text-secondary lg:text-3xl" />
            <h2 className="desc">
              Re-arrange the blocks by dragging and dropping them by their
              handles
            </h2>
          </div>
          <div className="flex flex-row justify-around w-full">
            {/* Button to create new blocks*/}
            <Button
              variant="contained"
              className="flex p-2 text-sm font-bold hover:bg-secondary font-noto-sans 2xl:my-2 md:text-md lg:text-lg md:p-4"
              onClick={addNewBlock}
            >
              Add a block
              <Add className="ml-2 text-lg lg:text-3xl" />
            </Button>
            {/* Button to submit curation */}
            {/* TODO: Make a tailwind button for this */}
            {blocks.length !== 0 && (
              <Button
                variant="contained"
                className="flex p-2 text-sm font-bold bg-green-500 hover:bg-secondary font-noto-sans 2xl:my-2 md:text-md lg:text-lg md:p-4"
                onClick={() =>
                  submitHandler({
                    title: title,
                    description: description,
                    blocks: blocks,
                  })
                }
              >
                Submit
                <Publish className="ml-2 text-lg lg:text-3xl" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditableCuration
