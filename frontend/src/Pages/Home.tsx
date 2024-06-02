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
            <main className="flex flex-col lg:mx-auto my-5 lg:max-w-[100rem] px-5 lg:flex-row gap-10 w-full">
                <section className="lg:sticky h-full lg:top-16 w-full lg:w-[28%] order-1 lg:order-1">
                    <UserCard userId={user._id} />
                </section>

                <section className="w-full flex flex-col gap-10 lg:w-[44%] order-2 lg:order-2">
                    <FeedHeader />
                    <MainFeed />
                </section>

                <section className="h-full lg:sticky lg:top-16 w-full flex flex-col gap-10 lg:w-[28%] order-2 lg:order-3">
                    <FriendsList />
                    <Advert />
                </section>
            </main>

        )

    )

}
