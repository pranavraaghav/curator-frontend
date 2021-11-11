function DashboardActionBarButton({ children }) {
  return (
    <div className="flex items-center justify-center w-auto p-2 space-x-1 transition duration-300 ease-in-out rounded-lg cursor-pointer text-bg bg-primary hover:brightness-125">
      {children}
    </div>
  )
}

export default DashboardActionBarButton
