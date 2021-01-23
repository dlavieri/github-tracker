import React, { forwardRef} from 'react';
import cn from 'classnames';

const ListItem = forwardRef(({ repo, owner, release, seen, update, onMarkSeen, handleSelectRepo }, ref) => {

    const classnames = cn({
        'list-item': true,
        'new': !seen
    })

    return (
        <div className={classnames} ref={ref} onClick={handleSelectRepo}>
            <div className="name">{repo}</div>
            <div className="release">{release}</div>
            <div className="update">{update.split("T")[0]}</div>
            {!seen ? <button className="mark-seen" onClick={() => onMarkSeen(repo)}>Mark as Seen</button>
            : null}
        </div>
    )
}) 

export default ListItem;