import {useParams} from "react-router-dom"
import UserCard from "@/components/UserCard"
import {useEffect} from "react"
import axios from "@/utils/axios"
import {postsStructure} from "@/utils/types"
import {AxiosError} from "axios"
import toast from "react-hot-toast"
import {useSelector} from "react-redux"
import {RootState} from "@/store"
import {IoPersonRemove} from "react-icons/io5"
import {IoMdPersonAdd} from "react-icons/io"
import {useDispatch} from "react-redux"
import {setFriends, setPost, setPosts} from "@/features/authSlice"
import {calculateTime} from "@/utils/utilityFunctions"
import {BiMessageRounded} from "react-icons/bi";
import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";

export default function Profile() {
    const {user, posts} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();
    const param = useParams()
    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)

    useEffect(() => {
        async function fetchUserPosts() {
            try {
                const response = await axios.get(`posts/${param.userId}/posts/`)
                const newResponse = response.data.map((item: postsStructure) => {
                    const time = new Date(item.createdAt).getTime()
                    item.createdAt = calculateTime(time)
                    return item;

                })

                dispatch(setPosts(newResponse))


            } catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    toast.success("ok");

                } else {
                    toast.error("Something went wrong")
                }

            }

        }
        fetchUserPosts()

    }, [param.userId, user, dispatch])

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

    async function handleLike(postId: string) {
        try {
            if (user) {
                const response = await axios.post(`/posts/${postId}/like`,
                    {
                        userId: user._id
                    })
                dispatch(setPost(response.data))

            }

        } catch (e) {
            toast.error("Something went wrong")
        }

    }
    return (
        param.userId && posts != null && posts?.length != 0 ? (
            <div className="lg:max-w-6xl lg:mx-auto flex w-full flex-col md:flex-row h-full gap-6 px-5 py-6">
                <p className="md:w-[40%]">
                    <UserCard userId={param.userId} />

                </p>
                <div className="flex flex-col flex-nowrap gap-8 md:w-[60%]">
                    {

                        posts.map((post, index) => (
                            <div key={index} className="bg-white p-7 rounded-xl flex flex-col flex-nowrap justify-center gap-4 shadow-lg">
                                <section className="flex items-center justify-between">
                                    <span className="flex items-center gap-4">
                                        <span><img src={`${post?.userPic}`} className="w-12 h-12 rounded-full" />
                                        </span>
                                        <span className="flex flex-col justify-center">
                                            <p><span className="font-semibold">{post?.firstName + " " + post?.lastName}</span> <span className="p-1">&middot;</span> <span className="font-medium text-sm">{post.createdAt}</span></p>
                                            <p className="text-sm text-gray-500">{post?.location}</p>
                                        </span>

                                    </span>
                                    {post.userId == user?._id ? null : <button onClick={() => handleFriend(post.userId)}> {user?.friends && friendsId.includes(post.userId) ? <IoPersonRemove className="text-xl text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>
                                    }
                                </section>
                                <div className="flex flex-col flex-nowrap gap-6">
                                    <span>{post.description}</span>
                                    {post.postPicture && (<img src={`${post.postPicture}`} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />
                                    )}
                                </div>
                                <section className="flex flex-row items-center justify-around  px-2">
                                    <BiMessageRounded className="text-xl" />
                                    <div className="transition ease-in-out flex flex-row gap-2 items-center" onClick={() => handleLike(post._id)}>
                                        {user?._id && post.likes[user._id] != undefined ? (< FaHeart className={`transition ease-in-out text-lg fill-pink-500`} />) : <CiHeart className="text-xl" />
                                        }
                                        <span className="text-sm text-gray-700 ">{Object.keys(post.likes).length}</span>

                                    </div>
                                </section>

                            </div>

                        ))
                    }
                </div>

            </div>

        ) : null
    )
}
