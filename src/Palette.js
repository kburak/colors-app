import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level: 500
        }
        this.changeLevel = this.changeLevel.bind(this);
    }
    changeLevel(level){
        this.setState({ level });
    }
    render() {
        const {colors} = this.props.palette;
        const {level} = this.state;
        const colorBoxes = colors[level].map(color => (
            <ColorBox key={color.id} background={color.hex} name={color.name}/>
        ));
        return (
            <div className="Palette">
                <Slider 
                    defaultValue={level} 
                    min={100} 
                    max={900} 
                    onAfterChange={this.changeLevel}
                    step={100}
                />
                {/* Navbar goes here */}
                <div className="Palette-colors">
                    {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* footer */}
            </div>
        );
    }
}

export default Palette;
