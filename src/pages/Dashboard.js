import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Spinner from "components/common/Spinner";
import Sidebar from 'components/core/dashboard/Sidebar';

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);
    const { isOpen } = useSelector((state) => state.mobileView);

    if (authLoading || profileLoading) {
        return <Spinner />;
    }

    return (
        <div className='relative flex h-[calc(100vh-56px)]'>
            <div className={`${isOpen ? "flex" : "hidden"} md:flex`}>
                <Sidebar />
            </div>

            <div className={`w-full h-[calc(100vh-56px)] overflow-auto ${isOpen ? "blur-lg" : "blur-none"} md:blur-none`}>
                <div className='w-11/12 max-w-[1000px] mx-auto py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;