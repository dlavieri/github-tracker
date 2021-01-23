import React, { createRef } from 'react';
import ListItem from './ListItem';
import AnimateReorder from '../AnimateReorder/AnimateReorder';

const List = ({followedRepos, handleMarkSeen, handleSelectRepo}) => {   

    return (
        <ul className="list">
            <AnimateReorder>
            {followedRepos.map(repo => <ListItem 
                key={repo.repo} 
                repo={repo.repo} 
                owner={repo.owner}
                release={repo.release} 
                update={repo.update}
                seen={repo.seen}
                onMarkSeen={handleMarkSeen}
                ref={createRef()}
                handleSelectRepo={() => handleSelectRepo(repo.owner, repo.repo)}/>)}
            </AnimateReorder>
        </ul>
    )
}   

export default List;