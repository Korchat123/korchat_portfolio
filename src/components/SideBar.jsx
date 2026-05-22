export default function SideBar(){
    return (
    <div className="flex flex-col w-[20vw] min-h-screen fixed bg-gray-800 text-white p-4">
        Side Bar
        <ul>
            <li className="hover:bg-gray-600 p-2 cursor-pointer">my Portfolio</li>
            <li className="hover:bg-gray-600 p-2 cursor-pointer">my Projects</li>
            <li className="hover:bg-gray-600 p-2 cursor-pointer">tech stack</li>    
            <li className="hover:bg-gray-600 p-2 cursor-pointer">education</li>    
            <li className="hover:bg-gray-600 p-2 cursor-pointer">work experience</li>    
            <li className="hover:bg-gray-600 p-2 cursor-pointer">contact</li>    
        </ul>


    </div>
    )

}




