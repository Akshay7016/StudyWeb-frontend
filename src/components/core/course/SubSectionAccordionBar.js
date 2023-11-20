import { HiOutlineVideoCamera } from "react-icons/hi";

export const SubSectionAccordionBar = ({ subSection }) => (
    <div className={`flex items-center gap-2 py-2`}>
        <span>
            <HiOutlineVideoCamera />
        </span>
        <p>{subSection?.title}</p>
    </div>
);
