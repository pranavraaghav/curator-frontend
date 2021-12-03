import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import NotFoundSVG from "../../public/NotFound.svg"
import { motion } from "framer-motion"
import { cardVariants } from "../global/cardVariants"

function NotFound() {
  return (
    <>
      <Head>
        <title>Wrong Page!</title>
      </Head>
      <div className="space-y-2 text-center fcc">
        <div className="w-full px-2 lg:w-1/2">
          <img src={NotFoundSVG} />
        </div>
        <div className="card-wrapper">
          <h1 className="text-lg heading lg:text-3xl">
            Sorry, but we could not find the page you were looking for!
          </h1>

          <h2 className="desc">
            Try checking the URL or navigating to it in another way.
          </h2>
        </div>

        <motion.div
          variants={cardVariants}
          whileTap="hop"
          className="p-2 rounded-md frc bg-secondary text-block desc"
        >
          <Link href="/dashboard">Head back to your dashboard</Link>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound
