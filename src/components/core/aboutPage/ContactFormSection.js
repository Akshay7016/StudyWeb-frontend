import ContactForm from "components/common/ContactForm"

const ContactFormSection = () => {
    return (
        <div className='w-11/12 max-w-maxContent mx-auto flex justify-center'>
            <div className='lg:w-[45%] mb-[70px] md:mb-[100px]'>
                <h1 className='text-[40px] text-center font-semibold text-richblack-25'>
                    Get in Touch
                </h1>

                <p className='text-richblack-300 text-center mb-10'>
                    We'd love to here for you, Please fill out this form.
                </p>

                <ContactForm />
            </div>
        </div>
    )
}

export default ContactFormSection