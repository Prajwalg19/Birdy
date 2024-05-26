type registerSchema = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photoPath: File | null,
    location: string,
    occupation: string,
    friends: string,
}
export type {registerSchema};


type loginSchema = {
    email: string,
    password: string
}

export type {loginSchema}
