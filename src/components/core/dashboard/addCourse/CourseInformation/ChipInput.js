import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdClose } from "react-icons/md";

const ChipInput = ({ label, name, placeholder, register, errors, setValue }) => {
    const { course, editCourse } = useSelector((state) => state.course);
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setChips(course.tags);
        };

        register(name, {
            required: {
                value: true,
                message: "Tags are required"
            },
            validate: (value) => value.length > 0
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, chips);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();
            if (chipValue && !chips.includes(chipValue)) {
                const newChips = [...chips, chipValue];
                setChips(newChips);
                event.target.value = ""
            }
        }
    };

    const handleDeleteChip = (chipIndex) => {
        const newChips = chips.filter((_, index) => index !== chipIndex);
        setChips(newChips);
    };

    return (
        <div>
            <label htmlFor={name} className='text-[14px] text-richblack-25 mb-[6px]'>
                {label}<sup className='ml-1 text-pink-200'>*</sup>
            </label>


            {/* Render chips */}
            <div className='w-full flex flex-wrap mb-2'>
                {
                    chips.map((chip, index) => {
                        return (
                            <div
                                key={index}
                                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
                            >
                                {chip}

                                <button
                                    type='button'
                                    className='ml-2 focus:outline-none'
                                    onClick={() => handleDeleteChip(index)}
                                >
                                    <MdClose className="text-sm" />
                                </button>

                            </div>
                        )
                    })
                }
            </div>

            <input
                type="text"
                id={name}
                name={name}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none"
            />

            {
                chips.length === 0 &&
                <p className='text-pink-200 text-xs'>{errors[name]?.message}</p>
            }
        </div>
    )
}

export default ChipInput