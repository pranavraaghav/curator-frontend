import { useState } from "react";
import { motion } from "framer-motion";

import CurationActionBar from "./CurationActionBar";

const CurationCard = ( {data, icons} ) => {
    const [isSaved, setIsSaved] = useState(false)
    const maxDescLength = 320

    

    return (
        <motion.div whileHover={{scale:1.05,}} transition={{type:"spring", stiffness: 100}} className="w-full h-auto p-4 space-y-4 rounded-md bg-block text-primary">
            <h1 className="text-4xl font-extrabold font-noto-sans ">Curation Title Goes here</h1>
            <h2 className="flex items-center justify-start text-lg font-semibold">{data.createdAt} | {data.curationCount} curations | {data.likeCount} <span className="m-2 text-lg material-icons">thumb_up</span></h2>
            <div className="text-lg">
                {data.desc.length > maxDescLength ? 
                (
                    <p>{data.desc.substring(0,maxDescLength)}...</p>
                ) : 
                <p>{data.desc}</p>
                }
            </div>
            <CurationActionBar icons={icons}/>
        </motion.div>
    );
}


export const getServerSideProps = async (ctx) => {


    return {
        props:{
            data:null
        }
    }
}

export default CurationCard;