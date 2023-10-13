import React from 'react'

import HighlightText from '../homepage/HighlightText'

const Quote = () => {
    return (
        <div className='w-[84%] max-w-maxContent mx-auto text-center text-4xl font-bold text-white'>
            We are passionate about revolutionizing the way we learn. Our innovative platform {" "}
            <HighlightText text="combines technology" />
            ,{" "}
            <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>
                expertise
            </span>
            , and community to create an {" "}
            <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>
                unparalleled educational experience.
            </span>
        </div>
    )
}

export default Quote