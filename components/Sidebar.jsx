import { useState } from "react";

function Sidebar() {
    const [sidebarActive, setSidebarActive] = useState(true)

    const toggleSidebar = () => {setSidebarActive(!sidebarActive)}

    return (
        <div className="sticky top-0 flex flex-col items-start justify-start h-full bg-red-500">
            <div className={`items-start transition-all duration-500 ease-in-out ${sidebarActive ? "w-expanded" : "w-folded "}`}>
                <div className="text-9xl">
                    {sidebarActive ? (<strong>Curator</strong>) : (<strong>C</strong>)}
                </div>
                <div onClick={toggleSidebar} className="cursor-pointer">
                    <span className="material-icons">chevron_right</span>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx){


    return {
        props:{
            data:null
        }
    }
}

export default Sidebar;