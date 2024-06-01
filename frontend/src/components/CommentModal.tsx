import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setComment} from "@/features/authSlice";
import {useState} from "react";
import {RxCross2} from "react-icons/rx";
import axios from "@/utils/axios";
import {postsStructure} from "@/utils/types";
import {RootState} from "@/store";
import toast from "react-hot-toast";

export default function Comment({changeModalState, modalState, postInfo}: {changeModalState: React.Dispatch<React.SetStateAction<boolean>>, modalState: boolean, postInfo: postsStructure | null}) {
    const [commentData, setCommentData] = useState<string>("");
    const {user} = useSelector((store: RootState) => store.user);
    const dispatch = useDispatch();

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        try {
            if (user) {
                const response = await axios.post(`/posts/${postInfo?._id}/comments`, {userId: user._id, commentDescription: commentData, location: user.location, firstName: user.firstName, lastName: user.lastName, userPic: user.photoPath});
                dispatch(setComment(response.data));
                changeModalState(!modalState);
            }
        } catch (e) {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className="inset-0 fixed z-40 bg-black/30 flex justify-center items-center" onClick={() => changeModalState(!modalState)}>
            <main className="bg-white rounded-lg h-auto w-full max-w-2xl md:max-w-3xl  flex flex-col p-5 relative mx-5 gap-5 z-50" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => {changeModalState(!modalState)}} className="p-4 absolute top-2 right-2"><RxCross2 className="text-xl" /></button>
                <section>
                    <span className="flex flex-row gap-4 items-center capitalize">
                        <img src={postInfo?.userPic} className="h-8 w-8 md:h-10 md:w-10 rounded-full" alt="pfp" />
                        <div className="flex flex-col justify-center text-sm text-gray-500">
                            <span className="text-black">{postInfo?.firstName + " " + postInfo?.lastName}</span>
                            <span>{postInfo?.location}</span>
                        </div>
                    </span>
                </section>
                {postInfo?.description.length !== 0 && <p className="truncate">{postInfo?.description}</p>}
                <span className="flex flex-row gap-3">
                    <img src={user?.photoPath} className="h-8 w-8 md:h-10 md:w-10 rounded-full" alt="yourpfp" />
                    <textarea className="rounded-3xl px-5 py-3 border border-gray-500/80 w-full" placeholder="Comment" rows={4} onChange={(e) => {setCommentData(e.target.value)}} />
                </span>
                <button className="bg-purple-700 text-white p-2 rounded-md" onClick={(e) => handleSubmit(e)}>Post</button>
            </main>
        </div>
    );
}
