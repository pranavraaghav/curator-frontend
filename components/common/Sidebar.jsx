import { useState } from "react"
import { motion } from "framer-motion"

function Sidebar({ toggleSidebar, sidebarActive }) {
  return (
    <aside
      className={`fixed right-0 drop-shadow-xl flex flex-col bg-sidebar rounded-l-3xl h-full items-center justify-between top-0 transition-all duration-700 ease-in-out overflow-hidden ${
        sidebarActive ? "w-72 lg:w-expanded" : "w-0 lg:w-folded "
      }`}
    >
      <div className="w-full fcc">
        <div className="flex flex-row items-center justify-between w-full px-8 py-4 mx-4">
          <div onClick={toggleSidebar} className="right-0 cursor-pointer">
            <motion.span
              animate={sidebarActive ? { rotate: 180 } : { rotate: 0 }}
              className="text-6xl rounded-full text-coal material-icons-round bg-hover"
            >
              arrow_left
            </motion.span>
          </div>
          <div className="text-5xl font-extrabold text-primary font-noto-sans">
            {sidebarActive ? <strong>Curator</strong> : <strong></strong>}
          </div>
        </div>
        <HorizBar />
        <div
          className={`flex flex-col w-full px-8 py-4 mx-4 space-y-4 ${
            sidebarActive ? "items-start" : "items-center"
          }`}
        >
          <h1 className="text-lg font-semibold text-primary">DASHBOARD</h1>
          <ul className="flex flex-col items-start space-y-2 ">
            <DashListItem
              icon={"account_circle"}
              label={sidebarActive ? "Profile" : null}
            />
            <DashListItem
              icon={"list_alt"}
              label={sidebarActive ? "Your Curations" : null}
            />
            <DashListItem
              icon={"add"}
              label={sidebarActive ? "New Curation" : null}
            />
          </ul>
        </div>
        <HorizBar />
        <div
          className={`flex flex-col w-full px-8 py-4 mx-4 space-y-4 ${
            sidebarActive ? "items-start" : "items-center"
          }`}
        >
          <h1 className="text-lg font-semibold text-primary">CURATIONS</h1>
          <ul className="flex flex-col items-start space-y-2 "></ul>
        </div>
        <HorizBar />
      </div>
      <div className="flex items-center justify-center w-full h-32 frc bg-whisper">
        <div className="flex flex-row items-center justify-around w-full">
          <div className="frc">
            <div className="w-12 h-12 rounded-full bg-coal"></div>
            {sidebarActive && (
              <div className="flex flex-col items-start mx-2 text-primary font-noto-sans">
                <h2 className="font-bold">Username</h2>
                <h3 className="font-light">user@email.com</h3>
              </div>
            )}
          </div>
          {sidebarActive && (
            <span className="text-3xl material-icons text-coal">settings</span>
          )}
        </div>
      </div>
    </aside>
  )
}

function HorizBar() {
  return <div className="w-full h-0.5 m-0 opacity-50 bg-ash"></div>
}

function DashListItem({ icon, label, sidebarActive }) {
  return (
    <li className="px-2 space-x-4 rounded-lg frc hover:bg-hover">
      <span className="material-icons-round text-primary">{icon}</span>
      {label && (
        <h2 className="text-lg font-normal tracking-wide text-primary">
          {label}
        </h2>
      )}
    </li>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  }
}

export default Sidebar
