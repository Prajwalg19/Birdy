const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DividerSkeleton() {
    return (
        <div className={`${shimmer} relative px-5 flex py-5 items-center w-full`}>
            <div className="flex-grow border-t dark:border-gray-600 border-gray-400/80"></div>
            <div className="flex-grow border-t dark:border-gray-600 border-gray-400/80"></div>
        </div>

    )
}

export function UserCardSkeleton() {
    return (

        <section className={`${shimmer} relative overflow-hidden rounded-xl border dark:border-slate-600 bg-zinc-200 dark:bg-gray-900 p-2 shadow-sm`}>
            <div className="flex justify-between items-center w-full ">
                <section className="flex items-center gap-4">
                    <span className="rounded-full h-12 w-12 bg-zinc-100 dark:bg-gray-800"></span>
                    <span className="flex flex-col justify-center gap-2">
                        <span className="bg-zinc-100 h-5 w-16 rounded-lg dark:bg-gray-800"></span>
                        <span className="bg-zinc-100 h-5 w-16 rounded-lg dark:bg-gray-800"></span>
                    </span>

                </section>
                <section className="bg-zinc-100 rounded-full h-12 w-12 dark:bg-gray-800"></section>
            </div>
            <DividerSkeleton />

            <div className="flex flex-col justify-center gap-4">
                <span className="flex items-center flex-row gap-6">
                    <span className="bg-zinc-100 rounded-full h-10 w-10 dark:bg-gray-800"></span>
                    <span className="bg-zinc-100 rounded-md h-5 w-16 dark:bg-gray-800"></span>
                </span>
                <span className="flex items-center flex-row gap-6">
                    <span className="bg-zinc-100 rounded-full h-10 w-10 dark:bg-gray-800"></span>
                    <span className="bg-zinc-100 rounded-md h-5 w-16 dark:bg-gray-800"></span>
                </span>
            </div>
            <DividerSkeleton />

            <div className="flex flex-col justify-center gap-3">
                <span className="flex justify-between items-center"><span className=" dark:bg-gray-800 bg-zinc-100 rounded-md h-5 w-32"></span><span className="bg-zinc-100 rounded-md h-5 w-16 dark:bg-gray-800"></span></span>
                <span className="flex justify-between items-center"><span className="dark:bg-gray-800 bg-zinc-100 rounded-md h-5 w-32"></span><span className="bg-zinc-100 rounded-md h-5 w-16 dark:bg-gray-800"></span> </span>
            </div>

            <DividerSkeleton />
            <div className="flex flex-col gap-6">
                <span className="text-xl bg-zinc-100 rounded-md h-5 w-16 dark:bg-gray-800"></span>
                <section className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <span className="bg-zinc-100 rounded-full h-12 w-12 dark:bg-gray-800"></span>
                        <span className="flex-col gap-2 flex justify-center">
                            <div className="w-32 h-5 bg-zinc-100 rounded-md dark:bg-gray-800"></div>
                            <div className="h-5 w-32 bg-zinc-100 rounded-md dark:bg-gray-800"></div>
                        </span>
                    </div>
                    <div className="text-xl h-12 w-12 rounded-full bg-zinc-100 dark:bg-gray-800"></div>
                </section>
                <section className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <span className="bg-zinc-100 rounded-full h-12 w-12 dark:bg-gray-800"></span>
                        <span className="flex-col gap-2 flex justify-center">
                            <div className="w-32 h-5 bg-zinc-100 rounded-md dark:bg-gray-800"></div>
                            <div className="h-5 w-32 bg-zinc-100 rounded-md dark:bg-gray-800"></div>
                        </span>
                    </div>
                    <div className="text-xl h-12 w-12 rounded-full bg-zinc-100 dark:bg-gray-800"></div>
                </section>
            </div>
        </section >
    )
}
