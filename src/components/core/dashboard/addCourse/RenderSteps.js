import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const steps = [
  {
    id: 1,
    title: "Course Information"
  },
  {
    id: 2,
    title: "Course Builder"
  },
  {
    id: 3,
    title: "Publish"
  },
];

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  return (
    <>
      {/* Progress div */}
      <div className="w-full flex justify-center mb-2">
        {
          steps.map(({ id }) => (
            <div key={id} className="flex w-[40%] last:w-fit">
              <div className={`${step === id
                ? "bg-yellow-900 border border-yellow-50 text-yellow-50"
                : "bg-richblack-800 border border-richblack-700 text-richblack-300"} w-[34px] aspect-square flex items-center justify-center rounded-full ${step > id && "bg-yellow-50"}`}
              >
                {
                  step > id ? (
                    <FaCheck className="font-bold text-richblack-900" />
                  ) : (
                    id
                  )
                }
              </div>

              {/* dashed line */}
              {
                id !== steps.length && (
                  <div className={`h-[calc(34px/2)] w-full border-dashed border-b-2 
                  ${step > id ? "border-yellow-50" : "border-richblack-500"} `}>
                  </div>
                )
              }
            </div>
          ))
        }
      </div>

      {/* Steps title */}
      <div className="w-full flex mb-16">
        {
          steps.map(({ id, title }) => (
            <div key={id} className={`${step >= id ? "text-richblack-5" : "text-richblack-500"} w-[41%] last:w-[14%] last:text-center text-sm`}>
              {title}
            </div>
          ))
        }
      </div>


      {/* Render specific component based on current step */}
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  )
}

export default RenderSteps