import React, { useEffect, useState } from 'react';
import octokit from '../../api/apiSetup';

const List = () => {
    const [ repos, setRepos ] = useState([]);
    const dummy = ['facebook/react', 'discountry/react', 'streamich/react-use', 'reactioncommerce/reaction']
    
    function formatDate(){
        
    }

    useEffect(() => {
        if (!repos || !repos.length) {
            dummy.forEach(r => {
                const [ owner, repo ] = r.split('/');
                octokit.request('GET /repos/{owner}/{repo}', {
                    owner: owner,
                    repo: repo
                }).then(result => {
                    console.log(result.data)
                    setRepos(prevRepos => [...prevRepos, result.data])
                })
            })
        }
    },[])

    return (
        <ul>
            {repos.map(repo => <li key={repo.id}>{repo.full_name}</li>)}
        </ul>
    )
}   

export default List;