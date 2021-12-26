import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styles from './Styles/ColorBoxStyles';
import { withStyles } from '@mui/styles';

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
        const { name, background, /* paletteId, id, */ moreUrl, classes, showingFullPalette } = this.props;
        const { copied } = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background: background }} className={classes.colorBox}>
                    <div
                        style={{ background: background }}
                        className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                    />
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1>COPIED!</h1>
                        <p className={classes.copyText}>
                            {background}
                        </p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
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
