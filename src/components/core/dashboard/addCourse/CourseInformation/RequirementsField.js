import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

const RequirementsField = ({ name, label, register, errors, setValue }) => {
    const { course, editCourse } = useSelector((state) => state.course);
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(() => {
        if (editCourse) {
            setRequirementList(course.instructions);
        };

        register(name, {
            required: {
                value: true,
                message: "Requirements/Instructions are required"
            },
            validate: (value) => value.length > 0
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setValue(name, requirementList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementList])

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    };

    const handleRemoveRequirement = (id) => {
        const filteredRequirements = requirementList.filter((_, index) => index !== id);
        setRequirementList(filteredRequirements);
    };

    return (
        <div>
            <label htmlFor={name} className='text-[14px] text-richblack-25'>
                {label}<sup className='ml-1 text-pink-200'>*</sup>
            </label>

            <input
                type="text"
                placeholder="Enter requirements/instructions"
                name={name}
                id={name}
                value={requirement}
                onChange={(event) => setRequirement(event.target.value)}
                className="w-full bg-richblack-700 rounded-lg text-richblack-5 placeholder-richblack-400 p-[10px] border-b-[1px] border-richblack-300 outline-none mt-[6px]"
            />

            {
                requirementList.length === 0 &&
                <p className='text-pink-200 text-xs'>{errors[name]?.message}</p>
            }

            <button
                type="button"
                onClick={handleAddRequirement}
                className="text-yellow-50 font-semibold my-2"
            >
                Add
            </button>

            {
                requirementList.length > 0 && requirementList.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-2">
                            <p className="text-richblack-5">{item}</p>

                            <button
                                type="button"
                                onClick={() => handleRemoveRequirement(index)}
                                className="text-xs text-pure-greys-300"
                            >
                                clear
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default RequirementsField