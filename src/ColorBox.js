import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@mui/styles';
import './ColorBox.css';

const styles = {
    colorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&hover button": {
            opacity: "1"
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white" //Is Light Color?
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black" //Is Dark Color?
    },
    seeMore: {
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        color: 
            props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        backgroundColor: "rgba(255, 255, 255, .3)",
        fontSize: "1rem",
        lineHeight: "30px",
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
        textTransform: "uppercase",
        border: "none",
        textDecoration: "none",
        opacity: "0"
    }
}

class Colorbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => { this.setState({ copied: false }) }, 1500);
        })
    }
    render() {
        const { name, background, /* paletteId, id, */ moreUrl, showLink, classes, showingFullPalette } = this.props;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background: background }} className={classes.colorBox}>
                    <div style={{ background: background }} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>COPIED!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>COPY</button>
                    </div>
                    {showingFullPalette && (
                        <Link to={moreUrl} onClick={evt => evt.stopPropagation()}> {/* This (stopPropagation) will prevent further events to be fired. */}
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                
            </div>
            </CopyToClipboard >
        );
    }
}

export default withStyles(styles)(Colorbox);
