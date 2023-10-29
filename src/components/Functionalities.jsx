import React from 'react'
import { useDispatch } from 'react-redux'

const Functionalities = () => {

    const dispatch = useDispatch()

    const handleSort = (e) => {
        dispatch({ type: 'sort', payload: e.target.checked })
    }

    const handleFilterOption = (e) => {
        if (e.target.value !== 'Filters')
            dispatch({ type: 'filtertype', payload: e.target.value.toUpperCase() })
    }

    const handleSearch = (e) => {
        dispatch({ type: 'searchtext', payload: e.target.value })
    }

    return (
        <div className='flex flex-col items-center gap-5 md:flex-row md:justify-end md:gap-9 pr-16'>

            <div className='flex items-center gap-1 text-xl'>
                <input id='sort' name='sort' type='checkbox' onChange={handleSort} className='h-5 w-5 cursor-pointer' />
                <label htmlFor='sort'>Sort</label>
            </div>

            <div>
                <select defaultValue='Filters' onClick={handleFilterOption} name="filters" id="filters" className='border-2 border-gray-300 p-3 rounded-lg outline-none'>
                    <option value="Filters">-- Select Filter --</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                    <option value="World">World</option>
                    <option value="Politics">Politics</option>
                </select>
            </div>
            <div>
                <input type='search' onChange={handleSearch} className='outline-none border-2 border-gray-300 rounded-lg p-3' placeholder='Search...' />
            </div>
        </div>
    )
}

export default Functionalities