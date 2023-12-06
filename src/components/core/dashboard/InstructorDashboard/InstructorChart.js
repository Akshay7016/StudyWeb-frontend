import { useState } from 'react';
import { Chart, registerables } from "chart.js";
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

export const InstructorChart = ({ courses }) => {
    const [currentChart, setCurrentChart] = useState("students");

    // generates random color
    const getRandomColors = (numColors) => {
        let colors = [];
        for (let i = 0; i < numColors; i++) {
            let color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;

            colors.push(color);
        }

        return colors;
    };

    // create data to display students chart
    const studentsChartData = {
        labels: courses.map((course) => course?.courseName),
        datasets: [
            {
                data: courses.map((course) => course?.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    };

    // create data to display income chart
    const incomeChartData = {
        labels: courses.map((course) => course?.courseName),
        datasets: [
            {
                data: courses.map((course) => course?.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className='w-full flex flex-col gap-4 rounded-md bg-richblack-800 p-6'>
            <p className="text-lg font-bold text-richblack-5">
                Visualize
            </p>
            <div className='flex font-semibold gap-2'>
                <button
                    onClick={() => setCurrentChart("students")}
                    className={`rounded-sm py-1 px-3 transition-all duration-200
                    ${currentChart === "students" ?
                            "bg-richblack-700 text-yellow-50" :
                            "text-yellow-400"}`}
                >
                    Student
                </button>

                <button
                    onClick={() => setCurrentChart("income")}
                    className={`rounded-sm py-1 px-3 transition-all duration-200
                    ${currentChart === "income" ?
                            "bg-richblack-700 text-yellow-50" :
                            "text-yellow-400"}`}
                >
                    Income
                </button>
            </div>

            <div className="mx-auto aspect-square h-full w-full">
                <Pie
                    data={currentChart === "students" ? studentsChartData : incomeChartData}
                    options={options}
                />
            </div>
        </div >
    )
};
