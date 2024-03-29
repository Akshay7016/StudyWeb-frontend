import React from 'react'

const Button = ({ children, onClick, className = "", variant = "variant1", disabled = false, type = "button" }) => {
    const buttonColor = {
        variant1: "bg-yellow-50 text-richblack-900",
        variant2: "bg-richblack-700 text-richblack-50",
        variant3: "bg-richblack-300 text-richblack-900"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`${buttonColor[variant]} py-2 px-5 font-semibold rounded-md ${className}`}
        >
            {children}
        </button>
    )
}

export default Button