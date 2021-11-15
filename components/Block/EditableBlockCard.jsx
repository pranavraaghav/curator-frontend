import { motion, AnimatePresence } from "framer-motion"
import { cardVariants } from "../global/cardVariants"
import { TextField } from "@mui/material"
import Delete from "@mui/icons-material/Delete"

function EditableBlockCard({ index, data, deleteHandler, updateHandler }) {
  const handleChange = (event) => {
    data[event.target.name] = event.target.value
    updateHandler(data)
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initialUp"
      animate="visible"
      exit="exitLeft"
      whileHover="hover"
      key={index}
      className="w-full h-auto pb-8 space-y-4 text-sm rounded-md lg:text-lg bg-block"
    >
      <div className="flex flex-row items-center justify-between p-4 bg-whisper">
        {/* Block Counter */}
        <h1 className="text-lg heading lg:text-3xl">Block {index}</h1>

        {/* Delete Button */}
        <button className="" onClick={deleteHandler}>
          <Delete className="text-2xl cursor-pointer text-coal hover:brightness-125 md:text-3xl lg:text-4xl" />
        </button>
      </div>

      <form id="form1" onChange={handleChange} className="p-4">
        <h1></h1>
        {/* Title */}
        {/* <label htmlFor="title" className="text-lg font-bold font-noto-serif">
          Title
        </label> */}
        <input
          className="rounded-md form-text heading lg:text-3xl"
          name="title"
          label="title"
          placeholder="Block Title"
          type="text"
          defaultValue={data.title}
        />
        {/* <TextField
          className="rounded-md desc form-text"
          name="title"
          placeholder="Block Title"
          type="text"
          defaultValue={data.title}
          variant="standard"
          InputProps={{
            className: "desc lg:text-9xl",
          }}
        /> */}

        {/* TODO: Add live validation */}
        {/* URL */}
        {/* <label htmlFor="url" className="text-lg font-bold font-noto-serif">
          URL
        </label> */}
        <input
          className="rounded-md form-text desc"
          name="url"
          label="url"
          placeholder="Paste URL here"
          type="text"
          defaultValue={data.url}
        />

        {/* Description */}
        {/* <label
          htmlFor="description"
          className="text-lg font-bold font-noto-serif"
        >
          Description
        </label> */}
        <textarea
          variant="outlined"
          label="Description"
          type="text"
          name="description"
          placeholder="Describe this block"
          className="rounded-md form-text desc"
          rows={4}
          defaultValue={data.description}
        />
      </form>
    </motion.div>
  )
}

export default EditableBlockCard
