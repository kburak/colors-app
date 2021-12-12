import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette';

class Palettelist extends Component {
    render() {
        console.log(this.props.list);
        return (
            <div>
                <MiniPalette />
                <h1>React Colors</h1>
                {this.props.list.map(palette => (
                    <p>
                    <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
                    </p>
                ))}
            </div>
        );
    }
}

export default Palettelist;
