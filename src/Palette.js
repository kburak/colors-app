import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import {withStyles} from '@mui/styles';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    PaletteColors: {
        height: "90%"
    }


}

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: "hex"
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    changeLevel(level) {
        this.setState({ level });
    }
    changeFormat(val) {
        this.setState({ format: val });
    }
    render() {
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format } = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox
                key={color.id}
                background={color[format]}
                name={color.name}
                /* id={color.id} 
                paletteId={id} */ /* IF I NEED THE ID, PALETTEID in the child component then this approach better */
                moreUrl={`/palette/${id}/${color.id}`} /* Pass the link directly ALTERNATIVE */
                showingFullPalette={true}
            />
        ));
        return (
            <div className={this.props.classes.Palette}>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat} 
                    showingAllColors={true}
                />
                {/* Navbar goes here */}
                <div className={this.props.classes.PaletteColors}>
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        );
    }
}

export default withStyles(styles)(Palette);
