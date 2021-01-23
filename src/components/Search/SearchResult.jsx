import React from 'react';

const SearchResult = ({ result, onClick }) => {
    const [ owner, repo ] = result.split("/");
    return (
        <div className="search-result" onClick={() => onClick(owner, repo)}>
            {result}
        </div>
    )
}

export default SearchResult;