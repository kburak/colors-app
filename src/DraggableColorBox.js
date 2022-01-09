import React from 'react';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
/* import { SortableElement } from 'react-sortable-hoc'; */
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-5.5px",
        "&:hover svg": { //Any svg inside root
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        padding: "10px",
        width: "100%",
        left: "0",
        bottom: "0",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};


const Draggablecolorbox = (props) => {
    const handleClick = () => {
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
/* export default Draggablecolorbox; */

export default withStyles(styles)(Draggablecolorbox);
