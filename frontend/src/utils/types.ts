export type registerSchema = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    photoPath: File | null,
    location: string,
    occupation: string,
    friends?: [],
}
type loginSchema = {
    email: string,
    password: string
}

export type {loginSchema} // can also export like this


export type postSchema = {
    description: string,
    postImage: File | null,
}

export type postsStructure = {
    _id: string,
    userId: string
    firstName: string
    lastName: string
    location: string
    description: string
    postPicture: string
    userPic: string
    likes: {[key: string]: boolean},
    comments: Array<Array<{userId: string, commentDescription: string, location: string, firstName: string, lastName: string, userPic: string}>>;
    createdAt: string;
}



export type userStructure = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string,
    photoPath: string
    location: string,
    friends: Array<friendStructer>;
    viewedProfile?: number,
    impression?: number,
    occupation: string
}


export type friendStructer = {
    _id: string, firstName: string, lastName: string, location: string, occupation: string, photoPath: string
}
