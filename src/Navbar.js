import React, { Component } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import {Link} from 'react-router-dom';
import './Navbar.css';
class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            format: "hex",
            open: true
        }
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    handleFormatChange(e){
        this.setState({format: e.target.value, open: true}, 
            () => this.props.handleChange(this.state.format));
    }
    closeSnackbar(){
        this.setState({open: false});
    }
    render() {
        const {level, changeLevel, showingAllColors} = this.props;
        const {format} = this.state;
        return (
            <header className="Navbar">
                <div className="logo">
                    <Link to="/">reactcolorpicker</Link>
                </div>
                {showingAllColors && (
                    <div className="slider-container">
                        <span>Level: {level}</span>
                        <div className="slider">
                            <Slider 
                                defaultValue={level} 
                                min={100} 
                                max={900} 
                                onAfterChange={changeLevel}
                                step={100}
                            />
                        </div>
                    </div>
                )}
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange} variant="standard">
                        <MenuItem value="hex">HEX - #fffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id="message-id">Format changed to {format.toUpperCase()}!</span>}
                    ContentProps={{
                        "aria-describedby": "message-id"
                    }}
                    onClose={this.closeSnackbar}
                    action={[
                        <IconButton onClick={this.closeSnackbar} 
                            color="inherit" 
                            key="close" 
                            aria-label="close">
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    ]}
                />
            </header>
        );
    }
}

export default Navbar;
