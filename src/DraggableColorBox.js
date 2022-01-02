import React from 'react';
import { withStyles } from '@mui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
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
    return (
        <div 
            className={props.classes.root} 
            style={{backgroundColor: props.color}}
        >
            <div className={props.classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon className={props.classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    );
}

export default withStyles(styles)(Draggablecolorbox);
