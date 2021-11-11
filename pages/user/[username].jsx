import { useRouter } from "next/dist/client/router"
import { Fragment } from "react"
import Head from "next/dist/shared/lib/head"

import CurationCard from "../../components/CurationCard/CurationCard"

// TODO: Add server side rendering

// Server Side Rendering
// export async function getServerSideProps(context) {
//     const res = await fetch('');
//     const data = await res.json();
//     return {
//         props : {
//             user: data
//         }
//     }
// }

export default function UserPage({ user }) {
  const router = useRouter()
  const { username } = router.query

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
      id: 5,
      iconClass: "material-icons text-3xl",
      icon: "more_horiz",
      label: "",
    },
  ]

  const data = [
    {
      id: 1,
      curationCount: 5,
      like_count: 6,
      curationURL: "/",
      isSaved: false,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget arcu dictum varius duis at consectetur lorem donec. Enim nunc faucibus a pellentesque sit. Et ultrices neque ornare aenean. Ut tristique et egestas quis ipsum. Dictumst vestibulum rhoncus est pellentesque elit. At in tellus integer feugiat scelerisque. Pellentesque habitant morbi tristique senectus et netus et. In vitae turpis massa sed. At augue eget arcu dictum varius duis at. Ut ornare lectus sit amet. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Mattis nunc sed blandit libero. Arcu dictum varius duis at consectetur lorem. Sapien nec sagittis aliquam malesuada. Volutpat odio facilisis mauris sit amet. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sapien et ligula ullamcorper malesuada proin libero nunc consequat. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Pulvinar elementum integer enim neque. Sit amet est placerat in egestas. Sed libero enim sed faucibus. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",
    },
    {
      id: 2,
      curationCount: 10,
      like_count: 4,
      curationURL: "/",
      isSaved: false,
      description:
        "Mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",
    },
    {
      id: 3,
      curationCount: 10,
      like_count: 4,
      curationURL: "/",
      isSaved: false,
      description:
        "Mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",
    },
    {
      id: 4,
      curationCount: 10,
      like_count: 4,
      curationURL: "/",
      isSaved: false,
      description:
        "Mauris nunc congue nisi vitae suscipit tellus mauris. Rutrum tellus pellentesque eu tincidunt. Elementum eu facilisis sed odio. Gravida rutrum quisque non tellus orci ac auctor augue.",
    },
  ]

  return (
    <Fragment>
      <Head>
        <title>{username} - Curations</title>
      </Head>
      <div className="w-full min-h-screen bg-bg">
        <div className="flex flex-col items-start justify-around ml-20 mr-96 bg-bg">
          <h1 className="my-4 mt-16 font-bold text-7xl text-primary font-noto-serif">
            Curation Gallery
          </h1>

          <div className="flex flex-row items-center justify-between space-x-4">
            <div className="w-16 h-16 bg-gray-500 rounded-full"></div>

            <h2 className="text-2xl text-primary font-noto-serif">
              {username}
            </h2>
          </div>

          <div className="w-full my-6 space-y-8">
            {data.map((curation) => {
              return (
                // TODO: Fix this shit?
                <CurationCard key={curation.id} data={curation} icons={icons} />
              )
            })}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
