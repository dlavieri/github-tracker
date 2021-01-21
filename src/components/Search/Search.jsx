import React, { useState } from 'react';
import octokit from '../../api/apiSetup';

const Search = () => {
    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState([])

    const handleSearch = () => {
        octokit.request('GET /search/repositories', {
            q: search
        }).then(res => {
            setResults(res.data.items)
        })
    }

    return (
        <>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map(repo => <li key={repo.id}>{repo.full_name}, {repo.updated_at}</li>)}
            </ul>
        </>
    )
}

export default Search;