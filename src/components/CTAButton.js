import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({ children, active, linkTo }) => {
    return (
        <Link to={linkTo}>
            <div className={`py-3 px-6 rounded-lg ${active ? "bg-yellow-50 text-black border-b-[1px] border-r-[1px] border-pure-greys-100" : "bg-richblack-700 border-b-[1px] border-r-[1px] border-richblack-500"} hover:scale-95 hover:border-none transition-all duration-200`}>
                {children}
            </div>
        </Link>
    )
}

export default CTAButton