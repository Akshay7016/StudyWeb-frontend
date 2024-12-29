import Logo1 from "assets/TimeLineLogo/Logo1.svg";
import Logo2 from "assets/TimeLineLogo/Logo2.svg";
import Logo3 from "assets/TimeLineLogo/Logo3.svg";
import Logo4 from "assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "assets/Images/TimelineImage.jpeg";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-[45%] flex flex-col gap-14">
        {/*TODO: Vertical line between logo's remaining */}
        {timeline.map((element, index) => {
          return (
            <div key={index} className="flex gap-6">
              <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center">
                <img src={element.logo} alt="logo1" />
              </div>

              <div className="flex flex-col">
                <h2 className="font-semibold text-[17px]">{element.heading}</h2>
                <p className="lg:text-[14px]">{element.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative lg:w-[55%] h-[230px] lg:h-[400px] mt-16 lg:mt-0 shadow-[-4px_-4px_30px_#47A5C5]">
        <img
          src={TimelineImage}
          alt="timeline"
          className="w-full h-full object-fill relative z-[20]"
        />

        <div className="w-full h-full bg-white absolute top-4 left-4 z-[10]"></div>

        <div className="absolute -bottom-[62px] left-6 lg:left-11 z-[30] bg-caribbeangreen-700 flex flex-col lg:flex-row justify-between items-center text-white uppercase p-[20px] lg:p-[42px]">
          <div className="flex items-center gap-6  lg:border-r-[1px] border-caribbeangreen-300">
            <div className="text-3xl font-bold">10</div>
            <div className="lg:w-[50%] text-caribbeangreen-300 text-sm">
              Years Experience
            </div>
          </div>

          <div className="w-full h-[1px] flex lg:hidden my-[5px] bg-caribbeangreen-300"></div>

          <div className="flex items-center lg:justify-end gap-6">
            <div className="text-3xl font-bold">250</div>
            <div className="lg:w-[50%] text-caribbeangreen-300 text-sm">
              Types of courses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
