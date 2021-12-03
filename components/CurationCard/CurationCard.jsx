import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/dist/client/router"

import CurationActionBar from "./CurationActionBar"
import { cardVariants } from "../global/cardVariants"
import getUrlFromCurationId from "../../services/Hooks/makeUrlFromCurationId"
import isMobileBrowser from "../../services/Hooks/isMobileBrowser"
import DateTimeFormat from "../common/DateTimeFormat"

const CurationCard = ({ curation, deleteHandler, editHandler }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(curation.like_count)
  const [maxDescLength, setMaxDescLength] = useState(120)
  const router = useRouter()

  useEffect(() => {
    setMaxDescLength(isMobileBrowser() ? 120 : 320)
  }, [])

  const curationUrl = getUrlFromCurationId(curation.id)

  const handleClick = () => {
    router.push(curationUrl)
  }

  return (
    <motion.div
      variants={cardVariants}
      animate="visible"
      whileHover="hover"
      className="w-full h-auto p-4 space-y-4 rounded-md bg-block text-primary"
    >
      <div onClick={handleClick} className="space-y-4 cursor-pointer ">
        <h1 className="text-4xl font-extrabold font-noto-sans ">
          {curation.title}
        </h1>
        <h2 className="flex items-center justify-start text-lg font-semibold">
          <DateTimeFormat dateParam={curation.created_at} /> &nbsp; | {likes}{" "}
          <span className="m-2 text-lg material-icons">thumb_up</span>
        </h2>
        <div className="default-text">
          {curation.description &&
          curation.description.length > maxDescLength ? (
            <p>{curation.description.substring(0, maxDescLength)}...</p>
          ) : (
            <p>{curation.description}</p>
          )}
        </div>
      </div>
      <CurationActionBar
        likes={likes}
        setLikes={setLikes}
        curation={curation}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        isAuthor={true}
      />
    </motion.div>
  )
}

export default CurationCard
