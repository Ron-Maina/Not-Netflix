import React, {useState} from 'react'

function SearchBar() {

    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className = "search-bar">
            <label htmlFor='search-bar'></label>
            <input
            size={30}
            placeholder='search'
            name='movie'
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    )
}

export default SearchBar