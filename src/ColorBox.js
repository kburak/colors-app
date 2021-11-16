import React, { Component } from 'react';
import './ColorBox.css';

class Colorbox extends Component {
    render() {
        const {name, background} = this.props;
        return (
            <div style={{ background: background }} className="ColorBox">
                <div className="copy-container">
                    <div className="box-content">
                        <span>{this.props.name}</span>
                    </div>
                    <button className="copy-button">COPY</button>
                </div>
                <span className="see-more">MORE</span>
            </div>
        );
    }
}

export default Colorbox;
