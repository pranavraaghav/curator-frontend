

function Dropdown({children}) {
    return (
        <div className="absolute top-0 z-10 w-auto px-2 py-4 overflow-hidden border-2 border-gray-400 border-solid rounded-md bg-block">
            {children}
        </div>
    );
}




export default Dropdown;