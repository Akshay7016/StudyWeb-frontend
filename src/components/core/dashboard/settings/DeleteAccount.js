import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiTrash2 } from "react-icons/fi";

import { deleteProfile } from "services/operations/settingsAPI";

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const handleDeleteAccount = () => {
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className='mt-10 flex flex-row gap-5 rounded-md border-[1px] border-pink-700 bg-pink-900 py-8 px-12'>
            <div className='flex items-center justify-center aspect-square h-14 w-14 rounded-full bg-pink-700'>
                <FiTrash2 className='text-3xl text-pink-200' />
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-lg font-medium text-richblack-5'>
                    Delete Account
                </p>

                <div className='w-3/5 text-pink-25'>
                    <p>
                        Would you like to delete account?
                    </p>
                    <p>
                        This account may contain Paid courses. Deleting your account is permanent and will remove all the contain associated with it.
                    </p>
                </div>

                <button
                    type='button'
                    className='w-fit italic text-pink-300'
                    onClick={handleDeleteAccount}
                >
                    I want to delete my account.
                </button>
            </div>
        </div>
    )
}

export default DeleteAccount