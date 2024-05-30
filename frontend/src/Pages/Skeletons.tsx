const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DividerSkeleton() {
    return (
        <div className={`${shimmer} relative px-5 flex py-5 items-center w-full`}>
            <div className="flex-grow border-t border-zinc-100"></div>
            <div className="flex-grow border-t border-zinc-100"></div>
        </div>

    )
}

export function UserCardSkeleton() {
    return (

        <section className={`${shimmer} relative overflow-hidden rounded-xl bg-zinc-200 p-2 shadow-sm`}>
            <div className="flex justify-between items-center w-full ">
                <section className="flex items-center gap-4">
                    <span className="rounded-full h-12 w-12 bg-zinc-100"></span>
                    <p className="flex flex-col justify-center gap-2">
                        <span className="bg-zinc-100 h-5 w-16 rounded-lg"></span>
                        <span className="bg-zinc-100 h-5 w-16 rounded-lg"></span>
                    </p>

                </section>
                <section className="bg-zinc-100 rounded-full h-12 w-12"></section>
            </div>
            <DividerSkeleton />

            <div className="flex flex-col justify-center gap-4">
                <p className="flex items-center flex-row gap-6">
                    <span className="bg-zinc-100 rounded-full h-10 w-10"></span>
                    <span className="bg-zinc-100 rounded-md h-5 w-16"></span>
                </p>
                <p className="flex items-center flex-row gap-6">
                    <span className="bg-zinc-100 rounded-full h-10 w-10"></span>
                    <span className="bg-zinc-100 rounded-md h-5 w-16"></span>
                </p>
            </div>
            <DividerSkeleton />

            <div className="flex flex-col justify-center gap-3">
                <span className="flex justify-between items-center"><p className="bg-zinc-100 rounded-md h-5 w-32"></p><span className="bg-zinc-100 rounded-md h-5 w-16"></span></span>
                <span className="flex justify-between items-center"><p className="bg-zinc-100 rounded-md h-5 w-32"></p><span className="bg-zinc-100 rounded-md h-5 w-16"></span> </span>
            </div>

            <DividerSkeleton />
            <div className="flex flex-col gap-6">
                <h1 className="text-xl bg-zinc-100 rounded-md h-5 w-16"></h1>
                <section className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <p className="bg-zinc-100 rounded-full h-12 w-12"></p>
                        <span className="flex-col gap-2 flex justify-center">
                            <div className="w-32 h-5 bg-zinc-100 rounded-md"></div>
                            <div className="h-5 w-32 bg-zinc-100 rounded-md"></div>
                        </span>
                    </div>
                    <div className="text-xl h-12 w-12 rounded-full bg-zinc-100"></div>
                </section>
                <section className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <p className="bg-zinc-100 rounded-full h-12 w-12"></p>
                        <span className="flex-col gap-2 flex justify-center">
                            <div className="w-32 h-5 bg-zinc-100 rounded-md"></div>
                            <div className="h-5 w-32 bg-zinc-100 rounded-md"></div>
                        </span>
                    </div>
                    <div className="text-xl h-12 w-12 rounded-full bg-zinc-100"></div>
                </section>
            </div>
        </section >
    )
}
