
import Logo1 from '../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from "../assets/Images/TimelineImage.png";

const timeline = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully committed to the success company"
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    }
];

const TimelineSection = () => {
    return (
        <div className='flex items-center justify-between'>
            <div className='w-[45%] flex flex-col gap-14'>
                {/*TODO: Vertical line between logo's remaining */}
                {
                    timeline.map((element, index) => {
                        return (
                            <div key={index} className='flex gap-6'>
                                <div className='w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center'>
                                    <img src={element.logo} alt="logo1" />
                                </div>

                                <div className='flex flex-col'>
                                    <h2 className='font-semibold text-[17px]'>{element.heading}</h2>
                                    <p className='text-[14px]'>{element.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='relative w-[55%] h-[400px] shadow-[-4px_-4px_30px_#47A5C5]'>
                <img src={TimelineImage} alt="timeline" className='w-full h-full object-fill relative z-[20]' />

                <div className='w-full h-full bg-white absolute top-4 left-4 z-[10]'></div>

                <div className='absolute -bottom-[65px] left-11 z-[30] bg-caribbeangreen-700 flex justify-between text-white uppercase p-[42px]'>
                    <div className='flex gap-6  border-r-[1px] border-caribbeangreen-300'>
                        <div className='text-3xl font-bold'>10</div>
                        <div className='w-[50%] text-caribbeangreen-300 text-sm'>Years Experience</div>
                    </div>

                    <div className='flex justify-end gap-6'>
                        <div className='text-3xl font-bold'>250</div>
                        <div className='w-[50%] text-caribbeangreen-300 text-sm'>Types of courses</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection