import {Link} from "react-router-dom"
import toast from "react-hot-toast"
import axios from "@/utils/axios"
import {SiThunderbird} from "react-icons/si";
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {registerInitValues, registerValidation} from "@/utils/validationSchema"
import {Formik} from "formik";
import Dropzone from "react-dropzone"
import {FaPencil} from "react-icons/fa6";
import InputField from "@/components/InputFields";
import {registerSchema} from "@/utils/types";
import {AxiosError} from "axios";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage"
import {app} from "../../firebase"

export default function Register() {
    const storage = getStorage(app);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //const data = useFormik({   this is a formik hook which can be used instead of the formik component, i have used this first then also used the other Formik component way
    //    initialValues: {
    //        firstName: "",
    //        lastName: "",
    //        email: "",
    //        password: "",
    //        photoPath: "",
    //        location: "",
    //        occupation: "",
    //        friends: "",
    //        confirmPassword: ""
    //    },
    //    validationSchema: registerValidation,
    //    async onSubmit(values) {
    //        try {
    //            setLoading(true);
    //            const response = await axios.post("http://localhost:4000/auth/register/", values)
    //            if (response.status == 200) {
    //                toast.success("Registration successful")
    //            }
    //            dispatch(loginSuccess(response.data));
    //            navigate("/");
    //            setLoading(false);
    //        } catch (e: unknown) {
    //            giveMeTheError(e);
    //            setLoading(false);
    //
    //        }
    //
    //    }
    //})

    async function handleSubmit(values: registerSchema) {
        try {
            setLoading(true);
            //const formData = new FormData();
            //const data = Object.values(values);
            //let i: number = 0;
            //if (values.photoPath) {
            //    for (const elements in values) {
            //        formData.append(elements, data[i] as string | Blob)
            //        i++;
            //    }
            //}
            let imageRef;
            if (values.photoPath)
                imageRef = await handleImageUpload(values.photoPath)

            const response: Response = await axios.post("/auth/register/",
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                    photoPath: imageRef,
                    location: values.location,
                    occupation: values.occupation,
                }
            )
            if (response.status == 201) {
                toast.success("Account created successfully")
                navigate("/login");
                setLoading(false);
                return;
            }
        } catch (e) {
            setLoading(false)
            if (e instanceof AxiosError && e.response != undefined && e.response.status == 403) {
                toast.error("Account already exists");
            }
            else
                toast.error("Something went wrong");
        }



    }

    async function handleImageUpload(file: File) {
        const imageRef = ref(storage, Math.random().toString().slice(-4) + file.name)
        const uploadTask = uploadBytesResumable(imageRef, file)
        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                () => {},
                (error) => {reject(error)},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (url) => resolve(url)
                    )
                }

            )



        })
    }


    return (
        <div className="py-14 md:mt-16 mt-5 px-6 my-2 rounded-2xl  max-w-3xl mx-4 sm:mx-auto justify-center items-center">
            <div className="flex flex-col gap-7">
                <p className="justify-center font-semibold text-2xl flex items-center gap-3"><SiThunderbird /><span>Birdy </span></p>
                <p className="text-center font-serif italic">Start connecting with people right now with birdy!</p>
                <Formik className="flex flex-col justify-center" onSubmit={handleSubmit} initialValues={registerInitValues} validationSchema={registerValidation}>
                    {
                        ({values, errors, handleBlur, handleSubmit, handleChange, resetForm, touched, setFieldValue}) => (
                            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-10">
                                <div className="flex sm:flex-nowrap gap-10 flex-wrap items-center w-full">
                                    <InputField props={{handleBlur, handleChange, value: values.firstName, errors: errors.firstName, touched: touched.firstName, placeholder: "First Name", name: "firstName", type: "text"}} />
                                    <InputField props={{handleBlur, handleChange, value: values.lastName, errors: errors.lastName, touched: touched.lastName, placeholder: "Last Name", name: "lastName", type: "text"}} />
                                </div>
                                <div className="flex sm:flex-nowrap gap-10 flex-wrap items-center w-full">
                                    <InputField props={{handleBlur, handleChange, value: values.email, errors: errors.email, touched: touched.email, placeholder: "Email", name: "email", type: "email"}} />
                                    <InputField props={{handleBlur, handleChange, value: values.password, errors: errors.password, touched: touched.password, placeholder: "Password", name: "password", type: "password"}} />
                                </div>
                                <div className="flex sm:flex-nowrap gap-10 flex-wrap items-center w-full">
                                    <InputField props={{handleBlur, handleChange, value: values.location, errors: errors.location, touched: touched.location, placeholder: "Location", name: "location", type: "text"}} />
                                    <InputField props={{handleBlur, handleChange, value: values.occupation, errors: errors.occupation, touched: touched.occupation, placeholder: "Occupation", name: "occupation", type: "text"}} />


                                </div>

                                <Dropzone multiple={false} accept={{'image/png': [".png", ".jpeg", ".jpg"]}} onDrop={(theFile) => setFieldValue("photoPath", theFile[0])} >
                                    {
                                        ({getRootProps, getInputProps}) => (

                                            <div  {...getRootProps()} className={`flex justify-center items-center hover:bg-slate-100 transition ease-out active:bg-slate-200 cursor-pointer relative w-full h-16 border border-dashed border-black/60 text-xs font-mono ${values.photoPath && "border-blue-600"}`}>
                                                <input className="w-full h-10"  {...getInputProps()} />
                                                {!values.photoPath ? <p >Select or drop your image here</p> : <div className="flex justify-between w-full items-center px-5"><p>{values.photoPath.name}</p><FaPencil /></div>
                                                }

                                            </div>
                                        )
                                    }
                                </Dropzone>
                                {touched && errors ? (<div className="text-red-500 text-xs">{errors.photoPath}</div>) : null}

                                <button disabled={loading} type="submit" className="justify-center flex items-center disabled:opacity-75 w-full py-1 font-semibold bg-blue-500 text-white rounded-sm">{loading ? <div className="h-5 w-5 animate-spin border-t-2 border-white rounded-full box-border"></div> : "Register"}</button>
                                <Link className="text-sm font-medium" onClick={() => resetForm()} to={"/login"}>Already have an account? <span className="text-blue-500">Let&apos;s log in then</span></Link>
                            </form>

                        )
                    }

                </Formik>
            </div>
        </div >
    )

}
