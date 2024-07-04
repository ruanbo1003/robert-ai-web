
import NavUser from "@/app/home/components/nav-user"


export default function TopNavBar() {
    return (
        <div className="w-full h-[60px] m-0 p-0 bg-stone-50">
            <nav className="bg-stone-200 shadow-md">
                <div className="w-full flex list-none justify-between items-center h-[60px]">
                    <div className="text-xl">
                        <a href="#" className="flex h-full px-4 items-center text-black hover:bg-gray-200">Robert Tools</a>
                    </div>

                    <div>
                        <ul className="w-full flex list-none justify-end items-center h-[60px]">
                            <li className="">
                                <a href="#" className="flex h-full px-4 items-center text-black hover:bg-gray-200">Products</a>
                            </li>
                            <li className="">
                                <a href="#" className="flex h-full px-4 items-center text-black hover:bg-gray-200">Profile</a>
                            </li>
                            <li className="">
                                <a href="#" className="flex h-full px-4 items-center text-black hover:bg-gray-200">Contact</a>
                            </li>
                            <li className="">
                                <a href="#" className="flex h-full px-4 items-center text-black hover:bg-gray-200">Github</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-center items-center space-x-4 mr-5">
                        <input type="search" placeholder="Search..." className="bg-stone-100 outline-none pl-1 rounded" >
                        </input>
                        <NavUser/>

                    </div>
                </div>
            </nav>
        </div>
    )
}
