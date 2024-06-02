import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import axios from "@/utils/axios"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {BiMessageRounded} from "react-icons/bi";
import {CiHeart} from "react-icons/ci";
import {postsStructure} from "@/utils/types";
import Spinner from "@/components/Spinner";
import {IoPersonRemove} from "react-icons/io5";
import {IoMdPersonAdd} from "react-icons/io";
import {logOut, setFriends, setPost, setPosts, setTempLike} from "@/features/authSlice";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {calculateTime} from "@/utils/utilityFunctions";
import {FaHeart} from "react-icons/fa6";
import Comment from "@/components/CommentModal";
import UserCard from "@/components/UserCard";
import FriendsList from "@/components/FriendsList";
import Advert from "@/components/Advert";
export default function SearchPage() {
    const {search} = useLocation();
    const [friendLoading, setFriendLoading] = useState(false);
    const posts = useSelector((store: RootState) => store.user.posts)
    const user = useSelector((store: RootState) => store.user.user)
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState<true | false>(false);
    const [clickedPost, setClickedPost] = useState<null | postsStructure>(null);
    const [loading, setLoading] = useState(true);
    let friendsId: string[];
    if (user?.friends)
        friendsId = Object.values(user?.friends).map((friend) => friend._id)


    useEffect(() => {
        async function searchPosts() {
            try {
                const response = await axios.get(`posts/search/${search}`)
                const newResponse = response.data.map((item: postsStructure) => {
                    const time = new Date(item.createdAt).getTime()
                    item.createdAt = calculateTime(time)
                    return item;

                })
                dispatch(setPosts(newResponse))
                setLoading(false);
            }
            catch (e) {
                if (e instanceof AxiosError && e.response != undefined) {
                    if (e.response.status == 401 || e.response.status == 403)
                        dispatch(logOut())
                } else {
                    toast.error("Something went wrong")
                }
                setLoading(false);
            }
        }

        searchPosts()
    }, [search, dispatch])

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
            if (e instanceof AxiosError && e.response)
                if (e.response.status == 403 || e.response.status == 401) {
                    toast.error("Session timedout");
                    dispatch(logOut())

                } else {
                    toast.error("Something went wrong")
                }
            if (user)
                dispatch(setTempLike({postId, userId: user._id}));
        }

    }
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
            if (e instanceof AxiosError && e.response)
                if (e.response.status == 403 || e.response.status == 401) {
                    toast.error("Session timedout");
                    dispatch(logOut())

                } else {
                    toast.error("Something went wrong")
                }
            setFriendLoading(false);
        }

    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen w-full"><Spinner /> </div>

    }

    return (
        <>

            <div className="flex flex-col lg:mx-auto my-5 lg:max-w-[100rem] px-5 lg:flex-row gap-10 w-full">
                <section className="lg:sticky h-full lg:top-16 w-full lg:w-[28%] order-1 lg:order-1">
                    {user && (<UserCard userId={user._id} />)}
                </section>
                {posts && posts.length != 0 ? (
                    <section className="w-full  gap-10 lg:w-[44%] order-2 lg:order-2">
                        <div className=" flex flex-col h-full flex-nowrap gap-8 ">
                            <h1 className="text-black dark:text-white font-semibold text-xl text-center">Search results</h1>
                            {

                                posts.map((post, index) => (
                                    <div key={index} className="border  dark:border-slate-600/80 text-black dark:text-slate-200 dark:bg-gray-900 bg-white p-3 rounded-xl flex flex-col flex-nowrap justify-center gap-4 shadow-lg">
                                        <section className="flex items-center justify-between">
                                            <span className="flex items-center gap-4">
                                                <Link to={`/profile/${post.userId}`}><img src={`${post?.userPic}`} className="dark:border-2 dark:border-slate-400 w-12 h-12 rounded-full" />
                                                </Link>
                                                <span className="flex flex-col justify-center">
                                                    <p><span className="font-semibold capitalize"><Link to={`/profile/${post.userId}`}>{post?.firstName + " " + post?.lastName}</Link></span> <span className="p-1">&middot;</span> <span className="font-medium text-sm">{post.createdAt}</span></p>
                                                    <p className="dark:text-gray-400 text-xs text-gray-500">{post?.location}</p>
                                                </span>

                                            </span>
                                            {friendLoading ? (<Spinner />) : post.userId == user?._id ? null : <button onClick={() => handleFriend(post.userId)}> {user?.friends && friendsId.includes(post.userId) ? <IoPersonRemove className="text-xl dark:text-blue-700 text-blue-500" /> : <IoMdPersonAdd className="text-xl" />}</button>
                                            }
                                        </section>
                                        <div className="flex flex-col flex-nowrap gap-3">
                                            <span>{post.description}</span>
                                            {post?.postPicture && (<img src={post.postPicture} className="dark:border-2 dark:border-slate-600 w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />)}

                                            {
                                                //<img src={`http://localhost:4000/assets/${post.postPicture}`} className="w-[100%] h-[450px] object-cover rounded-xl border border-black/20" />
                                            }

                                            <section className="flex flex-row items-center justify-around px-2">
                                                <BiMessageRounded className="text-xl cursor-pointer text-black dark:text-slate-200" onClick={() => {setShowModal(!showModal); setClickedPost(post)}} />
                                                <div className="cursor-pointer transition ease-in-out flex flex-row gap-2 items-center" onClick={() => handleLike(post._id)}>
                                                    {user?._id && post.likes[user._id] ? (< FaHeart className={`text-black dark:text-slate-200  transition ease-in-out text-lg fill-pink-500`} />) : <CiHeart className="text-xl text-black dark:text-slate-200 " />
                                                    }
                                                    <span className="text-sm text-black dark:text-slate-200 ">{Object.keys(post.likes).length}</span>

                                                </div>
                                            </section>
                                            <section className="flex flex-col dark:text-slate-200 text-black items-center gap-3 w-full px-4">
                                                {post.comments.length != 0 && post.comments.map((comment, index) => (
                                                    <span className="w-full" key={index}>
                                                        <div className="relative flex py-3 items-center w-full">
                                                            <div className="flex-grow border-t dark:border-gray-600 border-gray-400/80"></div>
                                                            <div className="flex-grow border-t dark:border-gray-600 border-gray-400/80"></div>
                                                        </div>
                                                        <span className="flex flex-col gap-3">
                                                            <span className="flex gap-5 items-center">
                                                                <Link to={`/profile/${comment[0].userId}`}>                                                    <img className="dark:border-2 dark:border-slate-400 h-8 w-8 rounded-full" src={`${comment[0].userPic}`}></img>
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
                        </div>
                    </section>
                ) : <div className="w-full  gap-10 lg:w-[44%] order-2 lg:order-2 dark:text-white text-black font-semibold text-xl flex justify-center items-center">No matches found</div>
                }
                <section className="h-full hidden  lg:sticky lg:top-16 w-full lg:flex flex-col gap-10 lg:w-[28%] order-2 lg:order-3">
                    <FriendsList />
                    <Advert />
                </section>


            </div>


        </>
    )
}
