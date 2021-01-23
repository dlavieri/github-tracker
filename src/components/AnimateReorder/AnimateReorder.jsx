import React, { useEffect, useState, useLayoutEffect } from 'react';
import getBoundingBox from '../../utils/getBoundingBox';
import usePrevious from '../../hooks/usePrevious';

const AnimateReorder = ({ children }) => {
    const [ boundingBox, setBoundingBox ] = useState({});
    const [ prevBoundingBox, setPrevBoundingBox ] = useState({});
    const prevChildren = usePrevious(children);

    useLayoutEffect(() => {
        const newBoundingBox = getBoundingBox(children);
        setBoundingBox(newBoundingBox);
    }, [children])

    useLayoutEffect(() => {
        const prevBoundingBox = getBoundingBox(prevChildren);
        setPrevBoundingBox(prevBoundingBox)
    }, [prevChildren])

    useEffect(() => {
        const hasPrevious = Object.keys(prevBoundingBox).length;

        if (hasPrevious > 0) {
            React.Children.forEach(children, child => {
                const domNode = child.ref.current;
                const startPos = prevBoundingBox[child.key] || {top:50};
                const endPos = boundingBox[child.key] || {top:50};
                const changeInY = startPos.top - endPos.top;
                if (changeInY) {
                    requestAnimationFrame(() => {
                        domNode.style.transform = `translateY(${changeInY}px)`;
                        domNode.style.transition = "transform 0s";

                        requestAnimationFrame(() => {
                            domNode.style.transform = "translateY(0)";
                            domNode.style.transition = "transform 500ms";
                        });
                    });
                }
            })
        }
    })

    return children;
}

export default AnimateReorder;