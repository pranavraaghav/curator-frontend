import React, { useState, useEffect, useRef } from "react"
import { Tooltip } from "@mui/material"
import { useRouter } from "next/dist/client/router"

import CurationActionBarButton from "./CurationActionBarButton"
import Dropdown from "../Dropdown"
import DropdownItem from "../DropdownItem"
import copyToClipboard from "../../services/Hooks/copyToClipboard"
import getCurrentURL from "../../services/Hooks/makeCurrentURL"
import HtmlTooltip from "../global/MaterialHTMLTooltip"
import getUrlFromCurationId from "../../services/Hooks/makeUrlFromCurationId"

const CurationActionBar = ({ likes, setLikes, curation }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isAuthor, setIsAuthor] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [linkHoverText, setLinkHoverText] = useState("Click to Copy")

  const router = useRouter()

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)

    isLiked ? setLikes(likes + 1) : setLikes(likes - 1)
  }

  const handleLinkClick = () => {
    copyToClipboard(getUrlFromCurationId(curation.id))

    setLinkHoverText("Link Copied!")
    setTimeout(() => {
      setLinkHoverText("Click to Copy")
    }, 3000)
  }

  const actions = [
    {
      id: 1,
      iconClass: "material-icons text-3xl",
      icon: "link",
      label: "Link",
      handler: getCurrentURL(),
    },
    {
      id: 2,
      iconClass: "material-icons text-3xl",
      icon: "bookmark",
      label: "Save",
    },
    {
      id: 3,
      iconClass: "material-icons text-3xl",
      icon: "bookmark_border",
      label: "Unsave",
    },
    {
      id: 4,
      iconClass: "material-icons text-3xl",
      icon: "edit",
      label: "Edit",
    },
    {
      id: 5,
      iconClass: "material-icons text-3xl",
      icon: "thumb_up",
      label: " Like",
    },
  ]

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Handler if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownOpen(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [ref])
  }

  const moreWrapperRef = useRef(null)
  useOutsideAlerter(moreWrapperRef)

  return (
    <div className="flex flex-row items-start justify-between">
      <div className="flex flex-row flex-wrap space-x-4 text-6xl">
        <HtmlTooltip
          title={<p className="text-lg">{linkHoverText}</p>}
          arrow
          placement="top"
        >
          <div onClick={handleLinkClick} className="ml-4 frc">
            <CurationActionBarButton>
              <i className={"material-icons text-3xl"}>{"link"}</i>
              <p className="text-xl">{"Link"}</p>
            </CurationActionBarButton>
          </div>
        </HtmlTooltip>

        {isLiked ? (
          <div onClick={toggleLike} className="frc">
            <CurationActionBarButton>
              <i className={"material-icons text-3xl"}>{"thumb_up"}</i>
              <p className="text-xl">{"Like"}</p>
            </CurationActionBarButton>
          </div>
        ) : (
          <div onClick={toggleLike} className="frc">
            <CurationActionBarButton>
              <i className={"material-icons-outlined text-3xl"}>{"thumb_up"}</i>
              <p className="text-xl">{"Unlike"}</p>
            </CurationActionBarButton>
          </div>
        )}

        {isAuthor && (
          <div className="frc">
            <CurationActionBarButton>
              <i className={"material-icons text-3xl"}>{"edit"}</i>
              <p className="text-xl">{"Edit"}</p>
            </CurationActionBarButton>
          </div>
        )}

        <div ref={moreWrapperRef} onClick={toggleDropDown}>
          <CurationActionBarButton key="more_horiz">
            <i
              className={
                "material-icons text-3xl flex justify-center items-center"
              }
            >
              {"more_horiz"}
            </i>
            <p className="text-xl"></p>
            <div className="relative">
              {dropdownOpen && (
                <>
                  <Dropdown icon="delete" iconClass="material-icons">
                    <DropdownItem icon={"delete"} iconClass={"material-icons"}>
                      {" "}
                      Delete{" "}
                    </DropdownItem>
                    <DropdownItem
                      icon={"settings"}
                      iconClass={"material-icons"}
                    >
                      {" "}
                      Settings{" "}
                    </DropdownItem>
                  </Dropdown>
                </>
              )}
            </div>
          </CurationActionBarButton>
        </div>
      </div>
    </div>
  )
}

export default CurationActionBar
