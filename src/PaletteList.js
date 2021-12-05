import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Palettelist extends Component {
    render() {
        console.log(this.props.list);
        return (
            <div>
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
