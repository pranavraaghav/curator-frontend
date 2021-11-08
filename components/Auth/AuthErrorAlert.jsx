
function AuthErrorAlert( {label} ) {
    return (
        <div className="p-2 mb-4 space-x-2 bg-red-400 rounded-md frc lg:w-auto">
            <span className="text-3xl material-icons-outlined">error_outline</span>
            <strong>{label}</strong>
        </div>
    )
}

export default AuthErrorAlert
