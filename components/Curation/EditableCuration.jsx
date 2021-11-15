import { useState } from "react"
import Add from "@mui/icons-material/Add"
import { v4 as uuidv4 } from "uuid"
import { Button, TextField } from "@mui/material"
import EditableBlockCard from "../Block/EditableBlockCard"
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
    <div className="flex flex-col items-start w-full p-4 lg:w-1/2 lg:ml-36 lg:mr-auto">
      <h1 className="heading">New Curation</h1>
      {/* Title */}
      {/* <label
        htmlFor="title"
        className="my-2 text-lg font-bold lg:text-5xl heading font-noto-serif"
      >
        Title
      </label> */}
      <input
        className="text-lg rounded lg:text-5xl-md heading form-text"
        name="title"
        label="title"
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={changeTitleHandler}
      />

      {/* Description */}
      {/* <label
        htmlFor="description"
        className="my-2 text-lg font-bold font-noto-serif "
      >
        Description
      </label> */}
      <textarea
        variant="outlined"
        value={description}
        label="Description"
        type="text"
        name="description"
        placeholder="Describe the curation "
        className="rounded-md desc form-text"
        onChange={changeDescriptionHandler}
        rows={4}
      />

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
                            deleteHandler={() => deleteBlocksHandler(block.key)}
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

      {/* Button to create new blocks*/}
      <Button
        variant="contained"
        className="p-2 ml-auto text-sm font-bold 2xl:my-2 md:text-md lg:text-lg md:p-4"
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
          className="block p-2 mx-auto text-sm font-bold bg-green-500 2xl:my-2 md:text-md lg:text-lg md:p-4"
          onClick={() =>
            submitHandler({
              title: title,
              description: description,
              blocks: blocks,
            })
          }
        >
          Submit Curation
        </Button>
      )}
    </div>
  )
}

export default EditableCuration
