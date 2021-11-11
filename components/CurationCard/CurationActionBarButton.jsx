import Link from "next/dist/client/link"

function CurationActionBarButton({ children }) {
  return (
    <div className="flex items-center justify-center w-auto p-2 space-x-1 transition duration-300 ease-in-out rounded-lg cursor-pointer bg-block hover:bg-bg">
      {children}
    </div>
  )
}

export default CurationActionBarButton
