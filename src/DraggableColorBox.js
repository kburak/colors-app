import React from 'react';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
/* import { SortableElement } from 'react-sortable-hoc'; */
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import styles from './Styles/DraggableColorBoxStyles';

const Draggablecolorbox = (props) => {
    
    const handleClick = () => {
        console.log("DraggableColorBox");
        props.removeColor(props.name);
    }
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({id: props.id});
      const style = {
        backgroundColor: props.color,
        transform: CSS.Transform.toString(transform),
        transition,
      };
    return (
        <div 
            ref={setNodeRef}
            style={style}
            className={props.classes.root} 
            {...attributes} 
            {...listeners}
        >
            <div className={props.classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon className={props.classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    );
}

export default withStyles(styles)(Draggablecolorbox);
