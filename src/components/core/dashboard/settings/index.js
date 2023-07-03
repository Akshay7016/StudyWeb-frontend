import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

const Settings = () => {
    return (
        <>
            <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
                Edit Profile
            </h1>

            {/* change profile picture */}
            <ChangeProfilePicture />

            {/* Edit profile */}
            <EditProfile />

            {/* Update password */}
            <UpdatePassword />
        </>
    )
}

export default Settings;