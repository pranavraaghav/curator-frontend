function DropdownItem({children, icon, iconClass}) {
    return (
        <a className="flex flex-row items-center justify-start p-2 space-x-4 transition-all duration-300 ease-in-out hover:bg-bg">
            <span className= {iconClass} >{icon}</span>
            <div className="text-lg">
                {children}
            </div>
        </a>
    );
}

export default DropdownItem;