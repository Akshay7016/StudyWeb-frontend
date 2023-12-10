import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Player, BigPlayButton } from "video-react";
import 'video-react/dist/video-react.css';

import { updateCompletedLectures } from "redux/slices/viewCourseSlice";
import { markLectureAsComplete } from "services/operations/courseDetailsAPI";
import Button from "components/common/Button";

export const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef(null);
    const { token } = useSelector((state) => state.auth);
    const {
        courseSectionData,
        completedLectures,
    } = useSelector((state) => state.viewCourse);
    const [videoData, setVideoData] = useState([]);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!courseId || !sectionId || !subSectionId) {
            navigate("/dashboard/enrolled-courses");
            return;
        }

        const subSectionDetails = courseSectionData.filter((section) => section._id === sectionId)[0]?.subSection?.filter((subSection) => subSection._id === subSectionId);

        setVideoData(subSectionDetails);
        setIsVideoEnded(false);
    }, [courseId, sectionId, subSectionId, navigate, courseSectionData]);

    const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subSection?.findIndex((subSection) => subSection._id === subSectionId);
    const noOfSubSections = courseSectionData[currentSectionIndex]?.subSection?.length;

    const isFirstVideo = () => {
        return currentSectionIndex === 0 && currentSubSectionIndex === 0;
    };

    const isLastVideo = () => {
        return currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1;
    };

    const goToNextVideo = () => {
        if (currentSubSectionIndex !== noOfSubSections - 1) {
            // in same section, goto next subSection(video)
            const nextSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex + 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
        } else {
            // in next section, goto first subSection(video)
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1]?.subSection[0]._id;

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
        }
    };

    const goToPreviousVideo = () => {
        if (currentSubSectionIndex !== 0) {
            // in same section, goto previous subSection(video)
            const prevSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex - 1]._id;

            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
        } else {
            // in previous section, goto last subSection(video)
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex - 1]?.subSection?.length;
            const lastSubSectionId = courseSectionData[currentSectionIndex - 1]?.subSection[prevSubSectionLength - 1]._id;

            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${lastSubSectionId}`);
        }
    };

    const handleLectureCompletion = async () => {
        setIsLoading(true);

        const result = await markLectureAsComplete({ courseId, subSectionId }, token);

        if (result) {
            dispatch(updateCompletedLectures(subSectionId));
        }

        setIsLoading(false);
    };

    return (
        <div>
            {!videoData?.length ? (
                <div className="text-3xl font-semibold mt-44 text-richblack-25 flex justify-center items-center">
                    No video found
                </div>
            ) : (
                <div>
                    <Player
                        ref={playerRef}
                        aspectRatio="16:9"
                        playsInline
                        onEnded={() => setIsVideoEnded(true)}
                        src={videoData[0]?.videoUrl}
                    >
                        <BigPlayButton position="center" />

                        {/* render after video ends */}
                        {
                            isVideoEnded && (
                                <div
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                                    }}
                                    className="absolute inset-0 z-[100] grid gap-3 h-full place-content-center place-items-center font-inter"
                                >
                                    {/* don't show mark as completed button if video is already completed */}
                                    {
                                        !completedLectures.includes(subSectionId) && (
                                            <Button
                                                disabled={isLoading}
                                                onClick={handleLectureCompletion}
                                                className="text-xl"
                                            >
                                                {
                                                    isLoading ? "Loading..." : "Mark as completed"
                                                }
                                            </Button>
                                        )
                                    }

                                    <Button
                                        disabled={isLoading}
                                        onClick={() => {
                                            if (playerRef?.current) {
                                                playerRef?.current?.seek(0);
                                                setIsVideoEnded(false);
                                            }
                                        }}
                                        className="text-xl !w-fit"
                                    >
                                        Rewatch
                                    </Button>

                                    <div className="mt-0 md:mt-7 flex gap-4 text-xl justify-center">
                                        {
                                            !isFirstVideo() && (
                                                <Button
                                                    disabled={isLoading}
                                                    onClick={goToPreviousVideo}
                                                    className="!bg-richblack-800 text-white border border-richblack-700"
                                                >
                                                    Previous
                                                </Button>
                                            )
                                        }
                                        {
                                            !isLastVideo() && (
                                                <Button
                                                    disabled={isLoading}
                                                    onClick={goToNextVideo}
                                                    className="!bg-richblack-800 text-white border border-richblack-700"
                                                >
                                                    Next
                                                </Button>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </Player>
                    <p className="text-white mt-4 text-3xl font-semibold">{videoData[0]?.title}</p>
                    <p className="text-white pt-2">{videoData[0]?.description}</p>
                </div>
            )}

        </div>
    )
}
