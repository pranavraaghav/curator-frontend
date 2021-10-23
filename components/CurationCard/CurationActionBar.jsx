import { useState, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";

import CurationActionBarButton from "./CurationActionBarButton";
import Dropdown from '../Dropdown'
import DropdownItem from "../DropdownItem";
import copyToClipboard from "../global/copyToClipboard";
import getCurrentURL from "../global/getCurrentURL";



const CurationActionBar = ( {data} ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isAuthor, setIsAuthor] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    
    const toggleDropDown = () => {setDropdownOpen(!dropdownOpen)}

    const toggleLike = () => {setIsLiked(!isLiked)}

    const actions = [
        {
            id: 1,
            iconClass: "material-icons text-3xl",
            icon: "link",
            label: "Link",
            handler : getCurrentURL(),
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
                    setDropdownOpen(false);
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const moreWrapperRef = useRef(null);
    useOutsideAlerter(moreWrapperRef);

    return (
        <div className="flex flex-row items-start justify-between">
            <div className="flex flex-row space-x-4 text-6xl">
                {/* <i class="lni lni-link"></i> */}
                {/* <span class="material-icons text-6xl">link</span> */}
                {/* <i class="fa-solid fa-link"></i> */}

                <div onClick={getCurrentURL()} className="frc">
                    <CurationActionBarButton >
                            <i className={"material-icons text-3xl"}>{"link"}</i>
                            <p className="text-xl">{"Link"}</p>
                    </CurationActionBarButton>  
                </div>

                {isLiked ? (
                    <div onClick={toggleLike} className="frc">
                        <CurationActionBarButton >
                                <i className={"material-icons text-3xl"}>{"thumb_up"}</i>
                                <p className="text-xl">{"Like"}</p>
                        </CurationActionBarButton>
                    </div>
                    ) : (
                    <div onClick={toggleLike} className="frc">
                        <CurationActionBarButton >
                                <i className={"material-icons-outlined text-3xl"}>{"thumb_up"}</i>
                                <p className="text-xl">{"Unlike"}</p>
                        </CurationActionBarButton>
                    </div>
                    )
                }
                

                {isAuthor &&
                    <div onClick={getCurrentURL()} className="frc">
                        <CurationActionBarButton >
                                <i className={"material-icons text-3xl"}>{"edit"}</i>
                                <p className="text-xl">{"Edit"}</p>
                        </CurationActionBarButton>
                    </div>
                }
                
                    <div ref={moreWrapperRef} onClick={toggleDropDown}>
                        <CurationActionBarButton key="more_horiz">  
                                <i className={"material-icons text-3xl flex justify-center items-center"}>{"more_horiz"}</i>
                                <p className="text-xl"></p>
                                <div className="relative">
                                    { dropdownOpen &&
                                        (
                                        <>
                                        <Dropdown icon="delete" iconClass="material-icons">
                                            <DropdownItem icon={"delete"} iconClass={"material-icons"}> Delete </DropdownItem>
                                            <DropdownItem icon={"settings"} iconClass={"material-icons"}> Settings </DropdownItem>
                                        </Dropdown>
                                        </>
                                        )
                                    }
                                </div>
                        </CurationActionBarButton>
                    </div>

            </div>
        </div>
    );
}

export default CurationActionBar;