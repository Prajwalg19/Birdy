import {FaMicrophone, FaPencil} from "react-icons/fa6";
import {FaImage} from "react-icons/fa6";
import {IoVideocamSharp} from "react-icons/io5";
import {FaPaperclip} from "react-icons/fa";
import {Formik, FormikState} from "formik";
import {postInitValues, postValidation} from "@/utils/validationSchema";
import {postSchema} from "@/utils/types";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import axios from "@/utils/axios"
import Dropzone from "react-dropzone";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {setPosts} from "@/features/authSlice";
export default function FeedHeader() {
    const user = useSelector((store: RootState) => store.user)
    const dispath = useDispatch();
    const [showSelector, setShowSelector] = useState<true | false>(false);
    async function handleSubmit(data: postSchema, options: {resetForm: (nextState?: Partial<FormikState<postSchema>> | undefined) => void}) {
        try {

            const formData = new FormData();
            const postValues = Object.values(data);
            let i: number = 0;
            for (const element in data) {
                formData.append(element, postValues[i] as string | Blob);
                i++;
            }
            if (user.user?._id) formData.append("userId", user.user?._id);
            const response = await axios.post("/post/createPost", formData)


            if (response.status == 201) {
                dispath(setPosts(response.data))
                options.resetForm();
                toast.success("Birdy posted");
            }

        } catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                if (e.response.status == 404) {
                    toast.error("Endpoint not found")
                }
            } else {
                toast.error("Something went wrong")
            }
        }

    }
    return (
        <Formik initialValues={postInitValues} onSubmit={handleSubmit} validationSchema={postValidation}>
            {({setFieldValue, handleSubmit, handleChange, values, resetForm}) => (
                <form onSubmit={handleSubmit} className="border bg-white border-black/10 shadow-lg rounded-lg p-6">
                    <section className="flex items-center gap-4 mb-8">
                        <img src={`http://localhost:4000/${user.user?.photoPath}`} alt="profile pic" />
                        <input type="text" name="description" value={values.description} placeholder="What&apos;s happening ?" onChange={handleChange} className="py-4 px-6 border border-black/60 rounded-full w-full" />
                    </section>
                    {
                        showSelector && (

                            <Dropzone onDrop={(file) => setFieldValue("postImage", file[0])} multiple={false} accept={
                                {
                                    "image/png": [".png", ".jpeg", ".jpg"]
                                }
                            }>
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className={`my-3 flex justify-center items-center hover:bg-slate-100 transition ease-out active:bg-slate-200 cursor-pointer relative w-full h-16 border-2 border-dashed border-black/60 text-xs font-mono ${values.postImage && "border-blue-600"}`}>
                                        <input className="w-full h-10"  {...getInputProps()} />
                                        {!values.postImage ? <p >Select or drop your image here</p> : <div className="flex justify-between w-full items-center px-5"><p>image selected is {values.postImage.name}</p><FaPencil /></div>
                                        }
                                    </div>


                                )}

                            </Dropzone>

                        )
                    }

                    <section className="flex items-center justify-around">

                        <span>
                            <FaImage onClick={() => {setShowSelector(!showSelector); setFieldValue("postImage", null)}} className="text-xl cursor-pointer" />
                        </span>
                        <span>
                            <FaPaperclip className="text-xl" />
                        </span>

                        <span>
                            <IoVideocamSharp className="text-xl" />
                        </span>

                        <span><FaMicrophone className="text-xl" /></span>
                        <button type="submit" onClick={() => resetForm} className="bg-purple-700 rounded-full px-5 py-2 text-white disabled:bg-purple-400 hover:bg-purple-800 active:bg-purple-900" disabled={(values.description.length == 0 && values.postImage == null) ? true : false}>Post</button>
                    </section>
                </form>

            )}

        </Formik>

    )

}
