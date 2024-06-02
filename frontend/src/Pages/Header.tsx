import {FaMoon} from "react-icons/fa";
import {FaSun} from "react-icons/fa6";
import {MdMessage} from "react-icons/md";
import {IoMdHelpCircle} from "react-icons/io";
import {IoSearch} from "react-icons/io5";
import {IoIosNotifications} from "react-icons/io";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeTheme, logOut} from "@/features/authSlice";
import {useState} from "react";
import {FiMenu} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {SiThunderbird} from "react-icons/si";
export default function Header() {
    const {theme, user, token} = useSelector((store: RootState) => store.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    function handleModal() {
        setModal(!modal)
    }
    let userName = ""
    if (user && user.firstName && user.lastName) {
        userName = user.firstName + " " + user.lastName

    }
    function handleDropDown(e: React.ChangeEvent<HTMLSelectElement>) {
        if (e.target.value == "userProfile") navigate(`/profile/${user?._id}`)
        else if (e.target.value == "feed") navigate(`/`)
        else if (e.target.value == "logOut") dispatch(logOut());
    }
    return (
        token ? (

            <header className="transition-all dark:bg-gray-950 z-50  bg-white shadow-lg w-full sticky top-0 p-2">
                <main className="max-w-[105rem] mx-auto flex justify-between items-center">
                    <div className=" text-black font-bold text-3xl flex items-center gap-6">
                        <button className="p-2 block md:hidden dark:text-black text-white" onClick={() => handleModal()}>

                            <FiMenu className="dark:text-white text-xl text-black" />
                        </button>

                        <button onClick={() => navigate("/")} className="flex items-center gap-4 dark:text-white text-black "><SiThunderbird className="text-xl" /><p>Birdy </p></button>
                        <section className="hidden md:block text-base relative ">
                            <input type="text" placeholder="Search" className="text-black dark:bg-slate-800 dark:border-slate-600  dark:text-slate-100 border-black/60 rounded-full px-3 py-1 border border-gray-400" />
                            <IoSearch className="absolute bottom-[6px] right-2 text-lg text-black dark:text-slate-200" />
                        </section>

                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        <div className="flex items-center dark:text-white text-black gap-10 transition">
                            <button onClick={() => dispatch(changeTheme())}>{theme == "dark" ? <FaMoon className="text-sm" /> : <FaSun className="text-sm" />}
                            </button>
                            <span>
                                <MdMessage className="text-lg" />
                            </span>
                            <span>
                                <IoIosNotifications className="text-xl" />
                            </span>
                            <span>
                                <IoMdHelpCircle className="text-xl" />
                            </span>
                        </div>
                        <select className="bg-white dark:bg-black/50 dark:text-white px-4 py-1 rounded-lg" onChange={(e) => {handleDropDown(e)}}>
                            <option value="feed" >Feed</option>
                            <option value="userProfile">{userName}</option>
                            <option value="logOut">Logout</option>
                        </select>

                    </div>

                    <section className="md:hidden block text-base relative ">
                        <input type="text" className="w-9 px-2 py-1 rounded-full dark:bg-slate-800 bg-white dark:text-slate-200 border dark:border-gray-600 text-black" />
                        <IoSearch className="absolute bottom-[6px] right-2 text-lg text-black dark:text-slate-300" />
                    </section>
                </main>

                <section className={`flex gap-10 items-center flex-col z-50 dark:bg-gray-950 bg-slate-50 left-0 top-0 h-full w-full md:hidden transition duration-200 fixed ${modal ? "translate-x-0" : "-translate-x-full"}`}>

                    <div className="flex justify-between py-2 px-5 w-full items-center dark:text-white text-black text-xl">
                        <button onClick={() => navigate("/")} className="font-bold italic flex  items-center gap-6"><SiThunderbird className="text-xl" /><p>Birdy </p></button>
                        <button onClick={handleModal}><AiOutlineClose className="" /> </button>
                    </div>


                    <div className="text-black dark:text-white grid grid-cols-2 grid-rows-2 gap-3 px-3 w-full">
                        <button className="flex justify-center p-20 items-center border rounded-lg  border-gray-400/20 w-full" onClick={() => dispatch(changeTheme())}>{theme == "light" ? <FaMoon className="text-4xl" /> : <FaSun className="text-4xl" />}
                        </button>
                        <span className="flex justify-center p-20 items-center rounded-lg border border-gray-400/20 w-full"><MdMessage className="text-4xl" /> </span>
                        <span className="flex justify-center p-20 items-center rounded-lg border border-gray-400/20 w-full">
                            <IoIosNotifications className="text-4xl" />
                        </span>
                        <span className="flex justify-center p-20 items-center rounded-lg border border-gray-400/20 w-full">
                            <IoMdHelpCircle className="text-4xl" />
                        </span>

                    </div>
                    <select className="px-4 py-1 rounded-lg dark:bg-gray-950 dark:text-white text-black bg-neutral-50" onChange={(e) => {handleDropDown(e)}}>
                        <option value="feed">Feed</option>
                        <option value="userProfile">{userName}</option>
                        <option value="logOut">Logout</option>
                    </select>

                </section>


            </header>
        ) : null

    )


}
{
    //<div className="bg-white text-black flex justify-center py-5 px-5 w-full items-center  text-xl">
    //<div className="font-bold italic flex text-3xl items-center gap-6"><SiThunderbird className="text-3xl" /><p>Birdy </p></div>
    //</div>
}

