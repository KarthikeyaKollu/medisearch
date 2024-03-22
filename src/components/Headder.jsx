import React from 'react'

export const Headder = () => {
    return (
        <div className='w-full flex justify-between bg-slate-500'>
            <div className='p-3 sm:block hidden'>
                LOGO
            </div>

            <div className='p-4 sm:hidden'>
                hamburger
            </div>

            <div>
                Avatar
            </div>
        </div>
    )
}
