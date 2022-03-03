import sizes from "./sizes";
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
        },
        [sizes.down("lg")]:{
            width: "25%",
            height: "20%"
        },
        [sizes.down("md")]:{
            width: "50%",
            height: "10%"
        },
        [sizes.down("sm")]:{
            width: "100%",
            height: "5%"
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

export default styles;