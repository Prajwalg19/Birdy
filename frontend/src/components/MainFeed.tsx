import {useEffect, useState} from "react"
import axios from "@/utils/axios"
import toast from "react-hot-toast"
import {AxiosError} from "axios"
import {useDispatch, useSelector} from "react-redux"
import {RootState} from "@/store"
import {IoMdPersonAdd} from "react-icons/io";
import {Link} from "react-router-dom"
import {IoPersonRemove} from "react-icons/io5";
import {setFriends, setPosts, setPost, setTempLike} from "@/features/authSlice"
import {postsStructure} from "@/utils/types"
import {calculateTime} from "@/utils/utilityFunctions"
import {BiMessageRounded} from "react-icons/bi"
import {FaHeart} from "react-icons/fa6"
import {CiHeart} from "react-icons/ci"
import Comment from "./CommentModal"
import Footer from "@/components/Footer";
import Spinner from "./Spinner"

export default function MainFeed() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<true | false>(false);
    const [clickedPost, setClickedPost] = useState<null | postsStructure>(null);
    const [friendLoading, setFriendLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const user = useSelector((store: RootState) => store.user.user)
    const posts = useSelector((store: RootState) => store.user.posts)
    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)
    useEffect(() => {
        async function fetchPosts() {
            try {
                setLoading(true);
                const response = await axios.get("/posts");

                const newResponse = response.data.map((item: postsStructure) => {
                    const time = new Date(item.createdAt).getTime()
                    item.createdAt = calculateTime(time)
                    return item;

                })
                dispatch(setPosts(newResponse))
                setLoading(false);


            } catch (e) {
                if (e instanceof AxiosError && e.response != undefined) {
                    toast.error("something bad happened")
                } else {
                    toast.error("Something went wrong")
                }
                setLoading(false);
            }
        }
        fetchPosts()
    }, [dispatch])
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
            toast.error("Something went wrong");
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
            toast.error("Something went wrong")
            if (user)
                dispatch(setTempLike({postId, userId: user._id}));
        }

    }
    if (loading) {
        return <Spinner />
    }

    return (
        posts && (
            <div className="flex flex-col h-full flex-nowrap gap-8 ">
                {

                    posts.map((post, index) => (
                        <div key={index} className="bg-white p-3 rounded-xl flex flex-col flex-nowrap justify-center gap-4 shadow-lg">
                            <section className="flex items-center justify-between">
                                <span className="flex items-center gap-4">
                                    <Link to={`/profile/${post.userId}`}><img src={`${post?.userPic}`} className="w-12 h-12 rounded-full" />
                                    </Link>
                                    <span className="flex flex-col justify-center">
                                        <p><span className="font-semibold capitalize"><Link to={`/profile/${post.userId}`}>{post?.firstName + " " + post?.lastName}</Link></span> <span className="p-1">&middot;</span> <span className="font-medium text-sm">{post.createdAt}</span></p>
                                        <p className="text-xs text-gray-500">{post?.location}</p>
                                    </span>

                                </span>
                                {friendLoading ? (<Spinner />) : post.userId == user?._id ? null : <button onClick={() => handleFriend(post.userId)}> {user?.friends && friendsId.includes(post.userId) ? <IoPersonRemove className="text-xl text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>
                                }
                            </section>
                            <div className="flex flex-col flex-nowrap gap-3">
                                <span>{post.description}</span>
                                {post?.postPicture && (<img src={post.postPicture} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />)}

                                {
                                    //<img src={`http://localhost:4000/assets/${post.postPicture}`} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />
                                }

                                <section className="flex flex-row items-center justify-around  px-2">
                                    <BiMessageRounded className="text-xl cursor-pointer" onClick={() => {setShowModal(!showModal); setClickedPost(post)}} />
                                    <div className="cursor-pointer transition ease-in-out flex flex-row gap-2 items-center" onClick={() => handleLike(post._id)}>
                                        {user?._id && post.likes[user._id] ? (< FaHeart className={`transition ease-in-out text-lg fill-pink-500`} />) : <CiHeart className="text-xl " />
                                        }
                                        <span className="text-sm text-gray-700 ">{Object.keys(post.likes).length}</span>

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
                        </div>

                    ))
                }
                {showModal && <Comment changeModalState={setShowModal} modalState={showModal} postInfo={clickedPost} />}
                <Footer />
            </div>



        )
    )

}
