const Tab = ({ tabData, accountType, setAccountType }) => {
    return (
        <div className='flex gap-1 p-1 bg-richblack-800 my-6 rounded-full w-max border-b-[1px] border-richblack-600'>
            {
                tabData.map((tab) => {
                    const { id, tabName, type } = tab;

                    return (
                        <button
                            key={id}
                            onClick={() => setAccountType(type)}
                            className={`${accountType === type ? "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                        >
                            {tabName}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Tab