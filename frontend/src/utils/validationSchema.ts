import * as Yup from "yup";
import {postSchema, registerSchema} from "./types";


export const emailValidation = Yup.object().shape(
    {
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(4, 'Must be 4 characters or more').required('Required'),

    }
)

export const registerValidation = Yup.object().shape(
    {
        firstName: Yup.string().required("Required").max(40, "Not more than 40 letters please"),
        lastName: Yup.string().required("Required").max(40, "not more than 40 letters please"),
        email: Yup.string().required("Required").email("Invalid email address"),
        password: Yup.string().required("Required").min(4, "Password should be atleast 4 in length"),
        photoPath: Yup.string().required("Required"),
        location: Yup.string().required("Required"),
        occupation: Yup.string().required("Required")
    }
)

export const postValidation = Yup.object().shape(
    {
        description: Yup.string().required("Required"),
        postImage: Yup.string().required("Required")
    }

)

// initial values of form of formik

export const registerInitValues: registerSchema = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoPath: null,
    location: "",
    occupation: "",
}


export const postInitValues: postSchema = {
    description: "",
    postImage: null,
}

