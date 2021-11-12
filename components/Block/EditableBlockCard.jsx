import { motion } from "framer-motion"
import { cardVariants } from "../global/cardVariants"
import Delete from "@mui/icons-material/Delete"

function EditableBlockCard({ data, deleteHandler, updateHandler }) {
  const handleChange = (event) => {
    data[event.target.name] = event.target.value
    updateHandler(data)
  }

  return (
    <motion.div
      variants={cardVariants}
      animate="visible"
      whileHover="hover"
      className="w-full h-auto p-4 pb-8 space-y-4 text-sm rounded-md lg:text-lg bg-block"
    >
      {/* Delete Button */}
      <button className="block ml-auto" onClick={deleteHandler}>
        <Delete className="text-gray-800 cursor-pointer text-2xl md:text-3xl lg:text-4xl" />
      </button>

      <form id="form1" onChange={handleChange}>
        {/* Title */}
        <label htmlFor="title" className="font-bold text-lg font-noto-serif">
          Title
        </label>
        <input
          className="form-text rounded-md"
          name="title"
          label="title"
          type="text"
          defaultValue={data.title}
        />

        {/* TODO: Add live validation */}
        {/* URL */}
        <label htmlFor="url" className="font-bold text-lg font-noto-serif">
          URL
        </label>
        <input
          className="form-text rounded-md"
          name="url"
          label="url"
          type="text"
          defaultValue={data.url}
        />

        {/* Description */}
        <label
          htmlFor="description"
          className="font-bold text-lg font-noto-serif"
        >
          Description
        </label>
        <textarea
          variant="outlined"
          label="Description"
          type="text"
          name="description"
          className="form-text rounded-md"
          rows={4}
          defaultValue={data.description}
        />
      </form>
    </motion.div>
  )
}

export default EditableBlockCard
