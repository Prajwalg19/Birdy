import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "@/Pages/Home";
import Profile from "@/Pages/Profile";
import LoginPage from "@/Pages/Login"
import Header from "./Pages/Header";
import {ReactNode} from "react";
import Register from "./Pages/Register";

function App(): ReactNode {

    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>

                    <Route element={<HomePage />} path="/" />
                    <Route element={<LoginPage />} path="/login" />
                    <Route element={<Profile />} path="/profile/:userId" />
                    <Route element={<Register />} path="/register" />

                </Routes>

            </BrowserRouter>

        </div>
    )


}
export default App
