import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "@/Pages/Home";
import Profile from "@/Pages/Profile";
import LoginPage from "@/Pages/Login"
import Header from "./Pages/Header";
import {ReactNode} from "react";
import Register from "./Pages/Register";
import ThemeSwitcher from "./components/ThemeSwitcher";
import PrivateRoute from "@/components/PrivateRoute";
import SearchPage from "./Pages/SearchPage";
function App(): ReactNode {

    return (
        <div  >
            <ThemeSwitcher >
                <BrowserRouter>
                    <Header />
                    <Routes>

                        <Route path="/" element={<PrivateRoute />}>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<Profile />} path="/profile/:userId" />
                        </Route>
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<SearchPage />} path="/search"></Route>

                    </Routes>

                </BrowserRouter>
            </ThemeSwitcher>

        </div>
    )


}
export default App
