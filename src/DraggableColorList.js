import React, { useState } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import DraggableColorBox from './DraggableColorBox';

const Draggablecolorlist = ({ colors, removeColor, handleColorSort }) => {
    const [items, setItems] = useState(colors);

    React.useEffect(() => {
        setItems(colors);
    }, [colors])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            }
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map(({name}) => name)}
                strategy={rectSortingStrategy}
            >
                <Grid>
                    {items.map((color, i) => (
                        <DraggableColorBox 
                            key={color.name} 
                            id={color.name} 
                            color={color.color} 
                            name={color.name}
                            removeColor={removeColor}
                        />
                    ))}
                </Grid>
            </SortableContext>
        </DndContext>
    );
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(({ name }) => name === active.id);
                const newIndex = items.findIndex(({ name }) => name === over.id);
                let newOrder = arrayMove(items, oldIndex, newIndex);
                handleColorSort(newOrder);
                return newOrder;
            });
        }
    }
}

function Grid({ children }) {
    return (
        <div
            style={{
                maxWidth: '100%',
                height: '100%',
                paddingTop: '24px'
            }}
        >
            {children}
        </div>
    );
}

export default Draggablecolorlist;
