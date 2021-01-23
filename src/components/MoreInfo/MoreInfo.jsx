import React, { useEffect, useState } from 'react';
import octokit from '../../api/apiSetup';

const MoreInfo = ({ owner, repo }) => {
    const [ info, setInfo] = useState('Select a repo to view any release notes.') 

    useEffect(() => {
        if (owner && repo) {
            octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
                owner: owner,
                repo: repo
            }).then(result => {
                setInfo(result.data)
            })
        }
    },[owner, repo])

    return (
        <div className="more-info">
            {info.body}
        </div>
    )
}

export default MoreInfo;