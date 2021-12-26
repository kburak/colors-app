import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import {Link} from 'react-router-dom';
import styles from './Styles/PaletteStyles';
import {withStyles} from '@mui/styles';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        }
        this.changeFormat = this.changeFormat.bind(this);
    }
    gatherShades(palette, color) {
        //return all shades of given color
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            for (let level of allColors[key]) {
                if (level.id === color) {
                    shades.push(level);
                }
            }
        }
        return shades.slice(1);
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render() {
        const { format } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map(color => (
            <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                showingFullPalette={false}
            />
        ));
        return (
            <div className={`SingleColorPalette ${this.props.classes.Palette}`}>
                <Navbar
                    handleChange={this.changeFormat}
                    showingAllColors={false}
                />
                <div className={this.props.classes.PaletteColors}>
                    {colorBoxes}
                    <div className={this.props.classes.goBack}>
                        <Link to={`/palette/${id}`}>GO BACK</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPalette);