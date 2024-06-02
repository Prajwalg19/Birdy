import {RootState} from "@/store";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export default function ThemeSwitcher({children}: {children: React.ReactNode}) {
    const {theme} = useSelector((store: RootState) => store.user)
    useEffect(() => {
        if (theme) {
            if (theme == "dark") {
                document.documentElement.classList.add("dark")
            } else if (theme == "light") {
                document.documentElement.classList.remove("dark");
            }
        } else if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
            document.documentElement.classList.add("dark")
        }
    }, [theme])

    return <>{children}</>

}
