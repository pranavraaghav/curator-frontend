import React from "react"
import { motion } from "framer-motion"

const NavBar = ({ toggleSidebar, sidebarActive, hideSidebar }) => {
  return (
    <div className="sticky top-0 flex flex-row items-center justify-around w-full h-24 bg-block">
      <h1 className="text-3xl font-noto-serif">Curator</h1>
      {!hideSidebar && (
        <div
          onClick={toggleSidebar}
          className="right-0 cursor-pointer lg:hidden"
        >
          <motion.span
            animate={sidebarActive ? { rotate: 180 } : { rotate: 0 }}
            className="text-6xl rounded-full text-coal material-icons-round bg-hover"
          >
            arrow_left
          </motion.span>
        </div>
      )}
    </div>
  )
}

export default NavBar
