import {useEffect, useState} from "react";
import axios from "@/utils/axios";
import toast from "react-hot-toast";
import Divider from "./Divider";
import {IoMdPerson} from "react-icons/io";
import {MdWork} from "react-icons/md";
import {ImLocation2} from "react-icons/im";
import {FaXTwitter} from "react-icons/fa6";
import {FaLinkedin} from "react-icons/fa6";
import {FaPencilAlt} from "react-icons/fa";
import {userStructure} from "@/utils/types";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {UserCardSkeleton} from "@/Pages/Skeletons";
import {Link} from "react-router-dom";
import {AxiosError} from "axios";
import {logOut} from "@/features/authSlice";

export default function UserCard({userId}: {userId: string | null}) {
    const [userInfo, setUserInfo] = useState<userStructure | null>(null);
    const [loading, setLoading] = useState(true);
    const {user} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();
    useEffect(() => {

        async function fetchUser() {
            try {
                if (userId) {
                    const response = await axios.get(`user/${userId}`)
                    setUserInfo(response.data.user);
                }
                setLoading(false);
            } catch (e) {
                if (e instanceof AxiosError && e.response) {
                    if (e.response.status == 404) {
                        toast.error("Endpoint not found")
                    }
                    else if (e.status == 403 || e.status == 401) {
                        toast.error("Session timedout")
                        dispatch(logOut())
                    }
                }
                else {
                    toast.error("Something went wrong")
                }

                setLoading(false);
            }
        }

        fetchUser()
    }, [userId, user, dispatch])
    if (loading) {
        return <UserCardSkeleton />
    }

    return (
        userInfo && (
            <div className="dark:border-slate-600 dark:bg-gray-900 dark:text-slate-200 text-black lg:sticky top-3 flex flex-col justify-center w-full bg-white rounded-2xl  border border-black/10 h-[520px] shadow-lg px-10" >
                <div className="flex justify-between items-center w-full">
                    <section className="flex items-center gap-4">
                        <Link to={`/profile/${userInfo._id}`}> <img src={`${userInfo?.photoPath}`} className="dark:border-2 dark:border-slate-400 rounded-full h-10 w-10 bg-purple-600" /> </Link>
                        <span className="flex flex-col justify-center">
                            <span className="text-lg capitalize font-semibold"><Link to={`/profile/${userInfo._id}`}>{userInfo.firstName + " " + userInfo.lastName}</Link></span>
                            <span className="text-xs text-gray-500 dark:text-gray-300"><a href="#friends"> friends {userInfo.friends.length}</a></span>
                        </span>

                    </section>
                    <section ><IoMdPerson className="text-xl" /></section>
                </div>

                <Divider />

                <div className="text-gray-500  dark:text-gray-300 flex flex-col gap-3 justify-center ">
                    <span className="flex  items-center flex-row gap-6"><ImLocation2 className="text-xl" /><span className="text-sm">{userInfo.location}</span></span>
                    <span className="flex items-center flex-row gap-6"><MdWork className="text-xl" /> <span className="text-sm">{userInfo.occupation}</span></span>
                </div>
                <Divider />

                <div className="text-gray-500 dark:text-gray-400">
                    <span className="flex text-sm justify-between items-center"><span>Your account is viewed by </span><span>{userInfo.viewedProfile}</span></span>
                    <span className="flex text-sm justify-between items-center"><span>Impressions on your posts  </span><span>{userInfo.impression}</span> </span>
                </div>
                <Divider />

                <div className="flex flex-col gap-6">
                    <span className="text-lg text-center dark:text-gray-300 text-gray-700 ">Social Profiles</span>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <span><FaXTwitter className="text-xl" /></span>
                            <span className="flex-col justify-center ">
                                <div className="font-medium">X</div>
                                <div className="text-gray-500 text-sm">@{userInfo.firstName as string + Math.floor(Math.random() * 100)}</div>

                            </span>
                        </div>
                        <div><FaPencilAlt className="text-base text-gray-500" /></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <span> <FaLinkedin className="text-xl" /> </span>
                            <span className="flex-col justify-center">
                                <div className="font-medium">LinkdIn</div>
                                <div className="text-gray-500 text-sm">@{userInfo.lastName as string + Math.floor(Math.random() * 100)}</div>

                            </span>
                        </div>
                        <div><FaPencilAlt className="text-base text-gray-500" /></div>
                    </div>
                </div>
            </div >

        )
    )
}
