function LoadingOverlay({ children }) {
  return (
    <div className="fixed w-full h-full fcc backdrop-filter backdrop-blur-sm">
      <div className="p-4 rounded-lg bg-opacity-80 fcc ">{children}</div>
    </div>
  )
}

export default LoadingOverlay
