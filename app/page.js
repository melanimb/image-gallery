'use client'

import {
  BlurImage,
  Container,
  Icon,
  SearchbarContainer,
  Gallery
} from 'components'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { API_KEY } from './services'

const App = () => {
  const [query, setQuery] = useState('')
  const [photos, setPhotos] = useState([])

  const fetchImages = (url) => {
    fetch(url, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then((res) => res.json())
      .then((data) => setPhotos(data.photos))
      .catch((error) => console.log(error.message))
  }

  useEffect(() => {
    fetchImages('https://api.pexels.com/v1/curated?page=1&per_page=15')
  }, [])

  console.log(photos)

  const sendRequest = (e, query) => {
    e.preventDefault()
    fetchImages(`https://api.pexels.com/v1/search?query=${query}&page=1&per_page=15`)
  }

  return (
    <main>
      <SearchbarContainer>
        <div>
          <form onSubmit={(e) => sendRequest(e, query)}>
            <label className='relative'>
              <button
                type='submit'
                className='absolute inset-y-1 right-5 flex items-center pl-2'
              >
                <svg
                  className='h-5 w-5 fill-slate-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                >
                  <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z' />
                </svg>
              </button>
              <input
                className='py-3 px-40 pl-6 sm:py-4 sm:px-72 sm:pl-6 bg-slate-100 text-gray-800 rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ring-opacity-50 shadow-md'
                placeholder='Search for free images'
                type='text'
                name='search'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          </form>
        </div>
        <div>
          <button className='flex justify-center items-center gap-1 py-2 px-10 mt-3 sm:px-5 sm:pl-2 sm:ml-3 sm:mt-0 bg-gradient-to-r from-fuchsia-400 to-blue-500 hover:bg-gradient-to-l text-white w-full rounded-lg text-center text-base font-semibold tracking-wide'>
            <Icon icon={faSortDown} css='w-6 h-6 mb-2' />
            <p>Filters</p>
          </button>
        </div>
      </SearchbarContainer>

      <Container>
        <Gallery>
          {photos.map((photo, index) => (
            <BlurImage
              key={index}
              alt={photo.alt}
              src={photo.src.large}
              photographer={photo.photographer}
              photographer_url={photo.photographer_url}
            />
          ))}
        </Gallery>
      </Container>
    </main>
  )
}

export default App
