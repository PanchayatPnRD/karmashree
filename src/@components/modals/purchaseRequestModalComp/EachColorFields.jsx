import React from 'react'

const EachColorFields = ({ label, total = 0, given = 0, chipClass, requested = 0 }) => {
    return (
        <div className={`grid grid-cols-3 items-center  px-4 py-2 rounded border shadow-lg text-base bg-[#0000] text-black dark:text-white my-3`}>
            <span>
                {label}
            </span>
            <span className={`text-xl px-3 py-1 mx-auto ${chipClass} rounded-full text-black font-bold`}>
                {total}
            </span>


            {/* <span className={`text-xl px-3 py-1 mx-auto ${chipClass} rounded-full text-black font-bold`}>
                {given}
            </span> */}
            {
                <span className={`text-xl px-3 mx-auto py-1 ${chipClass} rounded-full text-black font-bold`}>
                    {requested}
                </span>
            }
        </div>
    )
}

export default EachColorFields