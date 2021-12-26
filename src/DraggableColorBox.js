import React from 'react';
import { withStyles } from '@mui/styles';

const styles = {
    root: {
        width: "20%",
        height: "25%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
    }
};

const Draggablecolorbox = (props) => {
    return (
        <div className={props.classes.root} style={{backgroundColor: props.color}}>
            {props.color}
        </div>
    );
}

export default withStyles(styles)(Draggablecolorbox);
