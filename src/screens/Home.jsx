import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsDisplayCard from '../components/NewsDisplayCard'
import Header from '../components/Header'
import Functionalities from '../components/Functionalities'
import { useSelector } from 'react-redux'

const Home = () => {

  // newsData is the state variable to store the fetched results from the news api.
  const [newsData, setNewsData] = useState([])
  const [filteredNews, setFilteredNews] = useState([])
  const [searchedNews, setSearchedNews] = useState([])
  const sort = useSelector(state => state.sort)
  const filtertype = useSelector(state => state.filtertype)
  const searchtext = useSelector(state => state.searchtext)


  // fetchNewsData is the Function which fetches the data from the news api.

  const fetchNewsData = () => {
    // checks if their is any filter here. if there is no filter then the api will be called.
    if ((filtertype === 'FILTERS' || filtertype === '') && searchtext === '') {
      axios.get(`https://linesnews.onrender.com/api/news-datas`)
        .then(news => {
          setNewsData(news.data.data)
          if(sort === true) {
            const sortedData = sortTheData(newsData)
            setNewsData(sortedData)
          }
          setFilteredNews([])
          setSearchedNews([])
        })
    }

    else if ((filtertype !== 'FILTERS' || filtertype !== '') && searchtext === '') {
      const filteredNews = newsData.filter(news => news.attributes.category === filtertype)
      setFilteredNews(filteredNews)
      if(sort === true) {
        const sortedData = sortTheData(filteredNews)
        setFilteredNews(sortedData)
      }
      setSearchedNews([])
    }

    else if ((filtertype === 'FILTERS' || filtertype === '') && searchtext !== '') {
      const searchedData = newsData.filter(news => news.attributes.headline.toLowerCase().includes(searchtext.toLowerCase()) || news.attributes.hashtags.toLowerCase().includes(searchtext.toLowerCase()))
      setSearchedNews(searchedData)
      if(sort === true) {
        const sortedData = sortTheData(searchedData)
        setSearchedNews(sortedData)
      }
      setFilteredNews([])
    }


    // else the filter will be applied on the data which is already fetched.
    else {
      const filteredNews = newsData.filter(news => news.attributes.category === filtertype)
      setFilteredNews(filteredNews)
      console.log(filteredNews)

      const searchedNews = filteredNews.filter(news => news.attributes.headline.toLowerCase().includes(searchtext.toLowerCase()) || news.attributes.hashtags.toLowerCase().includes(searchtext.toLowerCase()))
      setSearchedNews(searchedNews)
    }
  }



  // function to sort the data.
  const sortTheData = (data) => {
    const sortedData = data.slice().sort((a, b) => {
      return a.attributes.headline.localeCompare(b.attributes.headline)
    })

    return sortedData
  }


  // useEffect to render the data whenever the component renders for the firsttime.
  useEffect(() => {
    fetchNewsData()
  }, [sort, filtertype, searchtext])


  return (
    <>
      <Header />
      <Functionalities/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-16 py-5'>
        {
          // if the filtered news is not empty then the original newsdata will be rendered
          // else filtered data will be rendered.
          filteredNews.length !== 0
            ?
            // if the filtered news is not empty and search news is also not empty then searchNews will be rendered
            (
              searchedNews.length !== 0
                ?
                searchedNews.map(news => {
                  return (
                    <NewsDisplayCard key={news.id} news={news.attributes} />
                  )
                })
                // else filteredNews will be rendered
                :
                filteredNews.map(news => {
                  return (
                    <NewsDisplayCard key={news.id} news={news.attributes} />
                  )
                })
            )
            :
            // if filteredNews is empty and searchNews is not empty then searchNews will be rendered
            // original newsData will be rendered.
            (
              searchedNews.length !== 0
                ?
                searchedNews.map(news => {
                  return (
                    <NewsDisplayCard key={news.id} news={news.attributes} />
                  )
                })
                :
                newsData.map(news => {
                  return (
                    <NewsDisplayCard key={news.id} news={news.attributes} />
                  )
                })
            )
        }
      </div>
    </>
  )
}

export default Home