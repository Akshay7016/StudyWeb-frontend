import RenderSteps from "./RenderSteps";

const AddCourse = () => {
    return (
        <div className="w-full flex items-start gap-6">
            <div className="flex flex-1 flex-col">
                <h1 className='text-3xl font-medium text-richblack-5 mb-14'>Add Course</h1>
                <RenderSteps />
            </div>

            <div className="hidden md:block sticky top-10 max-w-[400px] h-fit p-6 bg-richblack-800 border border-richblack-700 rounded-md">
                <p className="text-lg text-richblack-5 mb-8">⚡Course Upload Tips</p>
                <ul className="ml-5 list-disc space-y-4 text-xs text-richblack-5">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
    )
}

export default AddCourse;