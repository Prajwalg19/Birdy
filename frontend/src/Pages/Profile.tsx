import {Link, useParams} from "react-router-dom"
import UserCard from "@/components/UserCard"
import {useEffect, useState} from "react"
import axios from "@/utils/axios"
import {postsStructure} from "@/utils/types"
import {AxiosError} from "axios"
import toast from "react-hot-toast"
import {useSelector} from "react-redux"
import {RootState} from "@/store"
import {IoPersonRemove} from "react-icons/io5"
import {IoMdPersonAdd} from "react-icons/io"
import {useDispatch} from "react-redux"
import {logOut, setFriends, setPost, setPosts, setTempLike} from "@/features/authSlice"
import {calculateTime} from "@/utils/utilityFunctions"
import {BiMessageRounded} from "react-icons/bi";
import {CiHeart} from "react-icons/ci";
import {FaHeart} from "react-icons/fa";
import Spinner from "@/components/Spinner"
import Comment from "@/components/CommentModal"

export default function Profile() {
    const {user, posts} = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch();
    const param = useParams()
    const [showModal, setShowModal] = useState<true | false>(false);
    const [clickedPost, setClickedPost] = useState<null | postsStructure>(null);
    const [loading, setLoading] = useState(true);
    const [friendLoading, setFriendLoading] = useState(false);

    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)

    useEffect(() => {
        async function fetchUserPosts() {
            setLoading(true);
            try {
                const response = await axios.get(`posts/${param.userId}/posts/`)
                const newResponse = response.data.map((item: postsStructure) => {
                    const time = new Date(item.createdAt).getTime()
                    item.createdAt = calculateTime(time)
                    return item;

                })

                dispatch(setPosts(newResponse))
                setLoading(false);


            } catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    if (e.response.status == 403 || e.response.status == 401) {
                        toast.error("Session timedout");
                        dispatch(logOut())
                    }

                } else {
                    toast.error("Something went wrong")
                }

            }
            setLoading(false);

        }
        fetchUserPosts()

    }, [param.userId, user, dispatch])

    async function handleFriend(friendsId: string) {
        setFriendLoading(true);
        try {
            if (user) {
                const response = await axios.post(`user/${user._id}/${friendsId}`)
                dispatch(setFriends(response.data))
            }
            setFriendLoading(false);

        }
        catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 403 || e.response.status == 401) {
                    toast.error("Session timedout");
                    dispatch(logOut())
                }

            }
            setFriendLoading(false);
        }

    }

    async function handleLike(postId: string) {
        if (user)
            dispatch(setTempLike({postId, userId: user._id}));

        try {
            if (user) {
                const response = await axios.post(`/posts/${postId}/like`,
                    {
                        userId: user._id
                    })
                dispatch(setPost(response.data))

            }

        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 403 || e.response.status == 401) {
                    toast.error("Session timedout");
                    dispatch(logOut())
                }

            }
            if (user)
                dispatch(setTempLike({postId, userId: user._id}));
        }

    }
    if (loading) {
        return <Spinner />
    }


    return (
        param.userId && (
            <div className="lg:max-w-6xl lg:mx-auto flex w-full flex-col md:flex-row h-full gap-6 px-5 py-6">
                <span className="md:w-[40%] h-full lg:sticky top-16">
                    <UserCard userId={param.userId} />

                </span>
                {
                    loading ? (<div className="md:w-[60%] mt-20 lg:mt-0 flex justify-center items-center"><Spinner /></div>) : posts && posts != null && posts?.length != 0 ? (<div className="flex flex-col flex-nowrap gap-8 md:w-[60%]">
                        {

                            posts.map((post, index) => (
                                <div key={index} className=" border dark:border-gray-600 dark:bg-gray-900 dark:text-slate-200 text-black bg-white px-7 py-3 rounded-xl flex flex-col flex-nowrap justify-center gap-4 shadow-lg">
                                    <section className="flex items-center justify-between">
                                        <span className="flex items-center gap-4">
                                            <span><img src={`${post?.userPic}`} className="w-12 h-12 rounded-full" />
                                            </span>
                                            <span className="flex flex-col justify-center">
                                                <p><span className="font-semibold">{post?.firstName + " " + post?.lastName}</span> <span className="p-1">&middot;</span> <span className="font-medium text-sm">{post.createdAt}</span></p>
                                                <p className="text-sm text-gray-500">{post?.location}</p>
                                            </span>

                                        </span>
                                        {friendLoading ? (<Spinner />) : post.userId == user?._id ? null : <button onClick={() => handleFriend(post.userId)}> {user?.friends && friendsId.includes(post.userId) ? <IoPersonRemove className="text-xl text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>
                                        }
                                    </section>
                                    <div className="flex flex-col flex-nowrap gap-6">
                                        <span>{post.description}</span>
                                        {post.postPicture && (<img src={`${post.postPicture}`} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />
                                        )}
                                    </div>
                                    <section className="flex flex-row items-center justify-around  px-2">
                                        <BiMessageRounded className="text-xl cursor-pointer" onClick={() => {setShowModal(!showModal); setClickedPost(post)}} />
                                        <div className="cursor-pointer transition ease-in-out flex flex-row gap-2 items-center" onClick={() => handleLike(post._id)}>
                                            {user?._id && post.likes[user._id] ? (< FaHeart className={`transition ease-in-out text-lg fill-pink-500`} />) : <CiHeart className="text-xl " />
                                            }
                                            <span className="text-sm text-black dark:text-slate-200">{Object.keys(post.likes).length}</span>

                                        </div>
                                    </section>
                                    <section className="flex flex-col items-center gap-3 w-full px-2">
                                        {post.comments.length != 0 && post.comments.map((comment, index) => (
                                            <span className="w-full" key={index}>
                                                <div className="relative flex py-3 items-center w-full">
                                                    <div className="flex-grow border-t border-gray-400/80"></div>
                                                    <div className="flex-grow border-t border-gray-400/80"></div>
                                                </div>
                                                <span className="flex flex-col gap-3">
                                                    <span className="flex gap-5 items-center">
                                                        <Link to={`/profile/${comment[0].userId}`}>                                                    <img className="h-8 w-8 rounded-full" src={`${comment[0].userPic}`}></img>
                                                        </Link>
                                                        <span className="flex flex-col justify-center">
                                                            <div className="capitalize "><Link to={`/profile/${comment[0].userId}`}>{comment[0].firstName + " " + comment[0].lastName}</Link></div>
                                                            <div className="text-xs text-gray-500">{comment[0].location}</div>
                                                        </span>

                                                    </span>

                                                    <div className="">{comment[0].commentDescription}</div>

                                                </span>
                                            </span>
                                        ))}

                                    </section>

                                </div>

                            ))
                        }
                        {showModal && <Comment changeModalState={setShowModal} modalState={showModal} postInfo={clickedPost} />}
                    </div>


                    ) : (<div className="flex items-center md:w-[60%] justify-center text-black dark:text-white">User has no posts</div>)
                }
            </div>

        )
    )
}
