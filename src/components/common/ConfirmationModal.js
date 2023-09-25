import React from 'react'
import Button from './Button'

const ConfirmationModal = ({ heading1, heading2, btnText1, btnText2, btn1Handler, btn2Handler }) => {
    return (
        <>
            <div
                onClick={btn2Handler}
                className='fixed top-0 bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-sm z-[200]'>
            </div>

            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6 z-[220]'>
                <div className='text-2xl font-semibold text-richblack-5'>
                    {heading1}
                </div>

                <div className='mt-3 mb-5 leading-6 text-richblack-200'>
                    {heading2}
                </div>

                <div className='flex gap-4'>
                    <Button variant='variant1' onClick={btn1Handler}>
                        {btnText1}
                    </Button>

                    <Button variant='variant3' onClick={btn2Handler}>
                        {btnText2}
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ConfirmationModal