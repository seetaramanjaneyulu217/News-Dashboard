import React from 'react'

const Header = () => {

    return (
        <div className='flex justify-between items-center p-7 pr-11'>
            <div>
                <div className='text-3xl items-center font-montserrat font-semibold'><span>News</span><span className='text-blue-400'>Pedia</span></div>
                <i className='font-light'>Your Encyclopedia of updates</i>
            </div>
        </div>
    )
}

export default Header