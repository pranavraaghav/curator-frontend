import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";


import Dropdown from '../Dropdown'
import DropdownItem from "../DropdownItem";
import CurationActionBarButton from "../CurationCard/CurationActionBarButton";




const DashboardActionBar = ( {  } ) => {

    const router = useRouter();

    const dashboardIcons = [
        {
            id: 1,
            iconClass: "material-icons text-3xl",
            icon: "add",
            label: "New Curation",
        }
    ]

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
            <div className="flex flex-row space-x-4 text-6xl text-primary">
                        <CurationActionBarButton>
                            <Link href={router.asPath + "/new_curation"}>
                                    <div className="frc">
                                        <i className={"material-icons 3xl"}>{"add"}</i>
                                        <p className="text-xl">{"New Curation"}</p>
                                    </div>
                            </Link>
                        </CurationActionBarButton>
                
                <CurationActionBarButton key="more_horiz">  
                    <div ref={moreWrapperRef} onClick={toggleDropDown}>
                        <i className={"material-icons text-3xl flex justify-center items-center"}>{"more_horiz"}</i>
                        <p className="text-xl"></p>
                        <div className="relative">
                            { dropdownOpen &&
                                (
                                <>
                                <Dropdown icon="delete" iconClass="material-icons">
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

export default DashboardActionBar;