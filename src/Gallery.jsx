import { useQuery } from '@tanstack/react-query'
import React from 'react'
import axios from 'axios';
import { useGlobalContext } from './Context';

const url = 'https://api.unsplash.com/search/photos/?client_id=Eoj7tkJUkfcAGce79__B73RMEwokq3b262zpvZpc7Pc'

const Gallery = () => {
  const {searchTerm} = useGlobalContext()
  const response = useQuery({
    queryKey: ['images', searchTerm],  // Include the URL in the queryKey
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      return result.data;
    }
  });

  console.log(searchTerm)
  if(response.isLoading){
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    )
  }

  if(response.isError){
    return (
      <section className='image-container'>
        <h4>There was an error...</h4>
      </section>
    )
  }

  const results = response.data.results;
  if(results.length < 1){
    return (
      <section className='image-container'>
        <h4>No result found...</h4>
      </section>
    )
  }

  return (
    <section className='image-container'>
      {results.map((item)=>{
        const url = item?.urls?.regular;
        return (
          <img
            src={url}
            key={item.id}
            alt={item.alt_description}
            className='img'
          />
        )
      })}
    </section>
  )
}

export default Gallery
