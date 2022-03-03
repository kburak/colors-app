import sizes from "./sizes";
const styles = {
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    Logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        background: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black"
        },
        [sizes.down("xs")]: {
            display: "none"
        }
    },
    Slider: {
        width: "340px",
        margin: "0 10px",
        display: "inline-block",
        "& .rc-slider-track": {
            backgroundColor: "transparent"
        },
        "& .rc-slider-rail": {
            height: "8px !important"
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:hover, .rc-slider-handle:focus": {
            backgroundColor: "green !important",
            outline: "none !important",
            border: "2px solid green !important",
            boxShadow: "none !important",
            width: "13px !important",
            height: "13px !important",
            marginLeft: "-7px !important",
            marginTop: "-3px !important"
        },
        [sizes.down("md")]: {
            width: "150px"
        }
    },
    SelectContainer: {
        marginLeft: "auto",
        marginRight: "1rem"
    }
}
export default styles;