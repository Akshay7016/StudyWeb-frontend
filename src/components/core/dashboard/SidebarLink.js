import { useLocation, matchPath, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";

import { setIsOpen } from "redux/slices/mobileViewSlice";

const SidebarLink = ({ name, path, icon }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const Icon = Icons[icon];

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    const navigationHandler = () => {
        navigate(path);
        dispatch(setIsOpen(false));
    }

    return (
        <div
            onClick={navigationHandler}
            className={`${matchRoute(path) ? "bg-yellow-800 text-yellow-50" : "bg-transparent"} relative text-richblack-300 px-8 py-2 text-sm font-medium cursor-pointer`}
        >
            {/* Vertical Line */}
            <span className={`absolute left-0 top-0 h-full w-[2.5px] bg-yellow-50 
            ${matchRoute(path) ? "opacity-100" : "opacity-0"}`}>
            </span>

            <div className="flex gap-2 items-center">
                <Icon className="text-lg" />
                <span>{name}</span>
            </div>
        </div>
    )
}

export default SidebarLink