import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

import Button from './Button';

const CodeBlocks = ({
    flexDirection,
    heading,
    subHeading,
    ctabtn1,
    ctabtn2,
    codeLines,
    backgroundGradient,
    codeColor }) => {
    return (
        <div className={`mb-14 flex flex-col ${flexDirection} justify-between gap-10`}>
            {/* section 1 */}
            <div className='lg:w-[50%] mx-auto flex flex-col'>
                {heading}
                <div className='lg:w-[85%] mt-5 mb-12 text-richblack-300'>
                    {subHeading}
                </div>
                <div className='flex gap-6'>
                    <Button active={true} linkTo="/signup">
                        <div className='flex gap-2 items-center'>
                            {ctabtn1}
                            <FaArrowRight />
                        </div>
                    </Button>

                    <Button linkTo="/signup">
                        {ctabtn2}
                    </Button>
                </div>
            </div>

            {/* section 2 */}
            <div className='lg:w-[40%] h-fit py-3 border-[2px] border-richblack-700 flex text-[14px]'>
                {/* TODO: add background gradient */}

                <div className='w-[10%] flex flex-col items-center text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col font-bold font-mono ${codeColor}`}>
                    <TypeAnimation
                        sequence={[codeLines, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block",
                            }
                        }
                        className="text-[13px] lg:text-[14px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks