import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";
import {RootState} from "./store";
function PrivateRoute() {
    const token = useSelector((store: RootState) => store.user.token)
    return token ? <Outlet /> : <Navigate to="/login" />

}
export default PrivateRoute
