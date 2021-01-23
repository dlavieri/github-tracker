import React from 'react';

const getBoundingBoxes = children => {
    const boundingBoxes = {};

    React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const nodeBoundingBox = domNode.getBoundingClientRect();
        boundingBoxes[child.key] = nodeBoundingBox;
    });

    return boundingBoxes;
}

export default getBoundingBoxes;