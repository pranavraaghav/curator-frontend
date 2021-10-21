import { useState, useEffect, useRef } from "react";


import CurationActionBarButton from "./CurationActionBarButton";
import Dropdown from '../Dropdown'
import DropdownItem from "../DropdownItem";



const CurationActionBar = ( { icons } ) => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    
    const toggleDropDown = () => {setDropdownOpen(!dropdownOpen)}

    const isAuthor = true

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

                {icons.map((icon) => {
                    return (
                    <CurationActionBarButton key={icon.id}>
                        <i className={`${icon.iconClass}`}>{icon.icon}</i>
                        <p className="text-xl">{icon.label}</p>
                    </CurationActionBarButton>
                    )
                })}
                
                <CurationActionBarButton key="more_horiz">  
                    <div ref={moreWrapperRef} onClick={toggleDropDown}>
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
                    </div>
                </CurationActionBarButton>

            </div>
        </div>
    );
}

export default CurationActionBar;