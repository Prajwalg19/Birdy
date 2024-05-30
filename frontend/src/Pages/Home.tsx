import {RootState} from "@/store"
import {useSelector} from "react-redux"
import UserCard from "@/components/UserCard"
import FeedHeader from "@/components/FeedHeader"
import MainFeed from "@/components/MainFeed"
import Advert from "@/components/Advert"
import FriendsList from "@/components/FriendsList"

export default function Home() {
    const {user} = useSelector((store: RootState) => store.user)
    return (
        user && (
            <main className="flex lg:mx-auto my-5 lg:max-w-[100rem] px-5 lg:flex-row flex-col gap-10 w-full">
                <section className="w-full lg:w-[28%]">
                    <UserCard userId={user._id} />

                </section>

                <section className="w-full flex flex-col gap-10 lg:w-[44%]">
                    <FeedHeader />
                    <MainFeed />
                </section>

                <section className=" w-full flex flex-col gap-10 lg:w-[28%]">
                    <Advert />
                    <FriendsList />

                </section>


            </main>

        )

    )

}
