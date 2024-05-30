import {useEffect} from "react"
import axios from "@/utils/axios"
import toast from "react-hot-toast"
import {AxiosError} from "axios"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/store"
import {IoMdPersonAdd} from "react-icons/io";
import {Link} from "react-router-dom"
import {IoPersonRemove} from "react-icons/io5";
import {setFriends, setPosts} from "@/features/authSlice"
import {postsStructure} from "@/utils/types"
import {calculateTime} from "@/utils/utilityFunctions"
export default function MainFeed() {
    const dispatch = useDispatch();
    const user = useSelector((store: RootState) => store.user.user)
    const posts = useSelector((store: RootState) => store.user.posts)
    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axios.get("/posts");

                console.log(response.data)
                const newResponse = response.data.map((item: postsStructure) => {
                    const time = new Date(item.createdAt).getTime()
                    item.createdAt = calculateTime(time)
                    return item;

                })
                dispatch(setPosts(newResponse))


            } catch (e) {
                if (e instanceof AxiosError && e.response != undefined) {
                    toast.error("something bad happened")
                } else {
                    toast.error("Something went wrong")
                }
            }
        }
        fetchPosts()
    }, [dispatch])
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
        posts && (
            <div className="flex flex-col flex-nowrap gap-8 ">
                {

                    posts.map((post, index) => (
                        <div key={index} className="bg-white p-7 rounded-xl flex flex-col flex-nowrap justify-center gap-4 shadow-lg">
                            <section className="flex items-center justify-between">
                                <span className="flex items-center gap-4">
                                    <Link to={`/profile/${post.userId}`}><img src={`http://localhost:4000/assets/${post?.userPic}`} className="w-12 h-12 rounded-full" />
                                    </Link>
                                    <span className="flex flex-col justify-center">
                                        <p><span className="font-semibold">{post?.firstName + " " + post?.lastName}</span> <span className="p-1">&middot;</span> <span className="font-medium text-sm">{post.createdAt}</span></p>
                                        <p>{post?.location}</p>
                                    </span>

                                </span>
                                {post.userId == user?._id ? null : <button onClick={() => handleFriend(post.userId)}> {user?.friends && friendsId.includes(post.userId) ? <IoPersonRemove className="text-xl text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>
                                }
                            </section>
                            <div className="flex flex-col flex-nowrap gap-6">
                                <span>{post.description}</span>
                                <img src={`http://localhost:4000/assets/${post.postPicture}`} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />
                            </div>
                        </div>

                    ))
                }
            </div>


        )
    )

}
