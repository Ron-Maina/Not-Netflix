import React from 'react'

function SearchBar({searchTerm, onSearchChange}) {

    return (
        
        <div className = "search-bar">
            <label htmlFor='search-bar'></label>
            <input
            name='movie'
            type='text'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>

       
    )
}

export default SearchBar