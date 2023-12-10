import { useRef, useEffect, useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';

import { updateDisplayPicture } from "services/operations/settingsAPI";
import Button from 'components/common/Button';

const ChangeProfilePicture = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    };

    const handleFileUpload = () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", imageFile);

            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            })
        } catch (error) {
            console.log("Error: ", error)
        }
    };

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile);
        }
    }, [imageFile])

    return (
        <div className='flex items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 py-4 md:py-8 px-4 md:px-12'>
            <div className='flex gap-4 items-center'>
                <img
                    src={previewSource || user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />

                <div className='flex flex-col gap-2'>
                    <p className='text-md font-medium text-richblack-5'>
                        Change Profile Picture
                    </p>

                    <div className='flex flex-col md:flex-row gap-3'>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept='image/png, image/gif, image/jpeg'
                        />

                        <Button
                            variant='variant2'
                            onClick={handleClick}
                            disabled={loading}
                        >
                            Select
                        </Button>

                        <Button
                            variant='variant1'
                            onClick={handleFileUpload}
                        >
                            {
                                loading ? (
                                    "Uploading..."
                                ) : (
                                    <div className='flex gap-2 justify-center items-center'>
                                        Upload
                                        <FiUpload className='text-lg text-richblack-900' />
                                    </div>
                                )
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangeProfilePicture