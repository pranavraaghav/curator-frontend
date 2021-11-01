import { useRouter } from "next/dist/client/router"
import { Fragment,useEffect,useState } from "react"
import Head from "next/dist/shared/lib/head"
import Loader from "react-loader-spinner"

import CurationCard from "../../components/CurationCard/CurationCard"
import DashboardActionBar from "../../components/Dashboard/DashboardActionBar"
import LoadingOverlay from "../../components/LoadingOverlay"
import getCurations from "../../services/dashboard/getCurations"


function Dashboard() {
    //Be wary of Loading state getting locked
    const [isLoading, setIsLoading] = useState(false)
    const [dashboardData, setDashboardData] = useState()
    const [jwt, setJwt] = useState()

    useEffect(() => {
        async function fetchDashboardData() {
            setIsLoading(true)
            setJwt(sessionStorage.getItem("jwt"))

            try {
                // const data = await getCurations(jwt);
                // setDashboardData(data)
                console.log("data",dashboardData)
                
            } catch (error) {
                console.log("Error fetching data ", error)
            }
            
            // This Removes the loading overlay! Be Wary of it!
            setIsLoading(false)

        }
        fetchDashboardData()
        return () => {
            
        }
    }, [])

    const router = useRouter()

    //Limits username to 20 characters
    const username = router.asPath.split('/').slice(-1)[0].substr(0,20)


    const data = [
        {
            id: 1,
            createdAt: '2021-10-23',
            updatedAt: '2021-10-24',
            title: 'Best Stuff Ever',
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec. Enim nunc faucibus a pellentesque sit. Et ultrices neque ornare aenean. Ut tristique et egestas quis ipsum. Dictumst vestibulum rhoncus est pellentesque elit. At in tellus integer feugiat scelerisque. Pellentesque habitant morbi tristique senectus et netus et. In vitae turpis massa sed. At augue eget arcu dictum varius duis at. Ut ornare lectus sit amet. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Mattis nunc sed blandit libero. Arcu dictum varius duis at consectetur lorem. Sapien nec sagittis aliquam malesuada. Volutpat odio facilisis mauris sit amet. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pulvinar elementum integer enim neque. Sit amet est placerat in egestas. Sed libero enim sed faucibus. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",    
            likeCount : 6,
            like: [{
                like_id: 1,
                user: {},
                curation: {},
            }],
            createdBy: {

            },
            blocks : [ { }, { }, {}]
        },
        {
            id: 2,
            createdAt: '2021-10-22',
            updatedAt: '2021-10-21',
            title: 'Some Cool things',
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec. Enim nunc faucibus a pellentesque sit. Et ultrices neque ornare aenean. Ut tristique et egestas quis ipsum. Dictumst vestibulum rhoncus est pellentesque elit. At in tellus integer feugiat scelerisque. Pellentesque habitant morbi tristique senectus et netus et. In vitae turpis massa sed. At augue eget arcu dictum varius duis at. Ut ornare lectus sit amet. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Mattis nunc sed blandit libero. Arcu dictum varius duis at consectetur lorem. Sapien nec sagittis aliquam malesuada. Volutpat odio facilisis mauris sit amet. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pulvinar elementum integer enim neque. Sit amet est placerat in egestas. Sed libero enim sed faucibus. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",    
            likeCount : 4,
            like: [{
                like_id: 1,
                user: {},
                curation: {},
            }],
            createdBy: {

            },
            blocks : [ {}, {}]
        },
    ]

    return ( 
        <Fragment>
            {isLoading && 
                <LoadingOverlay>
                    <Loader type="Puff" color="#324376"/>
                    <h1 className="p-4 text-3xl font-bold font-noto-serif text-primary">Getting everything in place...</h1>
                </LoadingOverlay>
            }
            <Head>
                <title>{username} | Dashboard</title>
            </Head>
            <div className="w-full bg-bg">   
                <div className="flex flex-col items-start justify-start p-4 lg:mr-96 lg:ml-20 bg-bg">

                    <h1 className="heading">Your Dashboard</h1>

                    <div className="flex flex-row items-center justify-between space-x-4">

                        {/* Profile Picture */}
                        {/* <div className="w-16 h-16 bg-gray-500 rounded-full"></div> */}

                        <h2 className="ml-2 text-2xl text-primary font-noto-serif">{username}</h2>
                        
                    </div>

                    <div className="w-full h-auto min-h-0 p-4 mt-6 rounded-md bg-block">
                        <DashboardActionBar />
                    </div>

                    <div className="w-full my-6 space-y-8">
                        {data.map((curation) => {
                            return (
                                <CurationCard key={curation.id} curation={curation}/>
                                )
                            })}
                    </div>
                    
                </div>
            </div>
        </Fragment>
    );
}


export default Dashboard;