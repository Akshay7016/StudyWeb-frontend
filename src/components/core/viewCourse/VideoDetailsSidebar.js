import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

import Button from "components/common/Button";

export const VideoDetailsSidebar = ({ setReviewModal }) => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("");
    const [activeSubSection, setActiveSubSection] = useState("");
    const { sectionId, subSectionId } = useParams();
    const {
        courseSectionData,
        courseEntireData,
        completedLectures,
        totalNoOfLectures
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        setActiveSection(sectionId);
        setActiveSubSection(subSectionId);
    }, [sectionId, subSectionId]);

    return (
        <div className='md:w-[320px] max-w-[400px] border-r-[1px] border-r-richblack-700 bg-richblack-800 pt-5'>
            <div className="px-3 mb-3">
                {/* buttons */}
                <div className="flex items-center justify-between mb-8">
                    <div
                        className="flex items-center w-8 h-8 rounded-full bg-richblack-400 cursor-pointer"
                        onClick={() => navigate("dashboard/enrolled-courses")}
                    >
                        <IoIosArrowBack size={24} className="pl-1" />
                    </div>
                    <Button onClick={() => setReviewModal(true)}>
                        Add Review
                    </Button>
                </div>

                {/* Course Name */}
                <div className="mb-5">
                    <p className="text-richblack-5 font-semibold mb-1">
                        {courseEntireData?.courseName}
                    </p>
                    <p className="text-richblack-300 text-sm">
                        {completedLectures.length} / {totalNoOfLectures}
                    </p>
                </div>

                {/* Horizontal line */}
                <div className="w-full h-[1px] bg-richblack-700"></div>
            </div>

            {/* Sections and subSections */}
            <div className="h-[calc(100vh-56px-222px)] overflow-y-auto">
                {
                    courseSectionData.map((section) => (
                        <div
                            key={section._id}
                            onClick={() => setActiveSection(section._id)}
                            className="p-3 mb-1 bg-richblack-700 cursor-pointer rounded-lg"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-richblack-5 font-semibold">
                                    {section?.sectionName}
                                </p>
                                <i
                                    className={
                                        activeSection === section._id ? "rotate-180" : "rotate-0"
                                    }
                                >
                                    <IoIosArrowDown className="text-richblack-400" />
                                </i>
                            </div>

                            {/* displaying sub sections */}
                            {
                                activeSection === section._id && (
                                    <div className="mt-2">
                                        {
                                            section?.subSection?.map((subSection) => (
                                                <div
                                                    key={subSection._id}
                                                    className={`flex items-center gap-2 p-2 mb-[6px] rounded-lg ${activeSubSection === subSection._id ? "bg-yellow-200 text-richblack-900" : "bg-richblack-900 text-richblack-5"}`}
                                                    onClick={() => navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`)}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={completedLectures.includes(subSection._id)}
                                                    />
                                                    <p>{subSection.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
