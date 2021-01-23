import React, { useState, useRef } from 'react';
import SearchResult from './SearchResult';
import octokit from '../../api/apiSetup';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Search = ({onAddRepo}) => {
    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState([])

    const resultsRef = useRef();

    useOnClickOutside(resultsRef, () => setResults([]))

    const handleSearch = () => {
        octokit.request('GET /search/repositories', {
            q: search
        }).then(res => {
            setResults(res.data.items)
        })
    }

    const handleClick = (owner, repo) => {
        onAddRepo(owner, repo);
        setResults([])
    }

    return (
        <div className='search-header'>
            <div className="search">
                <input value={search} onChange={e => setSearch(e.target.value)} />
                {results.length > 0 ? <ul className="search-result-list" ref={resultsRef}>
                    {results.map(repo => <SearchResult key={repo.id} result={repo.full_name} onClick={handleClick} />)}
                </ul> : null}
            </div>
            
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default Search;