import React from 'react'
import  "../styles/SearchBox.css"
function SearchBox({ searchChange }) {
  return (
    <div className='searchBox'>
    <h4>where you want to go</h4>
    <input
      className='search'
      type='search'
      placeholder='search city'
      onChange={searchChange}
    />

    </div>
  )
}

export default SearchBox
