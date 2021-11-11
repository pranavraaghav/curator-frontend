import { motion } from "framer-motion"
import { useState } from "react"

import copyToClipboard from "../../services/Hooks/copyToClipboard"
import { cardVariants } from "../global/cardVariants"
import HtmlTooltip from "../global/MaterialHTMLTooltip"
import { Tooltip } from "@mui/material"

function BlockCard({ blockData }) {
  const [copyText, setCopyText] = useState("Copy to Clipboard")

  const maxDescLength = 320

  const handleCopyIconClick = () => {
    copyToClipboard(blockData.link)
    setCopyText("Link Copied!")
    setTimeout(() => {
      setCopyText("Copy to Clipboard")
    }, 3000)
  }

  return (
    <motion.div
      variants={cardVariants}
      animate="visible"
      whileHover="hover"
      className="w-full h-auto p-4 py-8 space-y-4 text-sm rounded-md lg:text-lg bg-block"
    >
      <div className="text-2xl font-extrabold lg:text-4xl font-noto-sans">
        {blockData.title}
      </div>
      <div className="flex flex-row items-center justify-between p-2 rounded-md bg-hover font-noto-sans">
        <a href={blockData.link} className="overflow-hidden">
          {blockData.link}
        </a>
        <div onClick={handleCopyIconClick}>
          <HtmlTooltip
            title={<p className="text-lg">{copyText}</p>}
            arrow
            placement="top"
          >
            <span className="p-1 text-3xl rounded-lg cursor-pointer material-icons hover:bg-block">
              content_copy
            </span>
          </HtmlTooltip>
        </div>
      </div>
      <div className="text-sm lg:text-lg font-noto-sans">
        {blockData.desc.length > maxDescLength ? (
          <p>{blockData.desc.substring(0, maxDescLength)}...</p>
        ) : (
          <p>{blockData.desc}</p>
        )}
      </div>
    </motion.div>
  )
}

export default BlockCard
