import Link from "next/dist/client/link"
import { Fragment, useState } from "react"
import Head from "next/dist/shared/lib/head"
import Loader from "react-loader-spinner"
import { useEffect } from "react"
import { useRouter } from "next/dist/client/router"

import BlockCard from "../../../components/BlockCard/BlockCard"
import LoadingOverlay from "../../../components/common/LoadingOverlay"
import CurationActionBar from "../../../components/CurationCard/CurationActionBar"
import DateTimeFormat from "../../../components/common/DateTimeFormat"
import { getCuration } from "../../../services/curation/getCuration"

function CurationPage({ curation }) {
  const [isLoading, setIsLoading] = useState(false)
  const [likes, setLikes] = useState(0)
  const [blocksData, setBlocksData] = useState()
  const [descToggle, setDescToggle] = useState(true)

  const router = useRouter()

  // const curation = {
  //   id: 1,
  //   createdAt: "2021-11-12T20:14:39.878Z",
  //   updatedAt: "2021-11-12T20:14:39.878Z",
  //   title: "A Sample Curation",
  //   description:
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec. Enim nunc faucibus a pellentesque sit. Et ultrices neque ornare aenean. Ut tristique et egestas quis ipsum. Dictumst vestibulum rhoncus est pellentesque elit. At in tellus integer feugiat scelerisque. Pellentesque habitant morbi tristique senectus et netus et. In vitae turpis massa sed. At augue eget arcu dictum varius duis at. Ut ornare lectus sit amet. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Mattis nunc sed blandit libero. Arcu dictum varius duis at consectetur lorem. Sapien nec sagittis aliquam malesuada. Volutpat odio facilisis mauris sit amet. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pulvinar elementum integer enim neque. Sit amet est placerat in egestas. Sed libero enim sed faucibus. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",
  //   likeCount: 6,
  //   likes: [
  //     {
  //       like_id: 1,
  //       user: {},
  //       curation: {},
  //     },
  //   ],
  //   createdBy: {
  //     id: "1",
  //     createdAt: "2021-11-12T20:14:39.878Z",
  //     email: "username@email.com",
  //     username: "username",
  //     password: "",
  //     bio: "",
  //     imageurl: "",
  //     curations: [],
  //     likes: [],
  //   },
  //   blocks: [
  //     {
  //       id: 1,
  //       title: "How to Git Gud",
  //       index: 1,
  //       description: "100% guaranteed guide on giting gud fast ",
  //       url: "https://awesome_world",
  //       curation: {},
  //     },
  //     {
  //       id: 2,
  //       title: "Something Else",
  //       index: 3,
  //       description:
  //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
  //       url: "https://twitter.com/explore",
  //       curation: {},
  //     },
  //     {
  //       id: 3,
  //       title: "Number 3",
  //       index: 2,
  //       description: "Being first isnt always best ",
  //       url: "https://youtube.com",
  //       curation: {},
  //     },
  //   ],
  // }

  useEffect(() => {
    setLikes(curation.likeCount)

    curation.blocks.sort((a, b) => {
      return a.index - b.index
    })
    setBlocksData(curation.blocks)
  }, [])

  const shortLength = 320
  function toggleDesc() {
    setDescToggle(!descToggle)
  }

  return (
    <Fragment>
      {isLoading && (
        <LoadingOverlay>
          <Loader type="Puff" color="#324376" />
          <h1 className="p-4 text-3xl font-bold font-noto-serif text-primary">
            Getting everything in place...
          </h1>
        </LoadingOverlay>
      )}
      <Head>
        <title>{curation.title}</title>
      </Head>
      <div className="w-full bg-bg">
        <div className="flex flex-col items-start justify-start p-4 space-y-8 lg:ml-20 lg:px-4 text-primary lg:mr-96">
          <div>
            <h1 className="heading">{curation.title}</h1>
            <div className="flex flex-col p-2 my-2 text-xl rounded-md w-max lg:text-2xl lg:flex-row text-primary font-noto-serif secondary-hover">
              <p>
                By{" "}
                {/* <Link href={`/user/${curation.createdBy.id}`}>
                  {curation.createdBy.username}
                </Link> */}
              </p>
            </div>
          </div>

          <div className="w-full h-auto p-4 space-y-2 text-sm rounded-md lg:text-xl text-primary bg-block">
            <h2 className="flex items-center justify-start text-lg font-semibold">
              <DateTimeFormat dateParam={curation.createdAt} /> &nbsp;| {likes}
              <span className="m-2 text-lg material-icons">thumb_up</span>
            </h2>
            <div>
              {curation.description != null && (
                <p className={`transition-all duration-300 ease-in-out `}>
                  {descToggle
                    ? curation.description.substr(0, shortLength) +
                      (curation.description.length > shortLength ? "..." : "")
                    : curation.description}
                  {curation.description.length > shortLength && (
                    <div
                      onClick={toggleDesc}
                      className="flex justify-center w-full pt-1 text-xl lg:text-2xl"
                    >
                      {descToggle ? (
                        <i className="p-1 rounded-md lni lni-arrow-down-circle primary-hover "></i>
                      ) : (
                        <i className="p-1 rounded-md lni lni-arrow-up-circle primary-hover "></i>
                      )}
                    </div>
                  )}
                </p>
              )}
            </div>
            <CurationActionBar
              likes={likes}
              setLikes={setLikes}
              curation={curation}
            />
          </div>

          {blocksData &&
            blocksData.map((block) => {
              return <BlockCard key={block.id} blockData={block} />
            })}
        </div>
      </div>
    </Fragment>
  )
}

export async function getServerSideProps({ params, res }) {
  const { id } = params

  let data = null
  try {
    const res = await getCuration(id)
    data = await res.data
  } catch (error) {
    console.log(error)
    data = null
  }

  return {
    props: {
      curation: data,
    },
  }
}

export default CurationPage
