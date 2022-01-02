import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const Draggablecolorlist = SortableContainer(({colors, removeColor}) => {
    return (
        <div style={{height: "100%"}}>
            {colors.map((color, i) => (
                <DraggableColorBox 
                    index={i}
                    key={color.name}
                    color={color.color} 
                    removeColor={removeColor} 
                    name={color.name} 
                />
            ))}
        </div>
    );
})

export default Draggablecolorlist;
