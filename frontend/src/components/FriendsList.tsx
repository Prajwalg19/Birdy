import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/store"
import {useEffect} from "react"
import axios from "@/utils/axios"
import {setFriends} from "@/features/authSlice"
import {IoMdPersonAdd} from "react-icons/io"
import {IoPersonRemove} from "react-icons/io5"
import toast from "react-hot-toast"

export default function FriendsList() {
    const {user} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchFriends() {
            const response = await axios.get(`/user/${user?._id}/friends`)
            dispatch(setFriends(response.data));

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
            toast.error("Something went wrong");
        }

    }
    return (
        <main className="bg-white rounded-xl w-full h-auto flex flex-col justify-center gap-6 p-5">
            <h1 className="font-semibold text-center">Your friends</h1>
            <div className="flex flex-col gap-6">
                {user?.friends.map((friend, index) => (
                    <section key={index} className="flex justify-between items-center">
                        <span className="flex flex-row gap-4 items-center">
                            <img src={`http://localhost:4000/assets/${friend.photoPath}`} alt="user profile pic" className="h-12 w-12 rounded-full" />
                            <span className="text-sm flex flex-col justify-center ">
                                <span className="font-semibold">{friend.firstName + " " + friend?.lastName}</span>
                                <span className="text-gray-600/80"> {user?.occupation}</span>
                            </span>
                        </span>
                        <span>
                            <button onClick={() => handleFriend(friend._id)}> {friendsId.includes(friend._id) ? <IoPersonRemove className="text-xl text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>


                        </span>
                    </section>
                )
                )
                }

            </div>
        </main>

    )
}
