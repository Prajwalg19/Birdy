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
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {UserCardSkeleton} from "@/Pages/Skeletons";

export default function UserCard({userId}: {userId: string | null}) {
    const [userInfo, setUserInfo] = useState<userStructure | null>(null);
    const [loading, setLoading] = useState(true);
    const {user} = useSelector((store: RootState) => store.user)
    useEffect(() => {

        async function fetchUser() {
            try {
                if (userId) {
                    const response = await axios.get(`http://localhost:4000/user/${userId}`)
                    setUserInfo(response.data.user);
                }
                setLoading(false);
            } catch (e) {
                setLoading(false);
                toast.error("Something went wrong")
            }
        }

        fetchUser()
    }, [userId, user])
    if (loading) {
        return <UserCardSkeleton />
    }

    return (
        userInfo && (
            <section className="flex flex-col justify-center w-full bg-white rounded-2xl  border border-black/10 h-[520px] shadow-lg px-10" >
                <div className="flex justify-between items-center w-full">
                    <section className="flex items-center gap-4">
                        <img src={`http://localhost/assets/${userInfo?.photoPath}`} className="rounded-full h-10 w-10 bg-purple-600" />
                        <span className="flex flex-col justify-center">
                            <span className="text-lg capitalize font-semibold">{userInfo.firstName + " " + userInfo.lastName}</span>
                            <span className="text-sm text-gray-500">{userInfo.friends?.length} Friends</span>
                        </span>

                    </section>
                    <section ><IoMdPerson className="text-xl" /></section>
                </div>

                <Divider />

                <div className="text-gray-500 flex flex-col gap-3 justify-center ">
                    <span className="flex  items-center flex-row gap-6"><ImLocation2 className="text-xl" /><span className="text-sm">{userInfo.location}</span></span>
                    <span className="flex items-center flex-row gap-6"><MdWork className="text-xl" /> <span className="text-sm">{userInfo.occupation}</span></span>
                </div>
                <Divider />

                <div className="text-gray-500">
                    <span className="flex text-sm justify-between items-center"><p>Your account is viewed by </p><span>{userInfo.viewedProfile}</span></span>
                    <span className="flex text-sm justify-between items-center"><p>Impressions on your posts  </p><span>{userInfo.impression}</span> </span>
                </div>
                <Divider />

                <div className="flex flex-col gap-6">
                    <h1 className="text-lg text-center text-gray-700 ">Social Profiles</h1>
                    <section className="flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <p><FaXTwitter className="text-xl" /></p>
                            <span className="flex-col justify-center ">
                                <div className="font-medium">X</div>
                                <div className="text-gray-500 text-sm">@{userInfo.firstName as string + Math.floor(Math.random() * 100)}</div>

                            </span>
                        </div>
                        <div><FaPencilAlt className="text-base text-gray-500" /></div>
                    </section>
                    <section className="flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <p> <FaLinkedin className="text-xl" /> </p>
                            <span className="flex-col justify-center">
                                <div className="font-medium">LinkdIn</div>
                                <div className="text-gray-500 text-sm">@{userInfo.lastName as string + Math.floor(Math.random() * 100)}</div>

                            </span>
                        </div>
                        <div><FaPencilAlt className="text-base text-gray-500" /></div>
                    </section>
                </div>
            </section >

        )
    )
}
