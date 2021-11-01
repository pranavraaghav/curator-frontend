import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";

import CurationActionBar from "./CurationActionBar";
import { cardVariants } from "../global/cardVariants";
import getUrlFromCurationId from "../global/getUrlFromCurationId";
import isMobileBrowser from "../global/isMobileBrowser";

const CurationCard = ( {curation} ) => {
    const [isSaved, setIsSaved] = useState(false)
    const [likes, setLikes] = useState(curation.likeCount)
    const [maxDescLength, setMaxDescLength] = useState(120)
    const router = useRouter()

    useEffect(() => {
        setMaxDescLength(isMobileBrowser() ? 120 : 320)
        return () => {
            
        }
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
                    <h1 className="text-4xl font-extrabold font-noto-sans ">{curation.title}</h1>
                    <h2 className="flex items-center justify-start text-lg font-semibold">{curation.createdAt} | {curation.blocks.length} curations | {likes} <span className="m-2 text-lg material-icons">thumb_up</span></h2>
                    <div className="text-lg">
                        {curation.desc.length > maxDescLength ? 
                        (
                            <p>{curation.desc.substring(0,maxDescLength)}...</p>
                        ) : 
                            <p>{curation.desc}</p>
                        }
                    </div>
                </div>
                <CurationActionBar likes={likes} setLikes={setLikes} curation={curation}/>
            </motion.div>
    );
}



export default CurationCard;