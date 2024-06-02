import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/store"
import {useEffect, useState} from "react"
import axios from "@/utils/axios"
import {logOut, setFriends} from "@/features/authSlice"
import {IoMdPersonAdd} from "react-icons/io"
import {IoPersonRemove} from "react-icons/io5"
import toast from "react-hot-toast"
import Spinner from "./Spinner"
import {AxiosError} from "axios"

export default function FriendsList() {
    const {user} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchFriends() {
            try {
                setLoading(true);
                const response = await axios.get(`/user/${user?._id}/friends`)
                dispatch(setFriends(response.data));
                setLoading(false);
            } catch (e) {
                if (e instanceof AxiosError && e.response) {
                    if (e.response.status == 404) {
                        toast.error("Endpoint not found")
                    }
                    else if (e.status == 403 || e.status == 401) {
                        dispatch(logOut())
                    }


                } else {

                    toast.error("Something went wrong");
                }
                setLoading(false);
            }

        }
        fetchFriends()
    }, [user?._id, dispatch])
    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)

    async function handleFriend(friendsId: string) {
        try {
            if (user) {
                const response = await axios.post(`user/${user._id}/${friendsId}`)
                dispatch(setFriends(response.data))
            }

        }
        catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 404) {
                    toast.error("Endpoint not found")
                }
                else if (e.status == 403 || e.status == 401) {
                    dispatch(logOut())
                }


            }
            else {
                toast.error("Something went wrong");
            }
        }

    }
    if (loading) {
        return <Spinner />
    }
    return (
        user?.friends.length != 0 && (
            <main className="border dark:border-gray-600 lg:sticky top-3 bg-white rounded-xl w-full h-auto flex flex-col justify-center gap-6 p-5 text-black dark:text-slate-200 dark:bg-gray-900" id="friends">
                <h1 className="text-black dark:text-slate-200 font-semibold text-center">Your friends</h1>
                <div className="flex flex-col gap-6">
                    {user?.friends.map((friend, index) => (
                        <section key={index} className="flex justify-between items-center">
                            <span className="flex flex-row gap-4 items-center">
                                <img src={`${friend.photoPath}`} alt="user profile pic" className="h-12 w-12 rounded-full dark:border-2 dark:border-slate-400 " />
                                <span className="text-sm flex flex-col justify-center ">
                                    <span className="font-semibold">{friend.firstName + " " + friend?.lastName}</span>
                                    <span className="dark:text-slate-400 text-gray-600/80"> {friend?.occupation}</span>
                                </span>
                            </span>
                            <span>
                                <button onClick={() => handleFriend(friend._id)}> {friendsId.includes(friend._id) ? <IoPersonRemove className="text-xl text-blue-500 dark:text-blue-700" /> : <IoMdPersonAdd className="text-xl" />}</button>


                            </span>
                        </section>
                    )
                    )
                    }

                </div>
            </main>

        )


    )
}
