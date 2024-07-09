
import { Outlet } from "react-router-dom";
import NavBar from "../components/User/NavbarHome";

const HomeLayout:React.FC = () => {
    return (
        <div>
            <NavBar/>
            <Outlet />
        </div>
    )
}

export default HomeLayout; 