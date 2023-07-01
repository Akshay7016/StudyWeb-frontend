import React from 'react'

const Button = ({ children, active, onClick, disabled = false, type = "button" }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`${active ? "bg-yellow-50" : "bg-richblack-200"} text-richblack-900 py-2 px-5 font-semibold rounded-md`}
        >
            {children}
        </button>
    )
}

export default Button