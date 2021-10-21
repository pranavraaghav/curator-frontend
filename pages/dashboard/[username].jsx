import { useRouter } from "next/dist/client/router"
import { Fragment } from "react"
import Head from "next/dist/shared/lib/head"
import { motion, AnimatePresence } from "framer-motion"

import CurationCard from "../../components/CurationCard/CurationCard"


function Dashboard() {
    const router = useRouter()
    const username = router.asPath.split('/').slice(-1)[0]

    const icons = [
        {
            id: 1,
            iconClass: "material-icons text-3xl",
            icon: "link",
            label: "Link",
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

    const data = [
        {
        id: 1,
        curationCount: 5,
        likeCount : 6,
        createdAt: "2 Days ago",
        curationURL : '/',
        isSaved : false,
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec. Enim nunc faucibus a pellentesque sit. Et ultrices neque ornare aenean. Ut tristique et egestas quis ipsum. Dictumst vestibulum rhoncus est pellentesque elit. At in tellus integer feugiat scelerisque. Pellentesque habitant morbi tristique senectus et netus et. In vitae turpis massa sed. At augue eget arcu dictum varius duis at. Ut ornare lectus sit amet. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Mattis nunc sed blandit libero. Arcu dictum varius duis at consectetur lorem. Sapien nec sagittis aliquam malesuada. Volutpat odio facilisis mauris sit amet. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pulvinar elementum integer enim neque. Sit amet est placerat in egestas. Sed libero enim sed faucibus. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",    
        },
        {
            id: 2,
            curationCount: 10,
            likeCount : 4,
            createdAt: "17-09-21",
            curationURL : '/',
            isSaved : false,
            desc: "Mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",    
        },
    ]

    return (
        <Fragment>
            <Head>
                <title>{username} | Dashboard</title>
            </Head>
            <div className="w-full min-h-screen bg-bg">   
            
                <div className="flex flex-col items-start justify-around ml-20 mr-96 bg-bg">

                    <h1 className="my-4 mt-16 font-bold text-7xl text-primary font-noto-serif">Your Dashboard</h1>

                    <div className="flex flex-row items-center justify-between space-x-4">

                        <div className="w-16 h-16 bg-gray-500 rounded-full"></div>

                        <h2 className="text-2xl text-primary font-noto-serif">{username}</h2>
                        
                    </div>

                    <div className="w-full h-auto min-h-0 p-4 mt-6 rounded-md bg-block">
                        <p>Something Goes here later</p>
                    </div>

                    <div className="w-full my-6 space-y-8">
                        {data.map((curation) => {
                            return (
                                <CurationCard key={curation.id} data={curation} icons={icons}/>
                                )
                            })}
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}

export async function getServerSideProps(ctx){


    return {
        props:{
            data:null
        }
    }
}

export default Dashboard;