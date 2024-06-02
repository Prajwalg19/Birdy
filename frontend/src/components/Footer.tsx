export default function Footer() {
    return (
        <footer className="hidden dark:text-slate-400 text-xs lg:flex flex-col gap-1 text-center text-gray-600 justify-center mb-7 ">
            <small className="text-xs">&copy; 2024 Prajwal Gowda G. All rights reserved.</small>
            <p>
                <span className="font-semibold">About this website : </span>
                Built with React, TailwindCSS, MongoDb, Express, &amp; Firebase.
            </p>
        </footer>
    );
}
