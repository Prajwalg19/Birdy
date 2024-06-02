import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {logOut, setComment} from "@/features/authSlice";
import {useState} from "react";
import {RxCross2} from "react-icons/rx";
import axios from "@/utils/axios";
import {postsStructure} from "@/utils/types";
import {RootState} from "@/store";
import toast from "react-hot-toast";
import {AxiosError} from "axios";

export default function Comment({changeModalState, modalState, postInfo}: {changeModalState: React.Dispatch<React.SetStateAction<boolean>>, modalState: boolean, postInfo: postsStructure | null}) {
    const [commentData, setCommentData] = useState<string>("");
    const {user} = useSelector((store: RootState) => store.user);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        setLoading(true);
        try {
            if (user) {
                const response = await axios.post(`/posts/${postInfo?._id}/comments`, {userId: user._id, commentDescription: commentData, location: user.location, firstName: user.firstName, lastName: user.lastName, userPic: user.photoPath});
                dispatch(setComment(response.data));
                changeModalState(!modalState);
            }
            setLoading(true);
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 404) {
                    toast.error("Endpoint not found")
                }
                else if (e.response.status == 403 || e.response.status == 401) {
                    dispatch(logOut())
                }


            } else {
                toast.error("Something went wrong")
            }
            setLoading(true);
        }
    }

    return (
        <div className="transition-all inset-0 fixed z-40 dark:bg-slate-800/30 bg-black/30 flex justify-center items-center" onClick={() => changeModalState(!modalState)}>
            <main className="dark:bg-gray-900 border dark:border-slate-600 dark:text-white text-black bg-white rounded-lg h-auto w-full max-w-xl flex flex-col p-5 relative mx-5 gap-5 z-50" onClick={(e) => e.stopPropagation()}>
                <section>
                    <span className="flex flex-row gap-4 items-center capitalize relative">
                        <p className="dark:bg-gray-200 h-14 w-1 border absolute bg-gray-500/50 top-11 left-4"></p>
                        <img src={postInfo?.userPic} className="dark:border-2 dark:border-slate-400 h-8 w-8 md:h-10 md:w-10 rounded-full" alt="pfp" />
                        <div className="flex flex-col justify-center text-sm text-gray-500">
                            <span className="dark:text-slate-100 text-black">{postInfo?.firstName + " " + postInfo?.lastName}</span>
                            <span className="dark:text-white text-black">{postInfo?.location}</span>
                        </div>
                    </span>
                    <button onClick={() => {changeModalState(!modalState)}} className="p-4 absolute top-2 right-2 dark:text-white text-black"><RxCross2 className="text-xl" /></button>
                </section>
                {postInfo?.description.length !== 0 && <p className="truncate pl-16 text-black dark:text-white">{postInfo?.description}</p>}
                <span className="flex flex-row gap-3">
                    <img src={user?.photoPath} className="dark:border-2 dark:border-slate-400 h-8 w-8 md:h-10 md:w-11 rounded-full" alt="yourpfp" />
                    <textarea className="rounded-3xl px-5 py-3 border dark:bg-slate-900 border-gray-500/80 w-full" placeholder="Comment" rows={4} onChange={(e) => {setCommentData(e.target.value)}} />
                </span>
                <button className="bg-purple-700 text-white flex justify-center items-center p-2 rounded-md disabled:bg-purple-500" disabled={loading} onClick={(e) => handleSubmit(e)}>{loading ? <div className="h-5 w-5 rounded-full animate-spin border-t-2 border-white "></div> : "Post"}</button>
            </main>
        </div>
    );
}
