import {Link} from "react-router-dom"
import toast from "react-hot-toast"
import axios from "@/utils/axios"
import {SiThunderbird} from "react-icons/si";
import {useDispatch} from "react-redux"
import {loginSuccess} from "@/features/authSlice"
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import {emailValidation} from "@/utils/validationSchema";
import {loginSchema} from "@/utils/types";
import InputField from "@/components/InputFields";
import {Formik} from "formik";
import {AxiosError} from "axios";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //const data = useFormik({
    //    initialValues: {
    //        email: "",
    //        password: ""
    //    },
    //    validationSchema: emailValidation,
    //    async onSubmit(values) {
    //        await handleRequest(values);
    //    }
    //})

    function getError(e: unknown) {
        if (e instanceof AxiosError && e.response != undefined) {
            if (e.response.status == 404) {
                toast.error("User not found")
            }
            else if (e.response.status == 500) {
                toast.error("Something went wrong")
            } else if (e.response.status == 403) {
                toast.error("Wrong password")

            }
        } else {
            toast.error("Something went wrong")
        }
    }

    async function handleRequest(values: loginSchema) {
        try {
            setLoading(true);
            const response = await axios.post("/auth/login/", values)
            if (response.status == 200) {
                toast.success("Login successful")
            }
            dispatch(loginSuccess(response.data));
            navigate("/");
            setLoading(false);
        } catch (e: unknown) {
            getError(e)
            setLoading(false);
        }

    }



    return (
        <div className="border border-black/10 py-14 md:mt-24 mt-10 px-6 rounded-2xl shadow-lg max-w-3xl mx-4 sm:mx-auto justify-center items-center">
            <div className="flex flex-col gap-7">
                <div className="justify-center font-semibold text-2xl flex items-center gap-3 italic"><SiThunderbird /><p>Birdy </p></div>
                <p className="text-center italic font-serif">Start connecting with people right now with birdy!</p>
                <Formik validationSchema={emailValidation} initialValues={{email: "", password: ""}} onSubmit={handleRequest}>
                    {({handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm}) => (
                        <form className="flex flex-col gap-6 justify-center" onSubmit={handleSubmit} >
                            <InputField props={{handleBlur, handleChange, value: values.email, errors: errors.email, touched: touched.email, placeholder: "Email", name: "email", type: "email"}} />
                            <InputField props={{handleBlur, handleChange, value: values.password, errors: errors.password, touched: touched.password, placeholder: "Password", name: "password", type: "password"}} />
                            <button disabled={loading} type="submit" className="justify-center flex items-center disabled:opacity-75 w-full py-1 font-semibold bg-blue-500 text-white rounded-sm">{loading ? <div className="h-5 w-5 animate-spin border-t-2 border-white rounded-full box-border"></div> : "Register"}</button>

                            <Link className="text-sm text-green-500" onClick={() => resetForm()} to={"/register"}>Don&apos;t have an account? Let&apos;s create an account then</Link>

                        </form>
                    )}
                </Formik>
            </div>
        </div >
    )

}
