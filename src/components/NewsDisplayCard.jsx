import React from 'react'

const NewsDisplayCard = ({ news }) => {

    return (
        // This is the component to show the contents of the news data.
        <>
            <div className='bg-[#fff] border-2 shadow-lg mt-4 rounded-lg p-3 h-fit'>
                <img src={news.newsIcon} alt="headline" className='mt-3' style={{ height: '35%', width: '20%' }} />
                <p className="mt-1 text-sm text-[#666]">Source: {news.newsSource}</p>
                <div className='mt-3 mb-3'>
                    <h2 className="m-0 text-xl font-semibold">{news.headline}</h2>
                </div>

                <div>
                    {
                        news.hashtags.split(', ').map((hashtag, index) => {
                            return (
                                <span key={index} className='text-blue-400'>#{hashtag}&nbsp;&nbsp;</span>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default NewsDisplayCard