import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import './ColorBox.css';

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
        const { name, background, /* paletteId, id, */ moreUrl, showLink } = this.props;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{ background: background }} className="ColorBox">
                    <div style={{ background: background }} className={`copy-overlay ${this.state.copied && "show"}`}></div>
                    <div className={`copy-msg ${this.state.copied && "show"}`}>
                        <h1>COPIED!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">COPY</button>
                    </div>
                    {showLink && (
                        <Link to={moreUrl} onClick={evt => evt.stopPropagation()}> {/* This (stopPropagation) will prevent further events to be fired. */}
                            <span className="see-more">MORE</span>
                        </Link>
                    )}
                
            </div>
            </CopyToClipboard >
        );
    }
}

export default Colorbox;
