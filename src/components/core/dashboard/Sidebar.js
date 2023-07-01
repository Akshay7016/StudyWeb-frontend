import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";

import Spinner from '../../common/Spinner';
import ConfirmationModal from '../../common/ConfirmationModal';

import SidebarLink from './SidebarLink';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading, user } = useSelector((state) => state.profile);
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }

    if (authLoading || profileLoading) {
        return <Spinner />;
    }

    return (
        <div className='min-w-[222px] h-[calc(100vh-56px)] border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        const { id, name, path, icon, type } = link;

                        return (type && user?.accountType !== type) ?
                            null :
                            <SidebarLink
                                key={id}
                                name={name}
                                path={path}
                                icon={icon}

                            />
                    })
                }
            </div>

            {/* Horizontal line */}
            <div className='w-[85%] mx-auto h-[1px] bg-richblack-700 my-6'></div>

            <div className='flex flex-col'>
                <SidebarLink
                    name="Settings"
                    path="dashboard/settings"
                    icon="VscSettingsGear"
                />

                {/* logout button */}
                <button
                    onClick={() => setShowModal(true)}
                    className='text-richblack-300 px-8 py-2 text-sm font-medium'
                >
                    <div className="flex gap-2 items-center">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>

            {/* Show confirmation modal if clicked on logout button */}
            {
                showModal &&
                <ConfirmationModal
                    heading1="Are you sure?"
                    heading2="You will be logged out of your account."
                    btnText1="Logout"
                    btnText2="Cancel"
                    btn1Handler={() => dispatch(logout(navigate))}
                    btn2Handler={closeModal}
                />}
        </div>
    )
}

export default Sidebar;